import React from "react";
import "./styles.css";
import logoCadastro from "../../assets/pngegg (1).png";
import { Link } from "react-router-dom";
import { FiEdit, FiUserX, FiXCircle } from "react-icons/fi";

export default function Alunos() {
  return (
    <div className="aluno-container">
      <header>
        <img src={logoCadastro} alt="Cadastro" width={50} />
        <span>
          Bem vindo, <strong>Arnaldo</strong>!
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
        <li>
          <b>Nome:</b>Paulo
          <br />
          <br />
          <b>Email:</b> paulo@email.com.br
          <br />
          <br />
          <b>Idade:</b> 22
          <br />
          <br />
          <button type="button">
            <FiEdit size={25} color="#17202a" />
          </button>
          <button type="button">
            <FiUserX size={25} color="#17202a" />
          </button>
        </li>
      </ul>
    </div>
  );
}
