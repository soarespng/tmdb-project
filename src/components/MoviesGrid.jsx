import React, { useEffect, useState } from 'react'
import MovieSection from './MovieSection'
import 'swiper/css';
import '../styles/GridMovies.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const fetchMovies = async (url, setter, setLoading, setError) => {
    try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setter(data.results);
    } catch (error) {
        setError(true);
        console.error("Error fetching movies:", error);
    } finally {
        setLoading(false);
    }
};

const MoviesGrid = () => {
    const [topMovies, setTopMovies] = useState([]);
    const [newsMovies, setNewsMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    const [loadingTop, setLoadingTop] = useState(false);
    const [loadingNews, setLoadingNews] = useState(false);
    const [loadingPopular, setLoadingPopular] = useState(false);
    const [loadingUpcoming, setLoadingUpcoming] = useState(false);

    const [errorTop, setErrorTop] = useState(false);
    const [errorNews, setErrorNews] = useState(false);
    const [errorPopular, setErrorPopular] = useState(false);
    const [errorUpcoming, setErrorUpcoming] = useState(false);

    useEffect(() => {
        const topRatedURL = `${moviesURL}top_rated?${apiKey}&language=pt-BR`;
        const newsURL = `${moviesURL}now_playing?${apiKey}&language=pt-BR&region=BR`;
        const popularURL = `${moviesURL}popular?${apiKey}&language=pt-BR&region=BR`;
        const upcomingURL = `${moviesURL}upcoming?${apiKey}&language=pt-BR&region=BR`;

        fetchMovies(topRatedURL, setTopMovies, setLoadingTop, setErrorTop);
        fetchMovies(newsURL, setNewsMovies, setLoadingNews, setErrorNews);
        fetchMovies(popularURL, setPopularMovies, setLoadingPopular, setErrorPopular);
        fetchMovies(upcomingURL, setUpcomingMovies, setLoadingUpcoming, setErrorUpcoming);
    }, []);


    return (
        <div className="gridmovies-page">
            <MovieSection
                title="Nos cinemas:"
                movies={newsMovies}
                loading={loadingNews}
                error={errorNews}
            />
            <MovieSection
                title="Populares:"
                movies={popularMovies}
                loading={loadingPopular}
                error={errorPopular}
            />
            <MovieSection
                title="Melhores avaliações:"
                movies={topMovies}
                loading={loadingTop}
                error={errorTop}
            />
            <MovieSection
                title="Em breve:"
                movies={upcomingMovies}
                loading={loadingUpcoming}
                error={errorUpcoming}
            />
        </div>
    )
}

export default MoviesGrid