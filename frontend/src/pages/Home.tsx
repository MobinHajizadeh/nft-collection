import { useEthers } from '@usedapp/core';
import Account from '../components/Account/Account';
import logo from '../assets/images/bayc-logo.webp';
import rarible from '../assets/images/rarible.png';
import opensea from '../assets/images/opensea.jpeg';
import './Home.css';

export default function Home() {
    const { active } = useEthers();

    return (
        <div className='home'>
            <img className='logo' src={logo} alt='nft' />
            {!active ? (
                <>
                    <p className='text'>Error Page</p>
                </>
            ) : (
                <Account />
            )}
            <div>
                <a href="https://rinkeby.rarible.com/collection/0xaee557a9f176d7b3d090f9423ea8418c036d300b/items" target="_blank">
                    <img className='footer' src={rarible} />
                </a>
                <a href="https://testnets.opensea.io/collection/boredapeyachtclub-jj0axuvrpl" target="_blank">
                    <img className='footer' src={opensea} />
                </a>
            </div>
        </div>
    );
}
