/*
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract GreenChain {
    struct Product {
        string name;
        string origin;
        string manufacturer;
        uint256 timestamp;
        string sustainabilityMetrics;
    }

    mapping(uint256 => Product) public products;
    mapping(address => uint256) public greenTokens; // Green token balances

    event ProductAdded(uint256 productId, string name, address indexed addedBy);
    event TokensRewarded(address indexed user, uint256 amount);
    event TokensRedeemed(address indexed user, uint256 amount);

    function addProduct(
        uint256 id,
        string memory name,
        string memory origin,
        string memory manufacturer,
        string memory sustainabilityMetrics
    ) public {
        products[id] = Product(name, origin, manufacturer, block.timestamp, sustainabilityMetrics);
        emit ProductAdded(id, name, msg.sender);
    }

    function getProduct(uint256 id)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            string memory
        )
    {
        Product memory product = products[id];
        return (product.name, product.origin, product.manufacturer, product.timestamp, product.sustainabilityMetrics);
    }

    function rewardTokens(address user, uint256 amount) public {
        greenTokens[user] += amount;
        emit TokensRewarded(user, amount);
    }

    function redeemTokens(address user, uint256 amount) public {
        require(greenTokens[user] >= amount, "Not enough tokens");
        greenTokens[user] -= amount;
        emit TokensRedeemed(user, amount);
    }
}
*/






/*

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract GreenChain {
    mapping(address => uint256) public greenTokens;
    mapping(address => uint256) public userIds;
    mapping(address => bool) public verifiedUsers;
    
    uint256 public userCounter = 1;

    // Event to track user registration
    event UserRegistered(address indexed user, uint256 userId);

    // Function to register a user
    function registerUser(string memory name, string memory email) public {
        // Ensure the user is not already registered
        require(userIds[msg.sender] == 0, "User already registered");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");

        uint256 newUserId = userCounter;
        userIds[msg.sender] = newUserId;
        userCounter++;

        // Emit event for registration
        emit UserRegistered(msg.sender, newUserId);
    }

    // Function to get user ID (read-only)
    function getUserId(address user) public view returns (uint256) {
        return userIds[user];
    }

    // Function to verify a user based on certification
    function verifyUser(address user, string memory certificationAuthority) public {
        require(userIds[user] != 0, "User not registered");
        verifiedUsers[user] = true;
        // Additional logic for certification could be added here
    }

    // GreenToken reward logic
    function rewardTokens(address user, uint256 amount) public {
        greenTokens[user] += amount;
    }

    function redeemTokens(address user, uint256 amount) public {
        require(greenTokens[user] >= amount, "Not enough tokens");
        greenTokens[user] -= amount;
    }
}


*/



// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract GreenChain {
    // Structs
    struct User {
        string name;
        string email;
        uint256 userId;
    }

    struct Listing {
        uint256 id;
        string description;
        address seller;
        uint256 price;
        bool approved;
    }

    struct Event {
        uint256 id;
        string description;
        address organizer;
        bool approved;
    }

    // Mappings
    mapping(address => User) public users;
    mapping(address => uint256) public greenTokens;
    mapping(address => bool) public verifiedUsers;
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Event) public events;

    // Counters
    uint256 public nextUserId = 1;
    uint256 public nextListingId = 1;
    uint256 public nextEventId = 1;

    // Admin Address
    address public admin;

    // Events
    event UserRegistered(address indexed user, uint256 userId);
    event TokensRewarded(address indexed user, uint256 amount);
    event TokensRedeemed(address indexed user, uint256 amount);
    event ListingCreated(uint256 id, address seller);
    event ListingApproved(uint256 id);
    event EventCreated(uint256 id, address organizer);
    event EventApproved(uint256 id);

    // Constructor
    constructor() public {
        admin = msg.sender; // Set deployer as admin
    }

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyRegistered(address user) {
        require(users[user].userId != 0, "User not registered");
        _;
    }

    // User Registration
    function registerUser(string memory name, string memory email) public {
        require(users[msg.sender].userId == 0, "User already registered");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");

        uint256 newUserId = nextUserId++;
        users[msg.sender] = User(name, email, newUserId);

        emit UserRegistered(msg.sender, newUserId);
    }

    // User Details
    function getUserId(address user) public view returns (uint256) {
        return users[user].userId;
    }

    function verifyUser(address user) public onlyAdmin onlyRegistered(user) {
        verifiedUsers[user] = true;
    }

    // Token Management
    function rewardTokens(address user, uint256 amount) public onlyAdmin onlyRegistered(user) {
        greenTokens[user] += amount;
        emit TokensRewarded(user, amount);
    }

    function redeemTokens(address user, uint256 amount) public onlyRegistered(user) {
        require(greenTokens[user] >= amount, "Not enough tokens");
        greenTokens[user] -= amount;
        emit TokensRedeemed(user, amount);
    }

    // Marketplace Listings
    function createListing(string memory description, uint256 price) public onlyRegistered(msg.sender) {
        listings[nextListingId] = Listing(nextListingId, description, msg.sender, price, false);
        emit ListingCreated(nextListingId, msg.sender);
        nextListingId++;
    }

    function approveListing(uint256 listingId) public onlyAdmin {
        require(listings[listingId].seller != address(0), "Listing does not exist");
        listings[listingId].approved = true;
        emit ListingApproved(listingId);
    }

    // Event Management
    function createEvent(string memory description) public onlyRegistered(msg.sender) {
        events[nextEventId] = Event(nextEventId, description, msg.sender, false);
        emit EventCreated(nextEventId, msg.sender);
        nextEventId++;
    }

    function approveEvent(uint256 eventId) public onlyAdmin {
        require(events[eventId].organizer != address(0), "Event does not exist");
        events[eventId].approved = true;
        emit EventApproved(eventId);
    }

    // Admin Dashboard
    function getListing(uint256 listingId) public view returns (string memory, address, uint256, bool) {
        Listing memory listing = listings[listingId];
        return (listing.description, listing.seller, listing.price, listing.approved);
    }

    function getEvent(uint256 eventId) public view returns (string memory, address, bool) {
        Event memory eventInfo = events[eventId];
        return (eventInfo.description, eventInfo.organizer, eventInfo.approved);
    }
}