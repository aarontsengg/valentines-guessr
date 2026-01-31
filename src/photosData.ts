import type { Photo } from './types';

// Add your photos here!
// Each photo needs:
//   - id: A unique number
//   - src: Path to image (put images in public/photos/ folder)
//   - location: GPS coordinates { lat, lng }
//   - locationName: Display name for results
//   - date: When the photo was taken (YYYY-MM-DD format)
//   - hint: Optional hint to help players
//
// Example:
// {
//   id: 1,
//   src: '/photos/beach.jpeg',
//   location: { lat: 34.0195, lng: -118.4912 },
//   locationName: 'Santa Monica, California',
//   date: '2024-02-14',
//   hint: 'West coast vibes',
// },

export const photos: Photo[] = [];
