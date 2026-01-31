# Valentine Guessr

A photo guessing game where you guess the location and date of photos.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `src/photosData.ts` with your photos:
   ```ts
   import type { Photo } from './types';

   export const photos: Photo[] = [
     {
       id: 1,
       src: '/photos/paris.jpeg',
       location: { lat: 48.8566, lng: 2.3522 },
       locationName: 'Paris, France',
       date: '2025-02-14',
     },
     {
       id: 2,
       src: '/photos/tokyo.jpeg',
       location: { lat: 35.6762, lng: 139.6503 },
       locationName: 'Tokyo, Japan',
       date: '2024-04-01',
     },
   ];
   ```

3. Add your photos to the `public/photos/` folder

4. To find coordinates: Right-click on Google Maps and click the coordinates to copy them

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

5. If you'd like to host this, websites such as GitHub and Vercel let you host for free. Refer to their documentation.