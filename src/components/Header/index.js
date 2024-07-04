import "./header.css"; //importando o css
import { Link } from "react-router-dom"; //importando o link do react-router-dom

function Header() {
  return (
    <header>
      <Link className="logo" to="/"> Prime Flix</Link>
      <Link className="favoritos" to="/favoritos"> Meus Filmes</Link>
    </header>
  );
}

export default Header;
