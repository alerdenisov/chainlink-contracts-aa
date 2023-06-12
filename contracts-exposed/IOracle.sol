// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0;

import "../contracts/IOracle.sol";

abstract contract $IOracle is IOracle {
    bytes32 public __hh_exposed_bytecode_marker = "hardhat-exposed";

    constructor() payable {
    }

    receive() external payable {}
}
