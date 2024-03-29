export const mockDefaultTokenMeta = {
  chainID: '00000001',
  chainName: 'Lisk',
  tokenID: '0400000000000000',
  description: 'Default token for the entire Lisk ecosystem',
  logo: {
    png: 'https://lisk-qa.ams3.digitaloceanspaces.com/Artboard%201%20copy%2019.png',
    svg: 'https://lisk-qa.ams3.digitaloceanspaces.com/Logo-20.svg',
  },
  symbol: 'LSK',
  displayDenom: 'lsk',
  baseDenom: 'beddows',
  denomUnits: [
    {
      denom: 'beddows',
      decimals: 0,
      aliases: ['Beddows'],
    },
    {
      denom: 'lsk',
      decimals: 8,
      aliases: ['Lisk'],
    },
  ],
};

export const mockTokensMeta = [mockDefaultTokenMeta];
