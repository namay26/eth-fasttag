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

    mapping(address _contract => bool isWhitelisted) private whitelisted;
    
    IEntryPoint private immutable i_entryPoint;

    error UserWallet__OnlyEntryPointAllowed();
    error UserWallet__OnlyEntryPointOrOwnerAllowed();
    error UserWallet__CallFailed(bytes);
    error UserWallet__OnlyOwnerAllowed();

    modifier onlyEntryPoint {
        if(msg.sender != address(i_entryPoint)){
            revert UserWallet__OnlyEntryPointAllowed();
        }
        _;
    }

    modifier onlyEntryPointOrOwner{
        if((msg.sender != address(i_entryPoint)) && (msg.sender != owner())){
            revert UserWallet__OnlyEntryPointOrOwnerAllowed();
        }
        _;
    }

    modifier onlyOwnerUserWallet{
        if(msg.sender != owner()){
            revert UserWallet__OnlyOwnerAllowed();
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
            revert UserWallet__CallFailed(result);
        }
    }


                                                     
    /*//////////////////////////////////////////////////////////////
                              WHITELISTING
    //////////////////////////////////////////////////////////////*/

    function isWhitelisted(address _add) public view returns(bool){
        return whitelisted[_add];
    }

    function addToWhitelist(address _add) public onlyOwner{
        whitelisted[_add] = true;
    }

    function withdrawToll(address from , uint256 amount) external{
        require(isWhitelisted(from) , "Cannot Withdraw if not whitelisted");
        (bool success ,) = payable(from).call{value : amount}("");
        require(success);
    }

}