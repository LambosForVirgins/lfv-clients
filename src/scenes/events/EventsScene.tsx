import { EventCard } from "@/components/EventCard/EventCard";
import styles from "./EventsScene.module.css";

enum EventStatus {
  Open = "open",
  Upcoming = "upcoming",
  Ending = "ending",
  Closed = "closed",
  Cancelled = "cancelled",
}

interface Event {
  id: string;
  title: string;
  status: EventStatus;
  startTime: Date;
  location: {
    id: string;
    city: string;
    country: string;
  };
  pricing: { currency: string; amount: number }[];
  attendees?: number;
  capacity?: number;
  media: { id: string; src: string; alt: string }[];
  links: { key: string; label: string; url: string }[];
}

const EVENTS: Event[] = [
  {
    id: "4e55d4f4-9bc0-44d0-9fe3-108ff0a0fafb",
    title: "Consensus Hong Kong 2025 Afterparty",
    status: EventStatus.Closed,
    startTime: new Date("2025-02-14T18:00:00"),
    location: {
      id: "d331401e-9b4f-4101-a8ad-cba261fb5a32",
      city: "Hong Kong",
      country: "China",
    },
    pricing: [{ currency: "USD", amount: 14 }],
    attendees: 500,
    capacity: 1000,
    media: [
      {
        id: "fe7d5949-412f-42a2-930d-4a08a5d0b9d3",
        src: "",
        alt: "image",
      },
    ],
    links: [
      {
        key: "791d23b1-f2c0-414e-acf9-a4d2a8a7a9d6",
        label: "Consensus Hong Kong 2025",
        url: "https://consensus-hongkong2025.coindesk.com/",
      },
    ],
  },
  {
    id: "7d8e5ca6-fa4d-4d22-a6d8-b55a0828e694",
    title: "Amsterdam Blockchain Week",
    status: EventStatus.Upcoming,
    startTime: new Date("2025-03-13T22:00:00"),
    location: {
      id: "2b4bab72-a5f4-465f-8e3b-b5b263808212",
      city: "Amsterdam",
      country: "Netherlands",
    },
    pricing: [{ currency: "USD", amount: 14 }],
    media: [
      {
        id: "4d4242bc-4515-44b1-8bea-382e2420f7eb",
        src: "",
        alt: "image",
      },
    ],
    links: [
      {
        key: "3b128571-608f-4c5e-8e94-d23bacdb70ee",
        label: "Web3 Amsterdam",
        url: "https://web3amsterdam.com/",
      },
    ],
  },
  {
    id: "5e27d9b1-1062-48f0-a761-ef26f740b5f4",
    title: "Consensus Toronto 2025 Afterparty",
    status: EventStatus.Upcoming,
    startTime: new Date("2025-04-14T21:00:00"),
    location: {
      id: "43986c84-f71d-4ffb-9656-74e45593b2c6",
      city: "Toronto",
      country: "Canada",
    },
    pricing: [{ currency: "USD", amount: 14 }],
    media: [
      {
        id: "0113638b-8a09-4d68-a094-82de1ecf44fa",
        src: "",
        alt: "image",
      },
    ],
    links: [
      {
        key: "a2a19cd9-3ec3-4210-b6b4-0318135eb7c0",
        label: "Consensus Toronto 2025",
        url: "https://consensus2025.coindesk.com/",
      },
    ],
  },
  {
    id: "f4f66e23-4adf-40be-aa7d-db6c1307b8dd",
    title: "Breakpoint 2025",
    status: EventStatus.Upcoming,
    startTime: new Date("2025-12-11T19:30:00"),
    location: {
      id: "bb3104dd-b91c-49b6-992a-9267f963346f",
      city: "Toronto",
      country: "Canada",
    },
    pricing: [
      { currency: "VIRGIN", amount: 500_000 },
      { currency: "SOL", amount: 1.24 },
    ],
    media: [
      {
        id: "80f18585-62ad-4f0c-a054-efa0ab69a1b0",
        src: "",
        alt: "image",
      },
    ],
    links: [
      {
        key: "3d65e5a3-5b23-4896-a3a8-3ec1e29fd6dc",
        label: "Breakpoint 2025",
        url: "https://solana.com/breakpoint",
      },
    ],
  },
];

export const EventsScene = ({
  testID = "events",
}: Readonly<Partial<Common.ComponentProps>>) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <span className={styles.banner}>Carousel</span>
      <h2 className={styles.header}>Upcoming</h2>
      <div className={styles.collection}>
        {EVENTS.map((event) => (
          <EventCard
            key={event.id}
            testID={`${testID}.event`}
            media={event.media}
            title={event.title}
            dateTime={event.startTime}
            pricing={event.pricing}
            location={event.location}
            className={styles.card}
          />
        ))}
      </div>
      <h2 className={styles.header}>Invitations</h2>
      <p className={styles.header}>
        List of events you're attending or have previously attended.
      </p>
    </div>
  );
};
