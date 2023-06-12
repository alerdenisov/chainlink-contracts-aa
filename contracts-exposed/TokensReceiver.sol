// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0;

import "../contracts/TokensReceiver.sol";

contract $TokensReceiver is TokensReceiver {
    bytes32 public __hh_exposed_bytecode_marker = "hardhat-exposed";

    constructor() payable {
    }

    receive() external payable {}
}
