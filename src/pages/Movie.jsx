import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsHourglassSplit, BsStar, BsCalendar, BsCollection } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MovieCard from "../components/MovieCard";
import "../styles/Movie.css";

const imageUrl = import.meta.env.VITE_IMG;
const logoImageUrl = import.meta.env.VITE_IMG_LOGO;
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
};

const fetchData = async (url, setter, setLoading, setError) => {
    try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setter(data);
    } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
};

const MovieSection = ({ title, movies, loading, error }) => (
    <div className="similar-movies">
        <h2 className="movie-title">{title}</h2>
        {loading && <p>Carregando...</p>}
        {error && <p>Erro ao carregar filmes.</p>}
        {!loading && !error && movies.length > 0 && (
            <Swiper spaceBetween={5} slidesPerView={3}>
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
        )}
    </div>
);

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [providers, setProviders] = useState([]);
    const [loadingMovie, setLoadingMovie] = useState(false);
    const [loadingSimilar, setLoadingSimilar] = useState(false);
    const [loadingProviders, setLoadingProviders] = useState(false);
    const [errorMovie, setErrorMovie] = useState(false);
    const [errorSimilar, setErrorSimilar] = useState(false);
    const [errorProviders, setErrorProviders] = useState(false);

    useEffect(() => {
        const movieURL = `${moviesURL}${id}?${apiKey}&language=pt-BR`;
        const similarURL = `${moviesURL}${id}/similar?${apiKey}&language=pt-BR`;
        const providersURL = `${moviesURL}${id}/watch/providers?${apiKey}`;

        fetchData(movieURL, setMovie, setLoadingMovie, setErrorMovie);
        fetchData(similarURL, (data) => setSimilar(data.results), setLoadingSimilar, setErrorSimilar);
        fetchData(providersURL, (data) => setProviders(data.results?.BR?.flatrate || []), setLoadingProviders, setErrorProviders);
    }, [id]);

    return (
        <div className="movie-page">
            <div className="movie-container">
                {loadingMovie && <p>Carregando...</p>}
                {errorMovie && <p>Erro ao carregar o filme.</p>}
                {movie && (
                    <>
                        <div className="movie-header">
                            <img src={imageUrl + movie.poster_path} alt={movie.title} />
                            <div className="movie-info">
                                <h1 className="movie-title">{movie.title}</h1>
                                <p className="movie-tagline">{movie.tagline}</p>
                                <h2 className="movie-title">Informações:</h2>
                                <p className="movie-runtime">
                                    <BsHourglassSplit /> Duração: {formatRuntime(movie.runtime)}
                                </p>
                                <p className="movie-runtime">
                                    <BsStar /> Nota: {movie.vote_average.toFixed(1)}
                                </p>
                                <p className="movie-runtime">
                                    <BsCalendar /> Ano: {new Date(movie.release_date).getFullYear()}
                                </p>
                                <p className="movie-runtime">
                                    <BsCollection /> Gêneros: {movie.genres.map((genre) => genre.name).join(", ")}
                                </p>
                                <br />
                                {providers.length > 0 && <>
                                    <h2 className="movie-title">Streamings:</h2>
                                    <div className="providers-list">
                                        {providers.map((provider) => (
                                            <div key={provider.provider_id} className="provider-item">
                                                <p>{provider.provider_name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>}
                                <br />
                                <h2 className="movie-title">Sinopse:</h2>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                        <MovieSection
                            title="Títulos similares:"
                            movies={similar}
                            loading={loadingSimilar}
                            error={errorSimilar}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Movie;
