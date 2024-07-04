import { useEffect, useState } from "react"; // Importing react hooks
import api from "../../services/api"; // Importing api

function Home() {
  const [filmes, setFilmes] = useState([]); // Estado para armazenar os filmes

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {   //Espera a requisição ser feita com o método await
        params: {
          api_key: "d1aab98fc9d57be645fb38aec872ebf2",
          language: "pt-BR",
          page: 1,
        },
      }) // Requisição para a API
    
      console.log(response.data.results); // Exibindo os resultados no console
    }

    loadFilmes(); // Chamada da função
  }, []); // Array vazio para executar apenas uma vez

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
