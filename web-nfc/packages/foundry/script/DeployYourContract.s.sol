//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/WalletManager.sol";
import "./DeployHelpers.s.sol";

contract DeployYourContract is ScaffoldETHDeploy {
    // use `deployer` from `ScaffoldETHDeploy`
    function run() external ScaffoldEthDeployerRunner {
        WalletManager walletManager = new WalletManager(deployer);
        console.logString(
            string.concat(
                "WalletManager deployed at: ",
                vm.toString(address(walletManager))
            )
        );
    }
}
