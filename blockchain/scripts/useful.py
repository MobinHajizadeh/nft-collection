from brownie import accounts, config, network


def get_account(index=0):
    if index:
        return accounts[index]
    if network.show_active() in ["development", "ganache-local"]:
        return accounts[index]
    return accounts.add(config["wallets"]["from_key"])
