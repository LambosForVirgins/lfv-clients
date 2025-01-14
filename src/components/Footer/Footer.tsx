import { NavLink } from "react-router";
import styles from "./Footer.module.css";
// import { LocaleButton } from "../Buttons/LocaleButton";
import clsx from "classnames";

const ShowLocale = true;

interface FooterProps extends Common.ComponentProps {
  className?: string;
}

export const Footer = ({ testID, ...props }: FooterProps) => {
  return (
    <footer
      data-testid={testID}
      className={clsx(props.className, styles.frame)}
    >
      <div className={styles.content}>
        <div>
          <h3 className="text-xl">Links</h3>
          <ul>
            <li>Announcements</li>
            <li>Community</li>
            <NavLink to={"/partners"}>
              <li>Become a Partner</li>
            </NavLink>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl">Project</h3>
          <ul>
            <NavLink to={"/tokenomics"}>
              <li>Tokenomics</li>
            </NavLink>
            <NavLink to={"/tokenomics/vesting"}>
              <li>Team Allocation</li>
            </NavLink>
          </ul>
        </div>
        <div>
          <h3 className="text-xl">Legal</h3>
          <ul>
            <li>About us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Contact us</li>
            <li>Audits</li>
          </ul>
        </div>
        {/* {ShowLocale && <LocaleButton testID={`${testID}.locale`} />} */}
        {/* <small className="col-span-2">
          We started as a simple meme with a simple purpose, solve population
          decline by giving away Lambos to virgins, but we've grown since then.
        </small> */}
      </div>
    </footer>
  );
};
