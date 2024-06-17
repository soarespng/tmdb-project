import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsHourglassSplit } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import MovieCard from "../components/MovieCard";
import "./Movie.css";

const imageUrl = import.meta.env.VITE_IMG;
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [similar, setSimilar] = useState([]);

    const getMovie = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data);
    };

    const getSimilar = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setSimilar(data.results);
    };

    useEffect(() => {
        const movieURL = `${moviesURL}${id}?${apiKey}&language=pt-BR`;
        getMovie(movieURL);
    }, [id]);

    useEffect(() => {
        const similarURL = `${moviesURL}${id}/similar?${apiKey}&language=pt-BR`;
        getSimilar(similarURL);
    }, [id]);

    return (
        <div className="movie-page">
            <div className="movie-container">
                {movie && (
                    <>
                        <div className="movie-header">
                            <img src={imageUrl + movie.poster_path} alt={movie.title} />
                            <div className="movie-info">
                                <h1 className="movie-title">{movie.title}</h1>
                                <p className="movie-tagline">{movie.tagline}</p>
                                <p className="movie-runtime">
                                    <BsHourglassSplit /> {movie.runtime} minutos
                                </p>
                                <br />
                                <h2 className="movie-title">Sinopse</h2>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                        <div className="similar-movies">
                            <h2 className="movie-title">Titulos similares:</h2>
                            {similar.length > 0 && (
                                <Swiper spaceBetween={5} slidesPerView={3}>
                                    {similar.map((similarMovie) => (
                                        <SwiperSlide key={similarMovie.id}>
                                            <MovieCard movie={similarMovie} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Movie;