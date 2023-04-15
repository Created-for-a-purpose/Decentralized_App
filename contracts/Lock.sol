// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract Lock {
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor() {
        owner = payable(msg.sender);
    }
    
    function sendEther() payable public {
        
    }

    function withdraw() public {

        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }

    function balance() public view returns (uint){
        return address(this).balance;
    }
}
