
This folder contains project files of graphical assets and python scripts used for generation of this project NFT images. Also contains scripts for generating metadata from assets names, and uploading images/metadata to ipfs via Pinata.

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