import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <img src={imageUrl + movie.poster_path} alt={movie.title || movie.name} />
                <span className="text-card">
                    <h2 className="movie-title">{movie.title || movie.name}</h2>
                </span>
            </Link>
        </div>
    )
}

export default MovieCard;
