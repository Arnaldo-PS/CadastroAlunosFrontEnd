import React from "react";
import "./styles.css";
import logoImage from "../../assets/aspnet-featured-removebg-preview.png";

export default function Login() {
  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImage} alt="Login" id="img1" height={200} />

        <form>
          <h1>Entrar no portal Alunos</h1>
          <div className="input-container">
            <input type="text" placeholder="Email" required />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Senha" required />
          </div>
          <button type="submit" className="button">
            Entrar
          </button>
        </form>
      </section>
    </div>
  );
}
