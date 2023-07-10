import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { Database, GasPump } from "@phosphor-icons/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navBarContainer">
      <Link to="/">
        <GasPump size={48} />
        <h1>Fuel Choice</h1>
      </Link>
      <button className={`hamburguer ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
      <ul className={`menu ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/history">
            <Database size={18} />
            History
          </Link>
        </li>
      </ul>
    </header>
  );
}
