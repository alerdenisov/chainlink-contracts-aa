// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0;

import "../contracts/ChainlinkAccountFactory.sol";

contract $ChainlinkAccountFactory is ChainlinkAccountFactory {
    bytes32 public __hh_exposed_bytecode_marker = "hardhat-exposed";

    constructor(IEntryPoint _entryPoint) ChainlinkAccountFactory(_entryPoint) payable {
    }

    receive() external payable {}
}
