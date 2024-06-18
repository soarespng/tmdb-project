import { useState } from "react";
import MoviesGrid from "../components/MoviesGrid";
import Menus from "../components/Menus"; // Certifique-se de importar o componente Menus
import SeriesGrid from "../components/SeriesGrid";
import Discover from "../components/Discover";

const Home = () => {
    const [selectedSection, setSelectedSection] = useState("discover");

    return (
        <div className="gridmovies-page">
            <Menus selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
            {selectedSection === "filmes" && <MoviesGrid />}
            {selectedSection === "series" && <SeriesGrid />}
            {selectedSection === "discover" && <Discover />}
        </div>
    );
};

export default Home;
