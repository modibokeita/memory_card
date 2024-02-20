
import PropTypes from 'prop-types';
function Scoreboard({ currentScore, bestScore }) {
  return (
    <div className="scoreboard">
      <div><p>Current Score: {currentScore}</p></div>
      <div><p>Best Score: {bestScore}</p></div>
    </div>
  );
}
Scoreboard.propTypes = {
    currentScore: PropTypes.number.isRequired,
    bestScore: PropTypes.number.isRequired,
  };

export default Scoreboard;
