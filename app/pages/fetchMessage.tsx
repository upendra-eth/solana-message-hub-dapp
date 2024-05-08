import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import createMessage from "./api/createMessage";
import styles from "../styles/Home.module.css";
import updateMessage from "./api/updateMessage";
import fetchMessage from "./api/fetchMessage"
import { useRouter } from "next/router";


export default function FetchMessage() {

    const [messageAccount, _] = useState(Keypair.generate());
    const [message, setMessage] = useState("");
    const [messageAuthor, setMessageAuthor] = useState("");
    const [messageTime, setMessageTime] = useState(0);
    const [createMessageInput, setCreateMessageInput] = useState("");
    const [updateMessageInput, setUpdateMessageInput] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const router = useRouter();
    console.log(`messageAccount after keygen ${messageAccount.publicKey.toString()}`);


    const wallet = useAnchorWallet();
    const mounted = useIsMounted();


    return (
        <div className={styles.container}>
            {wallet ? (<div className={styles.navbar}>
                <div className={styles.message_search_bar}>
                    <input
                        className={styles.message_key_input}
                        placeholder="Write Message Key!"
                        onChange={(e) => setSearchKey(e.target.value)}
                        value={searchKey}
                    />
                    <button
                        className={styles.search_message_button}
                        disabled={!searchKey}
                        onClick={async () => {
                            const message = await fetchMessage(
                                searchKey,
                                wallet
                            );
                            if (message) {
                                setMessage(message.content.toString());
                                setMessageAuthor(message.author.toString());
                                setMessageTime(message.timestamp.toNumber() * 1000);
                                setSearchKey("");
                            }
                        }}
                    >
                        Search Message!
                    </button>
                </div>
                {mounted && <WalletMultiButton />}</div>

            ) : <div className={styles.navbar}>{mounted && <WalletMultiButton />}</div>}

            <div className={styles.main}>

                {wallet && message && (
                    <div className={styles.card}>
                        <h2>Message Key: {messageAccount.publicKey.toString()}</h2>
                        <h2>Current Message: {message}</h2>
                        <h2>
                            Message Author: {messageAuthor.substring(0, 4)}
                            ...
                            {messageAuthor.slice(-4)}
                        </h2>
                        <h2>Time Published: {new Date(messageTime).toLocaleString()}</h2>
                    </div>
                )}



            </div>
        </div>

    );
};

