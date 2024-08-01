import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./filme-info.css";
import api from "../../services/api";

function Filme() {
  const { id } = useParams(); // Pegando o id do filme
  const [filme, setFilme] = useState([]); // Estado para armazenar o filme
  const [loading, setLoading] = useState(true); // Estado para armazenar o loading

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "pt-BR",
          },
        })
        .then((response) => {
          //Se a requisição for bem sucedida, seta o filme e o loading como false
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Erro ao carregar filme");
        });
    }

    loadFilme(); // Chamada da função para carregar o filme com o id passado na URL

    return () => {
      console.log("Componente desmontado");
    };
  }, []);

  if (loading) {
    return (
      <div className="filme-info">
        <h2>Carregando filme...</h2>
      </div>
    );
  }

  return (
    // Exibindo as informações do filme
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} /10</strong>

      <div className="area-buttons">
        <button> Salvar </button>
        <button> 
          <a href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`} target="_blank">
            Trailer
          </a>
        </button>

        </div>
    </div>
  );
}

export default Filme;
