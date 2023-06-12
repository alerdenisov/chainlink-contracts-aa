// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0;

import "../contracts/LinkPaymaster.sol";

contract $LinkPaymaster is LinkPaymaster {
    bytes32 public __hh_exposed_bytecode_marker = "hardhat-exposed";

    constructor(IEntryPoint _entryPoint, AggregatorV3Interface _priceFeed, IERC20 _linkToken) LinkPaymaster(_entryPoint, _priceFeed, _linkToken) payable {
    }

    function $getTokenValueOfEth(uint256 ethBought) external view returns (uint256 requiredTokens) {
        (requiredTokens) = super.getTokenValueOfEth(ethBought);
    }

    function $_validatePaymasterUserOp(UserOperation calldata userOp,bytes32 userOpHash,uint256 maxCost) external view returns (bytes memory context, uint256 validationData) {
        (context, validationData) = super._validatePaymasterUserOp(userOp,userOpHash,maxCost);
    }

    function $_postOp(IPaymaster.PostOpMode mode,bytes calldata context,uint256 actualGasCost) external {
        super._postOp(mode,context,actualGasCost);
    }

    function $_requireFromEntryPoint() external {
        super._requireFromEntryPoint();
    }

    function $_checkOwner() external view {
        super._checkOwner();
    }

    function $_transferOwnership(address newOwner) external {
        super._transferOwnership(newOwner);
    }

    function $_msgSender() external view returns (address ret0) {
        (ret0) = super._msgSender();
    }

    function $_msgData() external view returns (bytes memory ret0) {
        (ret0) = super._msgData();
    }

    receive() external payable {}
}
