import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import 'swiper/css';
import '../styles/GridMovies.css';

const apiKey = import.meta.env.VITE_API_KEY;

const sortOptions = [
    'popularity.desc',
    'release_date.desc',
    'revenue.desc',
    'primary_release_date.desc',
    'vote_average.desc',
    'vote_count.desc',
];

const getRandomSort = () => {
    const randomIndex = Math.floor(Math.random() * sortOptions.length);
    return sortOptions[randomIndex];
};

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

const Discover = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedSort, setSelectedSort] = useState('');

    useEffect(() => {
        const randomSort = getRandomSort();
        setSelectedSort(randomSort);
        const exploreURL = `https://api.themoviedb.org/3/discover/movie?${apiKey}&include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=${randomSort}`;

        fetchMovies(exploreURL, setMovies, setLoading, setError);
    }, []);

    return (
        <div className="container">
            <h2>Explorar: {selectedSort.replace('_', ' ').toUpperCase()}</h2>
            <div className="movies-container">
                {loading && <p>Carregando...</p>}
                {error && <p>Erro ao carregar filmes.</p>}
                {!loading && !error && movies.length > 0 && (
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Discover;
