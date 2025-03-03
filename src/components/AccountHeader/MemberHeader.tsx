import styles from "./MemberHeader.module.css";
import { Member } from "../../state/subscription/types";
import { format } from "date-fns/format";
import { tierToString } from "@/utils/tiers/formatters";

interface MemberHeaderProps extends Common.ComponentProps {
  member: Member | null;
}

export const MemberHeader = ({ testID, ...props }: MemberHeaderProps) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <img
        data-testid={`${testID}.image`}
        alt="Virgin token"
        src="./images/lfv.png"
        width={64}
        style={{ backgroundColor: "transparent", borderRadius: "100vw" }}
      />
      <span data-testid={`${testID}.content`}>
        <h3 data-testid={`${testID}.title`} className={styles.title}>
          {tierToString(props.member?.tier)} member
        </h3>
        {props.member?.timeCreated && (
          <p data-testid={`${testID}.subtitle`}>
            Joined {format(props.member.timeCreated, "MMMM yyyy")}
          </p>
        )}
      </span>
    </div>
  );
};
