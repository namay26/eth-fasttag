// SPDX-License-Identifier:MIT

pragma solidity ^0.8.25;

import {IAccount} from "../lib/account-abstraction/contracts/interfaces/IAccount.sol";
import {PackedUserOperation} from "../lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/Access/Ownable.sol";
import {MessageHashUtils} from "../lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol";
import {ECDSA} from "../lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
import {SIG_VALIDATION_FAILED,SIG_VALIDATION_SUCCESS} from "../lib/account-abstraction/contracts/core/Helpers.sol";
import {IEntryPoint} from "../lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";

contract UserWallet is IAccount , Ownable{
    
    IEntryPoint private immutable i_entryPoint;

    error MinimalAccount__OnlyEntryPointAllowed();
    error MinimalAccount__OnlyEntryPointOrOwnerAllowed();
    error MinimalAccount__CallFailed(bytes);

    modifier onlyEntryPoint {
        if(msg.sender != address(i_entryPoint)){
            revert MinimalAccount__OnlyEntryPointAllowed();
        }
        _;
    }

    modifier onlyEntryPointOrOwner{
        if((msg.sender != address(i_entryPoint)) && (msg.sender != owner())){
            revert MinimalAccount__OnlyEntryPointOrOwnerAllowed();
        }
        _;
    }

    constructor(address entryPoint) Ownable(msg.sender){
        i_entryPoint = IEntryPoint(entryPoint);
    }

    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external onlyEntryPoint returns (uint256 validationData){
        validationData = _validateSignature(userOp,userOpHash); 
        _payPrefund(missingAccountFunds); 
        
    }

    function _validateSignature(PackedUserOperation calldata userOp,bytes32 userOpHash) internal view returns(uint256 validationData){
        uint256 isSuccess;

        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(userOpHash);
        address signer = ECDSA.recover(ethSignedMessageHash , userOp.signature);
        if(signer!=owner()){
            isSuccess =  SIG_VALIDATION_FAILED;
        }
        else{
            isSuccess = SIG_VALIDATION_SUCCESS;
        }
        return SIG_VALIDATION_SUCCESS;
    }

    function _payPrefund(uint256 missingAccountFunds) internal{
        if(missingAccountFunds>0){
            (bool success ,) = payable(msg.sender).call{value : missingAccountFunds , gas: type(uint256).max}("");
            require(success);
        }
    }

    receive() external payable{}
     
    /*//////////////////////////////////////////////////////////////
                           EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/


    function execute(address dest , uint256 value , bytes calldata functionData) onlyEntryPointOrOwner external {
        (bool success , bytes memory result) = dest.call{value : value}(functionData);
        if(!success){
            revert MinimalAccount__CallFailed(result);
        }
    }

}