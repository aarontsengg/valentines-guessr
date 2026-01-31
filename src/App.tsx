import { useState } from 'react';
import { photos } from './photosData';
import type { GameState, Guess, Coordinates } from './types';
import GuessMap from './components/GuessMap';
import ResultMap from './components/ResultMap';
import {
  calculateDistanceKm,
  calculateLocationScore,
  calculateDateScore,
  formatDistance,
} from './utils/scoring';
import './App.css';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentPhotoIndex: 0,
    guesses: [],
    isComplete: false,
    totalScore: 0,
  });

  const [locationGuess, setLocationGuess] = useState<Coordinates | null>(null);
  const [dateGuess, setDateGuess] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentGuess, setCurrentGuess] = useState<Guess | null>(null);

  const currentPhoto = photos[gameState.currentPhotoIndex];

  const handleSubmitGuess = () => {
    if (!locationGuess || !dateGuess) return;

    const distanceKm = calculateDistanceKm(locationGuess, currentPhoto.location);
    const locationScore = calculateLocationScore(distanceKm);
    const dateScore = calculateDateScore(dateGuess, currentPhoto.date);

    const guess: Guess = {
      photoId: currentPhoto.id,
      guessedLocation: locationGuess,
      guessedDate: dateGuess,
      distanceKm,
      locationScore,
      dateScore,
      totalScore: locationScore + dateScore,
    };

    setCurrentGuess(guess);
    setShowResult(true);
  };

  const handleNextPhoto = () => {
    if (!currentGuess) return;

    const newGuesses = [...gameState.guesses, currentGuess];
    const newTotalScore = gameState.totalScore + currentGuess.totalScore;
    const nextIndex = gameState.currentPhotoIndex + 1;
    const isComplete = nextIndex >= photos.length;

    setGameState({
      currentPhotoIndex: nextIndex,
      guesses: newGuesses,
      isComplete,
      totalScore: newTotalScore,
    });

    setLocationGuess(null);
    setDateGuess('');
    setShowHint(false);
    setShowResult(false);
    setCurrentGuess(null);
  };

  const handleRestart = () => {
    setGameState({
      currentPhotoIndex: 0,
      guesses: [],
      isComplete: false,
      totalScore: 0,
    });
    setLocationGuess(null);
    setDateGuess('');
    setShowHint(false);
    setShowResult(false);
    setCurrentGuess(null);
  };

  if (gameState.isComplete) {
    return (
      <div className="app">
        <div className="results-screen">
          <h1>Game Complete!</h1>
          <div className="final-score">
            <h2>
              Final Score: {gameState.totalScore} / {photos.length * 1000}
            </h2>
          </div>
          <div className="results-breakdown">
            <h3>Results Breakdown:</h3>
            {gameState.guesses.map((guess, index) => (
              <div key={guess.photoId} className="result-item">
                <h4>Photo {index + 1}</h4>
                <p>
                  Distance: {formatDistance(guess.distanceKm)} away (
                  {guess.locationScore}/500 pts)
                </p>
                <p>
                  Date: {guess.guessedDate}
                  {guess.guessedDate === photos[index].date
                    ? ' (Exact!)'
                    : ` (Actual: ${photos[index].date})`}{' '}
                  ({guess.dateScore}/500 pts)
                </p>
                <p className="score">Score: {guess.totalScore} / 1000</p>
              </div>
            ))}
          </div>
          <button className="restart-btn" onClick={handleRestart}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Photo Guessr</h1>
        <div className="progress">
          Photo {gameState.currentPhotoIndex + 1} of {photos.length}
        </div>
        <div className="score">Score: {gameState.totalScore}</div>
      </header>

      <main className="game-container">
        <div className="photo-container">
          <img
            src={currentPhoto.src}
            alt={`Photo ${currentPhoto.id}`}
            className="photo"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/800x500?text=Add+Your+Photo';
            }}
          />
        </div>

        {!showResult ? (
          <div className="guess-form">
            <div className="input-group">
              <label>Where was this photo taken?</label>
              <GuessMap
                onLocationSelect={setLocationGuess}
                selectedLocation={locationGuess}
              />
              {locationGuess && (
                <p className="selected-coords">
                  Selected: {locationGuess.lat.toFixed(4)},{' '}
                  {locationGuess.lng.toFixed(4)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="date">When was this photo taken?</label>
              <input
                id="date"
                type="date"
                value={dateGuess}
                onChange={(e) => setDateGuess(e.target.value)}
              />
            </div>

            {currentPhoto.hint && (
              <button
                className="hint-btn"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            )}

            {showHint && currentPhoto.hint && (
              <div className="hint">Hint: {currentPhoto.hint}</div>
            )}

            <button
              className="submit-btn"
              onClick={handleSubmitGuess}
              disabled={!locationGuess || !dateGuess}
            >
              Submit Guess
            </button>
          </div>
        ) : (
          <div className="result-display">
            <h2>Results for Photo {gameState.currentPhotoIndex + 1}</h2>

            {currentGuess && locationGuess && (
              <ResultMap
                guessLocation={locationGuess}
                actualLocation={currentPhoto.location}
                actualLocationName={currentPhoto.locationName}
              />
            )}

            <div className="score-breakdown">
              <div className="score-row">
                <span className="label">Distance:</span>
                <span className="value">
                  {currentGuess && formatDistance(currentGuess.distanceKm)}
                </span>
                <span className="points">
                  +{currentGuess?.locationScore} pts
                </span>
              </div>

              <div className="score-row">
                <span className="label">Your Date:</span>
                <span className="value">{dateGuess}</span>
                <span className="points">+{currentGuess?.dateScore} pts</span>
              </div>

              {dateGuess !== currentPhoto.date && (
                <div className="score-row actual">
                  <span className="label">Actual Date:</span>
                  <span className="value">{currentPhoto.date}</span>
                </div>
              )}
            </div>

            <div className="round-score">
              <h3>Round Score: {currentGuess?.totalScore} / 1000</h3>
            </div>

            <button className="next-btn" onClick={handleNextPhoto}>
              {gameState.currentPhotoIndex + 1 < photos.length
                ? 'Next Photo'
                : 'See Final Results'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
