import { BigNumber, Signer } from "ethers";
import { TransactionOptions } from "src/datasources/ContractDataSource";
import { DataSource } from "src/datasources/DataSource";

export interface TokenDataSource extends DataSource {
  address: string;
  getSymbol: () => Promise<string>;
  getDecimals: () => Promise<number>;
  getName: () => Promise<string>;
  getAllowance: (owner: string, spender: string) => Promise<string>;
  getBalanceOf: (address: string) => Promise<string>;
  approve: (
    signer: Signer,
    spender: string,
    amount: BigNumber,
    options?: TransactionOptions,
  ) => Promise<string>;
}
