export type Subscription = {
  "version": "0.1.0",
  "name": "subscription",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "memberAccount",
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
      "name": "exclude",
      "accounts": [
        {
          "name": "memberAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "memberAccount",
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
        },
        {
          "name": "clock",
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
          "name": "memberAccount",
          "isMut": true,
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
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "memberAccount",
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
        },
        {
          "name": "clock",
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
      "name": "entryClaim",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "beneficiary",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "memberAccount",
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
            "name": "status",
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
            "name": "totalLiquidity",
            "docs": [
              "Amount of unlocked token liquidity"
            ],
            "type": "u64"
          },
          {
            "name": "totalVouchers",
            "docs": [
              "Persists the total amount of vouchers accrued minus redeemed"
            ],
            "type": "u64"
          },
          {
            "name": "totalEpochs",
            "docs": [
              "Number of epochs the subscription has been enabled"
            ],
            "type": "u64"
          },
          {
            "name": "timeCreated",
            "docs": [
              "Initial creation date of the members account"
            ],
            "type": "i64"
          },
          {
            "name": "timeRewarded",
            "docs": [
              "Date of the last reward granted to matured tokens"
            ],
            "type": "i64"
          },
          {
            "name": "slots",
            "docs": [
              "Collection of locked token deposit slots (one entry per deposit)"
            ],
            "type": {
              "vec": {
                "defined": "LockedSlot"
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
      "name": "LockedSlot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "docs": [
              "Amount of tokens deposited"
            ],
            "type": "u64"
          },
          {
            "name": "timeCreated",
            "docs": [
              "Unix timestamp of the initial deposit"
            ],
            "type": "i64"
          },
          {
            "name": "timeRewarded",
            "docs": [
              "Unix timestamp of the last reward granted"
            ],
            "type": "i64"
          },
          {
            "name": "enabled",
            "docs": [
              "Indicates recurring lock period"
            ],
            "type": "bool"
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
            "name": "ImmutableAccountStatus"
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
      "name": "SystemError",
      "type": {
        "kind": "enum",
        "variants": [
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
      "name": "InvalidMemberPool",
      "msg": "Invalid Member Pool"
    },
    {
      "code": 6001,
      "name": "UnauthorisedMemberPool",
      "msg": "Unauthorised Member Pool"
    },
    {
      "code": 6002,
      "name": "InvalidBalance",
      "msg": "Invalid token balance"
    },
    {
      "code": 6003,
      "name": "InsufficientBalance",
      "msg": "Insufficient token balance"
    },
    {
      "code": 6004,
      "name": "InvalidEntryAddress",
      "msg": "No Matching Entry to Withdraw"
    },
    {
      "code": 6005,
      "name": "InvalidOwner",
      "msg": "Entry Owner Key Mismatch"
    },
    {
      "code": 6006,
      "name": "InvalidWithdrawTime",
      "msg": "Withdrawal period not reached"
    },
    {
      "code": 6007,
      "name": "IndexOverflow",
      "msg": "Withdraw Entry Index OverFlow"
    },
    {
      "code": 6008,
      "name": "LackLamports",
      "msg": "Insufficient Lamports"
    }
  ]
};

export const IDL: Subscription = {
  "version": "0.1.0",
  "name": "subscription",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "memberAccount",
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
      "name": "exclude",
      "accounts": [
        {
          "name": "memberAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "memberAccount",
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
        },
        {
          "name": "clock",
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
          "name": "memberAccount",
          "isMut": true,
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
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "memberAccount",
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
        },
        {
          "name": "clock",
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
      "name": "entryClaim",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "beneficiary",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "memberAccount",
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
            "name": "status",
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
            "name": "totalLiquidity",
            "docs": [
              "Amount of unlocked token liquidity"
            ],
            "type": "u64"
          },
          {
            "name": "totalVouchers",
            "docs": [
              "Persists the total amount of vouchers accrued minus redeemed"
            ],
            "type": "u64"
          },
          {
            "name": "totalEpochs",
            "docs": [
              "Number of epochs the subscription has been enabled"
            ],
            "type": "u64"
          },
          {
            "name": "timeCreated",
            "docs": [
              "Initial creation date of the members account"
            ],
            "type": "i64"
          },
          {
            "name": "timeRewarded",
            "docs": [
              "Date of the last reward granted to matured tokens"
            ],
            "type": "i64"
          },
          {
            "name": "slots",
            "docs": [
              "Collection of locked token deposit slots (one entry per deposit)"
            ],
            "type": {
              "vec": {
                "defined": "LockedSlot"
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
      "name": "LockedSlot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "docs": [
              "Amount of tokens deposited"
            ],
            "type": "u64"
          },
          {
            "name": "timeCreated",
            "docs": [
              "Unix timestamp of the initial deposit"
            ],
            "type": "i64"
          },
          {
            "name": "timeRewarded",
            "docs": [
              "Unix timestamp of the last reward granted"
            ],
            "type": "i64"
          },
          {
            "name": "enabled",
            "docs": [
              "Indicates recurring lock period"
            ],
            "type": "bool"
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
            "name": "ImmutableAccountStatus"
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
      "name": "SystemError",
      "type": {
        "kind": "enum",
        "variants": [
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
      "name": "InvalidMemberPool",
      "msg": "Invalid Member Pool"
    },
    {
      "code": 6001,
      "name": "UnauthorisedMemberPool",
      "msg": "Unauthorised Member Pool"
    },
    {
      "code": 6002,
      "name": "InvalidBalance",
      "msg": "Invalid token balance"
    },
    {
      "code": 6003,
      "name": "InsufficientBalance",
      "msg": "Insufficient token balance"
    },
    {
      "code": 6004,
      "name": "InvalidEntryAddress",
      "msg": "No Matching Entry to Withdraw"
    },
    {
      "code": 6005,
      "name": "InvalidOwner",
      "msg": "Entry Owner Key Mismatch"
    },
    {
      "code": 6006,
      "name": "InvalidWithdrawTime",
      "msg": "Withdrawal period not reached"
    },
    {
      "code": 6007,
      "name": "IndexOverflow",
      "msg": "Withdraw Entry Index OverFlow"
    },
    {
      "code": 6008,
      "name": "LackLamports",
      "msg": "Insufficient Lamports"
    }
  ]
};
