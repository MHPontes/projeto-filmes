import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./filme-info.css";
import api from "../../services/api";

function Filme() {
  const { id } = useParams(); // Pegando o id do filme
  const [filme, setFilme] = useState([]); // Estado para armazenar o filme
  const [loading, setLoading] = useState(true); // Estado para armazenar o loading
  const navigate = useNavigate(); // Hook para navegação

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
          console.log("Erro ao carregar filme, redirecionando para a Home");
          navigate("/", { replace: true });    // Se ocorrer um erro, redireciona para a Home
          return;
        });
    }

    loadFilme(); // Chamada da função para carregar o filme com o id passado na URL

    return () => {
      console.log("Componente desmontado");
    };
  }, [id, navigate]);

  function salvarFilme(){
    const minhaLista = localStorage.getItem('@primeflix');  // Pegando a lista de filmes salvos
    
    let filmesSalvos = JSON.parse(minhaLista) || [];

    // Se tiver algum filme salvo com o mesmo id, não salva
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

    if(hasFilme){
      alert('Você já possui esse filme salvo');
      return;
    }

    filmesSalvos.push(filme);   // Adicionando o filme na lista de filmes salvos
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));  // Salvando a lista de filmes no localStorage
    alert('Filme salvo com sucesso!');

  }

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
        src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`}   // Imagem do filme
        alt={filme.title}   
      />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} /10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}> Salvar </button>
        <button> 
          <a href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel="external">   {/* Link para pesquisar o trailer do filme no YouTube */}
            Trailer
          </a>
        </button>

        </div>
    </div>
  );
}

export default Filme;
