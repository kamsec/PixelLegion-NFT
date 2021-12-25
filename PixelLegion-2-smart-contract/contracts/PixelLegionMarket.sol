// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PixelLegionMarket is ERC721Enumerable, ERC721URIStorage, Ownable, ReentrancyGuard {

    struct Offer {
        bool isForSale;
        uint256 tokenIndex;
        address seller;
        uint256 minValue; // in ether
        address onlySellTo; // specify to sell only to a specific person
    }

    struct Bid {
        bool hasBid;
        uint256 tokenIndex;
        address bidder;
        uint256 value;
    }

    mapping(uint256 => uint256) private assignOrders;

    mapping (uint256 => Offer) public tokensOfferedForSale;
    mapping (uint256 => Bid) public tokenBids;
    mapping (address => uint256) public pendingWithdrawals;
    string public baseURI = "ipfs://";

    // ipfs hash of metadata for each token in CIDv1 encoding
    string[] public tokenURIs = ["bafkreidd5wicfkfhu6fdfltvdez7u2ejkf76dpceg3nuxwtxokxnoe3enu",
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
                                 "bafkreihjdhp2y3l6usgq4uzzlyw4ieougp6da5ajut3b7mqpa5qu4ezl3y"];
    uint256 public tokensRemainingToAssign = 0;
    uint256 public tokenLimit = 100; // length of tokenURIs array
    uint256 public claimPrice = 5000000000000000000  wei; // 5 ether (it is 5 matic because we are on polygon)

    modifier onlyTradableToken (address from, uint256 tokenId) {
        require(tokenId < tokenLimit, "Out of tokenId");
        require(ownerOf(tokenId) == from, "ERC721: transfer of token that is not own");
        _;
    }

    event Assign(address indexed to, uint256 tokenIndex);
    event TokenTransfer(address indexed from, address indexed to, uint256 tokenIndex);
    event TokenOffered(uint256 indexed tokenIndex, uint256 minValue, address indexed toAddress);
    event TokenBidEntered(uint256 indexed tokenIndex, uint256 value, address indexed fromAddress);
    event TokenBidWithdrawn(uint256 indexed tokenIndex, uint256 value, address indexed fromAddress);
    event TokenBought(uint256 indexed tokenIndex, uint256 value, address indexed fromAddress, address indexed toAddress);
    event TokenNoLongerForSale(uint256 indexed tokenIndex);

    constructor () ERC721("PixelLegion", "PXL") {
        tokensRemainingToAssign = tokenLimit;
    }

    function changeClaimPrice(uint256 price) external onlyOwner {
        claimPrice = price;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function mint() payable public {
        require(tokensRemainingToAssign > 0, "No remainig tokens");
        require(msg.value >= claimPrice, "Need pay at least claim amount");
        uint256 randIndex = _random() % tokensRemainingToAssign;
        uint256 tokenIndex = _fillAssignOrder(--tokensRemainingToAssign, randIndex);
        _safeMint(_msgSender(), tokenIndex);
        _setTokenURI(tokenIndex, tokenURIs[tokenIndex]);
        (bool success,) = owner().call{value: msg.value}("");
        require(success);
        emit Assign(_msgSender(), tokenIndex);
    }

    function transferToken(address to, uint256 tokenId) public {
        _safeTransfer(_msgSender(), to, tokenId, "");
    }

    function tokenNoLongerForSale(uint256 tokenId) public {
        _tokenNoLongerForSale(_msgSender(), tokenId);
    }

    function offerTokenForSale(uint256 tokenId, uint256 minSalePriceInWei) public onlyTradableToken(_msgSender(), tokenId) {
        tokensOfferedForSale[tokenId] = Offer(true, tokenId, _msgSender(), minSalePriceInWei, address(0));
        emit TokenOffered(tokenId, minSalePriceInWei, address(0));
    }

    function offerTokenForSaleToAddress(uint256 tokenId, uint256 minSalePriceInWei, address toAddress) public onlyTradableToken(_msgSender(), tokenId) {
        tokensOfferedForSale[tokenId] = Offer(true, tokenId, _msgSender(), minSalePriceInWei, toAddress);
        emit TokenOffered(tokenId, minSalePriceInWei, toAddress);
    }

    function buyToken(uint256 tokenId) payable public {
        Offer memory offer = tokensOfferedForSale[tokenId];
        require(tokenId < tokenLimit, "Out of tokenId");
        require(offer.isForSale, "Token is not for sale");
        require(offer.onlySellTo == address(0) || offer.onlySellTo == _msgSender(), "Unable to sell");
        require(msg.value >= offer.minValue, "Insufficient amount to pay");
        require(ownerOf(tokenId) == offer.seller, "Not token seller");

        address seller = offer.seller;
        _safeTransfer(seller, _msgSender(), tokenId, "");
        pendingWithdrawals[seller] += msg.value;
        emit TokenBought(tokenId, msg.value, seller, _msgSender());
    }

    function withdraw() public nonReentrant {
        uint256 amount = pendingWithdrawals[_msgSender()];
        pendingWithdrawals[_msgSender()] = 0;
        (bool success,) = _msgSender().call{value: amount}("");
        require(success);
    }

    function enterBidForToken(uint256 tokenId) public payable {
        require(tokenId < tokenLimit, "Out of tokenId");
        require(ownerOf(tokenId) != _msgSender(), "Invalid bid");
        require(msg.value > tokenBids[tokenId].value, "Require bigger amount");
        Bid memory existing = tokenBids[tokenId];
        if (existing.value > 0) {
            // Refund the failing bid
            pendingWithdrawals[existing.bidder] += existing.value;
        }
        tokenBids[tokenId] = Bid(true, tokenId, _msgSender(), msg.value);
        emit TokenBidEntered(tokenId, msg.value, _msgSender());
    }

    function acceptBidForToken(uint256 tokenId, uint256 minPrice) public onlyTradableToken(_msgSender(), tokenId) {
        require(tokenBids[tokenId].value >= minPrice, "Bid price is low");
        Bid memory bid = tokenBids[tokenId];

        tokenBids[tokenId] = Bid(false, tokenId, address(0), 0);
        _safeTransfer(_msgSender(), bid.bidder, tokenId, "");

        uint256 amount = bid.value;
        pendingWithdrawals[_msgSender()] += amount;
        emit TokenBought(tokenId, bid.value, _msgSender(), bid.bidder);
    }

    function withdrawBidForToken(uint256 tokenId) public {
        require(tokenId < tokenLimit, "Out of tokenId");
        require(ownerOf(tokenId) != _msgSender(), "Invalid bid");
        require(tokenBids[tokenId].bidder == _msgSender(), "Invalid bidder");
        uint256 amount = tokenBids[tokenId].value;
        tokenBids[tokenId] = Bid(false, tokenId, address(0), 0);
        // Refund the bid money
        (bool success,) = _msgSender().call{value: amount}("");
        require(success);
        emit TokenBidWithdrawn(tokenId, tokenBids[tokenId].value, _msgSender());
    }

    function _random() internal view returns(uint256) {
        return uint256(
            keccak256(
                abi.encodePacked(block.timestamp + block.difficulty + ((uint256(keccak256(abi.encodePacked(block.coinbase)))) / block.timestamp) + block.gaslimit + ((uint256(keccak256(abi.encodePacked(_msgSender())))) / block.timestamp) + block.number)
            )
        ) / tokensRemainingToAssign;
    }

    function _fillAssignOrder(uint256 orderA, uint256 orderB) internal returns(uint256) {
        uint256 temp = orderA;
        if (assignOrders[orderA] > 0) temp = assignOrders[orderA];
        assignOrders[orderA] = orderB;
        if (assignOrders[orderB] > 0) assignOrders[orderA] = assignOrders[orderB];
        assignOrders[orderB] = temp;
        return assignOrders[orderA];
    }

    function _transfer(address from, address to, uint256 tokenId) internal override onlyTradableToken(from, tokenId) {
        super._transfer(from, to, tokenId);
        emit TokenTransfer(from, to, tokenId);
        if (tokensOfferedForSale[tokenId].isForSale) {
            _tokenNoLongerForSale(to, tokenId);
        }

        if (tokenBids[tokenId].bidder == to) {
            pendingWithdrawals[to] += tokenBids[tokenId].value;
            tokenBids[tokenId] = Bid(false, tokenId, address(0), 0);
        }
    }

    function _tokenNoLongerForSale(address from, uint256 tokenId) internal onlyTradableToken(from, tokenId) {
        tokensOfferedForSale[tokenId] = Offer(false, tokenId, from, 0, address(0));

        emit TokenNoLongerForSale(tokenId);
    }

    receive() external payable {}

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}