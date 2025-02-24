import { getApiEndpoint } from "@/utils/locker/constants";
import { type DrawEntry, type DrawRound } from "./types";
import { program } from "@/utils/locker";
import { MOCKS } from "../giveaways/mocks";

export const getCurrentDraw = async (): Promise<DrawRound | null> => {
  try {
    const result = await fetch(getApiEndpoint("draw")).then((res) =>
      res.json()
    );

    console.log(JSON.stringify(result, null, " "));

    return result;
  } catch (err) {
    return null;
  }
};

export const getAllDraws = async (): Promise<DrawRound[]> => {
  const data = await program.account.ticketAccount.all();
  console.log("All draws", data);

  return MOCKS.reduce<DrawRound[]>((draws, giveaway) => {
    return draws.concat(
      giveaway.draws.map<DrawRound>((draw) => ({
        ...draw,
        giveawayId: giveaway.id,
        winner: null,
        seed: null,
      }))
    );
  }, []);

  // fetch via api endpoint
  return await fetch(getApiEndpoint("draw")).then<DrawRound[]>((res) =>
    res.json()
  );
};

export const enterDraw = async (drawId: string, details: DrawEntry) => {
  const body = JSON.stringify(details);

  return await fetch(getApiEndpoint(`draw/${drawId}/enter`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  }).then((res) => res.json());
};

export const rollDraw = async (drawId: string): Promise<DrawRound> =>
  await fetch(getApiEndpoint(`draw/${drawId}/remix`), {
    method: "POST",
  }).then<DrawRound>((res) => res.json());
