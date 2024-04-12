import { Link } from "react-router-dom";
import s from "./Header.module.css";
function Header() {
  return (
    <header className={s.header}>
      <h1>Movies</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/addMovie">Add movie</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
