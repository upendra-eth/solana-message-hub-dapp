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



export default function Home() {
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

  const redirectToDestinationPage = () => {
    router.push('/history');
  };
  const redirectToDestinationPage2 = () => {
    router.push('/fetchMessage');
  };
  const redirectToDestinationPage3 = () => {
    router.push('/userMessages');
  };



  return (
    <div className={styles.container}>
      {wallet ? (<div className={styles.navbar}>
        {/* <div className={styles.message_search_bar}>
          <button className={styles.search_message_button} onClick={redirectToDestinationPage2}>Find Message</button>
        </div> */}

        {/* Search message container */}

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

        {/* History Route Button message container */}

        <div className={styles.message_search_bar}>
          <button className={styles.search_message_button} onClick={redirectToDestinationPage}>All Messages!</button>
        </div>
        <div className={styles.message_search_bar}>
          <button className={styles.search_message_button} onClick={redirectToDestinationPage3}>My Messages!</button>
        </div>
        {mounted && <WalletMultiButton />}</div>

      ) : <div className={styles.navbar}>{mounted && <WalletMultiButton />}</div>}


      <div className={styles.main}>
        <h1 className={styles.title}>
          Your First Solana Program with{" "}
          <a href="https://www.youtube.com/channel/UCgFfYec94c-QdYYR_2Opi0A">Blockchain Wala</a>!
        </h1>


        {wallet && message ? (
          <div className={styles.message_bar}>
            <input
              className={styles.message_input}
              placeholder="Write Your Message!"
              onChange={(e) => setUpdateMessageInput(e.target.value)}
              value={updateMessageInput}
            />
            <button
              className={styles.message_button}
              disabled={!updateMessageInput}
              onClick={async () => {
                const updatedMessage = await updateMessage(
                  updateMessageInput,
                  wallet,
                  messageAccount
                );
                if (updatedMessage) {
                  setMessage(updatedMessage.content.toString());
                  setMessageAuthor(updatedMessage.author.toString());
                  setMessageTime(updatedMessage.timestamp.toNumber() * 1000);
                  setUpdateMessageInput("");
                }
              }}
            >
              Update This Message!
            </button>
          </div>
        ) : (
          wallet && (
            <div className={styles.message_bar}>
              <input
                className={styles.message_input}
                placeholder="Write Your Message!"
                onChange={(e) => setCreateMessageInput(e.target.value)}
                value={createMessageInput}
              />
              <button
                className={styles.message_button}
                disabled={!createMessageInput}
                onClick={async () => {
                  const newMessage = await createMessage(
                    createMessageInput,
                    wallet,
                    messageAccount
                  );
                  if (newMessage) {
                    setMessage(newMessage.content.toString());
                    setMessageAuthor(newMessage.author.toString());
                    setMessageTime(newMessage.timestamp.toNumber() * 1000);
                    setCreateMessageInput("");
                  }
                }}
              >
                Create a Message!
              </button>
            </div>
          )
        )}

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
}