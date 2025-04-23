import React from "react";
import "./styles.css";
import logoCadastro from "../../assets/pngegg (1).png";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { FiEdit, FiUserX, FiXCircle } from "react-icons/fi";

export default function Alunos() {
  const [nome, setNome] = React.useState("");
  const [alunos, setAlunos] = React.useState([]);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  React.useEffect(() => {
    console.log("Authorization header:", authorization);

    api
      .get("alunos", authorization)
      .then((response) => {
        setAlunos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar alunos:", error);
      });
  }, []);

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
        <button type="button">
          <FiXCircle size={35} color="#17202a" />
        </button>
      </header>
      <form>
        <input type="text" placeholder="Nome do Aluno" required />
        <button type="submit" className="button">
          Buscar aluno
        </button>
      </form>
      <h1>Alunos cadastrados</h1>
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
            <button type="button">
              <FiEdit size={25} color="#17202a" />
            </button>
            <button type="button">
              <FiUserX size={25} color="#17202a" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
