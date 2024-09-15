import React, { useState } from 'react';
import './index.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de login vai aqui
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-red-500">
      <div className="w-3/4 max-w-4xl h-96 flex shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 bg-gray-900 flex flex-col justify-center items-center p-8">
          <img
            src="https://mindconsulting.com.br/wp-content/uploads/2023/08/LOGOTIPO-Mind-Group-Technologies-Branco.png"
            alt="Logotipo Mind Group Technologies"
            className="mb-4 w-32"
          />
          <h1 className="text-white text-2xl mb-4">
            Bem-vindo ao <br />
            portal de acesso <br />
            remoto do site demo
          </h1>
          <p className="text-white text-sm mt-auto">
            © 2024 Site desenvolvido para o processo seletivo MindGroup.
          </p>
        </div>
        <div className="w-1/2 bg-red-500 flex flex-col justify-center items-center p-8">
          <h2 className="text-white text-xl mb-4">Faça login na sua conta</h2>
          <form className="w-full max-w-sm" onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-200 text-sm mb-2" htmlFor="username">
                Usuário
              </label>
              <input
                className="w-full px-3 py-2 text-gray-900 bg-red-700 border border-red-600 rounded focus:outline-none focus:border-gray-500"
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Usuário"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 text-sm mb-2" htmlFor="password">
                Senha
              </label>
              <input
                className="w-full px-3 py-2 text-gray-900 bg-red-700 border border-red-600 rounded focus:outline-none focus:border-gray-500"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2"
              />
              <label htmlFor="remember" className="text-gray-200 text-sm">
                Lembrar-me
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-gray-200 text-xs mt-4">Esqueceu sua senha?</p>
          <p className="text-gray-200 text-xs mt-2">
            Não tem uma conta?{' '}
            <a href="Register" className="text-white underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
