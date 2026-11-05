export interface IEvent {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  date: string;
  creatorName?: string;
  creatorImage?: string;
  creatorEmail?: string;
  createdAt?: string;
}
