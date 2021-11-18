export interface ITrack {
  id: string;
  artwork: string;
  title: string;
  genre: string;
}

export interface IUser {
  id: string;
  description: string;
  emoji: string;
  homeLocation: string;
  image?: {
    alternatives: {
      src: string;
    }[]
  };
  name: string;
}
