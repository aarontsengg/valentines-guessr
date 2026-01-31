export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Photo {
  id: number;
  src: string;
  location: Coordinates;
  locationName: string; // Display name for results
  date: string; // Format: YYYY-MM-DD
  hint?: string;
}

export interface Guess {
  photoId: number;
  guessedLocation: Coordinates;
  guessedDate: string;
  distanceKm: number;
  locationScore: number;
  dateScore: number;
  totalScore: number;
}

export interface GameState {
  currentPhotoIndex: number;
  guesses: Guess[];
  isComplete: boolean;
  totalScore: number;
}
