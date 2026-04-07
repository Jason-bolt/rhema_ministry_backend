interface IEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  recurring: boolean;
  flierUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ICreateEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  recurring: boolean;
  flierUrl?: string;
}

export { IEvent, ICreateEvent };
