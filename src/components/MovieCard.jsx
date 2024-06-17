import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <img src={imageUrl + movie.poster_path} />
                <span className="text-card">
                    <h2>{movie.title}</h2>
                </span>
            </Link>
        </div>
    )
}

export default MovieCard;
