import React from "react";
import "./styles.css";
import { FiCornerDownLeft, FiUserPlus } from "react-icons/fi";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function NovoAluno() {
  const [id, setId] = React.useState(0);
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [idade, setIdade] = React.useState(0);
  const navigate = useNavigate();

  const { alunoId } = useParams();

  const token = localStorage.getItem("token");

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  React.useEffect(() => {
    if (alunoId === "0") return;
    else loadAluno();
  }, [alunoId]);

  async function saveOrUpdate(event) {
    event.preventDefault();

    const aluno = {
      nome: nome,
      email: email,
      idade: idade,
    };
    try {
      if (alunoId === "0") {
        await api.post("alunos", aluno, authorization);
        alert("Aluno cadastrado com sucesso!");
      } else {
        aluno.id = id;
        await api.put(`alunos/${id}`, aluno, authorization);
        alert("Aluno atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
    }
    navigate(`/alunos`);
  }

  async function loadAluno() {
    try {
      const response = await api.get(`alunos/${alunoId}`, authorization);
      const aluno = response.data;
      setId(aluno.id);
      setNome(aluno.nome);
      setEmail(aluno.email);
      setIdade(aluno.idade);
    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
    }
  }

  return (
    <div className="novo-aluno-container">
      <div className="content">
        <section className="form">
          <FiUserPlus size={100} color="#000" />
          <h1>{alunoId === "0" ? "Incluir Novo Aluno" : "Atualizar Aluno"}</h1>
          <Link to="/alunos" className="back-link">
            <FiCornerDownLeft size="25" color="#17202a" />
            Retornar
          </Link>
        </section>
        <form className="form">
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
          <button className="button" type="submit" onClick={saveOrUpdate}>
            {alunoId === "0" ? "Cadastrar" : "Atualizar"}
          </button>
        </form>
      </div>
    </div>
  );
}
