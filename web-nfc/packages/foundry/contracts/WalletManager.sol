// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

import {UserWallet} from "./UserWallet.sol";
import {IEntryPoint} from "../lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";

contract WalletManager{
    struct Person{
        string name;
        string gender;
        string city;
        uint256 pincode;
    }

    mapping(string => address) private carIdToWallet;
    mapping(bytes => string[]) private userCars;
    mapping(bytes userProof => Person) private userToProfile;
    IEntryPoint private immutable i_entryPoint;
    
    event WalletCreated(bytes indexed user, string indexed carId, address wallet);
    
    error WalletAlreadyExists();
    
    constructor(address _entryPoint) {
        i_entryPoint = IEntryPoint(_entryPoint);
    }
    
    function createWalletForCar(bytes memory userProof ,string memory carId) external returns (address) {
        if(carIdToWallet[carId] != address(0)) {
            revert WalletAlreadyExists();
        }
        
        UserWallet newWallet = new UserWallet(address(i_entryPoint));
        newWallet.transferOwnership(msg.sender); // e VERY IMPORTANT
        carIdToWallet[carId] = address(newWallet);
        userCars[userProof].push(carId);
        
        emit WalletCreated(userProof, carId, address(newWallet));
        return address(newWallet);
    }
    
    function getWalletForCar(string memory carId) external view returns (address) {
        return carIdToWallet[carId];
    }
    
    function getUserCars(bytes memory user) external view returns (string[] memory) {
        return userCars[user];
    }


    /*//////////////////////////////////////////////////////////////
                           PROFILE FUNCTIONS
    //////////////////////////////////////////////////////////////*/


    function setProfile(bytes memory userProof ,string memory _name ,string memory _gender ,string memory _city ,uint256 _pincode) public {
        Person memory newPerson = Person({
            name: _name,
            gender : _gender ,
            city: _city ,
            pincode: _pincode
            });
        userToProfile[userProof] = newPerson;
    }

    function getProfile(bytes memory userProof) public view returns(Person memory){
        return userToProfile[userProof];
    }

}