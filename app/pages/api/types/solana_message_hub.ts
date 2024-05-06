/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solana_message_hub.json`.
 */
export type SolanaMessageHub = {
  "address": "2SgSRG9x8R76BFwgFogkWVqxAkg2mZXQayjGHpMp7BUM",
  "metadata": {
    "name": "solanaMessageHub",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createMessage",
      "discriminator": [
        234,
        159,
        7,
        241,
        215,
        17,
        188,
        237
      ],
      "accounts": [
        {
          "name": "message",
          "writable": true,
          "signer": true
        },
        {
          "name": "author",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [],
      "args": []
    },
    {
      "name": "updateMessage",
      "discriminator": [
        23,
        135,
        34,
        211,
        96,
        120,
        107,
        9
      ],
      "accounts": [
        {
          "name": "message",
          "writable": true
        },
        {
          "name": "author",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "message",
      "discriminator": [
        110,
        151,
        23,
        110,
        198,
        6,
        125,
        181
      ]
    }
  ],
  "types": [
    {
      "name": "message",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    }
  ]
};

export const IDL:SolanaMessageHub = {
  "address": "2SgSRG9x8R76BFwgFogkWVqxAkg2mZXQayjGHpMp7BUM",
  "metadata": {
    "name": "solanaMessageHub",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createMessage",
      "discriminator": [
        234,
        159,
        7,
        241,
        215,
        17,
        188,
        237
      ],
      "accounts": [
        {
          "name": "message",
          "writable": true,
          "signer": true
        },
        {
          "name": "author",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [],
      "args": []
    },
    {
      "name": "updateMessage",
      "discriminator": [
        23,
        135,
        34,
        211,
        96,
        120,
        107,
        9
      ],
      "accounts": [
        {
          "name": "message",
          "writable": true
        },
        {
          "name": "author",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "message",
      "discriminator": [
        110,
        151,
        23,
        110,
        198,
        6,
        125,
        181
      ]
    }
  ],
  "types": [
    {
      "name": "message",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    }
  ]
};
