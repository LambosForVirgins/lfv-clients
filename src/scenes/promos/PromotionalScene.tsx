import { useRecoilValue } from "recoil";
import { useGiveaway } from "@/state/giveaways/useGiveaway";
import styles from "./PromotionalScene.module.css";
import { associatedDrawsSelector } from "@/state/draws/selectors";
import { DrawMachine } from "@/components/DrawMachine/DrawMachine";
import { format } from "date-fns/format";
import { isFuture } from "date-fns/isFuture";
import { DrawStatus } from "@/state/types";
import { useParams } from "react-router";
import { DrawRound } from "../../state/types";

export const DrawHistory = ({
  testID,
  ...props
}: Common.ComponentProps & { draws: DrawRound[] }) => {
  return (
    <ul data-testid={testID}>
      {props.draws.map((draw) => (
        <li key={draw.id} className={styles.draw}>
          <h2>{draw.status}</h2>
          <p>opens: {format(draw.timeOpens, "yyyy")}</p>
          <p>{isFuture(draw.timeOpens) ? "Coming soon" : "Closed"}</p>
        </li>
      ))}
    </ul>
  );
};

export const PromotionalScene = ({
  testID = "promo",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const { giveawayId = "" } = useParams<{ giveawayId: string }>();
  const { giveaway } = useGiveaway(giveawayId);
  const draws = useRecoilValue(associatedDrawsSelector(giveawayId));

  const currentDraw =
    draws.find((draw) => draw.status === DrawStatus.Open) ?? null;

  return (
    <div data-testid={testID} className={styles.frame}>
      <h1 className="text-2xl">{giveaway?.title}</h1>
      {currentDraw?.status === DrawStatus.Open && (
        <DrawMachine testID={`${testID}.draw`} drawId={currentDraw.id} />
      )}
      <div data-testid={`${testID}.feature`} className={styles.content}>
        <DrawHistory testID={`${testID}.draws`} draws={draws} />
      </div>
    </div>
  );
};
