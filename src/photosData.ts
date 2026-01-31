import type { Photo } from './types';

export const photos: Photo[] = [
  {
    id: 1,
    src: '/photos/mong.jpeg',
    location: { lat: 40.74768, lng: -73.98711 },
    locationName: 'New York, New York',
    date: '2025-10-10',
  },
  {
    id: 2,
    src: '/photos/lantern.jpeg',
    location: { lat: 35.7280546, lng: -78.796533 },
    locationName: 'Cary, North Carolina',
    date: '2026-01-09',
  },
  {
    id: 3,
    src: '/photos/crawl.jpeg',
    location: { lat: 47.59817, lng: -122.32677 },
    locationName: 'Seattle, Washington',
    date: '2025-08-16',
  },
  {
    id: 4,
    src: '/photos/karaoke.jpeg',
    location: { lat: 47.63006, lng: -122.15474 },
    locationName: 'Bellevue, Washington',
    date: '2025-08-21',
  },
  {
    id: 5,
    src: '/photos/chinatown.jpeg',
    location: { lat: 40.71576, lng: -73.9992 },
    locationName: 'New York, New York',
    date: '2025-10-10',
  },
];
