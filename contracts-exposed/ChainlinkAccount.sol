// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0;

import "../contracts/ChainlinkAccount.sol";

contract $ChainlinkAccount is ChainlinkAccount {
    bytes32 public __hh_exposed_bytecode_marker = "hardhat-exposed";

    event return$_validateSignature(uint256 validationData);

    constructor(IEntryPoint anEntryPoint) ChainlinkAccount(anEntryPoint) payable {
    }

    function $_IMPLEMENTATION_SLOT() external pure returns (bytes32) {
        return _IMPLEMENTATION_SLOT;
    }

    function $_ADMIN_SLOT() external pure returns (bytes32) {
        return _ADMIN_SLOT;
    }

    function $_BEACON_SLOT() external pure returns (bytes32) {
        return _BEACON_SLOT;
    }

    function $SIG_VALIDATION_FAILED() external pure returns (uint256) {
        return SIG_VALIDATION_FAILED;
    }

    function $_onlyOwner() external view {
        super._onlyOwner();
    }

    function $_initialize(address anOwner) external {
        super._initialize(anOwner);
    }

    function $_requireFromEntryPointOrOwner() external view {
        super._requireFromEntryPointOrOwner();
    }

    function $_opEncodeData(UserOperation calldata userOp) external pure returns (bytes memory ret0) {
        (ret0) = super._opEncodeData(userOp);
    }

    function $_opDigest(UserOperation calldata userOp) external pure returns (bytes32 ret0) {
        (ret0) = super._opDigest(userOp);
    }

    function $_validateSignature(UserOperation calldata userOp,bytes32 arg1) external returns (uint256 validationData) {
        (validationData) = super._validateSignature(userOp,arg1);
        emit return$_validateSignature(validationData);
    }

    function $_call(address target,uint256 value,bytes calldata data) external {
        super._call(target,value,data);
    }

    function $_authorizeUpgrade(address newImplementation) external view {
        super._authorizeUpgrade(newImplementation);
    }

    function $_getImplementation() external view returns (address ret0) {
        (ret0) = super._getImplementation();
    }

    function $_upgradeTo(address newImplementation) external {
        super._upgradeTo(newImplementation);
    }

    function $_upgradeToAndCall(address newImplementation,bytes calldata data,bool forceCall) external {
        super._upgradeToAndCall(newImplementation,data,forceCall);
    }

    function $_upgradeToAndCallUUPS(address newImplementation,bytes calldata data,bool forceCall) external {
        super._upgradeToAndCallUUPS(newImplementation,data,forceCall);
    }

    function $_getAdmin() external view returns (address ret0) {
        (ret0) = super._getAdmin();
    }

    function $_changeAdmin(address newAdmin) external {
        super._changeAdmin(newAdmin);
    }

    function $_getBeacon() external view returns (address ret0) {
        (ret0) = super._getBeacon();
    }

    function $_upgradeBeaconToAndCall(address newBeacon,bytes calldata data,bool forceCall) external {
        super._upgradeBeaconToAndCall(newBeacon,data,forceCall);
    }

    function $_requireFromEntryPoint() external view {
        super._requireFromEntryPoint();
    }

    function $_validateNonce(uint256 nonce) external view {
        super._validateNonce(nonce);
    }

    function $_payPrefund(uint256 missingAccountFunds) external {
        super._payPrefund(missingAccountFunds);
    }

    function $__EIP712_init(string calldata name,string calldata version) external {
        super.__EIP712_init(name,version);
    }

    function $__EIP712_init_unchained(string calldata name,string calldata version) external {
        super.__EIP712_init_unchained(name,version);
    }

    function $_domainSeparatorV4() external view returns (bytes32 ret0) {
        (ret0) = super._domainSeparatorV4();
    }

    function $_hashTypedDataV4(bytes32 structHash) external view returns (bytes32 ret0) {
        (ret0) = super._hashTypedDataV4(structHash);
    }

    function $_EIP712Name() external view returns (string memory ret0) {
        (ret0) = super._EIP712Name();
    }

    function $_EIP712Version() external view returns (string memory ret0) {
        (ret0) = super._EIP712Version();
    }

    function $_EIP712NameHash() external view returns (bytes32 ret0) {
        (ret0) = super._EIP712NameHash();
    }

    function $_EIP712VersionHash() external view returns (bytes32 ret0) {
        (ret0) = super._EIP712VersionHash();
    }

    function $_disableInitializers() external {
        super._disableInitializers();
    }

    function $_getInitializedVersion() external view returns (uint8 ret0) {
        (ret0) = super._getInitializedVersion();
    }

    function $_isInitializing() external view returns (bool ret0) {
        (ret0) = super._isInitializing();
    }
}
