import type { Coordinates } from '../types';

// Haversine formula to calculate distance between two points on Earth
export function calculateDistanceKm(
  point1: Coordinates,
  point2: Coordinates
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Location scoring: Max 500 points (strict)
// - Under 5km: Full points (500)
// - 5-25km: 400-500 points
// - 25-100km: 250-400 points
// - 100-500km: 100-250 points
// - 500-2000km: 25-100 points
// - Over 2000km: 0-25 points
export function calculateLocationScore(distanceKm: number): number {
  if (distanceKm <= 5) {
    return 500;
  } else if (distanceKm <= 25) {
    // 400-500 points
    return Math.round(500 - ((distanceKm - 5) / 20) * 100);
  } else if (distanceKm <= 100) {
    // 250-400 points
    return Math.round(400 - ((distanceKm - 25) / 75) * 150);
  } else if (distanceKm <= 500) {
    // 100-250 points
    return Math.round(250 - ((distanceKm - 100) / 400) * 150);
  } else if (distanceKm <= 2000) {
    // 25-100 points
    return Math.round(100 - ((distanceKm - 500) / 1500) * 75);
  } else if (distanceKm <= 5000) {
    // 0-25 points
    return Math.round(25 - ((distanceKm - 2000) / 3000) * 25);
  }
  return 0;
}

// Date scoring: Max 500 points
// - Exact date: 500 points
// - Within 7 days: 400-500 points
// - Within 30 days: 300-400 points
// - Within 90 days: 200-300 points
// - Within 365 days: 100-200 points
// - Over 365 days: 0-100 points (min 0)
export function calculateDateScore(
  guessedDate: string,
  actualDate: string
): number {
  const guess = new Date(guessedDate);
  const actual = new Date(actualDate);
  const daysDiff = Math.abs(
    Math.floor((guess.getTime() - actual.getTime()) / (1000 * 60 * 60 * 24))
  );

  if (daysDiff === 0) {
    return 500;
  } else if (daysDiff <= 7) {
    return Math.round(500 - (daysDiff / 7) * 100);
  } else if (daysDiff <= 30) {
    return Math.round(400 - ((daysDiff - 7) / 23) * 100);
  } else if (daysDiff <= 90) {
    return Math.round(300 - ((daysDiff - 30) / 60) * 100);
  } else if (daysDiff <= 365) {
    return Math.round(200 - ((daysDiff - 90) / 275) * 100);
  } else if (daysDiff <= 730) {
    return Math.round(100 - ((daysDiff - 365) / 365) * 100);
  }
  return 0;
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  } else if (km < 100) {
    return `${km.toFixed(1)} km`;
  }
  return `${Math.round(km).toLocaleString()} km`;
}
