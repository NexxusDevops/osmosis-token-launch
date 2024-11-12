import React, { useState } from 'react';

function WalletConnection({ onWalletConnected }) {
    const [walletAddress, setWalletAddress] = useState('');
    const [error, setError] = useState(null);

    const connectKeplr = async () => {
        if (!window.keplr) {
            setError("Keplr extension not found. Please install it.");
            return;
        }

        try {
            // Suggest chain if not added to Keplr
            await window.keplr.experimentalSuggestChain({
                chainId: "osmosis-1",
                chainName: "Osmosis",
                rpc: "https://rpc-osmosis.blockapsis.com",
                rest: "https://lcd-osmosis.blockapsis.com",
                stakeCurrency: {
                    coinDenom: "OSMO",
                    coinMinimalDenom: "uosmo",
                    coinDecimals: 6,
                },
                bip44: { coinType: 118 },
                bech32Config: {
                    bech32PrefixAccAddr: "osmo",
                    bech32PrefixAccPub: "osmopub",
                    bech32PrefixValAddr: "osmovaloper",
                    bech32PrefixValPub: "osmovaloperpub",
                    bech32PrefixConsAddr: "osmocons",
                    bech32PrefixConsPub: "osmoconspub",
                },
                currencies: [{
                    coinDenom: "OSMO",
                    coinMinimalDenom: "uosmo",
                    coinDecimals: 6,
                }],
                feeCurrencies: [{
                    coinDenom: "OSMO",
                    coinMinimalDenom: "uosmo",
                    coinDecimals: 6,
                }],
                gasPriceStep: {
                    low: 0.025,
                    average: 0.04,
                    high: 0.05,
                },
            });

            // Enable Keplr and get address
            await window.keplr.enable("osmosis-1");
            const offlineSigner = window.getOfflineSigner("osmosis-1");
            const accounts = await offlineSigner.getAccounts();
            setWalletAddress(accounts[0].address);
            onWalletConnected(accounts[0].address);
        } catch (err) {
            setError("Failed to connect to Keplr: " + err.message);
        }
    };

    return (
        <div>
            {walletAddress ? (
                <p>Connected: {walletAddress}</p>
            ) : (
                <button onClick={connectKeplr} className="p-2 bg-teal-600 rounded">
                    Connect Keplr Wallet
                </button>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}

export default WalletConnection;

