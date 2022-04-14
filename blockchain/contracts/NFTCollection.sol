// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/dev/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTCollection is ERC721URIStorage, VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface immutable COORDINATOR;
    bytes32 immutable KEY_HASH;
    uint256 public randomResult;
    uint64 immutable SUBSCRIPTION_ID;
    uint32 immutable CALLBACK_GAS_LIMIT;
    uint32 immutable NUM_WORDS;
    uint16 immutable REQUEST_CONFIRMATIONS;
    uint256[] randomWords;
    uint256 requestId;

    struct Character {
        uint256 background;
        uint256 clothes;
        uint256 eyes;
        uint256 fur;
        uint256 hat;
        uint256 mouth;
    }
    Character[] public characters;

    mapping(uint256 => address) requestToSender;
    mapping(uint256 => uint256) requestToTokenId;

    modifier onlyNftOwner(uint256 _tokenId) {
        require(
            _isApprovedOrOwner(msg.sender, _tokenId),
            "The caller is not the owner!"
        );
        _;
    }

    event requestedCharacter(uint256 indexed requestId);

    constructor(
        address _vrfCoordinator,
        bytes32 _keyhash,
        uint64 _subscriptionId,
        uint32 _callBackGasLimit,
        uint32 _numWords,
        uint16 _requestedConfirmations
    )
        public
        VRFConsumerBaseV2(_vrfCoordinator)
        ERC721("BoredApeYachtClub", "BAYC")
    {
        COORDINATOR = VRFCoordinatorV2Interface(_vrfCoordinator);
        KEY_HASH = _keyhash;
        SUBSCRIPTION_ID = _subscriptionId;
        CALLBACK_GAS_LIMIT = _callBackGasLimit;
        NUM_WORDS = _numWords;
        REQUEST_CONFIRMATIONS = _requestedConfirmations;
    }

    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory _randomWords
    ) internal override {
        randomWords = _randomWords;
        randomResult = randomWords[0];

        _mintCharacter();
    }

    function getTokenURI(uint256 _tokenId) public view returns (string memory) {
        return tokenURI(_tokenId);
    }

    function newRandomCharacter() public returns (uint256) {
        _requestRandomWords();
        requestToSender[requestId] = msg.sender;
        emit requestedCharacter(requestId);
        return requestId;
    }

    function setTokenURI(uint256 _tokenId, string memory _tokenURI)
        public
        onlyNftOwner(_tokenId)
    {
        _setTokenURI(_tokenId, _tokenURI);
    }

    function _mintCharacter() private {
        uint256 id = characters.length;
        _setCharacter();
        _safeMint(requestToSender[requestId], id);
    }

    function _requestRandomWords() private {
        requestId = COORDINATOR.requestRandomWords(
            KEY_HASH,
            SUBSCRIPTION_ID,
            REQUEST_CONFIRMATIONS,
            CALLBACK_GAS_LIMIT,
            NUM_WORDS
        );
    }

    function _setCharacter() private {
        uint256 background = randomResult % 10;
        uint256 clothes = uint256(keccak256(abi.encode(randomResult, 1))) % 10;
        uint256 eyes = uint256(keccak256(abi.encode(randomResult, 2))) % 10;
        uint256 fur = uint256(keccak256(abi.encode(randomResult, 3))) % 10;
        uint256 hat = uint256(keccak256(abi.encode(randomResult, 4))) % 10;
        uint256 mouth = uint256(keccak256(abi.encode(randomResult, 5))) % 10;

        Character memory character = Character(
            background,
            clothes,
            eyes,
            fur,
            hat,
            mouth
        );
        characters.push(character);
    }
}
