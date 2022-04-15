from brownie import NFTCollection
import json
from metadata.ipfs_images import images
from metadata.ipfs_uris import add_uri
import os
import requests

BAYC = NFTCollection[-1]

TEMPLATE = {
    "tokenId": 0,
    "name": "BAYC#",
    "description": "",
    "image": "ipfs://",
    "attributes": [
        {
            "trait_type": "background",
            "value": 0
        },
        {
            "trait_type": "clothes",
            "value": 0
        },
        {
            "trait_type": "eyes",
            "value": 0
        },
        {
            "trait_type": "fur",
            "value": 0
        },
        {
            "trait_type": "hat",
            "value": 0
        },
        {
            "trait_type": "mouth",
            "value": 0
        }
    ]
}


def generate_uri(token_id, image_ipfs_hash):
    metadata = TEMPLATE.copy()
    metadata["tokenId"] = token_id
    metadata["name"] += str(token_id)
    metadata["image"] += image_ipfs_hash

    trait = BAYC.characters(token_id)

    for i in range(6):
        metadata["attributes"][i]["value"] = trait[i]

    return metadata, token_id


def generate_json(metadata, token_id):
    os.chdir("metadata/uri_json")
    with open(f"BAYC_{token_id}.json", 'w') as outfile:
        json.dump(metadata, outfile)


def upload_to_ipfs(file):
    files = {
        "file": (open(file)),
    }

    response = requests.post(
        "https://ipfs.infura.io:5001/api/v0/add", files=files)

    p = response.json()
    hash = p["Hash"]

    print(f"File uploaded to IPFS!\nHASH: {hash}")
    return hash


def read_from_ipfs(hash):
    params = (("arg", hash),)

    response = requests.post(
        "https://ipfs.infura.io:5001/api/v0/cat",
        params=params,
    )

    print(response.text)


def main():
    for id, image in enumerate(images):
        m, t = generate_uri(id, image)
        generate_json(m, t)
        hash = upload_to_ipfs(f"BAYC_{id}.json")
        add_uri(hash)
        os.chdir("../..")
