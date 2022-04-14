from brownie import config, network, NFTCollection
from scripts.useful import get_account

ACCOUNT = get_account()


def deploy_collection():
    nft = NFTCollection.deploy(
        config["networks"][network.show_active()]["vrf_coordinator"],
        config["networks"][network.show_active()]["key_hash"],
        config["networks"][network.show_active()]["subscription_id"],
        config["networks"][network.show_active()]["call_back_gas_limit"],
        config["networks"][network.show_active()]["num_words"],
        config["networks"][network.show_active()]["requested_confirmations"],
        {"from": ACCOUNT},
        publish_source=True,
    )
    return nft


def main():
    collection = deploy_collection()
    print(f"Deployed to {collection} !")
