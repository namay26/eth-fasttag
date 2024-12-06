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
    // the EntryPoint.sol contract will call this contract to validate whether all the conditions specified in this are met or not

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

    // we can customise the way we would validate the signature
    // ex: here we will consider a sig to be valid only if it is sent by the owner of this contract

    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external onlyEntryPoint returns (uint256 validationData){
        validationData = _validateSignature(userOp,userOpHash); // see natspec written in `IAccount` , it specifies how this `validationData` needs to be returned
        // optional - validate the nonce
        _payPrefund(missingAccountFunds); 
        // e The _payPrefund function ensures that the smart contract account has enough funds to cover the gas costs of executing the UserOperation. It transfers the required funds to the EntryPoint contract, which acts as the transaction sender.
        
    }

    function _validateSignature(PackedUserOperation calldata userOp,bytes32 userOpHash) internal view returns(uint256 validationData){
        // S-1: convert the sig to EIP-191 standard . do this using open zeppelin's library
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(userOpHash);
        address signer = ECDSA.recover(ethSignedMessageHash , userOp.signature);
        if(signer!=owner()){
            return SIG_VALIDATION_FAILED;
        }
        else{
            return SIG_VALIDATION_SUCCESS;
        }
    }

    function _payPrefund(uint256 missingAccountFunds) internal{
        if(missingAccountFunds>0){
            (bool success ,) = payable(msg.sender).call{value : missingAccountFunds , gas: type(uint256).max}("");
            require(success);
        }
    }

    receive() external payable{}

    // Till now we have only implemented how our contract will validate the sig and pay for gas. Now we need to write the `execute` function , which will be called by the `EntryPoint.sol` , and this function will be used to do whatev stuff the user wanted to initially(like , burn 50 USDC or whatever)

     
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

// note : userOp is the whole PackedUserOperation struct
// The userOpHash is a unique identifier for the UserOperation that gets signed by the account owner. It's calculated by:
// Packing all UserOperation fields (except signature)
// Hashing them together with the chain ID and entry point address