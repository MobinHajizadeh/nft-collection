import { useMemo } from 'react';
import { Contract } from '@ethersproject/contracts';
import { useEthers } from '@usedapp/core';
import { AddressMap } from '../constants/addresses';

const useContract = <T extends Contract = Contract>(
	addressMap: AddressMap,
	ABI: any
): T | null => {
	const { library, chainId } = useEthers();

	return useMemo(() => {
		if (!addressMap || !ABI || !chainId) return null;
		const address: string = addressMap[chainId];
		if (!address) return null;
		try {
			const contract: Contract = new Contract(address, ABI, library);
			return contract;
		} catch (error) {
			console.error(error);
			return null;
		}
	}, [addressMap, ABI, library, chainId]) as T;
};

export default useContract;
