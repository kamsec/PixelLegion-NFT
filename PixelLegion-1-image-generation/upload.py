
import requests
import configparser
import json
import pandas as pd

pd.set_option('display.max_rows', 20)
pd.set_option('display.max_columns', 20)
pd.set_option('display.width', 1000)

cfg = configparser.ConfigParser()
cfg.read('secret.ini')

pinata_base_url = 'https://api.pinata.cloud/'
endpoint_image = "pinning/pinFileToIPFS"
endpoint_metadata = 'pinning/pinJSONToIPFS'

pinata_headers = {"pinata_api_key": cfg['DEFAULT']['PINATA_API_KEY'],
                  "pinata_secret_api_key": cfg['DEFAULT']['PINATA_API_SECRET']}


def main():
    df = pd.read_csv('output/data.csv', index_col='Name')
    df['image_url'] = None
    df['metadata'] = None
    df['metadata_url'] = None

    for name, row in df.iterrows():
        num_index = name.split("#")[1]
        filename = name + '.png'
        image_path = 'output/img/' + filename
        with open(image_path, "rb") as f:
            image_binary = f.read()

        response = requests.post(url=pinata_base_url + endpoint_image,
                                 files={"file": (filename, image_binary)},
                                 data={'pinataOptions': json.dumps({'cidVersion': 1})},
                                 headers=pinata_headers)
        # row['image_url'] = 'http://my_image_url' + str(index)
        row['image_url'] = "ipfs://" + response.json()['IpfsHash']

        with open('input/template_metadata.json') as f:
            metadata = json.load(f)
        metadata['name'] = name
        metadata['description'] = f'This is Legionary #{num_index} out of 100. ' \
                                  f'PixelLegion is the NFT collection on the Polygon blockchain. ' \
                                  f'Each of these 100 Legionaries has attributes that make them unique' \
                                  f' according to a defined rarity system.'
        metadata['image'] = row['image_url']
        for i, k in enumerate(row[:-3]):  # skipping 'image_url' 'metadata' 'metadata_url'
            metadata['attributes'][i]['value'] = k
        row['metadata'] = metadata

        pinata_json_metadata = {**{'pinataContent': row['metadata']},
                                **{'pinataMetadata': {'name': name + '.json'}},
                                **{'pinataOptions': {'cidVersion': 1}}}  # merging dicts
        response = requests.post(url=pinata_base_url + endpoint_metadata,
                                 json=pinata_json_metadata,
                                 headers=pinata_headers)
        # row['metadata_url'] = 'http://my_metadata_url' + str(index)
        row['metadata_url'] = "ipfs://" + response.json()['IpfsHash']
        print(f"{name} uploaded! img: {row['image_url']}  json: {row['metadata_url']}")

    df.to_csv('output/data_uploaded.csv')

if __name__ == '__main__':
    main()
