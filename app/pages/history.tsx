import { useState, useEffect } from "react";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import styles from "../styles/Home.module.css";
import fetchMessage from "./api/fetchMessage";
import fetchAllKeys from "./api/fetchAllKeys";
import { PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { IDL } from "./api/types/solana_message_hub";


export default function History() {
    const [messageAccount, _] = useState(Keypair.generate());
    const [messages, setMessages] = useState<MessageData[]>([]); // Array to store all messages

    interface MessageData {
        Pdakey: PublicKey;
        author: PublicKey;
        timestamp: anchor.BN;
        content: string;
    }

    const wallet = useAnchorWallet();
    const mounted = useIsMounted();

    useEffect(() => {
        const fetchMessages = async () => {
            const allAccounts = await fetchAllKeys();
            const fetchedMessages = [];

            if (allAccounts) {
                if (wallet) {
                    for (const key of allAccounts) {
                        const message = await fetchMessage(key.pubkey.toString(), wallet);
                        if (message) {
                            const messageData1: MessageData = {
                                Pdakey: key.pubkey,
                                author: message?.author,
                                timestamp: message?.timestamp,
                                content: message?.content,
                            };
                            fetchedMessages.push(messageData1);
                        }
                    }
                } else {
                    // Handle the case where wallet is undefined
                    // - Display a message indicating no wallet connected
                    // - Disable the "Get History!" button
                }
            } else {
                // Handle the case where allAccounts is undefined
                // - Display an error message
                // - Set a default message
            }
            setMessages(fetchedMessages);
        };

        if (wallet) {
            fetchMessages();
        }
    }, [wallet]); // Run useEffect only when wallet changes

    return (
        <div className={styles.container}>

            <div className={styles.navbar}>{mounted && <WalletMultiButton />}</div>
            {wallet && messages.length > 0 && (
                <div className={styles.history_title}>
                    <h1>List of all the messages created using program Id: {IDL.address.substring(0, 4)}...{IDL.address.slice(-4)} </h1>
                </div>
            )}


            {wallet && messages.length > 0 && (

                <div className={styles.cards}> {/* Container for multiple cards */}
                    {messages.map((message, index) => (
                        <div key={index} className={styles.card}> {/* Each card has a key */}
                            <h2>Message Key: {message.Pdakey.toString()}</h2>
                            <h2>Current Message: {message.content.toString()}</h2>
                            <h2> Message Author: {message.author.toString().substring(0, 4)}...{message.author.toString().slice(-4)}</h2>
                            {/* ... rest of your card content using message */}
                            <h2>Time Published: {new Date(message.timestamp.toNumber() * 1000).toLocaleString()}</h2>
                        </div>
                    ))}
                </div>
            )}
            {wallet && messages.length == 0 && (

                <div className={styles.cards}> {/* Container for multiple cards */}
                  <div className={styles.history_title}>
                    <h1>Loading messages created using program Id: {IDL.address.substring(0, 4)}...{IDL.address.slice(-4)} </h1>
                </div>
                </div>
            )}
        </div>
    );
}