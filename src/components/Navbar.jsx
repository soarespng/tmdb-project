import { useState } from "react";
import { BiSearchAlt2 } from 'react-icons/bi';
import { Link, useNavigate } from "react-router-dom";

import './Navbar.css';

const Navbar = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <nav id="navbar">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="text" placeholder="Buscar" onChange={(e) => setSearch(e.target.value)} value={search}/>
          <button type="submit" className="search-button"><BiSearchAlt2 className="search-icon" /></button>
        </div>
      </form>
    </nav>
  );
}

export default Navbar;