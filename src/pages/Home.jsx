import { useState } from "react";
import MoviesGrid from "../components/MoviesGrid";
import Menus from "../components/Menus"; // Certifique-se de importar o componente Menus

const Home = () => {
    const [selectedSection, setSelectedSection] = useState("discover");

    return (
        <div className="gridmovies-page">
            <Menus selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
            {selectedSection === "filmes" && <MoviesGrid />}
            {/* Você pode adicionar mais renderizações condicionais aqui para outras seções */}
        </div>
    );
};

export default Home;
