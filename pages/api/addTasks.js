import { ethers } from "ethers";
import * as Constants from '../../Utils/config';

async function handler(req, res) {
    try {
        const { JsonRpcProvider } = require('ethers');
        console.log("Request body:", req.body); // Log the entire request body
        const { task } = req.body; 
        console.log("Received task:", task);

        // Initialize provider with the API URL
        const provider = new ethers.providers.JsonRpcProvider(Constants.API_URL);
        console.log("Provider initialized");

        // Initialize the signer with the private key and the provider (https://sepolia.infura.io/v3/d5c729f29e8644c8b1c461d2067bc369)
        const signer = new ethers.Wallet(Constants.PRIVATE_KEY, provider);
        console.log("Signer initialized");

        // Initialize the contract with the address, ABI, and signer
        const contract = new ethers.Contract(Constants.contractADDRESS, Constants.contractAbi, signer);
        console.log("Contract initialized");

        // Send the transaction to add the task
        const tx = await contract.addTask(task);
        console.log("Transaction sent:", tx);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log("Transaction mined");

        // Respond with a success message
        res.status(200).json({ message: "Task has been added" });
    } catch (err) {
        console.error("Error adding task:", err);
        res.status(500).json({ error: "Failed to add task" });
    }
}

export default handler;
