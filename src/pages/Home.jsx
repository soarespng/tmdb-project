import { useState } from "react";
import MoviesGrid from "../components/MoviesGrid";
import Menus from "../components/Menus"; // Certifique-se de importar o componente Menus
import SeriesGrid from "../components/SeriesGrid";

const Home = () => {
    const [selectedSection, setSelectedSection] = useState("discover");

    return (
        <div className="gridmovies-page">
            <Menus selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
            {selectedSection === "filmes" && <MoviesGrid />}
            {selectedSection === "series" && <SeriesGrid />}
        </div>
    );
};

export default Home;
