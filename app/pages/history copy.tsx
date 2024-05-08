// Copyright 2024 user
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


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
import fetchAllKey from "./api/fetchAllKeys";


export default function History() {

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
            {wallet ? (<div className={styles.navbar2}>
                
                    <button
                        className={styles.search_message_button}
                        
                        onClick={async () => {
                            const allAccounts = await fetchAllKey();
                            const firstkey = allAccounts?.[1].pubkey.toString();
                            // const message = fetchMessage(firstkey,wallet)
                            if (firstkey) {
                                const message = await fetchMessage(firstkey, wallet);
                                // ... rest of your code using message'
                                if (message) {
                                    console.log(message);
                                    setMessage(message.content.toString());
                                    setMessageAuthor(message.author.toString());
                                    setMessageTime(message.timestamp.toNumber() * 1000);
                                    setSearchKey("");
                                }
                            } else {
                                // Handle the case where firstkey is undefined
                                //  - Display an error message
                                //  - Set a default message
                            }
                        }
                        }
                    >
                        Get History!
                    </button>
                {mounted && <WalletMultiButton />}</div>

            ) : <div className={styles.navbar}>{mounted && <WalletMultiButton />}</div>}

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

    );
};

