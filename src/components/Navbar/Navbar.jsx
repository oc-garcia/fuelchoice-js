import { Link } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <header className="navBarContainer">
      <Link to="/">
        <h1>Fuel Choice</h1>
      </Link>
      <Link to="/history">History</Link>
    </header>
  );
}
