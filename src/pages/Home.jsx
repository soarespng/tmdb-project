import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard";

import './GridMovies.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);

    const getTopRatedMovies = async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        setTopMovies(data.results);
    }

    useEffect(() => {
        const topRatedURL = `${moviesURL}top_rated?${apiKey}&language=pt-BR`

        getTopRatedMovies(topRatedURL);
    }, [])

    return (
        <div className="container">
            <h2 className="title">Melhores filmes:</h2>
            <div className="movies-container">
                {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Home