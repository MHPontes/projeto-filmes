import { useEffect, useState } from "react"; // Importing react hooks
import api from "../../services/api"; // Importing api
import { Link } from "react-router-dom"; // Importing Link
import "./home.css"; // Importing css

function Home() {
  const [filmes, setFilmes] = useState([]); // Estado para armazenar os filmes
  const [loading, setLoading] = useState(true); // Estado para armazenar o loading

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        //Espera a requisição ser feita com o método await
        params: {
          api_key: "SUA API",
          language: "pt-BR",
          page: 1,
        },
      }); // Requisição para a API

      // console.log(response.data.results); // Exibindo os resultados no console

      setFilmes(response.data.results.slice(0, 10)); // Setando os filmes no estado de 0 a 10 itens
      setLoading(false); // Setando o loading como false
    }

    loadFilmes(); // Chamada da função
  }, []); // Array vazio para executar apenas uma vez

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          // Mapeando os filmes para exibir na tela
          return (
            <article key={filme.id}>
              {" "}
              {/* Key para identificar cada filme */}
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} // Imagem do filme
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>{" "}
              {/* Link para acessar a página do filme} */}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
