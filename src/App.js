// src/App.js
import React, { useState } from 'react';
import WalletConnection from './components/WalletConnection';
import TokenCreationForm from './components/TokenCreationForm';

function App() {
    const [walletAddress, setWalletAddress] = useState(null);

    const handleWalletConnected = (address) => {
        setWalletAddress(address);
    };

    const handleTokenCreation = (tokenDetails) => {
        // Implement token deployment logic here
        console.log("Token Details:", tokenDetails);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 space-y-8">
            <h1 className="text-4xl font-bold">Osmosis Token Launch Platform</h1>
            <WalletConnection onWalletConnected={handleWalletConnected} />
            {walletAddress && (
                <p className="text-lg font-semibold">
                    Connected Wallet Address: {walletAddress}
                </p>
            )}
            <TokenCreationForm onCreateToken={handleTokenCreation} />
        </div>
    );
}

export default App;

