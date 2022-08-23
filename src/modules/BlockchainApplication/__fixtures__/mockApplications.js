import { mockDefaultApplication } from './mockDefaultApplication';

export const mockApplications = [
  mockDefaultApplication,
  {
    name: 'Coleti',
    chainID: 2,
    title: 'Coleti',
    description: 'A Lisk-based NFT marketplace',
    network: 'mainnet',
    isDefault: false,
    genesisBlock:
      'https://downloads.coleti.com/lisk/mainnet/genesis_block.json.tar.gz',
    apis: [{
      rest: 'https://service.coleti.com',
      rpc: 'wss://service.coleti.com',
    }, {
      rest: 'https://service2.coleti.com',
      rpc: 'wss://service2.coleti.com',
    }],
    explorers: ['https://coleti.observer', 'https://explorer.coleti.io'],
    images: {
      logo: {
        png: 'https://lisk.com/sites/default/files/2022-02/colecti-logo.jpeg', // URL
        svg: '', // URL
      },
      background: '#FFFFFF1A', // URL
    },
    state: 'terminated',
    deposited: 8712312,
  },
  {
    name: 'DoEdu',
    chainID: 3,
    title: 'DoEdu',
    description: 'An educational platform built with Lisk SDK',
    network: 'mainnet',
    isDefault: false,
    genesisBlock:
      'https://downloads.lisk.com/lisk/mainnet/genesis_block.json.tar.gz',
    apis: [{
      rest: 'https://service.doedu.com',
      rpc: 'wss://service.doedu.com',
    }],
    explorers: ['https://doedu.observer', 'https://explorer.doedu.io'],
    images: {
      logo: {
        png: 'https://lisk.com/sites/default/files/2022-02/doedu-logo.jpg', // URL
        svg: '', // URL
      },
      background: '#FFFFFF1A', // URL
    },
    state: 'active',
    deposited: 4872312,
  },
  {
    name: 'Enevti',
    chainID: 4,
    title: 'Enevti',
    description: 'A decentralized social media NFT platform',
    network: 'mainnet',
    isDefault: false,
    genesisBlock:
      'https://downloads.enevti.com/lisk/mainnet/genesis_block.json.tar.gz',
    apis: [{
      rest: 'https://service.enevti.com',
      rpc: 'wss://service.enevti.com',
    }],
    explorers: ['https://enevti.observer', 'https://explorer.enevti.io'],
    images: {
      logo: {
        png: 'https://lisk.com/sites/default/files/2022-02/enevti-logo.png', // URL
        svg: '', // URL
      },
      background: '#FFFFFF1A', // URL
    },
    state: 'registered',
    deposited: 4875312,
  },
  {
    name: 'Kalipo',
    chainID: 5,
    title: 'Kalipo',
    description: 'A platform to support Decentralized Autonomous Organizations (DAOs)',
    network: 'mainnet',
    isDefault: false,
    genesisBlock:
      'https://downloads.lisk.com/lisk/mainnet/genesis_block.json.tar.gz',
    apis: [{
      rest: 'https://service.lisk.com',
      rpc: 'wss://service.lisk.com',
    }],
    explorers: ['https://lisk.observer', 'https://explorer.lisk.io'],
    images: {
      logo: {
        png: 'https://lisk.com/sites/default/files/2022-07/Kalipo.jpg', // URL
        svg: '', // URL
      },
      background: '#FFFFFF1A', // URL
    },
    state: 'active',
    deposited: 4875312,
  },
];

export const mockMappedApplications = mockApplications.reduce(
  (obj, val) => {
    obj[val.chainID] = val;
    return obj;
  },
  {}
);