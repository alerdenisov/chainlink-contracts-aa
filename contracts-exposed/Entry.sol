// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0;

import "../contracts/Entry.sol";

contract $Entry is Entry {
    bytes32 public __hh_exposed_bytecode_marker = "hardhat-exposed";

    event return$_validateAccountPrepayment(uint256 gasUsedByValidateAccountPrepayment, uint256 validationData);

    event return$_validatePaymasterPrepayment(bytes context, uint256 validationData);

    event return$_validateAndUpdateNonce(bool ret0);

    constructor() payable {
    }

    function $_compensate(address payable beneficiary,uint256 amount) external {
        super._compensate(beneficiary,amount);
    }

    function $_copyUserOpToMemory(UserOperation calldata userOp,EntryPoint.MemoryUserOp calldata mUserOp) external pure {
        super._copyUserOpToMemory(userOp,mUserOp);
    }

    function $_getRequiredPrefund(EntryPoint.MemoryUserOp calldata mUserOp) external pure returns (uint256 requiredPrefund) {
        (requiredPrefund) = super._getRequiredPrefund(mUserOp);
    }

    function $_createSenderIfNeeded(uint256 opIndex,EntryPoint.UserOpInfo calldata opInfo,bytes calldata initCode) external {
        super._createSenderIfNeeded(opIndex,opInfo,initCode);
    }

    function $_simulationOnlyValidations(UserOperation calldata userOp) external view {
        super._simulationOnlyValidations(userOp);
    }

    function $_validateAccountPrepayment(uint256 opIndex,UserOperation calldata op,EntryPoint.UserOpInfo calldata opInfo,uint256 requiredPrefund) external returns (uint256 gasUsedByValidateAccountPrepayment, uint256 validationData) {
        (gasUsedByValidateAccountPrepayment, validationData) = super._validateAccountPrepayment(opIndex,op,opInfo,requiredPrefund);
        emit return$_validateAccountPrepayment(gasUsedByValidateAccountPrepayment, validationData);
    }

    function $_validatePaymasterPrepayment(uint256 opIndex,UserOperation calldata op,EntryPoint.UserOpInfo calldata opInfo,uint256 requiredPreFund,uint256 gasUsedByValidateAccountPrepayment) external returns (bytes memory context, uint256 validationData) {
        (context, validationData) = super._validatePaymasterPrepayment(opIndex,op,opInfo,requiredPreFund,gasUsedByValidateAccountPrepayment);
        emit return$_validatePaymasterPrepayment(context, validationData);
    }

    function $_validateAccountAndPaymasterValidationData(uint256 opIndex,uint256 validationData,uint256 paymasterValidationData,address expectedAggregator) external view {
        super._validateAccountAndPaymasterValidationData(opIndex,validationData,paymasterValidationData,expectedAggregator);
    }

    function $_getValidationData(uint256 validationData) external view returns (address aggregator, bool outOfTimeRange) {
        (aggregator, outOfTimeRange) = super._getValidationData(validationData);
    }

    function $getUserOpGasPrice(EntryPoint.MemoryUserOp calldata mUserOp) external view returns (uint256 ret0) {
        (ret0) = super.getUserOpGasPrice(mUserOp);
    }

    function $min(uint256 a,uint256 b) external pure returns (uint256 ret0) {
        (ret0) = super.min(a,b);
    }

    function $getOffsetOfMemoryBytes(bytes calldata data) external pure returns (uint256 offset) {
        (offset) = super.getOffsetOfMemoryBytes(data);
    }

    function $getMemoryBytesFromOffset(uint256 offset) external pure returns (bytes memory data) {
        (data) = super.getMemoryBytesFromOffset(offset);
    }

    function $numberMarker() external view {
        super.numberMarker();
    }

    function $_reentrancyGuardEntered() external view returns (bool ret0) {
        (ret0) = super._reentrancyGuardEntered();
    }

    function $_validateAndUpdateNonce(address sender,uint256 nonce) external returns (bool ret0) {
        (ret0) = super._validateAndUpdateNonce(sender,nonce);
        emit return$_validateAndUpdateNonce(ret0);
    }

    function $_getStakeInfo(address addr) external view returns (IStakeManager.StakeInfo memory info) {
        (info) = super._getStakeInfo(addr);
    }

    function $_incrementDeposit(address account,uint256 amount) external {
        super._incrementDeposit(account,amount);
    }
}
