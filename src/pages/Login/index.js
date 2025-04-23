import React, { useState } from "react";
import "./styles.css";
import logoImage from "../../assets/aspnet-featured-removebg-preview.png";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault(); // Evitar o comportamento padrão do formulário

    const data = {
      email,
      password,
    };

    try {
      const response = await api.post("account/login", data);

      localStorage.setItem("email", email);
      localStorage.setItem("token", response.data.token);
      console.log("Token:", response.data.token);
      localStorage.setItem("expiration", response.data.expiration);

      navigate("/alunos");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImage} alt="Login" id="img1" height={200} />

        <form>
          <h1>Entrar no portal Alunos</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="button" onClick={login}>
            Entrar
          </button>
        </form>
      </section>
    </div>
  );
}
