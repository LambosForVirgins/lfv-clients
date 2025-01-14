import { useEffect, useState } from "react";
import { AccountCollection } from "../../../apps/nextjs-api/app/api/treasury/vesting/route";

const fetchVestingDetails = async (): Promise<AccountCollection> => {
  return await fetch("/api/treasury/vesting").then((res) => res.json());
};

export const TreasuryPage = () => {
  const [details, setDetails] = useState<AccountCollection | null>(null);

  useEffect(() => {
    fetchVestingDetails().then(setDetails);
  }, []);

  return (
    <section className="grid col-content">
      <h1>Treasury Vesting Accounts</h1>
      {details &&
        Object.keys(details).map((address) => {
          const accounts = details[address];

          return (
            <div key={address} className="p-1">
              <div>{address}</div>
              <ul className="p-3">
                {accounts.map((vesting) => (
                  <li key={vesting.contractId}>
                    <div>Contract ID: {vesting.contractId}</div>
                    <div>Wallet: {vesting.wallet}</div>
                    <div>Seed: {vesting.seed}</div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
    </section>
  );
};
