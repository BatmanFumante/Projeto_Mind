import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Importando ícones do react-icons

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica de registro vai aqui
    console.log('Name:', name, 'Email:', email, 'Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-red-500">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img
            src="https://mindconsulting.com.br/wp-content/uploads/2023/08/LOGOTIPO-Mind-Group-Technologies-Branco.png"
            alt="Mind Group Technologies Logo"
            className="h-5 w-auto"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Cadastrar</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Nome</label>
            <div className="flex items-center border rounded-full px-3 py-2 bg-gray-900">
              <FaUser className="text-red-500 mr-2" />
              <input
                type="text"
                placeholder="Nome"
                className="flex-1 outline-none bg-gray-900 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <div className="flex items-center border rounded-full px-3 py-2 bg-gray-900">
              <FaEnvelope className="text-red-500 mr-2" />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 outline-none bg-gray-900 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Senha</label>
            <div className="flex items-center border rounded-full px-3 py-2 bg-gray-900">
              <FaLock className="text-red-500 mr-2" />
              <input
                type="password"
                placeholder="Senha"
                className="flex-1 outline-none bg-gray-900 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-400"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
