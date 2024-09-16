import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const navigate = useNavigate(); // Hook de navegação

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (image) formData.append('image', image);

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/'); // Redirecionar para a página de login após o sucesso
      } else {
        const errorData = await response.json();
        alert(`Falha no cadastro: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro durante o cadastro.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
          <div className="mb-8 relative">
            <label htmlFor="profileImage" className="cursor-pointer">
              <div
                id="profileImagePreview"
                className={`w-24 h-24 mx-auto rounded-full bg-cover bg-center ${imagePreview ? '' : 'bg-gradient-to-r from-green-400 to-blue-500'}`}
                style={{ backgroundImage: `url(${imagePreview})` }}
              >
                {!imagePreview && (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <FaUser className="text-6xl" />
                  </div>
                )}
              </div>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
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
