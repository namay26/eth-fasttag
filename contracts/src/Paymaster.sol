// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {IPaymaster} from "../lib/account-abstraction/contracts/interfaces/IPaymaster.sol";
import {PackedUserOperation} from "../lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";


contract Paymaster is IPaymaster {
    address public immutable i_entryPoint;
    address public immutable i_owner;


    constructor(address anEntryPoint) {
        i_entryPoint = anEntryPoint;
        i_owner = msg.sender;
    }

    modifier onlyEntryPoint() {
        require(msg.sender == i_entryPoint, "only entry point");
        _;
    }
    

    function validatePaymasterUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 maxCost
    )
        external
        view
        onlyEntryPoint
        returns (bytes memory context, uint256 validationData)
    {
        context = new bytes(0);
        validationData = 0;
        return (context, validationData);
    }

    function postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost,
        uint256 actualUserOpFeePerGas
    ) external{}
}