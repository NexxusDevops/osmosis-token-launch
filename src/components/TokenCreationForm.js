import React, { useState } from 'react';

function TokenCreationForm({ onCreateToken }) {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [supply, setSupply] = useState('');

    const handleCreateToken = () => {
        onCreateToken({ name, symbol, supply });
    };

    return (
        <div className="p-8 bg-gradient-to-r from-purple-900 to-blue-800 text-white rounded-lg shadow-md space-y-4">
            <h2 className="text-3xl font-bold">Create New Token</h2>
            <input
                type="text"
                placeholder="Token Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded text-black"
            />
            <input
                type="text"
                placeholder="Token Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full p-2 rounded text-black"
            />
            <input
                type="number"
                placeholder="Initial Supply"
                value={supply}
                onChange={(e) => setSupply(e.target.value)}
                className="w-full p-2 rounded text-black"
            />
            <button
                onClick={handleCreateToken}
                className="w-full p-3 bg-purple-700 rounded hover:bg-purple-600"
            >
                Deploy Token
            </button>
        </div>
    );
}

export default TokenCreationForm;

