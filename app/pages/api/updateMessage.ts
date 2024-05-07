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

// import { Program,  } from "@project-serum/anchor";
import {AnchorProvider, web3 } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { IDL } from "./types/solana_message_hub";
import {
  connection,
  commitmentLevel,
} from "./utils/constants";
import { AnchorWallet } from "@solana/wallet-adapter-react";

export default async function updateMessage(
  inputtedMessage: string,
  wallet: AnchorWallet,
  messageAccount: web3.Keypair
) {
  console.log(`Update massage key --------- ${messageAccount.publicKey.toString()}`);
  
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });

  if (!provider) return;
  const program = new anchor.Program(IDL, provider);

  try {
    /* interact with the program via rpc */
    const txn = await program.rpc.updateMessage(inputtedMessage, {
      accounts: {
        message: messageAccount.publicKey,
        author: provider.wallet.publicKey,
      },
      signers: [],
    });


    const message = await program.account.message.fetch(
      messageAccount.publicKey
    );
    console.log("Current massage key ========== : ", messageAccount.publicKey.toString());
    return message;
  } catch (err) {
    console.log("Transaction error: ", err);
    return;
  }
}