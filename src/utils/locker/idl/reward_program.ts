export type RewardProgram = {
  "version": "0.1.0",
  "name": "reward_program",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "subscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "* Derive an associated token account between the signers unique\n     * program member account and the token mint. This will hold the\n     * mint tokens under management of the program with respect\n     * to the signing member and mint, much like a token vault."
          ]
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "subscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "subscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "release",
      "accounts": [
        {
          "name": "subscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "subscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "openDraw",
      "accounts": [
        {
          "name": "draw",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Draw address should be a mix of the seed, giveaway, and draw"
          ]
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "giveawayId",
          "type": "u64"
        },
        {
          "name": "drawNo",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeDraw",
      "accounts": [
        {
          "name": "draw",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Draw address should be a mix of the giveaway, seed,"
          ]
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "giveawayId",
          "type": "u64"
        },
        {
          "name": "drawNo",
          "type": "u64"
        },
        {
          "name": "seed",
          "type": "string"
        }
      ]
    },
    {
      "name": "enter",
      "accounts": [
        {
          "name": "draw",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ticket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "entries",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "entryTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "drawAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Schema version from v0 up to v255. Defaults to the `LATEST_VERSION` constant."
            ],
            "type": "u8"
          },
          {
            "name": "giveawayId",
            "type": "u64"
          },
          {
            "name": "drawId",
            "type": "u64"
          },
          {
            "name": "totalEntries",
            "docs": [
              "Total amount of entries in the draw"
            ],
            "type": "u64"
          },
          {
            "name": "limitEntries",
            "docs": [
              "Limited entries"
            ],
            "type": "u64"
          },
          {
            "name": "timeCreated",
            "docs": [
              "Initial creation date of the members account"
            ],
            "type": "u64"
          },
          {
            "name": "timeRewarded",
            "docs": [
              "Date of the last reward granted to matured tokens"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "subscriptionAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Schema version from v0 up to v255. Defaults to the `LATEST_VERSION` constant."
            ],
            "type": "u8"
          },
          {
            "name": "tier",
            "docs": [
              "Persists the tier of the greatest filled subscription slot"
            ],
            "type": "u8"
          },
          {
            "name": "status",
            "type": "u8"
          },
          {
            "name": "totalAmount",
            "docs": [
              "Total amount of tokens managed by the account"
            ],
            "type": "u64"
          },
          {
            "name": "totalMatured",
            "docs": [
              "Amount of tokens passed their first epoch"
            ],
            "type": "u64"
          },
          {
            "name": "totalReleased",
            "docs": [
              "Amount of tokens pending release"
            ],
            "type": "u64"
          },
          {
            "name": "totalRewards",
            "docs": [
              "Amount of unclaimed entry tokens"
            ],
            "type": "u64"
          },
          {
            "name": "timeCreated",
            "docs": [
              "Initial creation date of the members account"
            ],
            "type": "u64"
          },
          {
            "name": "timeRewarded",
            "docs": [
              "Date of the last reward granted to matured tokens"
            ],
            "type": "u64"
          },
          {
            "name": "slots",
            "docs": [
              "Collection of locked token deposit slots (one entry per deposit)"
            ],
            "type": {
              "vec": {
                "defined": "Transaction"
              }
            }
          }
        ]
      }
    },
    {
      "name": "ticketAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Schema version from v0 up to v255. Defaults to the `LATEST_VERSION` constant."
            ],
            "type": "u8"
          },
          {
            "name": "giveawayId",
            "type": "u64"
          },
          {
            "name": "drawId",
            "type": "u64"
          },
          {
            "name": "totalEntries",
            "docs": [
              "Total amount of entries consumed"
            ],
            "type": "u64"
          },
          {
            "name": "timeCreated",
            "docs": [
              "Initial creation date of the ticket"
            ],
            "type": "u64"
          },
          {
            "name": "entries",
            "type": {
              "vec": {
                "defined": "Entry"
              }
            }
          }
        ]
      }
    },
    {
      "name": "systemAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Schema version from v0 up to v255. Defaults\n     to the `LATEST_VERSION` constant."
            ],
            "type": "u8"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "rewardFactor",
            "type": "u64"
          },
          {
            "name": "activationReward",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitializeRewardsParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "MemberError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AccountSuspended"
          },
          {
            "name": "AccountDisabled"
          },
          {
            "name": "AccountImmutable"
          }
        ]
      }
    },
    {
      "name": "LockingError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "MaxSlotsExceeded"
          },
          {
            "name": "IndexOutOfBounds"
          },
          {
            "name": "RewardsForbidden"
          },
          {
            "name": "InsufficientFunds"
          }
        ]
      }
    },
    {
      "name": "DrawError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "GiveawayInvalid"
          },
          {
            "name": "DrawInvalid"
          }
        ]
      }
    },
    {
      "name": "HostError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "InvalidTimestamp"
          },
          {
            "name": "NoRewards"
          },
          {
            "name": "InvalidPauseAuthority"
          },
          {
            "name": "AlreadyPaused"
          },
          {
            "name": "NotPaused"
          }
        ]
      }
    },
    {
      "name": "Entry",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "V1",
            "fields": [
              {
                "name": "amount",
                "type": "u64"
              },
              {
                "name": "numStart",
                "type": "u64"
              },
              {
                "name": "numEnd",
                "type": "u64"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Transaction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Deposit",
            "fields": [
              {
                "name": "amount",
                "type": "u64"
              },
              {
                "name": "timeCreated",
                "type": "u64"
              },
              {
                "name": "timeMatured",
                "type": "u64"
              }
            ]
          },
          {
            "name": "Withdraw",
            "fields": [
              {
                "name": "amount",
                "type": "u64"
              },
              {
                "name": "timeReleased",
                "type": "u64"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "AccountStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Pending"
          },
          {
            "name": "Active"
          },
          {
            "name": "Paused"
          },
          {
            "name": "Excluded"
          },
          {
            "name": "Suspended"
          }
        ]
      }
    },
    {
      "name": "MemberTier",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Pending"
          },
          {
            "name": "Virgin"
          },
          {
            "name": "Super"
          },
          {
            "name": "Mega"
          },
          {
            "name": "Giga"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidBalance",
      "msg": "Invalid token balance"
    },
    {
      "code": 6001,
      "name": "InvalidAmount",
      "msg": "Invalid amount"
    },
    {
      "code": 6002,
      "name": "InsufficientBalance",
      "msg": "Insufficient token balance"
    },
    {
      "code": 6003,
      "name": "InvalidMint",
      "msg": "Invalid mint"
    }
  ]
};

export const IDL: RewardProgram = {
  "version": "0.1.0",
  "name": "reward_program",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "subscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "* Derive an associated token account between the signers unique\n     * program member account and the token mint. This will hold the\n     * mint tokens under management of the program with respect\n     * to the signing member and mint, much like a token vault."
          ]
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "subscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "subscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "release",
      "accounts": [
        {
          "name": "subscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "subscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "openDraw",
      "accounts": [
        {
          "name": "draw",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Draw address should be a mix of the seed, giveaway, and draw"
          ]
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "giveawayId",
          "type": "u64"
        },
        {
          "name": "drawNo",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeDraw",
      "accounts": [
        {
          "name": "draw",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Draw address should be a mix of the giveaway, seed,"
          ]
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "giveawayId",
          "type": "u64"
        },
        {
          "name": "drawNo",
          "type": "u64"
        },
        {
          "name": "seed",
          "type": "string"
        }
      ]
    },
    {
      "name": "enter",
      "accounts": [
        {
          "name": "draw",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ticket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "entries",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "entryTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "drawAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Schema version from v0 up to v255. Defaults to the `LATEST_VERSION` constant."
            ],
            "type": "u8"
          },
          {
            "name": "giveawayId",
            "type": "u64"
          },
          {
            "name": "drawId",
            "type": "u64"
          },
          {
            "name": "totalEntries",
            "docs": [
              "Total amount of entries in the draw"
            ],
            "type": "u64"
          },
          {
            "name": "limitEntries",
            "docs": [
              "Limited entries"
            ],
            "type": "u64"
          },
          {
            "name": "timeCreated",
            "docs": [
              "Initial creation date of the members account"
            ],
            "type": "u64"
          },
          {
            "name": "timeRewarded",
            "docs": [
              "Date of the last reward granted to matured tokens"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "subscriptionAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Schema version from v0 up to v255. Defaults to the `LATEST_VERSION` constant."
            ],
            "type": "u8"
          },
          {
            "name": "tier",
            "docs": [
              "Persists the tier of the greatest filled subscription slot"
            ],
            "type": "u8"
          },
          {
            "name": "status",
            "type": "u8"
          },
          {
            "name": "totalAmount",
            "docs": [
              "Total amount of tokens managed by the account"
            ],
            "type": "u64"
          },
          {
            "name": "totalMatured",
            "docs": [
              "Amount of tokens passed their first epoch"
            ],
            "type": "u64"
          },
          {
            "name": "totalReleased",
            "docs": [
              "Amount of tokens pending release"
            ],
            "type": "u64"
          },
          {
            "name": "totalRewards",
            "docs": [
              "Amount of unclaimed entry tokens"
            ],
            "type": "u64"
          },
          {
            "name": "timeCreated",
            "docs": [
              "Initial creation date of the members account"
            ],
            "type": "u64"
          },
          {
            "name": "timeRewarded",
            "docs": [
              "Date of the last reward granted to matured tokens"
            ],
            "type": "u64"
          },
          {
            "name": "slots",
            "docs": [
              "Collection of locked token deposit slots (one entry per deposit)"
            ],
            "type": {
              "vec": {
                "defined": "Transaction"
              }
            }
          }
        ]
      }
    },
    {
      "name": "ticketAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Schema version from v0 up to v255. Defaults to the `LATEST_VERSION` constant."
            ],
            "type": "u8"
          },
          {
            "name": "giveawayId",
            "type": "u64"
          },
          {
            "name": "drawId",
            "type": "u64"
          },
          {
            "name": "totalEntries",
            "docs": [
              "Total amount of entries consumed"
            ],
            "type": "u64"
          },
          {
            "name": "timeCreated",
            "docs": [
              "Initial creation date of the ticket"
            ],
            "type": "u64"
          },
          {
            "name": "entries",
            "type": {
              "vec": {
                "defined": "Entry"
              }
            }
          }
        ]
      }
    },
    {
      "name": "systemAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Schema version from v0 up to v255. Defaults\n     to the `LATEST_VERSION` constant."
            ],
            "type": "u8"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "rewardFactor",
            "type": "u64"
          },
          {
            "name": "activationReward",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitializeRewardsParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "MemberError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AccountSuspended"
          },
          {
            "name": "AccountDisabled"
          },
          {
            "name": "AccountImmutable"
          }
        ]
      }
    },
    {
      "name": "LockingError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "MaxSlotsExceeded"
          },
          {
            "name": "IndexOutOfBounds"
          },
          {
            "name": "RewardsForbidden"
          },
          {
            "name": "InsufficientFunds"
          }
        ]
      }
    },
    {
      "name": "DrawError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "GiveawayInvalid"
          },
          {
            "name": "DrawInvalid"
          }
        ]
      }
    },
    {
      "name": "HostError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "InvalidTimestamp"
          },
          {
            "name": "NoRewards"
          },
          {
            "name": "InvalidPauseAuthority"
          },
          {
            "name": "AlreadyPaused"
          },
          {
            "name": "NotPaused"
          }
        ]
      }
    },
    {
      "name": "Entry",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "V1",
            "fields": [
              {
                "name": "amount",
                "type": "u64"
              },
              {
                "name": "numStart",
                "type": "u64"
              },
              {
                "name": "numEnd",
                "type": "u64"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Transaction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Deposit",
            "fields": [
              {
                "name": "amount",
                "type": "u64"
              },
              {
                "name": "timeCreated",
                "type": "u64"
              },
              {
                "name": "timeMatured",
                "type": "u64"
              }
            ]
          },
          {
            "name": "Withdraw",
            "fields": [
              {
                "name": "amount",
                "type": "u64"
              },
              {
                "name": "timeReleased",
                "type": "u64"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "AccountStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Pending"
          },
          {
            "name": "Active"
          },
          {
            "name": "Paused"
          },
          {
            "name": "Excluded"
          },
          {
            "name": "Suspended"
          }
        ]
      }
    },
    {
      "name": "MemberTier",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Pending"
          },
          {
            "name": "Virgin"
          },
          {
            "name": "Super"
          },
          {
            "name": "Mega"
          },
          {
            "name": "Giga"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidBalance",
      "msg": "Invalid token balance"
    },
    {
      "code": 6001,
      "name": "InvalidAmount",
      "msg": "Invalid amount"
    },
    {
      "code": 6002,
      "name": "InsufficientBalance",
      "msg": "Insufficient token balance"
    },
    {
      "code": 6003,
      "name": "InvalidMint",
      "msg": "Invalid mint"
    }
  ]
};
