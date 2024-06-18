import { useState } from "react";
import { BiSearchAlt2 } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import '../styles/Navbar.css';

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <nav className="navbar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Buscar" 
            onChange={(e) => setSearch(e.target.value)} 
            value={search}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <BiSearchAlt2 className="search-icon" />
          </button>
        </div>
      </form>
    </nav>
  );
}

export default Navbar;
