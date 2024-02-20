import Cards from './components/Cards.jsx';
import { useState, useEffect } from 'react';
import Scoreboard from './components/Scoreboard.jsx';
import axios from 'axios';
import './components/style.css'

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const getImageData = async () => {
      try {
        const randomCardIds = generateRandomImageIds(12);
        const imageData = randomCardIds.map(async id => {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          return response.data;
        });
        const cardsData = await Promise.all(imageData);
        setCards(cardsData);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    getImageData();
  }, []);

  const generateRandomImageIds = (count) => {
    const cadsIds = [];
    while (cadsIds.length < count) {
      const randomId = Math.floor(Math.random() * 150) + 1;
      if (!cadsIds.includes(randomId)) {
        cadsIds.push(randomId);
      }
    }
    return cadsIds;
  };

  const handleCardClick = (cardId) => {
    if (clickedCards.includes(cardId)) {
      // Game over, reset scores and clicked cards
      setCurrentScore(0);
      setClickedCards([]);
    } else {
      // Update scores and clicked cards
      setCurrentScore(currentScore + 1);
      setBestScore(Math.max(bestScore, currentScore + 1));
      setClickedCards([...clickedCards, cardId]);
    }
    // Shuffle cards for the next round
    setCards(shuffleArray(cards));
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <div className="card-container">
        {cards.map(card => (
          <Cards
            key={card.id}
            pokemon={card}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

