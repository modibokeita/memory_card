//import './Card.css';
import PropTypes from 'prop-types';
function Card({ pokemon, onClick}) {
  const handleClick = () => {
    onClick(pokemon.id);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </div>
  );
}
Card.propTypes = {
    pokemon: PropTypes.number.isRequired,
    onClick: PropTypes.func

  };
export default Card;
