import { useEffect, useState } from "react";
import "./favoritos.css";
import { Link } from "react-router-dom";

function Favoritos() {
  const [filmes, setFilmes] = useState([]); // Estado para armazenar os filmes

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix"); // Pegando a lista de filmes do localStorage
    setFilmes(JSON.parse(minhaLista) || []); // Setando os filmes no estado ou um array vazio caso não tenha nada no localStorage convertendo de string para array
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => { // Filtrando os filmes para excluir o filme com o id passado
      return item.id !== id;
    })

    setFilmes(filtroFilmes); // Setando os filmes no estado
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes)); // Salvando a lista de filmes no
  }

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>

        {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}
        
      <ul>
        {" "}
        {/* Lista de filmes */}
        {filmes.map((item) => {
          // Mapeando os filmes para exibir na tela
          return (
            <li key={item.id}>
              {" "}
              {/* Key para identificar cada filme, */}
              <span>{item.title}</span> {/* Exibindo o título do filme */}
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>{" "}
                {/* Link para acessar a página do filme */}
                <button onClick={() => excluirFilme(item.id)}>
                  Excluir
                </button>{" "}
                {/* Botão para excluir o filme */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
