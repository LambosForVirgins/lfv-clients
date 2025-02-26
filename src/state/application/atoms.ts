import { atom } from "recoil";

export const faqAtom = atom({
  key: "faq-atom",
  default: [
    {
      id: "abc123",
      title: "What is a meme?",
      content:
        "An idea, behavior, style, or usage that spreads from person to person within a culture. -- Merriam-Webster's meme noun",
    },
    {
      id: "def456",
      title: "What is LFV (LambosForVirgins)",
      content:
        "LambosForVirgins ($VIRGIN) is the only utility-meme coin and rewards club offering its members the chance to win everything from Lamborghini's to daily cash and token prizes. Our decentralized subscription program rewards members who stake tokens by providing exclusive access to merchandise, events, and promotional giveaways.",
    },
    {
      id: "ghi789",
      title: "How can I become a member?",
      content:
        "After you acquire the $VIRGIN token, connect your wallet or open the official LambosForVirgin website within you wallet and follow the prompts to create a member account.",
    },
    {
      id: "jkl012",
      title: "Are there fees when interacting with the program?",
      content:
        'Unfortunately Solana is just like any other blockchain and requires a small amount fee per transaction (similar to Ethereum gas). Solana also requires "rent" to be paid when creating data accounts like your member account, entry token account, and ticket accounts. All fees are paid in SOL, however, rent fees are refunded when the data account is eventually closed.',
    },
    {
      id: "mno345",
      title: "How can I access member benefits?",
      content:
        "You will be eligible for member benefits once you have staked some $VIRGIN tokens against your member account. You can get started by staking the minimum 1000 VIRGIN tokens and advance into membership tiers by staking more.",
    },
    {
      id: "pqr678",
      title: "Can I get my staked token back?",
      content:
        "Yes, your token is staked on a monthly basis just like a monthly subscription. You can cancel this subscription at any time and your tokens will become available for withdrawal after the current subscription period ends.",
    },
    {
      id: "stu901",
      title: "Do entries expire?",
      content:
        "Entry tokens do not expire, but only members can enter giveaway draws with them. Entry tokens are minted to your Solana wallet and last for as long as you'd like to hold them.",
    },
    {
      id: "vwx234",
      title: "Can I enter any giveaway?",
      content:
        "Possibly, as giveaways are promotional in nature, some may be reserved for certain membership tiers in order to promote member growth in those specified tiers.",
    },
    {
      id: "fsfds",
      title: "Do giveaways have a minimum number of entries?",
      content:
        "No, all giveaways eligible to your tier can be entered with one entry. However, as entries function like raffle tickets, more entries equals a greater chance of receiving the giveaway.",
    },
    {
      id: "sdfsd",
      title: "Why is KYC required when claiming a giveaway?",
      content:
        "How else are we going to send you any goods? Our next best idea was just leaving a Lambo unlocked and hoping you'd be the first to take it. Genius ideas aside, it's important we try to keep with local laws and regulations regarding promotional giveaways, and knowing our customers is the first step to most jurisdictions.",
    },
    {
      id: "sdfsd",
      title: "How much do the founders own?",
      content:
        "The founders share in a combined 11% of minted token supply, which is locked into the Bonfida vesting contract and released weekly over 18 months. You can view the vesting state and wallets in the tokenomics section here.",
    },
  ],
});
