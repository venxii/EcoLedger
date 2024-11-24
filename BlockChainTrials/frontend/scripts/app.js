/*
// Set up ethers.js and MetaMask
let provider;
let signer;
let contract;

// The contract ABI (Application Binary Interface)
const abi = [
    "function addProduct(uint256 id, string memory name, string memory origin, string memory manufacturer, string memory sustainabilityMetrics) public",
    "function getProduct(uint256 id) public view returns (string memory, string memory, string memory, uint256, string memory)",
    "function rewardTokens(address user, uint256 amount) public",
    "function redeemTokens(address user, uint256 amount) public",
    "function greenTokens(address user) public view returns (uint256)"
];

// The address of the deployed contract
const contractAddress = "0xC44628734a9432a3DAA302E11AfbdFa8361424A5"; // Replace with your deployed contract address

// Connect to MetaMask
document.getElementById('connectButton').onclick = async function () {
    if (window.ethereum) {
        try {
            // Request MetaMask accounts
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Create a provider and signer
            provider = new ethers.BrowserProvider(window.ethereum); // Updated for ethers.js v6
            signer = await provider.getSigner();

            // Initialize the contract instance
            contract = new ethers.Contract(contractAddress, abi, provider);

            console.log("MetaMask connected and signer set up!");
        } catch (error) {
            console.error("Error connecting MetaMask:", error);
        }
    } else {
        alert("MetaMask is not installed!");
    }
};

// Add a new product
document.getElementById('addProductButton').onclick = async function () {
    const id = Date.now(); // Generate unique ID
    const name = document.getElementById("productName").value;
    const origin = document.getElementById("productOrigin").value;
    const manufacturer = document.getElementById("productManufacturer").value;
    const sustainabilityMetrics = document.getElementById("productSustainability").value;

    if (!name || !origin || !manufacturer || !sustainabilityMetrics) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const connectedContract = contract.connect(signer);

        const tx = await connectedContract.addProduct(id, name, origin, manufacturer, sustainabilityMetrics);
        console.log("Transaction sent:", tx);

        const receipt = await tx.wait();
        console.log("Transaction mined:", receipt);

        alert("Product added successfully!");
    } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Check the console for errors.");
    }
};

// Get a product
document.getElementById('getProductButton').onclick = async function() {
    const productId = document.getElementById("productId").value;

    if (!productId) {
        alert("Please enter a valid product ID.");
        return;
    }

    try {
        const product = await contract.getProduct(productId);
        document.getElementById('productDetails').innerHTML = `
            <p>Name: ${product[0]}</p>
            <p>Origin: ${product[1]}</p>
            <p>Manufacturer: ${product[2]}</p>
            <p>Timestamp: ${new Date(product[3] * 1000).toLocaleString()}</p>
            <p>Sustainability Metrics: ${product[4]}</p>
        `;
    } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product. Check the console for errors.');
    }
};

// Reward tokens
document.getElementById('rewardTokensButton').onclick = async function() {
    const recipient = document.getElementById("recipientAddress").value;
    const amount = document.getElementById("rewardAmount").value;

    if (!recipient || !amount) {
        alert("Please provide a recipient address and token amount.");
        return;
    }

    try {
        const connectedContract = contract.connect(signer);

        const tx = await connectedContract.rewardTokens(recipient, amount);
        console.log("Transaction sent:", tx);

        const receipt = await tx.wait();
        console.log("Transaction mined:", receipt);

        alert(`${amount} GreenTokens rewarded to ${recipient} successfully!`);
    } catch (error) {
        console.error("Error rewarding tokens:", error);
        alert("Failed to reward tokens. Check the console for errors.");
    }
};

// Redeem tokens
document.getElementById('redeemTokensButton').onclick = async function() {
    const amount = document.getElementById("redeemAmount").value;

    if (!amount) {
        alert("Please enter a token amount to redeem.");
        return;
    }

    try {
        const connectedContract = contract.connect(signer);

        const tx = await connectedContract.redeemTokens(await signer.getAddress(), amount);
        console.log("Transaction sent:", tx);

        const receipt = await tx.wait();
        console.log("Transaction mined:", receipt);

        alert(`Successfully redeemed ${amount} GreenTokens!`);
    } catch (error) {
        console.error("Error redeeming tokens:", error);
        alert("Failed to redeem tokens. Check the console for errors.");
    }
};

// View GreenTokens balance
document.getElementById('checkBalanceButton').onclick = async function() {
    try {
        const balance = await contract.greenTokens(await signer.getAddress());
        document.getElementById("balanceDisplay").innerText = `Your balance: ${balance} GreenTokens`;
    } catch (error) {
        console.error("Error checking balance:", error);
        alert("Failed to fetch balance. Check the console for errors.");
    }
};


*/













// ABI for the GreenChain contract
const contractABI = [
    {
        "constant": false,
        "inputs": [
            { "name": "name", "type": "string" },
            { "name": "email", "type": "string" }
        ],
        "name": "registerUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            { "name": "user", "type": "address" }
        ],
        "name": "getUserId",
        "outputs": [
            { "name": "", "type": "uint256" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    // Additional contract methods for events and groups
    {
        "constant": true,
        "inputs": [
            { "name": "user", "type": "address" }
        ],
        "name": "getUserPreferences",
        "outputs": [
            { "name": "", "type": "string" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            { "name": "preferences", "type": "string" }
        ],
        "name": "getRecommendedEvents",
        "outputs": [
            { "name": "", "type": "string[]" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            { "name": "preferences", "type": "string" }
        ],
        "name": "getRecommendedGroups",
        "outputs": [
            { "name": "", "type": "string[]" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

// Replace with your deployed contract address
const contractAddress = "0xE7489282F2A9875ACcd1dfa5f1fA3DC77381b79A"; 

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to request the user's account from MetaMask
async function requestAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    console.log("Using account:", userAddress);
}

// Function to register a user
async function registerUser(name, email) {
    try {
        if (!name || !email) {
            alert("Name and email cannot be empty.");
            return;
        }

        // Request user account
        await requestAccount();

        // Register user via smart contract
        const receipt = await contract.methods.registerUser(name, email).send({
            from: userAddress,
            gas: 3000000, // Gas limit
            gasPrice: web3.utils.toWei('20', 'gwei') // Legacy gas pricing (20 gwei)
        });

        console.log("User registered successfully:", receipt);
        alert("User registered successfully!");

        // Redirect to login page after successful registration
        window.location.href = "../pages/dashboard.html";
    } catch (error) {
        console.error("Error registering user:", error);
        alert("Failed to register user. Please check the console for details.");
    }
}

// Event listener for the signup form
document.getElementById("registerButton").addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;

    await registerUser(name, email);
});

// Function to sign in the user by verifying their user ID
async function signIn(userIdInput) {
    try {
        await requestAccount();

        // Fetch the stored user ID for the current address
        const storedUserId = await contract.methods.getUserId(userAddress).call();

        // Check if the user ID matches
        if (userIdInput === storedUserId) {
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            alert("Invalid User ID. Please try again.");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("Failed to log in. Please check the console for details.");
    }
}

// Event listener for the login form
document.getElementById("loginButton").addEventListener("click", async (e) => {
    e.preventDefault();

    const userIdInput = document.getElementById("userIdInput").value;

    await signIn(userIdInput);
});

// Function to load the user's dashboard
async function loadDashboard() {
    try {
        await requestAccount();

        const userId = await contract.methods.getUserId(userAddress).call();
        const tokens = await contract.methods.greenTokens(userAddress).call();

        document.getElementById("userId").textContent = `User ID: ${userId}`;
        document.getElementById("greenTokens").textContent = `Green Tokens: ${tokens}`;
    } catch (error) {
        console.error("Error loading dashboard:", error);
        alert("Failed to load dashboard.");
    }
}

// Event listener for loading dashboard
window.onload = async () => {
    if (window.location.pathname === "../pages/dashboard.html") {
        await loadDashboard();
        await getPersonalizedRecommendations();
    }
};

// Function to fetch personalized recommendations (events/groups)
async function getPersonalizedRecommendations() {
    try {
        // Get user preferences (this can include interests, location, etc.)
        const userPreferences = await contract.methods.getUserPreferences(userAddress).call();
        
        // Fetch recommended events and groups based on preferences
        const recommendedEvents = await contract.methods.getRecommendedEvents(userPreferences).call();
        const recommendedGroups = await contract.methods.getRecommendedGroups(userPreferences).call();

        // Display personalized recommendations
        updateEventList(recommendedEvents);
        updateGroupList(recommendedGroups);
    } catch (error) {
        console.error("Error fetching personalized recommendations:", error);
    }
}

// Update event list based on recommendations
function updateEventList(events) {
    const eventList = document.getElementById("eventList");
    eventList.innerHTML = ""; // Clear the list first
    events.forEach(event => {
        const eventItem = document.createElement("li");
        eventItem.textContent = `${event.name} - ${event.date}`;
        eventItem.onclick = () => showEventDetails(event);
        eventList.appendChild(eventItem);
    });
}

// Update group list based on recommendations
function updateGroupList(groups) {
    const groupList = document.getElementById("groupList");
    groupList.innerHTML = ""; // Clear the list first
    groups.forEach(group => {
        const groupItem = document.createElement("li");
        groupItem.textContent = group.name;
        groupItem.onclick = () => showGroupDetails(group);
        groupList.appendChild(groupItem);
    });
}

// Show event details when clicked
function showEventDetails(event) {
    alert(`Event: ${event.name}\nDate: ${event.date}\nDescription: ${event.description}`);
}

// Show group details when clicked
function showGroupDetails(group) {
    alert(`Group: ${group.name}\nDescription: ${group.description}`);
}

// Function to subscribe to push notifications
if ("Notification" in window && "serviceWorker" in navigator) {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            navigator.serviceWorker.register('/service-worker.js').then(reg => {
                reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: YOUR_SERVER_KEY });
            });
        }
    });
}