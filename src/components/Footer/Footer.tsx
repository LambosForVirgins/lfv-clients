import { NavLink } from "react-router";
import styles from "./Footer.module.css";
// import { LocaleButton } from "../Buttons/LocaleButton";
import clsx from "classnames";

const ShowLocale = true;

interface FooterProps extends Common.ComponentProps {
  className?: string;
}

const socialLinks = [
  { key: "twitter", icon: "x", label: "X", href: "" },
  { key: "telegram", icon: "telegram", label: "Telegram", href: "" },
  { key: "discord", icon: "discord", label: "Discord", href: "" },
];

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
            <NavLink to={"/partners"}>
              <li>Become a Partner</li>
            </NavLink>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl">Project</h3>
          <ul>
            <NavLink to={"/about"}>
              <li>About us</li>
            </NavLink>
            <NavLink to={"/tokenomics"}>
              <li>Tokenomics</li>
            </NavLink>
            <li>Timeline</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl">Legal</h3>
          <ul>
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
      <div className={styles.socials}>
        {socialLinks.map((link) => (
          <a key={link.key} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
};
