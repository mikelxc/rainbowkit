import { Connector } from 'wagmi';

export type InstructionStepName = 'install' | 'create' | 'scan' | 'refresh';

type RainbowKitConnector<C extends Connector = Connector> = {
  connector: C;
  mobile?: {
    getUri?: () => Promise<string>;
  };
  desktop?: {
    getUri?: () => Promise<string>;
  };
  qrCode?: {
    getUri: () => Promise<string>;
    instructions?: {
      learnMoreUrl: string;
      steps: {
        step: InstructionStepName;
        title: string;
        description: string;
      }[];
    };
  };
  extension?: {
    instructions?: {
      steps: {
        step: InstructionStepName;
        title: string;
        description: string;
      }[];
    };
  };
};

export type Wallet<C extends Connector = Connector> = {
  id: string;
  name: string;
  shortName?: string;
  iconUrl: string | (() => Promise<string>);
  iconBackground: string;
  installed?: boolean;
  downloadUrls?: {
    android?: string;
    ios?: string;
    browserExtension?: string;
    qrCode?: string;
  };
  createConnector: () => RainbowKitConnector<C>;
};

export type WalletList = { groupName: string; wallets: Wallet[] }[];

export type WalletInstance = Omit<Wallet, 'createConnector'> &
  ReturnType<Wallet['createConnector']> & {
    index: number;
    groupName: string;
    walletConnectModalConnector?: Connector;
  };
