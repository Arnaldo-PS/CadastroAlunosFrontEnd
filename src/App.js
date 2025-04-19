import "./App.css";
import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import logoCadastro from "./assets/pngegg.png";

function App() {
  const baseUrl = "https://localhost:7068/api/alunos";

  const [data, setData] = React.useState([]);
  const [updateData, setUpdateData] = React.useState(true);
  const [modalIncluir, setModalIncluir] = React.useState(false);
  const [modalEditar, setModalEditar] = React.useState(false);
  const [modalExcluir, setModalExcluir] = React.useState(false);

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  };
  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  const abrirFecharModalExcluir = () => {
    setModalExcluir(!modalExcluir);
  };

  const [alunoSelecionado, setAlunoSelecionado] = React.useState({
    id: 0,
    nome: "",
    email: "",
    idade: 0,
  });

  const selecionarAluno = (aluno, opcao) => {
    setAlunoSelecionado(aluno);
    opcao === "Editar" ? abrirFecharModalEditar() : abrirFecharModalExcluir();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlunoSelecionado({ ...alunoSelecionado, [name]: value });
    console.log(alunoSelecionado);
  };

  const pedidoGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoPost = async () => {
    delete alunoSelecionado.id;
    await axios
      .post(baseUrl, alunoSelecionado)
      .then((response) => {
        setData(data.concat(response.data));
        setUpdateData(true);
        abrirFecharModalIncluir();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoPut = async () => {
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);
    await axios
      .put(baseUrl + "/" + alunoSelecionado.id, alunoSelecionado)
      .then((response) => {
        var resposta = response.data;
        var dadosAuxiliares = data;
        dadosAuxiliares.map((aluno) => {
          if (aluno.id === alunoSelecionado.id) {
            aluno.nome = resposta.nome;
            aluno.email = resposta.email;
            aluno.idade = resposta.idade;
          }
        });
        setUpdateData(true);
        abrirFecharModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoDelete = async () => {
    await axios
      .delete(baseUrl + "/" + alunoSelecionado.id)
      .then((response) => {
        setData(data.filter((aluno) => aluno.id !== response.data));
        setUpdateData(true);
        abrirFecharModalExcluir();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (updateData) {
      pedidoGet();
      setUpdateData(false);
    }
  }, [updateData]);

  return (
    <div className="aluno-container">
      <br />
      <h3>Cadastro de alunos</h3>
      <header>
        <img src={logoCadastro} alt="Logo" height={70} width={70} />
        <button
          className="btn btn-success"
          onClick={() => abrirFecharModalIncluir()}
        >
          Incluir novo aluno
        </button>
      </header>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => selecionarAluno(aluno, "Editar")}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => selecionarAluno(aluno, "Excluir")}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={modalIncluir} onHide={abrirFecharModalIncluir}>
        <ModalHeader closeButton>Incluir Alunos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
            />
            <br />
            <label>Email:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
            />
            <br />
            <label>Idade:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="idade"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPost()}>
            Salvar
          </button>{" "}
        </ModalFooter>
      </Modal>
      <Modal show={modalEditar} onHide={abrirFecharModalEditar}>
        <ModalHeader closeButton>Editar Alunos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID:</label>
            <br />
            <input
              type="text"
              className="form-control"
              readOnly
              value={alunoSelecionado && alunoSelecionado.id}
            />
            <br />
            <label>Nome:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
              value={
                alunoSelecionado && alunoSelecionado.nome
                  ? alunoSelecionado.nome
                  : ""
              }
            />
            <br />
            <label>Email:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={
                alunoSelecionado && alunoSelecionado.email
                  ? alunoSelecionado.email
                  : ""
              }
            />
            <br />
            <label>Idade:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="idade"
              onChange={handleChange}
              value={
                alunoSelecionado && alunoSelecionado.idade
                  ? alunoSelecionado.idade
                  : ""
              }
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPut()}>
            Editar
          </button>{" "}
        </ModalFooter>
      </Modal>
      <Modal show={modalExcluir} onHide={abrirFecharModalExcluir}>
        <ModalBody>
          Confirma a exclusão do aluno{" "}
          {alunoSelecionado && alunoSelecionado.nome}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => pedidoDelete()}>
            Sim
          </button>{" "}
          <button
            className="btn btn-secondary"
            onClick={() => abrirFecharModalExcluir()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
