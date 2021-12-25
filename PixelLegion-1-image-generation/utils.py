# this file contains various utils functions that were used for 2-smart-contract and 3-front-end

import requests
import random
import configparser
import pandas as pd
from PIL import Image

# unpins all that are listed in file output/data_uploaded.csv
def unpin_all_from_pinata():
    cfg = configparser.ConfigParser()
    cfg.read('secret.ini')

    pinata_base_url = 'https://api.pinata.cloud/'
    endpoint_unpin = 'pinning/unpin/'

    pinata_headers = {"pinata_api_key": cfg['DEFAULT']['PINATA_API_KEY'],
                      "pinata_secret_api_key": cfg['DEFAULT']['PINATA_API_SECRET']}

    df = pd.read_csv('output/data_uploaded.csv', index_col='name')
    for name, row in df.iterrows():
        print(f'Found {name} {row}')
    x = input('Type Y to delete last uploads from pinata')
    if x != 'Y':
        exit()
    for name, row in df.iterrows():
        hash_to_unpin = row['metadata_url'].replace("ipfs://", '')
        response = requests.delete(url=pinata_base_url + endpoint_unpin + hash_to_unpin,
                                   headers=pinata_headers)
        print(row['metadata_url'], response.status_code)
        hash_to_unpin = row['image_url'].replace("ipfs://", '')
        response = requests.delete(url=pinata_base_url + endpoint_unpin + hash_to_unpin,
                                   headers=pinata_headers)
        print(row['metadata_url'], response.status_code)
# unpin_all_from_pinata()

# generates array for smart contract, for easy copy paste to .sol file
def get_all_ipfs_hashes():
    df = pd.read_csv('output/data_uploaded.csv', index_col='Name')
    ipfs_hashes = []
    for name, row in df.iterrows():
        ipfs_hashes.append(row['metadata_url'])
    print("[", end="")
    for i, x in enumerate(ipfs_hashes, start=1):
        if i < len(ipfs_hashes):
            print('"' + x.split("//")[1] + '",')
        else:
            print('"' + x.split("//")[1] + '"]')

    # result is the array to be copy pasted to solidity smart contract
    stringaaapublicatokenURIs = ["bafkreidd5wicfkfhu6fdfltvdez7u2ejkf76dpceg3nuxwtxokxnoe3enu",
                                 "bafkreigx6s4pd33aq3ouirc4kurg7jniljmti2atcefhjjshts6l353tna",
                                 "bafkreigj4o7fhf3rpeeripddis6gj4z3zhjwebghljrl6qgyv5nw3nmgcm",
                                 "bafkreie7mghkfasfr6vubgsrmo6itiiey66ejty46hwkie335isavtjd6y",
                                 "bafkreih4bmob46curubnkljimfcxayrc7wvasxruewywdp4t24n5dkihke",
                                 "bafkreicnopka6zjezltc47qhtipuj3b6m4m6lxvdjla43zwbg2yz24366u",
                                 "bafkreicgrxag4cda5iht624fwkuakou6zphjib24vp64ouupcko45c2rne",
                                 "bafkreiauwgav3wxfiqlxrmw26fnkfw3tufr5jagcgkijhgla2ibb4rinjq",
                                 "bafkreicsn6spixb7zckonte5klteg6leneiy5diy2vf24w33tyaki7wg4q",
                                 "bafkreihcg7mqjoraduoyqmyv3aryvxa3cchnronofe4vocehfd3raxd3wq",
                                 "bafkreihhi22eosl73ozyntuzanaurvuhc66u7llt4247rji32ddwhij2z4",
                                 "bafkreigojjnp45yiioseghfnwcvmoh52dgob26dzowwapntobt7evxbjqu",
                                 "bafkreigbzkpdkg5msifi3zgtcvrdph22guneqkcdjr6myfomukw35w4zpi",
                                 "bafkreievjn5yrednc7pfuvhcxlhe6lekcj3e6mstwfsn2dor3opqud2cd4",
                                 "bafkreidlomod3vw2ts7jvzcvx6x2zk4d322fiptnjoghriixzqoskmb7iy",
                                 "bafkreift6bmq2sc3ud66mo6nfsoocgtgh2lo625om4ikog53dc56szwgxa",
                                 "bafkreidlpthl53mywz46twcngmsblve7fkbcvne4zxqgbsjkgvfw4kl5ca",
                                 "bafkreihhqsjpxht4x33ztqymz54liidb57gf3ohqfrywdygkvc6xdelcxy",
                                 "bafkreibjxdt5xp2dqx4yla2oputvni7vh63tc672gwuogcvv645p5p2p5m",
                                 "bafkreicheibnu6bapmyroqmaauqbomc53xbg2imvqmcwn2fwustmmr6oby",
                                 "bafkreif7ce7555dqhklzgy5lpb6rmdodkjkghkq5jpo4xacshxntlvzb2m",
                                 "bafkreifdq3y6xeoz6zbu6ab5vfotgj3a5jluem33qlaevdxwvthuh4v2ju",
                                 "bafkreie45quieseivy4xxfhdfdc3pu3ymlfmvulu7qx3z6vtgttd2lwqcu",
                                 "bafkreicahir3n7mw2ugqohnuw7h42ipiaidv5fgf6zsx4m6hig3bb2dqra",
                                 "bafkreigatz5u33he4akuxxggvtdwc3yghuadpy2ajyfj63o2ooulq7zjy4",
                                 "bafkreiegf2e5svhofecurs6gtrbdckojhjcg4vx57oa6ooakcesubrzrhu",
                                 "bafkreic33yhxunkqfve6kptc2grwlagcpa2ylw7xgtmjnkfusc7vogp7qi",
                                 "bafkreih6x3v5tdsh5xxmjrr3euf7mcf2lhuo3fhffzlsu3u6qgacij66a4",
                                 "bafkreieed4kvmzigrgpy52qbjxvfspojmch4be4vr264va6gnzs2mmlrtm",
                                 "bafkreifgwe7tyg4njmhmnjhjervxtoogqhqjjz4igfqunwndypatabe3ci",
                                 "bafkreicquhk3odgywkzputezwenun77rbtxtezvuzrac4tbrdazydpsssq",
                                 "bafkreiffjjq3yx2grjxeitdnwlkm6f2f6wl4ji336yl3dnsnvpg5go3hzi",
                                 "bafkreigmwbpakrzkmyfoe7y2yxvp2unohsqhodpwygdcpyclu7ugihy6yi",
                                 "bafkreihnqdwowzgfd3uq4tv272srfzoau3rl4hdvwa4vi6pftist54wo34",
                                 "bafkreicwppdyhw7ruy36fvxy3e5y3ll3nxh6dnbkvl63l6fi5xxpvronmu",
                                 "bafkreihwsew43iwvjqdrg6hgpescidqyatgm5wiux6h2smt5jvi6iun3x4",
                                 "bafkreidckjpyjovz2i7jae6lz6ruzs7rsoe35pivvweswddy5bi3e6ra3e",
                                 "bafkreihydvxw76plcmelldmegrnegcx6cczv3dw3m2jvie6hmmketrwlv4",
                                 "bafkreibbpyt2rkxemljfi4sb4mq2mx5gy4prcx3gutgjahqifk6vqlbkgu",
                                 "bafkreia4oyxvf3c3eoa4odanjufp5sfnijh4lrxgbbdcnogbny4yd3yzzq",
                                 "bafkreib2diz2olqua7x7zfrice7gr3vq4hc6pjmtldpo6ptujuc6vfwxy4",
                                 "bafkreidg25dqfge5jxpjv5rlkqq2rjvigvcuc64q2fmmuxpbpu3trftpke",
                                 "bafkreiga526stfvj4es2ydau3iq5r3onxrxh37asn22rektazw25viqi4e",
                                 "bafkreigguhr5d5g7z2xoo6iigc5nxkb6zkpfu5fl5keuu3k53azc2knzc4",
                                 "bafkreifjp6smwm22ewwfa2snusw5ovougiep7r7253b2xm7vfadi7u57bu",
                                 "bafkreih4shpxknggz2josgibtzs7fpzm35weyqhppqqu76ss2ks6545iwe",
                                 "bafkreibjjayd6wu7ubqadynclq2lz57cngoam4jycfd5g7c7m5dvm6ji5e",
                                 "bafkreidels44wp7eucikpmafrd5qqhs5aivk7oijj6n2xprr355jihuite",
                                 "bafkreigzibunudyp5mwkql6w2oio23h3d6ycu37gqum25apihdpj6gzkgm",
                                 "bafkreifemaf6ns2roh4uqwgiytxr45owiiozye3lhdtz2dmtuh2jpszjdm",
                                 "bafkreiht5zurksmprtsutmkz4hvawblnddgo7ala3zm2tcbjgvdff5srui",
                                 "bafkreicti6vik7ynan2l66ludodgejfdeflo4qku76c5b2o3nql2vtgrem",
                                 "bafkreifpu3i55quj3iug3rzny7jqz7y5l7qzeuneor3disqfmi2qnlhqwq",
                                 "bafkreidmbhqyldeknlmhdemfhd5tlql4azltnf2lhtekwcks3xikjp7mxq",
                                 "bafkreihewnyoe7cpdm24laplk26c4ucjnnqqphq5szbfy4tpegojsr2gp4",
                                 "bafkreifsu3zm56hfqyzhvxbya6jcf44sz6luxzzobashrofigz6slq6wqa",
                                 "bafkreiartcafjj7datr44hp2kvhd4lvoumtxvu7pp6g7cyujyc6kqubjqm",
                                 "bafkreihkuxwcygclabt24fjd35zynina5qdekovew4owaev3ca74gxn6p4",
                                 "bafkreid2ogdwxsgkyh4f635t2772xpnci5iy4n6nsyvlgzo6wqhyj363oe",
                                 "bafkreiay4bz5wlhbwsps2rd2l6zg3k63ixiii3qjxjedytzi2y2zx5ngrq",
                                 "bafkreifplyeb55ky3c45sahj7bbuox3vtodg7ae6h57qblaswq5eftkeeu",
                                 "bafkreicrfxcjfegobx4u4w5khq7jywsmw5c3yksmqqnozrnhufvbgcd4su",
                                 "bafkreih2cjglw4kr6huxmejormfkvbapp3wn7g4ivkmuy5xgnbddomcwyy",
                                 "bafkreidrxwjtugzlfgndqorru6l4aavdx55cfudp5dddydctgxklboucla",
                                 "bafkreifwnn5vbbhplp3i63qihjblmbsz3o2yisd5vycbe7qeds3npnrwcq",
                                 "bafkreidzgr5tamgu7hpagsne3pweeiknmkpmpbt7vh6jxawp3lsw4zznwy",
                                 "bafkreibkwj3g2mpcl7hwftczxp5c5uiwhzyo2njeviz44jt5q5g5wilcxy",
                                 "bafkreihsoa3zned6boo5mfbbyfph63subjc5ioagsc7mhbwqv2sdteilki",
                                 "bafkreifsvx2szo56kq2casyublwimarqruoyfwpexrw4pgv3yssidjb3mu",
                                 "bafkreigpwysbvzrszwtjtf2thymozmi24f6q5rcp5buiaghfcngwchkzgq",
                                 "bafkreidl2c6ymhz33ik3haqgecue4re4y5rigzp34hei2dxj7vwnpw3mnu",
                                 "bafkreig4t7nk3ra5haywblbkq2q4iclf26nzietvbegzlowecmmmogq3iq",
                                 "bafkreia6cijnzycl4zxnftoyk6a5pogel7qyxkod2yhqrj6zvosl7o4vce",
                                 "bafkreicqhus5yloqzvqhiq37wgjmknsnpcaaml3go6fypj2hsbrsbsq2ki",
                                 "bafkreiblfh3xbvkr6exhrvweh7o6kryqoscemju2et44lfyymqfj2ujpfu",
                                 "bafkreifb3wrsqayrszieagmteulbiaw47d6cbdircrs6ftjh6vfvpfsmri",
                                 "bafkreicpzixsxvkloajbrzftxinwftykrijfkuuhtiggjr3thpobbratxm",
                                 "bafkreigve6mk5vggeoga5nzdyvjumjr2ji5ai5jnhbtkpzoq2cqaecxtn4",
                                 "bafkreifkch4usxjhrmam5mkkg7isfwr3nmxw7ya3hfk4erisyoovzafx3a",
                                 "bafkreifkhbmwyu4iso7vr3376mrazccmajzrqc6tqr3dxf2hgrczbygw4u",
                                 "bafkreihwzhwmxdwym3zvxt6lnssbodgjsvkmpwzpp3c4ujifkyir5t6mgu",
                                 "bafkreifrhsw7km3fgtuhzresnmhtal5sdaelinl7erbq7areuwqsxyfuoa",
                                 "bafkreicncauqz4x6mhnkrrbapca7z3w7y3ubnkppmoqh2fbzo3ttghm22y",
                                 "bafkreiaikvx7xazzxi3imexfreh5ibsgqsc2cp4wieal7r3ls627vnna7a",
                                 "bafkreicd7plriuvxtjz5ci2psxva62o3t7kknxx4z3qq4v7ori4alifpzy",
                                 "bafkreic3kecmtltjmpu7mnndpm4wrp5ygnpqaerurua76mtdi7anslvsgm",
                                 "bafkreiautxewtp57yaf73dgqwynvgfaosmin2nbcwdaj36i5htzoawpude",
                                 "bafkreibkolx2nvzmotwziqrn6j5wnm7bb353kfzpybimbi6nmt4nabxze4",
                                 "bafkreif5byjvb2lxyrw3kdpch52xqoi27mkfn6howls5xmexsbkczyxvzm",
                                 "bafkreiglvwww5yp54nirlubweickdm3k7v7eu63b5c6latbtprv3wxf6tm",
                                 "bafkreiaffyolbovubcbvtgv4gm2ocibptxzcpqpxcroehkdcrkj4gbhjau",
                                 "bafkreihzkq6n4zj5wz3pluwyyim5ysmt7ye4smggrktawod77fczwwot4m",
                                 "bafkreiaq3nrn6tk6d23lun5pikqlvl5tnm4pfy7bfflwjp3wqqx45fa4m4",
                                 "bafkreidvsd35nwi7cqv2zk4vgz6x4yi5t3777fwzvj22k5lqioa2vyeouu",
                                 "bafkreid6zpm4n26svssy76vuiop3le54qszshqfhdrdshpwtkgqlhzenny",
                                 "bafkreig367rxyoa3igfnaa3tlouj5yqoogp22jd775eka2t2xxilqk4qom",
                                 "bafkreiajtqri2adgvd4fhpeipye2yscsqq3zjdyeatxtde3wwqggtlotdm",
                                 "bafkreiddqftrwtodmc33ahm7ip7qbisqkexjcfpg2lwdhljhxdfi4ekubi",
                                 "bafkreiaij7ithfrkqt6dovj724x7betf5xwzj7acbudjmbg4ax5qdnnegm",
                                 "bafkreihjdhp2y3l6usgq4uzzlyw4ieougp6da5ajut3b7mqpa5qu4ezl3y"]
# get_all_ipfs_hashes()

# merges images and reduces size, used for large image in 3-front-end at home route
def merge_images(seed, output_width, num_of_images):
    random.seed(seed)
    df = pd.read_csv('output/data_uploaded.csv', index_col='Name')

    def get_concat_h(im1, im2):
        dst = Image.new('RGBA', (im1.width + im2.width, im1.height))
        dst.paste(im1, (0, 0))
        dst.paste(im2, (im1.width, 0))
        return dst

    def get_concat_v(im1, im2):
        dst = Image.new('RGBA', (im1.width, im1.height + im2.height))
        dst.paste(im1, (0, 0))
        dst.paste(im2, (0, im1.height))
        return dst

    images = []
    for name, row in df.iterrows():
        filename = name + '.png'
        image_path = 'output/img/' + filename
        images.append(Image.open(image_path).convert('RGBA'))
    random.shuffle(images)

    current_image, current_line = [], []
    for i, img in enumerate(images[:num_of_images], start=1):
        if i % output_width != 0:  # add to current row
            if current_line == []:
                current_line = img
            else:
                current_line = get_concat_h(current_line, img)
        else:  # add new line
            if current_image == []:
                current_line = get_concat_h(current_line, img)
                current_image = current_line
            else:
                current_line = get_concat_h(current_line, img)
                current_image = get_concat_v(current_image, current_line)
            current_line = []

    if current_line != []:
        current_image = get_concat_v(current_image, current_line)
    # restoring to original size (350/25 = 14)
    current_image = current_image.resize((int(current_image.width / 14), int(current_image.height / 14)),
                                         resample=Image.NEAREST)
    # and now enlarging - preserves quality
    current_image = current_image.resize((current_image.width * 4, current_image.height * 4), resample=Image.NEAREST)
    current_image.save('output_for_front_end/merged/example_legionaries.png')
# merge_images(seed=7, output_width=9, num_of_images=36)

# resizes images, used at 3-front-end at all/ route
def make_smaller_images():
    df = pd.read_csv('output/data_uploaded.csv', index_col='Name')
    for name, row in df.iterrows():
        filename = name + '.png'
        image_path = 'output/img/' + filename
        current_image_350x350 = Image.open(image_path).convert('RGBA')
        current_image_25x25 = current_image_350x350.resize((int(current_image_350x350.width / 14),
                                                            int(current_image_350x350.height / 14)),
                                                            resample=Image.NEAREST)
        current_image = current_image_25x25.resize((current_image_25x25.width * 4,
                                                    current_image_25x25.height * 4),
                                                    resample=Image.NEAREST)
        new_filename = 'small_' + name + '.png'
        new_filename = new_filename.replace('#', '')  # for some reason React doesnt load files with # in name
        current_image.save(f'output_for_front_end/small/{new_filename}')
# make_smaller_images()

# resizes single image, used as unveiled NFT in all/
def make_smaller_hidden_image():
    image_path = 'hidden/hidden3.png'
    current_image_350x350 = Image.open(image_path).convert('RGBA')
    current_image_25x25 = current_image_350x350.resize((int(current_image_350x350.width / 14),
                                                        int(current_image_350x350.height / 14)),
                                                        resample=Image.NEAREST)
    current_image = current_image_25x25.resize((current_image_25x25.width * 4,
                                                current_image_25x25.height * 4),
                                                resample=Image.NEAREST)
    new_filename = 'small_hidden3.png'
    current_image.save(f'output_for_front_end/hidden/{new_filename}')
# make_smaller_hidden_image()

# used in 3-front-end in public folder
def make_hashless_images():  # I cannot get react to display images when theres '#' in filename...
    df = pd.read_csv('output/data_uploaded.csv', index_col='Name')
    for name, row in df.iterrows():
        filename = name + '.png'
        image_path = 'output/img/' + filename
        current_image = Image.open(image_path).convert('RGBA')
        new_filename = 'hashless_' + name + '.png'
        new_filename = new_filename.replace('#', '')  # for some reason React doesnt load files with # in name
        current_image.save(f'output_for_front_end/hashless/{new_filename}')
# make_hashless_images()

