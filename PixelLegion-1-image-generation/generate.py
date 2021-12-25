import numpy as np
import pandas as pd
import random
from PIL import Image
import os

# CONFIG
pd.set_option('display.max_rows', 1000)
pd.set_option('display.max_columns', 20)
pd.set_option('display.width', 1000)

input_dir = 'input'
output_dir = 'output'
data = []

# [[names] [probabilities] [path]]
assets = {'Body': [['Latin', 'Catalan', 'Aethiopian'], [60, 20, 20], 'path/'],  # 'path/' is a placeholder
          'Shield': [['Scutum', 'Wooden', 'Steel'], [20, 30, 30], 'path/'],
          'Scutum': [['Bars', 'Marks'], [50, 50], 'path/'],  # all directories written separately, not Shield/Scutum etc
          'Wooden': [['Cross', 'V-mark'], [50, 50], 'path/'],
          'Steel': [['War Symbol', 'Bars'], [50, 50], 'path/'],
          'Weapon': [['Sword', 'Pike', 'Halberd', 'Trident', 'Axe', 'Mace'], [25, 18, 17, 10, 15, 15], 'path/'],
          'Helmet': [['Soldier', 'Horned', 'Centurion'], [40, 35, 25], 'path/']}

# initialize 'path/'s in assets dict
for root, dirs, files in os.walk(f'{input_dir}\\Assets'):
    current_folder = root.split('\\')[-1]
    if current_folder in assets.keys():
        assets[current_folder][2] = root
        # error check
        expected_files = [x + '.png' for x in assets[current_folder][0]]
        if set(files) != set(expected_files):
            raise Exception(f'In {root} expected {expected_files} but found {files}! Inspect assets dict and files.')

color_palette = {'Crimson': [220, 20, 60, 255],
                 'DarkRed': [139, 0, 0, 255],
                 'Medium Violet Red': [199, 21, 133, 255],
                 'Orange Red': [255, 69, 0, 255],
                 'Gold': [255, 215, 0, 255],
                 'Golden Rod ': [218, 165, 32, 255],
                 'Olive Drab': [107, 142, 35, 255],
                 'Dark Magenta': [139, 0, 139, 255],
                 'Dark Green': [0, 100, 0, 255],
                 'Royal Blue': [65, 105, 225, 255],
                 'Navy': [0, 0, 128, 255],
                 'Black': [0, 0, 0, 255]}


def generate(x):
    # INITIALIZATION
    name = f'PixelLegion #{x}'

    # 1st layer items
    items = {'Body': random.choices(assets['Body'][0], assets['Body'][1], k=1)[0],
             'Weapon': random.choices(assets['Weapon'][0], assets['Weapon'][1], k=1)[0],
             'Helmet': random.choices(assets['Helmet'][0], assets['Helmet'][1], k=1)[0],
             'Shield': random.choices(assets['Shield'][0], assets['Shield'][1], k=1)[0],
             }

    # 2nd layer items (items that depend on other items)
    items['Shield Pattern'] = random.choices(assets[items['Shield']][0], assets[items['Shield']][1], k=1)[0]  # noqa

    # IMAGE
    items_img = {'Body': Image.open(f"{assets['Body'][2]}\\{items['Body']}.png").convert('RGBA'),
                 'Weapon': Image.open(f"{assets['Weapon'][2]}\\{items['Weapon']}.png").convert('RGBA'),
                 'Helmet': Image.open(f"{assets['Helmet'][2]}\\{items['Helmet']}.png").convert('RGBA'),
                 'Shield': Image.open(f"{assets['Shield'][2]}\\{items['Shield']}.png").convert('RGBA'),
                 'Shield Pattern': Image.open(f"{assets[items['Shield']][2]}\\"
                                              f"{items['Shield Pattern']}.png").convert('RGBA')
                 }

    # order of pasting layers is different than items.keys()
    soldier_img = items_img['Body']
    soldier_img.paste(items_img['Helmet'], (0, 0), items_img['Helmet'])
    soldier_img.paste(items_img['Shield'], (0, 0), items_img['Shield'])
    soldier_img.paste(items_img['Shield Pattern'], (0, 0), items_img['Shield Pattern'])
    soldier_img.paste(items_img['Weapon'], (0, 0), items_img['Weapon'])

    soldier_pix = np.array(soldier_img)

    items['Color'] = random.choice(list(color_palette.keys()))
    color_rgba = color_palette[items['Color']]
    for i in range(soldier_pix.shape[0]):
        for j in range(soldier_pix.shape[1]):
            if list(soldier_pix[i, j]) == [201, 13, 13, 255]:
                soldier_pix[i, j] = color_rgba
    soldier_img_coloured = Image.fromarray(soldier_pix)
    soldier_img_coloured = soldier_img_coloured.resize((350, 350), resample=Image.NEAREST)
    soldier_img_coloured.save(f"{output_dir}/img/{name}.png")

    data.append([name, *items.values()])
    return data


def main():
    seed = 6595
    # seed = random.randint(1, 10000)  # 6595
    random.seed(seed)

    amount_to_generate = 100
    for x in range(0, amount_to_generate):
        data = generate(x)  # noqa
        # print(f'{data[x - 1][0]} created!')

    df = pd.DataFrame.from_records(data=data,  # noqa
                                   columns=['Name', 'Body',  'Weapon', 'Helmet', 'Shield', 'Shield Pattern', 'Color'],
                                   index='Name')

    test_df = df[['Body', 'Shield', 'Shield Pattern', 'Weapon', 'Helmet', 'Color']].copy()
    duplicates = test_df[test_df.duplicated()].shape[0]

    if duplicates != 0:
        print(f'Failed! Found duplicates: {duplicates}')
        return False
    else:
        print(f'SUCCESS! Found seed for which there is no duplicates! {seed}')
        df.to_csv(f"{output_dir}/data.csv")  # noqa
        return True


if __name__ == '__main__':
    found_unique = False
    while found_unique is False:
        found_unique = main()
        data = []
