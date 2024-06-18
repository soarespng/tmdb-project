import React from 'react';
import MovieCard from './MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const MovieSection = ({ title, movies, loading, error }) => (
    <div className="container">
        {/* <h2 className="title">{title}</h2> */}
        <div className="movies-container">
            {loading && <p>Carregando...</p>}
            {error && <p>Erro ao carregar filmes.</p>}
            {!loading && !error && movies.length > 0 && (
                <Swiper spaceBetween={5} slidesPerView={3.6}>
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

export default MovieSection;
