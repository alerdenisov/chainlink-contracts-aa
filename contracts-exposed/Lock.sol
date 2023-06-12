// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0;

import "../contracts/Lock.sol";

contract $Lock is Lock {
    bytes32 public __hh_exposed_bytecode_marker = "hardhat-exposed";

    constructor(uint256 _unlockTime) Lock(_unlockTime) payable {
    }

    receive() external payable {}
}
