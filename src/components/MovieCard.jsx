import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
    return (
        <div className="movie-card">
            <img src={imageUrl + movie.poster_path} />
            <span className="text-card">
                <h2>{movie.title}</h2>
                <div className="details-container">
                    <p><FaStar /> {movie.vote_average.toFixed(1)}</p>
                    {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
                </div>
            </span>
        </div>
    )
}

export default MovieCard;
