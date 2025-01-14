import { useEffect, useRef, useState } from "react";
import styles from "./SlotMachine.module.css";
import { getRandomInterval } from "./utils/getRandomInterval";
import { shuffleEntries } from "./utils/shuffleEntries";
import { items } from "./utils/constants";

export const SlotChannel = ({
  testID,
  groups,
}: Common.ComponentProps & { groups: number }) => {
  const channelRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const [spins, setSpins] = useState(0);
  const duration = getRandomInterval(1000, 200);

  useEffect(() => {
    if (!channelRef.current || !boxesRef.current) return;
    const element = channelRef.current,
      boxes = boxesRef.current;

    const entries = ["❓"],
      aspectRatio = element.clientWidth / element.clientHeight;

    const arr = [];
    for (let n = 0; n < groups; n++) {
      arr.push(...items);
    }

    entries.push(...shuffleEntries(arr));

    for (let i = entries.length - 1; i >= 0; i--) {
      const box = document.createElement("div");
      box.classList.add(styles.box);
      box.style.width = element.clientWidth + "px";
      box.style.height = element.clientWidth + "px";
      box.textContent = entries[i];
      boxes.appendChild(box);
    }

    boxes.style.transitionDuration = `${duration > 0 ? duration : 1}ms`;
    boxes.style.transform = `translateY(-${element.clientHeight * aspectRatio * (entries.length - 1)}px)`;
  }, [groups]);

  useEffect(() => {
    if (!channelRef.current || !boxesRef.current) return;
    const boxes = boxesRef.current;

    const blurElements = () => {
      Array.from(boxes.getElementsByClassName(styles.box)).forEach(
        (box, index) => {
          if (box instanceof HTMLElement) {
            box.style.filter = "blur(2px)";
          }
        }
      );
    };

    const resetChannelEntries = () => {
      Array.from(boxes.getElementsByClassName(styles.box)).forEach(
        (box, index) => {
          if (box instanceof HTMLElement) {
            box.style.filter = "blur(0)";
            // if (index > 0) box.remove();
          }
        }
      );
    };

    boxes.addEventListener("transitionstart", blurElements);
    boxes.addEventListener("transitionend", resetChannelEntries);

    return () => {
      boxes.removeEventListener("transitionstart", blurElements);
      boxes.removeEventListener("transitionend", resetChannelEntries);
    };
  }, []);

  return (
    <div ref={channelRef} data-testid={testID} className={styles.channel}>
      <div ref={boxesRef} className={styles.boxes}></div>
    </div>
  );
};
