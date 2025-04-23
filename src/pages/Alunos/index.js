import React from "react";
import "./styles.css";
import logoCadastro from "../../assets/pngegg (1).png";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FiEdit, FiUserX, FiXCircle } from "react-icons/fi";

export default function Alunos() {
  const navigate = useNavigate();

  const [nome, setNome] = React.useState("");
  const [alunos, setAlunos] = React.useState([]);

  const [searchInput, setSearchInput] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  async function editAluno(id) {
    try {
      navigate(`/alunos/novo/${id}`);
    } catch (error) {
      console.error("Erro ao editar aluno:", error);
    }
  }

  const searchAlunos = (serachValue) => {
    setSearchInput(serachValue);
    if (serachValue !== "") {
      const filteredData = alunos.filter((aluno) => {
        return Object.values(aluno)
          .join("")
          .toLowerCase()
          .includes(serachValue.toLowerCase());
      });
      setSearchResults(filteredData);
    } else {
      setSearchResults(alunos);
    }
  };

  async function deleteAluno(id) {
    try {
      if (window.confirm("Deseja realmente excluir o aluno?" + id)) {
        await api.delete(`alunos/${id}`, authorization);
        setAlunos(alunos.filter((aluno) => aluno.id !== id));
      }
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
  }

  React.useEffect(() => {
    api
      .get("alunos", authorization)
      .then((response) => {
        setAlunos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar alunos:", error);
      });
  }, []);

  async function logout() {
    try {
      if (window.confirm("Deseja realmente sair?")) {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  return (
    <div className="aluno-container">
      <header>
        <img src={logoCadastro} alt="Cadastro" width={50} />
        <span>
          Bem vindo, <strong>{email}</strong>!
        </span>
        <Link className="button" to="novo/0">
          Cadastrar aluno
        </Link>
        <button type="button" onClick={logout}>
          <FiXCircle size={35} color="#17202a" />
        </button>
      </header>
      <form>
        <input
          type="text"
          placeholder="Filtrar por nome..."
          onChange={(e) => searchAlunos(e.target.value)}
        />
      </form>
      <h1>Alunos cadastrados</h1>
      {searchInput.length > 0 ? (
        <ul>
          {searchResults.map((aluno) => (
            <li key={aluno.id}>
              <b>Nome:</b> {aluno.nome}
              <br />
              <br />
              <b>Email:</b> {aluno.email}
              <br />
              <br />
              <b>Idade:</b> {aluno.idade}
              <br />
              <br />
              <button type="button" onClick={() => editAluno(aluno.id)}>
                <FiEdit size={25} color="#17202a" />
              </button>
              <button type="button">
                <FiUserX size={25} color="#17202a" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {alunos.map((aluno) => (
            <li key={aluno.id}>
              <b>Nome:</b> {aluno.nome}
              <br />
              <br />
              <b>Email:</b> {aluno.email}
              <br />
              <br />
              <b>Idade:</b> {aluno.idade}
              <br />
              <br />
              <button type="button" onClick={() => editAluno(aluno.id)}>
                <FiEdit size={25} color="#17202a" />
              </button>
              <button type="button" onClick={() => deleteAluno(aluno.id)}>
                <FiUserX size={25} color="#17202a" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
