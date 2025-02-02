import { setup, assign, fromPromise } from "xstate";
import {
  type OnboardingContext,
  type OnboardingEvents,
  NetworkStateKey,
  WalletStateKey,
  MemberAccountKey,
  SolanaBalanceKey,
} from "./types";

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  fetchSolanaNetworkConnection,
  checkSolanaBalance,
  checkMemberSubscription,
  initializeAccount,
} from "./actions";
import { prettyAddress } from "@/utils/string/prettyAddress";

const isDev = !import.meta.env.PROD;

const LATEST_VERSION = "1.0.0";

const MINIMUM_SOL_BALANCE = 0.98;

export const memberOnboardingMachine = setup<
  OnboardingContext,
  OnboardingEvents
>({
  types: {
    context: {} as OnboardingContext,
    events: {} as OnboardingEvents,
  },
  guards: {},
  actions: {},
  actors: {
    connectWallet: fromPromise(async ({ input }) => {
      console.log("Attempting wallet connection", input);
      const wallet = input.wallet;
      await wallet.connect();
      return wallet;
    }),
  },
}).createMachine({
  /** @xstate-layout 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-gxmK9N+qjcFtbTuEU06bhkoLW+C5-undxi10Q5c1rzY3EGQ2Lt0JkIqVnZ5LNbZ5uzoxipFsLYJlx+DXGatBJgBhgiSHmbSdRwpypZc1OrZ8sStOXcwZJz9vG+ziWkM1Ztcy9dqH4YyfRz3SLlmHdxcIlefdeMXpsIFcZpNWNlmjse2oRBd1JOntIUsRI5+tiETNCyfGSa4ayfGbq7b+edC-EtKgPbtXAvRGYIfjg13r9aaRkNg4+RZC0OpswywAPtC4H0MYcw1h7CQEO4seImPNi4-jl3GWzcSZzYu3TKnwBaaM8gPdZouhOjGBF9vlHqxkjy++m5jl1MfG9wBn9y3oPsBMjVGqBQQQFAwA+LD-z5tkfnel7weuKT3VKkFf6oGXcGk6skpwGS4QDuisjN1TyjFW+e3MzmmM1cu4-TTatxjWtkrAXNJPtSg5F-OUckb8DV1w-ojUcVhVj8v9yUFVdk5V-9w9V8dUgCJlb8ERK0sl9xGg0xIx+oXYoD-kwUHhiBHxYlgVTktUPNbtkDuVUCQD0C0xNIUx7ZIxRsVICDSUiDZ84l0t2tECF1ppADaDHl6Cxw8DkIEoCtO5JotI39DsP8qJrUGxbU6ESciF7o-UO48sg1vRcI9cdwxpJwJl2D38VF6QlDF9W8f8AlQ9VD+CbQfpxpNCA0EpbZdDQCdJU4MI5xjY0JBZNw6sLCVDs8GInUXUFBOIKByAih7A1Ce1nDtC3CQ10I20MIK9ZIs4EI5D0MrNjsgjW9a5oiiB7Budl4zBVcV8F1HCRlvQtDA0kjkp+VbZW5FxQs+o-tTCiU9B8ig9CiIAYiVc4inDaiXCdCQ0X4P5EIjDHYEc2dOim9mBuCLIYU4UOAScLYskRjEjg03tRtus0IFwZcEo-Q6sli6AVUWV1jYwaj-Vtj3D0DsIkJkwEI0IfCgwGM6smw8M1pz17CIMEI21I5QsNJq8iEplBZU4DYK8MdjY41AggA */
  id: "MemberOnboardingFlow",
  /** @xstate-layout N4IgpgJg5mDOIC5QFkwFsBGYBOB5AdhgPYCG2EAlvlAGIA2RA7gHT5gAujR2A1gMJF8bAMbsKg5rHZl2AoWFHj8AYgiCwzKgDciPDcMEj2AdQrsAFgGUidEvhIBtAAwBdRKAAORWGaXuQAB6IAEwAHABszACc4U5RAMwALIlOAIypAOwxADQgAJ6IqfEZkRmhAKzlieGpUXHhUYkAvk25qJg4BMRklNT0TKwcXLxyRkqS0tiyhgpigso42NzMHrbsAGbcaMwG8qKmFta29s5uSCBePnP4-kEIYZExcUkp6VnhuQUIqYmh8czxMLlOIZYEZOItNroLB4QikchUWgMFiMEh0OgcSwcACuHlU6gmJHYGnaMK68N6SIGqPRmJxHlO-kuvkEt0QoTSzFSaXKxVS4WCiXiUVSn0K3NCzBSoVCmTKjVSvMhIFJnThPUR-RRaIx7Cx7FxyhpupoJAoGIgjPOzOubIQHNSXJ5fIFQpFYu+wsdoWCDyiESyiqiytVsO6CL6yMkNjsJAAQmi7MJ9OYFDxEQnjsnlBhE-hk3xU8I9JbXEzvCybuc7ul4pKisEMqDYuFyqEoh70rFmO9QolufFW8EohkQ9C1eHKVro8d43nkzsi+nqJmk2Ac-OwIW05AHKkzp4K7bq+K61zAU3yi22x38oVglfmE5ysEnIlh7Fh0Kxx0wxTNVGsAxvYq75hoHjYtgwjmCQsBgEcsbKBBUEwXBEAIScZbWkefgnt87blMw4SJOUJSJCUI6yreXzcikAJ1OUIrxMUTiDvEP5kuqEZUiwQGzqBC65lmYAADJMDm2J5Mg3BgFah5XLhoA1gRREkWRFFlLUnapH8zDlDptS+v6IoRBxE7-pGAxoOO2AAILCAY2L4Owi5poi9mOc5ygkA5RBOewAByRDsAAkvgvhohQABeu5YfJlZ2g+-x1k4r5OOEPpOGkwQfHeCAvokPbxFl-I8lEvLlGZf4apZLDWb+Hl+c5rnFu5vn+d57XOWFEV0NFsUHhcOGsnhSUAhyaUZWlqQ5Z2jTRJUGSCuEDSvit7GtCqNnkjVPHMPVMKNf5mjhWIkVRW1nnsMoVC9dFRJKGJJCUnJQ0KSNSmIDUhFOFk-bSqxbwev2ThEZkmQClEy0kRtUK-jt3HTgdOBHc1t1nX1F3UKj13oxQ50PYIljYg5cCwK9NqKYEiAxMEPbvkGXbCoOHrApK-ZQy+xUZcklWbaGCNTlGyN2V1Ll4+dl1Nbjp345jhP4Ka5qQbJcVvQleGkY8wQ6eEJTthkwrBB68SKgCNQjkKGUNFEwb89tXFC1ZNk4ydd1Y1AOM3bLBPXErdAq3ug2Ux91MILT9M64xTMJLlXyVFERGxKRaSyn8WRVYLAEDOwuhgPgAnrs9YAAI7YhwYCFxTw1Vp9CB1v84OhOCfbNxUioen2hUt8VJE6+k6QtJt+BEBAcD+ALjvZ4w5bvbXYcALSCh6S+FVl68bxvsNbfDU+1YMnDcPwMyKKHIfz3cy95TNv3MO2MrDix8SMcEmd73tbCHyMJ-XISUyjLMKm587TpEKkkYoiQEg5RiO+aihQUoAhmjKQ2kCMi1HCG-Sc08D7DGPnsX+2AODYDyIiABp957AM1j8aI-JWxpAaO+AUnZfiOmKstDKL4BQZUwRZD+Qwj5kN-rsMYggACiUgSAYD6rAVMEBZ4azrvpQqIoVrAn5I0HKxtr7FH+PpWIip14ymSDw3a05P64MEeMYRgDBD+0gPI48dclqdn0o6fRjQOSeMbKOe2u8sH72NHSA0HgHFUzuO+bSr49K22fiDTROUTGI0AsBOcwlQmhzuAbJ8S1kF8llI2D0dRJSgibA6daxjfGcX8XtPisZC4tWXFAQu6SL40xItksIzc8kzQyJ2N8koobJBInrFIpsMGVPMqY5J-FNwrEgtBWC8EUktMSk4PszAcqVCtuEQEV54h9N+ERZixElq1AiKRRJTteIpPqUJNcYkZ7YTniAt00RGgZBSNNRsiRtI1D0oKcEQpkh60qJc7BtSQKzNgNidY6wKDCAoPndgzSnkKLDj8YUbzyKfJKt8zs3iiJMUhpRYcYL94ixxis0aPy8o7IBEZIokD27vlCGSvaFKxYNKlv5KlTitHxx0lKEoVRsVtyVBM6qSTnYNU5RLTG3LnK8rDuRUGJRirchmv2Riz5WbcjvktYoPp+QMr5nDKpvCkYu05ZI7goUfby0cerR1NZGyJ0qK+YcMRiI+n5YgBOd9fSpRFHs5+qQ2WWplVdZgcLwoyPsai5194sh6RfEGr1vxfSs05MxQU5FwQ7KFKxcNUZc56ALpuJVl8aVfGIoRfkKQUhoLrD6bek9qnTlLfnep0E3IrgrQmsJiBnF5SyKDEcrZn4rWCM2u2ZrJlSpYJ28twlmCELLnAdgtkKDkCWCEgdGSh2+vtAkHsJQ0j1H9BbYtOc87LrXMwM0O6iAeAAEoKDABQLQ8b4qJu+DlKUv1KjFBqBlNIHpDZ01+A0KoOtp0xFNTvc1Uyb1lvqY+iAu67FyP3a0z0koso5TWa+Os1ReSFJiHpUEUHvHMV+NelgMa0TE1JrAeAOG7SkTps+V8aDIHcnKJ3HWQqGw+g+ecsNEqs770Y3Qf2KtK002BERNBfZ9a5o+Z2L0AJfq5qMc+ZuQ8mhAA */
  context: {
    version: LATEST_VERSION,
    network: null,
    wallet: null,
    wallets: [],
    balance: 0,
    maxAttempts: 3,
    retryAttempts: 0,
    initializationAttempts: 0,
    blocks: [
      {
        key: "connecting",
        lines: [
          " __       ________ __     __ ",
          "|  \\     |        \\  \\   |  \\",
          "| ▓▓     | ▓▓▓▓▓▓▓▓ ▓▓   | ▓▓",
          "| ▓▓     | ▓▓__   | ▓▓   | ▓▓",
          "| ▓▓     | ▓▓  \\   \\▓▓\\ /  ▓▓",
          "| ▓▓     | ▓▓▓▓▓    \\▓▓\\  ▓▓ ",
          "| ▓▓_____| ▓▓        \\▓▓ ▓▓  ",
          "| ▓▓     \\ ▓▓         \\▓▓▓   ",
          " \\▓▓▓▓▓▓▓▓\\▓▓          \\▓    ",
          "\n",
        ],
        align: "center",
      },
    ],
  },
  initial: "missionObjective",
  states: {
    missionObjective: {
      id: "MissionObjective",
      initial: "outlineProject",
      states: {
        outlineProject: {
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: "outline",
                lines: [
                  "Project:       LambosForVirgins",
                  "Symbol:        $VIRGIN",
                  `Mint:          ${prettyAddress(import.meta.env.VITE_MINT_ADDRESS)}`,
                  "\n",
                ],
              },
            ],
          })),
          after: {
            "500": "outlineObjective",
          },
        },
        outlineObjective: {
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: "objective",
                lines: [
                  "Objective:",
                  "The virginity pandemic is in full effect and the world's population is in decline.",
                  "\n",
                ],
              },
            ],
          })),
          after: {
            "500": "outlineMission",
          },
        },
        outlineMission: {
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: "mission",
                lines: [
                  "Mission:",
                  "Cure virginity, one lambo at a time.",
                  "\n",
                ],
              },
            ],
          })),
          after: {
            "500": "completeMission",
          },
        },
        completeMission: {
          type: "final",
        },
      },
      onDone: "networkConnection",
    },
    networkConnection: {
      id: "NetworkConnectionFlow",
      description: "Establishing an RPC connection with the Solana blockchain.",
      initial: "startConnection",
      entry: assign({
        blocks: ({ context }) => [
          ...context.blocks,
          {
            key: NetworkStateKey.Loading,
            lines: ["Dispatching distress signal..."],
          },
        ],
      }),
      states: {
        startConnection: {
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: NetworkStateKey.Connecting,
                lines: ["Connecting to Solana..."],
              },
            ],
          })),
          invoke: {
            id: "connectWithSolana",
            input: (context: OnboardingContext) => context,
            src: fromPromise(fetchSolanaNetworkConnection),
            onDone: {
              target: "connectionEstablished",
              actions: assign({
                connection: ({ event }) => event.output,
              }),
            },
            onError: {
              target: "retryingConnection",
              actions: assign({
                connection: null,
              }),
            },
          },
        },
        retryingConnection: {
          target: "connecting",
          entry: assign(({ context }) => ({
            retryAttempts: context.retryAttempts + 1,
          })),
          on: {
            FAILURE: {
              target: "connectionFailed",
              guard: ({ context }) =>
                context.retryAttempts >= context.maxAttempts,
            },
          },
        },
        connectionEstablished: {
          type: "final",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: NetworkStateKey.Connected,
                lines: ["Connection established!"],
              },
            ],
          })),
        },
        connectionFailed: {
          type: "final",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: NetworkStateKey.Failed,
                lines: ["Failed to call Solana :("],
              },
            ],
          })),
        },
      },
      onDone: {
        target: "walletSetup",
      },
    },
    walletSetup: {
      /** @xstate-layout N4IgpgJg5mDOIC5QHcCGAbdYAuBaWOArgA64C2qAxgBYCWAdmAHToD2qEDUA6hltrADEEVoyYMAbqwDWzNJhz4ipCjQbM2HLrwUCEk1pVTZaogNoAGALqWriUMVaxaJ0fZAAPRLgDMPgBxMAExBAIwA7ACcAGwBoZEhQQA0IACeiKEWQUz+8QAsFtHh-kF54eXRAL6VKfL8Stgk5FR0YpywxOioqdp8OEJ1OADKYFiU2JC27o7OrvTuXgi4QQCs2RY+G5GhKxah-pHh0Xkp6QhxTDs+kbmFfllVNSCDeASNKi3qTJSijOO9ukELwAwr8wONJtZpk4XKZ5khPN5rkw8j5ov5wj4jkFcrFQqdEHlInkcqE8qijptwnl4o9an1XspmmoxD96H8TPQeAzBGyOXCAGKoWhYCBTBEzWFuBGLXB5aKhFEJYk+TJ5EIWfwEhArCJMFY+FbFfwHVWqoLVJ70VgQODuF4NJqqVpgaGzOELby7SJKoIqtUarVpbz7En+Y47DEUhLhar03SOj4sjTsThcnT8eASmFzT1LVXRS4rY44zVZG7a3AG4JmspG1UWDYrOPPBmJ5kupjtTrdAGZt1S+GgWU+II+S4YopRdEGyI+bVBBVMTHRDaj-x5E0rOcth1vJ2fVlg-7phkD3My7yLixMQrq3bRILhUKj6La3XhS6HUrFIqPkq7m2+5Jp2LwAEpgBwZwODmHqXvmgSouqxxrCsJSLm+wYIBGt7RJEFiRAaBQYXkgEJsBHZfC8QoipA55wcO3h5GhTCEQE-h3sxxT4lhOGFPhbHEdExyWpUQA */
      id: "wallet-setup-machine",
      description: "Select and assign a wallet to the wallet provider context.",
      initial: "loadingWallets",
      context: {
        wallet: null,
        wallets: [],
      },
      states: {
        loadingWallets: {
          description: "Loading the available wallet adapters.",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: WalletStateKey.Loading,
                lines: ["Begin wallet setup..."],
              },
            ],
          })),
          invoke: {
            src: fromPromise(() => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve([
                    new PhantomWalletAdapter(),
                    new SolflareWalletAdapter(),
                  ]);
                }, 1000);
              });
            }),
            onDone: {
              target: "displayingWallets",
              actions: [
                assign({
                  wallets: ({ event }) => event.output,
                }),
              ],
            },
          },
          on: {
            DISPLAY_WALLETS: {
              target: "displayingWallets",
            },
          },
        },
        displayingWallets: {
          description: "Displaying the available wallet adapters.",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: WalletStateKey.Displaying,
                lines: ["Please select a wallet below"],
                options: context.wallets.map((wallet) => ({
                  key: wallet.name,
                  label: wallet.name,
                  value: wallet.name,
                  event: "SELECT_WALLET",
                })),
              },
            ],
          })),
          on: {
            SELECT_WALLET: {
              target: "connectingWallet",
              actions: assign(({ context, event }) => {
                const wallet = context.wallets.find(
                  ({ name }) => name === event.wallet
                );
                console.log("SELECT_WALLET Event", event, wallet);
                return { wallet };
              }),
            },
          },
        },
        connectingWallet: {
          invoke: {
            id: "wallet.connect",
            src: "connectWallet",
            input: ({ context: { wallet } }) => ({ wallet }),
            onDone: {
              target: "walletReady",
            },
            onError: {
              target: "walletFailed",
            },
          },
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: "wallet.connecting",
                lines: ["Connecting wallet..."],
              },
            ],
          })),
        },
        walletReady: {
          type: "final",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: "wallet.ready",
                lines: ["Wallet connected!"],
              },
            ],
          })),
        },
        walletFailed: {
          type: "final",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: "wallet.failed",
                lines: ["Failed to connect wallet."],
              },
            ],
          })),
        },
      },
      on: {
        LOAD_WALLETS: {
          target: ".loadingWallets",
        },

        CONNECT_WALLET: {},
        DISCONNECT_WALLET: {},
      },
      onDone: "solanaBalance",
    },
    solanaBalance: {
      description: "Checking if the Solana wallet balance is above 0.05 SOL.",
      initial: "loadingBalance",
      states: {
        loadingBalance: {
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: "loadingBalance",
                lines: ["Measuring pocket depth..."],
              },
            ],
          })),
          invoke: {
            id: "balance.loading",
            input: ({ context }) => context,
            src: fromPromise(checkSolanaBalance),
            onDone: {
              target: "sufficientBalance",
              actions: assign(({ event }) => ({
                balance: event.output,
              })),
            },
          },
          on: {
            BALANCE_CHANGE: [
              {
                target: "balanceLow",
                guard: ({ event }) => event.balance >= MINIMUM_SOL_BALANCE,
              },
              {
                target: "sufficientBalance",
                guard: ({ event }) => event.balance < MINIMUM_SOL_BALANCE,
              },
            ],
          },
        },
        checkingBalance: {},
        purchaseSolana: {
          on: {
            PURCHASE_SOLANA: "checkingBalance",
          },
        },
        balanceLow: {
          description:
            "Suggesting the user to buy more SOL as the balance is below 0.05.",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: SolanaBalanceKey.Low,
                lines: ["Balance is lower than 0.98 SOL required."],
              },
            ],
          })),
          on: {
            PURCHASE_SOLANA: {
              target: "purchaseSolana",
            },
          },
        },
        sufficientBalance: {
          target: "memberAccount",
          type: "final",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: SolanaBalanceKey.Sufficient,
                lines: ["Deep pockets detected!"],
              },
            ],
          })),
        },
      },
      onDone: "memberAccount",
    },
    memberAccount: {
      id: "MemberAccountManager",
      initial: "checkingExists",
      description: "Checking if the member account is initialized.",
      states: {
        checkingExists: {
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: MemberAccountKey.Checking,
                lines: ["Calling the GigaLord..."],
              },
            ],
          })),
          invoke: {
            id: "member.check",
            input: ({ context }) => context,
            src: fromPromise(checkMemberSubscription),
            onDone: {
              target: "initializingAccount",
              actions: [
                (context, event) => {
                  console.log("Check Context", context, "Event", event);
                },
              ],
            },
          },
          on: {
            INITIALIZE_SUBSCRIPTION: {
              target: "initializingAccount",
            },
            SUBSCRIPTION_EXISTS: {
              target: "finished",
            },
          },
        },
        initializingAccount: {
          description: "Initializing member subscription account.",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: MemberAccountKey.Initializing,
                lines: ["Initializing account..."],
              },
            ],
          })),
          invoke: {
            id: "member.initialize",
            input: ({ context }) => context,
            src: fromPromise(initializeAccount),
            onDone: {
              target: "initializingAccount",
              actions: [
                (context, event) => {
                  console.log("Initialize Context", context, "Event", event);
                },
              ],
            },
            onError: {
              target: "abortInitialization",
            },
          },
          on: {
            SUBSCRIPTION_INITIALIZED: {
              target: "finished",
            },
            INITIALIZATION_FAILED: [
              {
                guard: ({ context }) =>
                  context.initializationAttempts < context.maxAttempts,
                target: "initializingAccount",
              },
              {
                guard: ({ context }) =>
                  context.initializationAttempts >= context.maxAttempts,
                target: "abortInitialization",
                actions: assign(({ context }) => ({
                  initializationAttempts: context.initializationAttempts + 1,
                })),
              },
            ],
          },
        },
        initializationLoading: {
          target: "initializingAccount",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: MemberAccountKey.Pending,
                lines: ["This may take a few moments..."],
              },
            ],
          })),
        },
        abortInitialization: {
          target: "finalFailure",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: MemberAccountKey.Terminate,
                lines: ["Initializtion attempt failed."],
              },
            ],
          })),
        },
        finished: {
          target: "tokenBalance",
        },
      },
    },
    tokenBalance: {
      initial: "checkingBalance",
      states: {
        checkingBalance: {
          description: "Airdrop tokens to the member's wallet.",
        },
        requestAirdrop: {
          description: "Airdrop tokens to the member's wallet.",
        },
        airdropReceived: {},
        airdropFailed: {},
      },
    },
    finalSuccess: {
      type: "final",
      description: "Member onboarding completed.",
      entry: assign(({ context }) => ({
        blocks: [
          ...context.blocks,
          {
            key: "finalSuccess",
            lines: ["Beginning mating call..."],
          },
        ],
      })),
    },
    finalFailure: {
      type: "final",
      description: "Handle errors bubbled up from substates.",
    },
    complete: {
      type: "final",
    },
  },
});
