import { useEffect, useState } from 'react';
import { shortenIfAddress, useEthers } from '@usedapp/core';
import Button from '../Button/Button';
import Mint from '../Mint/Mint';

export default function Account() {
	const { activateBrowserWallet, account, library } = useEthers();
	const [ens, setEns] = useState<string | null | undefined>(null); // handle ens domains
	const [newTransaction, setNewTransaction] = useState<string | undefined>(
		undefined
	);

	// handle ens domains
	useEffect(() => {
		const isEns = async () => {
			if (account && library) {
				const _ens = await library?.lookupAddress(account);
				setEns(_ens);
			}
		};

		isEns();
	}, [account, library]);

	const formatAddress = () => {
		return ens ?? shortenIfAddress(account);
	};

	const _handleUpdate = (_newTransaction: string) => {
		setNewTransaction(_newTransaction);
	};

	return (
		<div>
			{!account ? (
				<>
					<Button text='Connect Wallet' onClick={activateBrowserWallet} />
					<p>Ensure that you are connected to Rinkeby network!</p>
				</>
			) : (
				<>
					<p className='text'>Connected: {formatAddress()}</p>
					<Mint handleUpdate={_handleUpdate} />
				</>
			)}
		</div>
	);
}
