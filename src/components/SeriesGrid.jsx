import React, { useEffect, useState } from 'react'
import MovieSection from './MovieSection'
import 'swiper/css';
import '../styles/GridMovies.css';

const tvsURL = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;

const fetchSeries = async (url, setter, setLoading, setError) => {
    try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setter(data.results);
    } catch (error) {
        setError(true);
        console.error("Error fetching series:", error);
    } finally {
        setLoading(false);
    }
};

const SeriesGrid = () => {
    const [airingToday, setAiringToday] = useState([]);
    const [onTheAir, setOnTheAir] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);

    const [loadingTop, setLoadingTop] = useState(false);
    const [loadingNews, setLoadingNews] = useState(false);
    const [loadingPopular, setLoadingPopular] = useState(false);
    const [loadingUpcoming, setLoadingUpcoming] = useState(false);

    const [errorTop, setErrorTop] = useState(false);
    const [errorNews, setErrorNews] = useState(false);
    const [errorPopular, setErrorPopular] = useState(false);
    const [errorUpcoming, setErrorUpcoming] = useState(false);

    useEffect(() => {
        const airingTodayURL = `${tvsURL}airing_today?${apiKey}&language=pt-BR`;
        const onTheAirURL = `${tvsURL}on_the_air?${apiKey}&language=pt-BR&region=BR`;
        const popularURL = `${tvsURL}popular?${apiKey}&language=pt-BR&region=BR`;
        const topRatedURL = `${tvsURL}top_rated?${apiKey}&language=pt-BR&region=BR`;

        fetchSeries(airingTodayURL, setAiringToday, setLoadingTop, setErrorTop);
        fetchSeries(onTheAirURL, setOnTheAir, setLoadingNews, setErrorNews);
        fetchSeries(popularURL, setPopular, setLoadingPopular, setErrorPopular);
        fetchSeries(topRatedURL, setTopRated, setLoadingUpcoming, setErrorUpcoming);
    }, []);

  return (
    <div className="gridmovies-page">
            <MovieSection
                title="Saindo hoje:"
                movies={airingToday}
                loading={loadingNews}
                error={errorNews}
            />
            <MovieSection
                title="Populares:"
                movies={popular}
                loading={loadingTop}
                error={errorTop}
            />
            <MovieSection
                title="Melhores avaliações:"
                movies={topRated}
                loading={loadingUpcoming}
                error={errorUpcoming}
            />
            <MovieSection
                title="No ar:"
                movies={onTheAir}
                loading={loadingPopular}
                error={errorPopular}
            />
        </div>
  )
}

export default SeriesGrid