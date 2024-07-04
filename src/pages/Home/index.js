import { useEffect, useState } from "react"; // Importing react hooks
import api from "../../services/api"; // Importing api


function Home() {
  const [filmes, setFilmes] = useState([]); // Estado para armazenar os filmes

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {   //Espera a requisição ser feita com o método await
        params: {
          api_key: process.env.APP_API_KEY,
          language: "pt-BR",
          page: 1,
        },
      }) // Requisição para a API
      console.log("API Key:", process.env.APP_API_KEY); // Adicione esta linh
      // console.log(response.data.results); // Exibindo os resultados no console

      setFilmes(response.data.results.slice(0,10)); // Setando os filmes no estado
    }


    loadFilmes(); // Chamada da função
  }, []); // Array vazio para executar apenas uma vez

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              </article>
          )
        })}
      </div>
    </div>
  );
}

export default Home;
