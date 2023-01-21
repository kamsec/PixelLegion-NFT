
# PixelLegion 

## Summary:
This repository contains source files of PixelLegion NFT project on Polygon blockchain. \
It was created using:
- Python3.8 (PIL, pandas), Pinata
- Solidity (Brownie, solc)
- JavaScript (React, useDapp, MaterialUI)

You can view it at:
- https://kamsec.github.io/PixelLegion-NFT/
- https://polygonscan.com/address/0xc50BC666462CbFc5Bf2EFD2e329E2A1154e8fd15
- https://opensea.io/collection/pixellegion

List of contents:
1. <a href="#1-image-generation">Image generation</a>
2. <a href="#2-smart-contract">Smart contract</a>
3. <a href="#3-front-end">Front-end</a>

If you want to create your own NFT project basing on files from this repo, the following instructions might be helpful.
## Instructions

### 1. Image generation 
For this part we assume to be in `/PixelLegion-1-image-generation/` folder.
1. Create assets for your NFT images in graphics editor (Photoshop, Gimp, or similar)
    - You typically want to have every asset on separate layer with transparent background.
    - OpenSea recommends 350x350 image size, but you can create assets in for example 25x25 size and rescale images later with python.
    - I have chosen to use only few colors, to make it easy to pick the single color with python and randomize it.
    - It is important at this point to group assets into folders and give them names that you want to be displayed as OpenSea NFT attributes - you will save a lot of work later.
    - You can find the example in `psd_project/`
2. Export the assets to folders with tool like <a href="https://github.com/antipalindrome/Photoshop-Export-Layers-to-Files-Fast">Photoshop-Export-Layers-to-Files-Fast</a>. Note that there is option to save layers groups as directories. The result should be similar to `input/Assets/`
3. Install the required packages 
    ```
    pip install Pillow 
    pip install numpy
    pip install pandas
    pip install requests
    ```
4. Generate the images with `generate.py`
    - Put your assets into `input/Assets/`
    - Set `assets` dict to fit your folders and assets names (dict keys and first elements of the lists), adjust probabilities (second element of the lists) and set third element to `'path/'` (it's just a placeholder)
        ```python
        assets = {'Body': [['Latin', 'Catalan', 'Aethiopian'], [60, 20, 20], 'path/'],
                  ...}
        ```
    - If `assets` dict will differ from `input/Assets/` structure, then during assets paths initialization an error will be raised - follow the displayed message to find the differences and fix them.
    - `color-palette` is a dictionary of colors that can replace chosen colors of your assets. You can find more colors at <a href="https://www.rapidtables.com/web/css/css-color.html">https://www.rapidtables.com/web/css/css-color.html</a>
        ```python
        color_palette = {'Crimson': [220, 20, 60, 255],
                         ...}
        ```
    - In `color-palette` the fourth value `255` is just non-transparency in RGBA
    - In `generate()` function adjust names and dictionaries to your needs. You can control the order of pasting layers by changing arguments to `.paste` method.
    - I needed to replace only single color in all assets for single image, so I did it with simple:
        ```python
        if list(soldier_pix[i, j]) == [201, 13, 13, 255]:
            soldier_pix[i, j] = color_rgba
        ```
        In similar way you can replace more colors of your choice.
    - In `main()` function you should generate all images with different seeds and ensure that there are no duplicates.
    - Set the column names in dataframe. They will be later used for creation of metadata.
    - The result images will be saved in `output/img/` and data for every image in `output/data.csv`
5. Create metadata for images and upload them to IPFS with `upload.py`.
    - You could also store images and metadata on your server, but solutions like IPFS or arweave are preferred for NFT projects. I have chosen Pinata as IPFS pinning service - you can host there few projects for free.
    - Create `secrets.ini` which should look like:
        ```
        [DEFAULT]
        PINATA_API_KEY = ***
        PINATA_API_SECRET = ***
        ```
       and in place of `***` placeholders provide your API keys from Pinata.
    - In `main()` function set `metadata['description']` to description of each NFT.
    - As IPFS hash format I used CIDv1 because it works with Firefox and <a href="https://addons.mozilla.org/pl/firefox/addon/ipfs-companion/">IPFS companion</a> by just entering `ipfs://` and hash in browser, e.g. <a href="ipfs://bafkreicheibnu6bapmyroqmaauqbomc53xbg2imvqmcwn2fwustmmr6oby">ipfs://bafkreicheibnu6bapmyroqmaauqbomc53xbg2imvqmcwn2fwustmmr6oby</a>
    - `main()` function from `upload.py` will upload all images listed in `output/data.csv`, create metadata for them using `input/template_metadata.json` as template, and upload them as well. Metadata and urls will be saved in `output/data_uploaded.csv`.
    - Example uploaded metadata:
    <a href="https://ipfs.io/ipfs/bafkreicheibnu6bapmyroqmaauqbomc53xbg2imvqmcwn2fwustmmr6oby/">https://ipfs.io/ipfs/bafkreicheibnu6bapmyroqmaauqbomc53xbg2imvqmcwn2fwustmmr6oby/</a>
    which contains `image` key, with value:
    <a href="https://ipfs.io/ipfs/bafkreidswhjpq6glbsq6jfa3j6qxsess7d3kqpqmxwbkrkbq6hv6vxgeo4/">https://ipfs.io/ipfs/bafkreidswhjpq6glbsq6jfa3j6qxsess7d3kqpqmxwbkrkbq6hv6vxgeo4/</a>
    - Metadata in this format is supported by OpenSea, if you use it later in smart contract as tokenURI, the NFT properties will be displayed correctly which you can check by clicking at properties button at 
    <a href="https://opensea.io/assets/matic/0xc50bc666462cbfc5bf2efd2e329e2a1154e8fd15/19">https://opensea.io/assets/matic/0xc50bc666462cbfc5bf2efd2e329e2a1154e8fd15/19</a>
    - You can find functions for creating banners, smaller images, and unpinning everything at once from pinata in case of mistake in `utils.py`

### 2. Smart contract
For this part we assume to be in `/PixelLegion-2-smart-contract/` folder.
1. Create your ERC-721 (or ERC-1155) smart contract. There are numerous tutorials for Solidity and NFT contracts, I recommend:
    - https://www.youtube.com/watch?v=M576WGiDBdQ
    - https://www.youtube.com/watch?v=p36tXHX1JD8
    - IMO you can skip parts about VRFs (Verifiable Random Functions) because it's an overkill for simple NFT projects (complicates stuff a lot, requires paid LINK tokens, and I haven't seen any NFT projects actually using it)
    
2. If you already went through some tutorials you can find source code of my smart contract at `contracts/PixelLegionMarket.sol`, I deployed it using the following steps:
    - Install <a href="https://eth-brownie.readthedocs.io/en/stable/">Brownie</a> for easy deployment.
    - Use `solc` for Solidity compilation.
    - Create `.env` file with the following content:
        ```
        PRIVATE_KEY=***
        POLYGONSCAN_TOKEN=***
        ```
        Replace `***` for PRIVATE_KEY variable with private key of account for deploying contracts for example exported from metamask.
        Replace the second `***` with your api token from polygonscan (for contract source code publishing). At this time same api key works both for Mumbai and Polygon mainnet.
    - Add Mumbai testnet network for testing and deploy at Polygon blockchain for lowest fees.
    - You can deploy the contract with
        ```
        brownie run scripts/deploy.py --network polygon-mainnet
        ```
    - If source code publishing encounters some error, you can always try again with `scripts/publish_source.py`
    - Note that this contract allows to place and accept the offers on the blockchain, without participation of third party. However, OpenSea doesn't track custom function executions, so volume traded "on chain" using this functionality is not counted as volume traded displayed on OpenSea. This means that OpenSea only counts volume traded caused by using their website for trading (which means using their smart contracts under the hood), which basically kills the idea of decentraliztion.

### 3. Front-end
For this part we assume to be in `/PixelLegion-3-front-end/` folder.
- I decided to not make separate database since it is only 100 images. For larger projects you might want to make one.
- I was using `React` with `useDapp` and `MaterialUI`. For React and MaterialUI theres a lot of tutorials online, and for useDapp you can learn the basics at Lesson 13 of <a href="https://www.youtube.com/watch?v=M576WGiDBdQ">https://www.youtube.com/watch?v=M576WGiDBdQ</a>
- The website is hosted on github-pages with the help of <a href="https://github.com/rafgraph/spa-github-pages">spa-github-pages</a>
- As it was my first project in React, you can probably look at front-end source code e.g. for references on how to work with useDapp, but other than that, relying only on it might not be the best idea :)

