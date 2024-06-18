import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import "../styles/GridMovies.css"
import MovieCard from "../components/MovieCard"

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([])
    const query = searchParams.get("q")

    const getSearchedMovies = async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        setMovies(data.results);
    }

    useEffect(() => {
        const searchQueryURL = `${searchURL}?${apiKey}&language=pt-BR&query=${query}`
        getSearchedMovies(searchQueryURL);
    }, [query])

    return (
        <div className="gridmovies-page">
            <div className="container">
                <h2 className="title">Resultados para: <span className="query-text">{query}</span></h2>
                <div className="movies-container">
                    {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
                </div>
            </div>
        </div>
    )
}

export default Search