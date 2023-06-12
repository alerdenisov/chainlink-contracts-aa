import {
    BaseContract,
    BigNumberish,
    BytesLike,
    Signer,
    TransactionRequest,
} from "ethers";
import { ethers } from "hardhat";
import { ChainlinkAccount, ChainlinkAccountFactory, EntryPoint } from "../typechain-types";
import { UserOperationStruct } from "../typechain-types/contracts-exposed/ChainlinkAccount.sol/$ChainlinkAccount";

export const DEFAULT_SALT = 42;
export const DEFAULT_KEY = 17;

export const DEFAULT_VERIFICATION_GAS_LIMIT = 300_000n;
export const DEFAULT_PREVERIFICATION_GAS = 300_000n;
export const DEFAULT_MAX_FEE_PER_GAS = 300_000n;
export const DEFAULT_MAX_PRIORITY_FEE = 300_000n;
export const DEFAULT_CALL_GAS = 500_000n;

export const makeUserOpBuilder = (
  entryPoint: EntryPoint,
  factory: ChainlinkAccountFactory,
  chainId: BigNumberish
) => {
  const makeNonce = async (
    request: TransactionRequest,
    account: ChainlinkAccount
  ) => request.nonce ?? entryPoint.getNonce(account.getAddress(), DEFAULT_KEY);

  const makeInitCode = (
    request: TransactionRequest,
    owner: Signer,
    account: ChainlinkAccount
  ) =>
    entryPoint.runner && entryPoint.runner.provider
      ? entryPoint.runner.provider
          .getCode(account.getAddress())
          .then(async (code) =>
            code.length > 2
              ? "0x"
              : ethers.concat([
                  await (factory as BaseContract)
                    .getAddress()
                    .then((address) => address as BytesLike),
                  factory.interface.encodeFunctionData("createAccount", [
                    owner,
                    DEFAULT_SALT,
                  ]),
                ])
          )
      : "0x";

  const makeCallData = async (
    request: TransactionRequest,
    account: ChainlinkAccount
  ) => {
    if (!request.to) {
      throw new Error("contract cretion isnot supported yet");
    }
    return account.interface.encodeFunctionData("execute", [
      await ethers.resolveAddress(request.to),
      request.value ?? 0,
      request.data ?? "0x",
    ]);
  };
  const makeCallGasLimit = (request: TransactionRequest) =>
    request.gasLimit ??
    entryPoint.runner?.provider
      ?.estimateGas(request)
      .then((g) => g * 20n / 10n) // 1.2x
      .catch(() => DEFAULT_CALL_GAS) ??
    DEFAULT_CALL_GAS;
  const makeVerificationGasLimit = (request: TransactionRequest) =>
    DEFAULT_VERIFICATION_GAS_LIMIT; // TOOD
  const makePreVerificationGas = (request: TransactionRequest) =>
    DEFAULT_PREVERIFICATION_GAS; // TOOD
  const makeMaxFeePerGas = (request: TransactionRequest) =>
    request.maxFeePerGas ??
    entryPoint.runner?.provider
      ?.getBlock("latest")
      .then((b) =>
        b && b.baseFeePerGas ? b.baseFeePerGas * 3n : DEFAULT_MAX_FEE_PER_GAS
      ) ??
    DEFAULT_MAX_FEE_PER_GAS;
  const makeMaxPriorityFeePerGas = (request: TransactionRequest) =>
    request.maxPriorityFeePerGas ??
    entryPoint.runner?.provider
      ?.getBlock("latest")
      .then((b) =>
        b && b.baseFeePerGas ? b.baseFeePerGas : DEFAULT_MAX_PRIORITY_FEE
      ) ??
    DEFAULT_MAX_PRIORITY_FEE;
  const makePaymasterAndData = (request: TransactionRequest) => "0x"; // TODO
  return async (
    request: TransactionRequest,
    account: ChainlinkAccount,
    owner: Signer
  ): Promise<Omit<UserOperationStruct, "signature">> => {
    const sender = await account.getAddress();
    const [
      nonce,
      initCode,
      callData,
      callGasLimit,
      verificationGasLimit,
      preVerificationGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      paymasterAndData,
    ] = await Promise.all([
      makeNonce(request, account),
      makeInitCode(request, owner, account),
      makeCallData(request, account),
      makeCallGasLimit(request),
      makeVerificationGasLimit(request),
      makePreVerificationGas(request),
      makeMaxFeePerGas(request),
      makeMaxPriorityFeePerGas(request),
      makePaymasterAndData(request),
    ]);

    return {
      sender,
      nonce,
      initCode,
      callData,
      callGasLimit,
      verificationGasLimit,
      preVerificationGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      paymasterAndData,
    };
  };
};

export const UserOp = [
  { name: "sender", type: "address" },
  { name: "nonce", type: "uint256" },
  { name: "initCode", type: "bytes" },
  { name: "callData", type: "bytes" },
  { name: "callGasLimit", type: "uint256" },
  { name: "verificationGasLimit", type: "uint256" },
  { name: "preVerificationGas", type: "uint256" },
  { name: "maxFeePerGas", type: "uint256" },
  { name: "maxPriorityFeePerGas", type: "uint256" },
  { name: "paymasterAndData", type: "bytes" },
];

export const makeSignOp =
  (
    chainId: BigNumberish,
    eip712Name: string = "ChainlinkAccount",
    version: string = "1"
  ) =>
  async (
    account: ChainlinkAccount,
    userOpData: Omit<UserOperationStruct, "signature">,
    owner: Signer
  ): Promise<UserOperationStruct> => {
    const domainData = {
      name: eip712Name,
      version,
      chainId,
      verifyingContract: await account.getAddress(),
    };

    return {
      ...userOpData,
      signature: await owner.signTypedData(
        domainData,
        {
          UserOp,
        },
        userOpData
      ),
    };
  };
