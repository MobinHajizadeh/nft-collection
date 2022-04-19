import { useState } from 'react';
import { JsonRpcSigner } from '@ethersproject/providers';
import { getExplorerTransactionLink, useEthers } from '@usedapp/core';
import useContract from '../../hooks/useContract';
import { NFT_ADDRESSES } from '../../constants/addresses';
import ABI from '../../abis/BAYC.abi.json';
import { BAYCAbi } from '../../abis/types';
import Button from '../Button/Button';
import image from '../../assets/images/BAYC.png';
import './Mint.css';

interface MintProps {
	handleUpdate: Function;
}

export default function Mint(props: MintProps) {
	const contract = useContract<BAYCAbi>(
		NFT_ADDRESSES,
		ABI
	);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [txHash, setTxHash] = useState<string | undefined>(undefined);
	const { library, chainId } = useEthers();

	const mint = async () => {
		const signer: JsonRpcSigner | undefined = library?.getSigner();

		if (signer) {
			const tx = await contract
				?.connect(signer)
				.newRandomCharacter();

			if (chainId && tx) {
				setIsDisabled(true);
				const link = getExplorerTransactionLink(tx?.hash, chainId);
				setTxHash(link);
			}

			await tx?.wait();
			props.handleUpdate(tx?.hash);

			setIsDisabled(false);
			setTxHash(undefined);
		}
	};

	return (
		<div>
			<img className='image' src={image} alt='nft' />
			<Button
				text='Mint NFT'
				onClick={mint}
				onClickParams={'Elf'}
				isDisabled={isDisabled}
			/>
			<div>
				<a href={txHash} target='_blank' rel='noreferrer'>
					{txHash}
				</a>
			</div>
		</div>
	);
}
