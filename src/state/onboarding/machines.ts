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
  loadWalletAdapters,
  openRaydiumExchange,
  waitForFocus,
  completeAuthentication,
} from "./actions";
import { prettyAddress } from "@/utils/string/prettyAddress";

const isDev = !import.meta.env.PROD;

const LATEST_VERSION = "1.0.0";

const CREATE_SUBSCRIPTION_ACCOUNT_RENT = 0.00151,
  CREATE_TOKEN_ACCOUNT_RENT = 0.0021,
  NETWORK_FEE = 0.00016;

const MINIMUM_SOL_BALANCE =
  CREATE_SUBSCRIPTION_ACCOUNT_RENT + CREATE_TOKEN_ACCOUNT_RENT + NETWORK_FEE;

const promptCopyMapping = {
  network: {
    [NetworkStateKey.Loading]: ["Dispatching distress signal..."],
    [NetworkStateKey.Connecting]: ["Connecting to Solana..."],
    [NetworkStateKey.Connected]: ["Connection established!"],
    [NetworkStateKey.Failed]: ["Failed to call Solana :("],
  },
  wallet: {
    [WalletStateKey.Loading]: ["Begin wallet setup..."],
    [WalletStateKey.Displaying]: ["Please select a wallet below"],
    [WalletStateKey.Connecting]: ["Connecting wallet..."],
    [WalletStateKey.Ready]: ["Wallet connected!"],
    [WalletStateKey.Failed]: ["Failed to connect wallet."],
  },
  balance: {
    [SolanaBalanceKey.Loading]: ["Measuring pocket depth..."],
    [SolanaBalanceKey.Link]: ["Opening Raydium exchange..."],
    [SolanaBalanceKey.Low]: [
      `Balance is lower than ${MINIMUM_SOL_BALANCE} SOL required.`,
    ],
  },
  member: {
    [MemberAccountKey.Terminate]: ["Initialization failed.", "Aborting..."],
    [MemberAccountKey.Finished]: ["Account initialized."],
  },
};

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
  /** @xstate-layout N4IgpgJg5mDOIC5QFkwFsBGYBOB5AdhgPYCG2EAlvlAGIA2RA7gHRoWywVH64YBWYAMYAXCgDcwAYgjcwzWMJLC5qTDgLEylavSat2nbrwEjxYANoAGALqJQAByKdR3OyAAeiALQAmSwHYAVmYfADZ-SwCAZlCogEZAn0CAGhAAT0QATiiADmYc-yCwqPj-KMy4gF9K1NUsPEJScipaBhY2Di4efiFRCWYiAFdhOiowAAVsIhNhSXcFJTkSADNlbAAKQMiASkk69UatFt12gy7jXrMB4dH8CamZq1skEEdnLrdPBF9LHODMwIRQKhUI5OJ+MKpDIIHz+AAsIThOQCvwShUB1Vq6HqGia2laeg6hm6MyuQxGYwupgkcwWymYKzWmx2e2xB00zR0bX0nSMPWpcnJtzAVL6FhsbjeFBc+E+3j8f2YAKBILBENCUMQcP8mWYOu1cN+oS2ysxIH2DQ5+JOPOJorJNzGyDO3FpinpjJwzMsuwtuKOXMJLpJl36Qqdwaekqc0o+Ly+P0VysswNB4MscX8moQoUyuqillhcMyuaC8TNfsOnIJLDuwkYRGwAGsAMLcO6mV0yO7yd0qNmWvHHbl1hvNtv4DsyqMvKUyuXfOKq5hGgE+AqhHzg7OhOGhJXInJ54sgxKZCsD-3Vm2jxut9uXbi9sjCCdTrrSWTMKhiIhNuSCA+IgAOrSgAFgAykQdAkPgJAzg4MbzvG3gJIkzChJYmRwnCgRxHuebYdm6b+CuWxgpEESZD4W4Xmog4BjWzC3uOQEys+2CvmxH44FM2DMPYMHCMsjZoMwgGTr0oHCJB0GwfBEqzkhcagAmW7xMwgQ5DkmFhHEcSWHCcTEX4pEpqilFYTRVQ1Oal5VtaI5gPWd5vo++DMNgznYGkLRuZ2+CSDQACCACSAAyACqABKACiCGvMprgod8W7ghhxbIr865lJmxGJME4IFBER7ItqoR0TiDnDnojAkHQdDORBzmDPYn49nS-b0Vejm1fVjXCM1witQlc4qR43j+D4uqhHEOnFoUvz+KCxE4aRgS4TRMTrqCgSVeyQ6BiwdUNU1LX2MwDAkPiwH9c5sDtXIP5-l1VVWjVx13YN52XaQN1fbACDPYIShdE8o1JbKKVePpPhRCEAKgsthaGvh2ZIgiJYxAWxq7rE+0Mde3InQNQ2tb910tLdp3CA9AAioUQeM4XBQAmgA+sBwXheFsUACoQRD7zJap3hwkkmmxJkORItNsTauj0sYdZpWYeL562ZW71HcwJNncNF2ULAgkkL51DUwND0QbFvMtnznPc7zfNC7GIsTd8ZS6nEJT+AkUT+AUGZwtmi3MMWGYoym0tGQTPUfbrX1kxdEnvubX2Pd++C-v+Cc0+JbEu8hovfHucT5PEMvTUHuTAsRBm6nmZS7r8mSWOUsfVTrevfQb+eSaYac05IvGNgJQkidgYnd33U6F+NCYGT4CLFUiS6GdpkLpIg+lYUqmRN4aR5txrWLdZ3TGwHJcEAEL1bBghSN2cidcwWuHRfV8kLfMH4A-c9u18OaeR8LUTVnuEo+lg5bwQHEbClgVwVFyEieEMQA4d21h-H+X876-zkFdfE3976Py-M9HOGAcEPwpvif+UNi4wyjnqQ0WMCwyxyJvaEc1xb5ECCULcOFch8PQe-G0l8sGENwcwMAYh6qDEWOIh+kgaELnoXDJUfhQTGnAcqbMplgjIkIiWfeQRwhCMYiIz+8i5BSJkXIihUhzBxGeIhYWtD3ZeD+AiJEvxAh4RiEuGiOiAh6KwoRUsxj-CmKJnoUR8lLECUGNgQQYESCwDAFBLBkhxgxRbAACWCtbdmEFcAswAHLBSUdDMo8NiwJHFvEOGc0ojETzNUpE2QMxbDhFEJEkTeosBiTfOxzByE-wfuFJgmTsl5IKUU0p5TFLONdq4hMuEy54SRICf2BYNoy0CcWDChZ64b3CCfOyZ8ME2jQAOYKghAKDHwMIcSYEhBNhaLFdw7BaYZ1IXIK59EnkvIqcXARmlirlEwoEVuKZ0aAhCCUSFR4dRwx1BEzW9kLncj+fUG5dyHmZ1jPVCgAAvFoOKhgPO+VnF6rABz4tEISol4onGJRcQuHUeQ-Bt2WovNcKRoGxHWt02asDMzlDCL0+OWKcBkvuY8qgBLRgkuoDKilI9+Im2EqJGl-z5X0sVUy6MrKUrYU0uuTMxpsJry0iHE15RUGsI2lLCVOspXYBVY86xdBZHKHeQ-ewMpFELJZUshcIIES+1VDpbSs0KjZmog3bCOQtmJBYai0+b1hGYuubc8lHrpFesWL6sA-qPwOOZWNABiAw16iXKCKNOkRVxoKMweI6zpYpqWs6pirr3WSPzd6sARaS2unMD4ctkNQ27hrZGutMbjLQIMjhDCURHVww7QULtNphAvXwJYjOL835mO5Nu-8u67FAvdrEeGmz9JwOKr8QJIJ8gozzOEDa1Fqi2XwEQCAcA3CHqiYwQ1IboY0VhKCnShZhWGXndCGGCJCwVF0iaLS+EfCbsxcGe0EhgNFzcVuIIep43xqCEhjU0CygI39j4gEAJ9L+ww0GXkIYBTXApHcSY0xei4fnvKAy8Cl4oPKD47pTSF2YQwrW0E2UI0y0Y6cZj2HBSOjuEpnjlbUoGVIrhHCPCthTVmtmFdpE-jhADoUNh2N5O2nOPyMUbHhTOmY+p5ZfHIj5D8N07UARdx8uhMCYIsIMxFm2bhNNZyM1HqY3aOzVxAJoEEs5MATniQueUVucDSK8zTVI7W7MyIfAtvCH8MIuENq-Gsyxe8-c8MVtc5pnUEHdLQaMsRGDYcSiaKXrmU5AG+nMWcmOar74nwLE4v5WrE7oZzQluCAjaYwQsJMvpcubDprgiiN1yrg3XLcSfF5YQPk-J7dcXV9L+k8hbDCMaeIrcYjEVyGXJIm4sKYQSEmmy6aDpRdrDt1iNWugz3crFBYGBRiwGeRANL03gS6hooadcW5Nx4WIsaPIm4lxdIzDLPMe00XnMzXoKrE3Acp3cjQEgFBGpQ6UkauhGWOWzUKPvbUSQxMcNiIVksiOSyxHCJYCq+PIuAdzqTc60O6H6V9gjYEG5I5owXbhIrvsPEC7Q9paz3ck5UKpgDCXbiA77m9q3LSyKQFZmgbCfcBjygRE9nJoX32Rda5+kbE2ZsoAW3uvrhMOp4aZgjmw32LDYNVpTHvb24R9I9Y147wm-WXe9zJwPT3X0ffeEPEqQEiM5qJG9lA6ErddR7hytRZEm2GNx7jl3ROP1u7RTANdaEiy8MrKXUkeEZVcZdJ8CZJe+QpdlCsoZFdmva+927hTqnkB0+LgzKREoJXZri1gWCPvy9B8FmoiPvHX34-xwGdg0ZYBZ8wwSPuLpBQNrgj3GtfKXSQhLjuzG9t4W+sH4sUM-BLRLGn8XYVwyQEAXTbbxWBVHeEfIBaOGY+bCNBKvc+cxMRIZT1AdX-WnEDSXQyI3MvWELSWaI8XvBdFpZgHeVfYsPwUBazQ-OJewBJJJFJNJT+U-X2BDXcJENbYsPcC3DhHSeGMoGiDMFdWAyvPfavTBWJIZEZIhcZIDdA1vVCAyPIS-IIIybrO-S3ThMOfCeaXMMLdDeAjFaJT-Y-eQQYZYZYCgQQCgMAB5NAlvXjD2AOFcXCeIYsaWRQzIHRbrA5CoKpFnTbazHtHNWVWfPcU1MEZaSFIyCFXZBdSjOGbUHxIISBduAwwndobNXFR5JJF5N5D5BQeAOQhw23DCC1LpHCI+AOPzRAAsZeN9fjFNQiQIzI3NOlCgBlUlYIh5WfTbf4EETcX2AQtecjfzbSFtcgtpOWIyT7CLJ3frIIrIvtGxH1dwP1SbOnd2bpEzTbX2CIMIMEJcONQyJUFwuGK9JhXfWY-fF1Fo2VBkYgTiUKfABVYlUGN2M7FKNg59UEVeM1I8AvbeaPMOMEXCXMHhJGKIZo+iXtCw54iHGfIojTGWYILpFdTMD7WIPKCjCITSTHAoS1WISFazE9Gwuw4NeQhANwsOKaaiLHPAqDB7MIREVfRbGIVMYkndOJHIwQV5agMkj44uDabTGkpebZSDdnbeIya9Y0SIJIHSDvOEDk09OJLyAAR0GDgGEGCgoHICmHsFnyFOpOmlFJTHFPymoiKwqP9m5VhiVNJKGUp11KIHsAbwfjMBp3sI00NNZ1pLFMwglJgUKDLiXHBRPEhWNDtLPRMMdIgD1Kn2pwNO1CNN9NNP9OaXDxu2SOyn50F1EIQO5FhPqggkGFuTgEKM9Pq2BFIhBADy4LCERy8NgRXEKF3FgTKF9l63RXSOYELLoHjISRP0RPqxKCVBOQMm6XRJTR0VgT4OonhXYISDhk-UqCAA */
  id: "MemberOnboardingFlow",
  /** @xstate-layout N4IgpgJg5mDOIC5QFkwFsBGYBOB5AdhgPYCG2EAlvlAGIA2RA7gHT5gAujR2A1gMJF8bAMbsKg5rHZl2AoWFHj8AYgiCwzKgDciPDcMEj2AdQrsAFgGUidEvhIBtAAwBdRKAAORWGaXuQAB6IAEwAHABszACc4U5RAMwALIlOAIypAOwxADQgAJ6IqfEZkRmhAKzlieGpUXHhUYkAvk25qJg4BMRklNT0TKwcXLxyRkqS0tiyhgpigso42NzMHrbsAGbcaMwG8qKmFta29s5uSCBePnP4-kEIYZExcUkp6VnhuQUIqYmh8czxMLlOIZYEZOItNroLB4QikchUWgMFiMEh0OgcSwcACuHlU6gmJHYGnaMK68N6SIGqPRmJxHlO-kuvkEt0QoTSzFSaXKxVS4WCiXiUVSn0K3NCzBSoVCmTKjVSvMhIFJnThPUR-RRaIx7Cx7FxyhpupoJAoGIgjPOzOubIQHNSXJ5fIFQpFYu+wsdoWCDyiESyiqiytVsO6CL6yMkNjsJAAQmi7MJ9OYFDxEQnjsnlBhE-hk3xU8I9JbXEzvCybuc7ul4pKisEMqDYuFyqEoh70rFmO9QolufFW8EohkQ9C1eHKVro8d43nkzsi+nqJmk2Ac-OwIW05AHKkzp4K7bq+K61zAU3yi22x38oVglfmE5ysEnIlh7Fh0Kxx0wxTNVGsAxvYq75hoHjYtgwjmCQsBgEcsbKBBUEwXBEAIScZbWkefgnt87blMw4SJOUJSJCUI6yreXzcikAJ1OUIrxMUTiDvEP5kuqEZUiwQGzqBC65lmYAADJMDm2J5Mg3BgFah5XLhoA1gRREkWRFFlLUnapH8zDlDptS+v6IoRBxE7-pGAxoOO2AAILCAY2L4Owi5poi9mOc5ygkA5RBOewAByRDsAAkvgvhohQABeu5YfJlZ2g+-x1k4r5OOEPpOGkwQfHeCAvokPbxFl-I8lEvLlGZf4apZLDWb+Hl+c5rnFu5vn+d57XOWFEV0NFsUHhcOGsnhSUAhyaUZWlqQ5Z2jTRJUGSCuEDSvit7GtCqNnkjVPHMPVMKNf5mjhWIkVRW1nnsMoVC9dFRJKGJJCUnJQ0KSNSmIDUhFOFk-bSqxbwev2ThEZkmQClEy0kRtUK-jt3HTgdOBHc1t1nX1F3UKj13oxQ50PYIljYg5cCwK9NqKYEiAxMEPbvkGXbCoOHrApK-ZQy+xUZcklWbaGCNTlGyN2V1Ll4+dl1Nbjp345jhP4Ka5qQbJcVvQleGkY8wQ6eEJTthkwrBB68SKgCNQjkKGUNFEwb89tXFC1ZNk4ydd1Y1AOM3bLBPXErdAq3ug2Ux91MILT9M64xTMJLlXyVFERGxKRaSyn8WRVYLAEDOwuhgPgAnrs9YAAI7YhwYCFxTw1Vp9CB1v84OhOCfbNxUioen2hUt8VJE6+k6QtJt+BEBAcD+ALjvZ4w5bvbXYcALSCh6S+FVl68bxvsNbfDU+1YMnDcPwMyKKHIfz3cy95TNv3MO2MrDix8SMcEmd73tbCHyMJ-XISUyjLMKm587TpEKkkYoiQEg5RiO+aihQUoAhmjKQ2kCMi1HCG-Sc08D7DGPnsX+2AODYDyIiABp957AM1j8aI-JWxpAaO+AUnZfiOmKstDKL4BQZUwRZD+Qwj5kN-rsMYggACiUgSAYD6rAVMEBZ4azrvpQqIoVrAn5I0HKxtr7FH+PpWIip14ymSDw3a05P64MEeMYRgDBD+0gPI48dclqdn0o6fRjQOSeMbKOe2u8sH72NHSA0HgHFUzuO+bSr49K22fiDTROUTGI0AsBOcwlQmhzuAbJ8S1kF8llI2D0dRJSgibA6daxjfGcX8XtPisZC4tWXFAQu6SL40xItksIzc8kzQyJ2N8koobJBInrFIpsMGVPMqY5J-FNwrEgtBWC8EUktMSk4PszAcqVCtuEQEV54h9N+ERZixElq1AiKRRJTteIpPqUJNcYkZ7YTniAt00RGgZBSNNRsiRtI1D0oKcEQpkh60qJc7BtSQKzNgNidY6wKDCAoPndgzSnkKLDj8YUbzyKfJKt8zs3iiJMUhpRYcYL94ixxis0aPy8o7IBEZIokD27vlCGSvaFKxYNKlv5KlTitHxx0lKEoVRsVtyVBM6qSTnYNU5RLTG3LnK8rDuRUGJRirchmv2Riz5WbcjvktYoPp+QMr5nDKpvCkYu05ZI7goUfby0cerR1NZGyJ0qK+YcMRiI+n5YgBOd9fSpRFHs5+qQ2WWplVdZgcLwoyPsai5194sh6RfEGr1vxfSs05MxQU5FwQ7KFKxcNUZc56ALpuJVl8aVfGIoRfkKQUhoLrD6bek9qnTlLfnep0E3IrgrQmsJiBnF5SyKDEcrZn4rWCM2u2ZrJlSpYJ28twlmCELLnAdgtkKDkCWCEgdGSh2+vtAkHsJQ0j1H9BbYtOc87LrXMwM0O6iAeAAEoKDABQLQ8b4qJu+DlKUv1KjFBqBlNIHpDZ01+A0KoOtp0xFNTvc1Uyb1lvqY+iAu67FyP3a0z0koso5TWa+Os1ReSFJiHpUEUHvHMV+NelgMa0TE1JrAeAOG7SkTps+V8aDIHcnKJ3HWQqGw+g+ecsNEqs770Y3Qf2KtK002BERNBfZ9a5o+Z2L0AJfq5qMc+ZuQ8mhAA */
  context: {
    version: LATEST_VERSION,
    network: null,
    wallet: null,
    wallets: [],
    balance: 0,
    minimumBalance: MINIMUM_SOL_BALANCE,
    maxAttempts: 3,
    retryAttempts: 0,
    initialized: false,
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
            lines: promptCopyMapping["network"][NetworkStateKey.Loading],
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
                lines: promptCopyMapping["network"][NetworkStateKey.Connecting],
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
                lines: promptCopyMapping["network"][NetworkStateKey.Connected],
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
                lines: promptCopyMapping["network"][NetworkStateKey.Failed],
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
                lines: promptCopyMapping["wallet"][WalletStateKey.Loading],
              },
            ],
          })),
          invoke: {
            id: "wallet.load",
            src: fromPromise(loadWalletAdapters),
            onDone: {
              target: "displayingWallets",
              actions: [
                assign({
                  wallets: ({ event }) => event.output,
                }),
              ],
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
                lines: promptCopyMapping["wallet"][WalletStateKey.Displaying],
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
                key: WalletStateKey.Connecting,
                lines: promptCopyMapping["wallet"][WalletStateKey.Connecting],
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
                key: WalletStateKey.Ready,
                lines: promptCopyMapping["wallet"][WalletStateKey.Ready],
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
                key: WalletStateKey.Failed,
                lines: promptCopyMapping["wallet"][WalletStateKey.Failed],
              },
            ],
          })),
        },
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
                key: SolanaBalanceKey.Loading,
                lines: promptCopyMapping["balance"][SolanaBalanceKey.Loading],
              },
            ],
          })),
          invoke: {
            id: "balance.loading",
            input: ({ context }) => context,
            src: fromPromise(checkSolanaBalance),
            onDone: {
              target: "evaluateBalance",
              actions: assign(({ event }) => ({
                balance: event.output,
              })),
            },
          },
        },
        evaluateBalance: {
          always: [
            {
              target: "balanceLow",
              guard: ({ context }) => {
                return context.balance < context.minimumBalance;
              },
            },
            {
              target: "sufficientBalance",
              guard: ({ context }) => context.balance >= context.minimumBalance,
            },
          ],
        },
        purchaseSolana: {
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: SolanaBalanceKey.Link,
                lines: promptCopyMapping["balance"][SolanaBalanceKey.Link],
              },
            ],
          })),
          invoke: {
            id: "purchse.raydium",
            src: fromPromise(openRaydiumExchange),
            onDone: {
              target: "evaluateReturn",
            },
          },
          on: {
            PURCHASE_SOLANA: "evaluateBalance",
          },
        },
        evaluateReturn: {
          invoke: {
            id: "wait.for.focus",
            src: fromPromise(waitForFocus),
            onDone: {
              target: "loadingBalance",
            },
          },
        },
        balanceLow: {
          description: "Suggest user purchase additional Solana.",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: SolanaBalanceKey.Low,
                lines: promptCopyMapping["balance"][SolanaBalanceKey.Low],
                options: [
                  {
                    key: "purchase",
                    label: "Purchase SOL",
                    value: context.minimumBalance - context.balance,
                    event: "PURCHASE_SOLANA",
                  },
                  {
                    key: "cancel",
                    label: "Cancel",
                    value: "cancel",
                    event: "CANCEL_PURCHASE",
                  },
                ],
              },
            ],
          })),
          on: {
            PURCHASE_SOLANA: {
              target: "purchaseSolana",
            },
            CANCEL_PURCHASE: {
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
              target: "analyzingAccount",
              actions: assign(({ event }) => ({
                initialized: event.output,
              })),
            },
          },
        },
        analyzingAccount: {
          always: [
            {
              target: "completeAuthentication",
              guard: ({ context }) => context.initialized === true,
            },
            {
              target: "initializingAccount",
              guard: ({ context }) => !context.initialized,
            },
          ],
        },
        initializingAccount: {
          description: "Initializing member subscription account.",
          entry: assign(({ context }) => ({
            initializationAttempts: context.initializationAttempts + 1,
            blocks: [
              ...context.blocks,
              {
                key: MemberAccountKey.Initializing,
                lines: [
                  `Initializing account${context.initializationAttempts > 0 ? (context.initializationAttempts > 1 ? ` once more...` : ` again...`) : "..."}`,
                ],
              },
            ],
          })),
          invoke: {
            id: "member.initialize",
            input: ({ context }) => context,
            src: fromPromise(initializeAccount),
            onDone: {
              target: "completeAuthentication",
              actions: [
                (context, event) => {
                  console.log("Initialize Context", context, "Event", event);
                },
              ],
            },
            onError: {
              target: "evaluateException",
            },
          },
        },
        evaluateException: {
          always: [
            {
              guard: ({ context }) =>
                context.initializationAttempts < context.maxAttempts,
              target: "initializingAccount",
            },
            {
              guard: ({ context }) =>
                context.initializationAttempts >= context.maxAttempts,
              target: "abortInitialization",
            },
            {
              target: "abortInitialization",
            },
          ],
        },
        abortInitialization: {
          target: "finalFailure",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: MemberAccountKey.Terminate,
                lines: promptCopyMapping["member"][MemberAccountKey.Terminate],
              },
            ],
          })),
        },
        completeAuthentication: {
          target: "tokenBalance",
          entry: assign(({ context }) => ({
            blocks: [
              ...context.blocks,
              {
                key: MemberAccountKey.Finished,
                lines: promptCopyMapping["member"][MemberAccountKey.Finished],
              },
            ],
          })),
          invoke: {
            id: "member.finished",
            src: fromPromise(completeAuthentication),
          },
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
      onDone: "finalSuccess",
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
  },
});
