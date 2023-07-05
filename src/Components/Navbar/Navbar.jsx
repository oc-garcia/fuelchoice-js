import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <Link to="/">
        <h1>Fuel Choice</h1>
      </Link>
      <Link to="/history">History</Link>
    </header>
  );
}
