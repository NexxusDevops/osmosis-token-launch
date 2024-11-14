// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import WalletConnection from './components/WalletConnection';
import TokenCreationForm from './components/TokenCreationForm';

function App() {
    const [walletAddress, setWalletAddress] = useState(null);
    const [status, setStatus] = useState(null);

    // Handles wallet connection
    const handleWalletConnected = (address) => {
        setWalletAddress(address);
    };

    // Sends token creation data to the backend
    const handleCreateToken = async (tokenData) => {
        try {
            const response = await axios.post('http://localhost:3001/deploy-token', tokenData);
            setStatus(`Token Deployed: ${response.data.data}`);
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 space-y-8">
            <h1 className="text-4xl font-bold">Osmosis Token Launch Platform</h1>

            {/* Wallet Connection Section */}
            <WalletConnection onWalletConnected={handleWalletConnected} />
            {walletAddress && (
                <p className="text-lg font-semibold">
                    Connected Wallet Address: {walletAddress}
                </p>
            )}

            {/* Token Creation Form */}
            <TokenCreationForm onCreateToken={handleCreateToken} />

            {/* Display Status */}
            {status && <p className="text-white mt-4">{status}</p>}
        </div>
    );
}

export default App;
