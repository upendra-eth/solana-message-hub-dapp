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

import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { IDL } from "./types/solana_message_hub";


export default async function fetchAllKey() {
  // const YOUR_PROGRAM_ID = "DMkaLwf4iN7kHDhXZubuarNznLBe5CcH4DyLyiwim8Lw";
  // const YOUR_PROGRAM_ID = "APrhn7diZKN9HBqYAoQCjEKU1vjvNcz4rDWcQ538Cyfw"; //arpit
  // const YOUR_PROGRAM_ID = "2SgSRG9x8R76BFwgFogkWVqxAkg2mZXQayjGHpMp7BUM"
  // Load program ID securely (replace with your actual program ID)
  let PROGRAM_ID = IDL.address.toString();
  const MY_PROGRAM_ID = new PublicKey(PROGRAM_ID);

  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const accounts = await connection.getProgramAccounts(MY_PROGRAM_ID);

    console.log(`Accounts for program ${MY_PROGRAM_ID}: `);
    console.log(`Total ${accounts.length} PDA addresses created using ${MY_PROGRAM_ID} program`);

    for (let i = 0; i < accounts.length; i++) {
      console.log(`Address of ${i} PDA is ${accounts[i].pubkey.toString()} and its owner is ${accounts[i].account.owner.toString()}`);
    }

    return accounts
  } catch (error) {
    console.error("Error:", error);
    return
  }
}

// fetchMessage()