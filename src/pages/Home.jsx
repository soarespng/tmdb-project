import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import './GridMovies.css';

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

const MovieSection = ({ title, movies, loading, error }) => (
    <div className="container">
        <h2 className="title">{title}</h2>
        <div className="movies-container">
            {loading && <p>Carregando...</p>}
            {error && <p>Erro ao carregar filmes.</p>}
            {!loading && !error && movies.length > 0 && (
                <Swiper spaceBetween={5} slidesPerView={4}>
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <MovieCard key={movie.id} movie={movie} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    </div>
);

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);
    const [newsMovies, setNewsMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingURLMovies, setUpcomingURLMovies] = useState([]);

    const [loadingTop, setLoadingTop] = useState(false);
    const [loadingNews, setLoadingNews] = useState(false);
    const [loadingPopular, setPopularNews] = useState(false);
    const [loadingUpcomingURL, setUpcomingURLNews] = useState(false);

    const [errorTop, setErrorTop] = useState(false);
    const [errorNews, setErrorNews] = useState(false);
    const [errorPopular, setErrorPopular] = useState(false);
    const [errorUpcomingURL, setErrorUpcomingURL] = useState(false);

    useEffect(() => {
        const topRatedURL = `${moviesURL}top_rated?${apiKey}&language=pt-BR`;
        const newsURL = `${moviesURL}now_playing?${apiKey}&language=pt-BR&region=BR`;
        const popularURL = `${moviesURL}popular?${apiKey}&language=pt-BR&region=BR`;
        const upcomingURL = `${moviesURL}upcoming?${apiKey}&language=pt-BR&region=BR`;

        fetchMovies(topRatedURL, setTopMovies, setLoadingTop, setErrorTop);
        fetchMovies(newsURL, setNewsMovies, setLoadingNews, setErrorNews);
        fetchMovies(popularURL, setPopularMovies, setPopularNews, setErrorPopular);
        fetchMovies(upcomingURL, setUpcomingURLMovies, setUpcomingURLNews, setErrorUpcomingURL);
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
                movies={upcomingURLMovies}
                loading={loadingUpcomingURL}
                error={errorUpcomingURL}
            />
        </div>
    );
};

export default Home;
