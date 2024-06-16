import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BsHourglassSplit } from "react-icons/bs"

import MovieCard from "../components/MovieCard"
import "./Movie.css"

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
    const {id} = useParams()
    const [movie, setMovie] = useState(null)

    const getMovie = async(url) => {
        const response = await fetch(url);
        const data = await response.json();

        setMovie(data);
    }

    useEffect(() => {
        const movieURL = `${moviesURL}${id}?${apiKey}&language=pt-BR`
        getMovie(movieURL)
    }, [id])

    return (
        <div className="movie-container">
            {movie && (
                <>
                    <div className="movie-header">
                        <MovieCard movie={movie} showLink={false} />
                        <div className="movie-info">
                            <h1 className="movie-title">{movie.title}</h1>
                            <p className="movie-tagline">{movie.tagline}</p>
                            <p className="movie-runtime">
                                <BsHourglassSplit /> {movie.runtime} minutos
                            </p>
                        </div>
                    </div>
                    <div className="movie-overview">
                        <h2>Sinopse</h2>
                        <p>{movie.overview}</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default Movie
