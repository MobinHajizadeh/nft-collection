import { ChainId } from '@usedapp/core';

export type AddressMap = { [chainId: number]: string };

export const NFT_ADDRESSES: AddressMap = {
	[ChainId.Rinkeby]: '0xaeE557a9f176D7B3D090f9423Ea8418c036D300b',
};
