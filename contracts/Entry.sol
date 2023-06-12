// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

import "@account-abstraction/contracts/core/EntryPoint.sol";

/**
 * A factory contract for ChainlinkAccount
 * A UserOperations "initCode" holds the address of the factory, and a method call (to createAccount, in this sample factory).
 * The factory's createAccount returns the target account address even if it is already installed.
 * This way, the entryPoint.getSenderAddress() can be called either before or after the account is created.
 */
contract Entry is EntryPoint {
}
