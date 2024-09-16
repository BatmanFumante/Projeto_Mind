require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const express = require('express');
const multer = require('multer');
const { createConnection, getRepository } = require('typeorm');
const User = require('./models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 3001;

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret'; // Usa a variável de ambiente ou um valor padrão para desenvolvimento

app.use(express.json());
app.use(cors());

// Configuração do multer para upload de imagens
const storage = multer.memoryStorage(); // Armazenar arquivo em memória
const upload = multer({ storage });

// Conectar ao banco de dados MySQL
createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'carlos',
  password: 'Xzone123@',
  database: 'projeto_mind_db',
  entities: [User],
  synchronize: true,
}).then(() => {
  console.log('Conectado ao MySQL');
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao conectar no MySQL:', error);
});

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // O token vem no formato "Bearer token"

  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido.' });
    req.user = user; // Armazena o usuário no request
    next();
  });
};

// Rota de Registro
app.post('/register', upload.single('image'), async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file ? req.file.buffer : null;

  try {
    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
      image, // Salva o Buffer da imagem no banco de dados
    });

    await userRepository.save(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rota de Login (Geração do Token JWT)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Retornar o token
    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rota protegida de exemplo
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Acesso concedido à rota protegida!' });
});

// Rota principal
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Rota para servir imagem
app.get('/image/:id', async (req, res) => {
  const userId = req.params.id;
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  if (!user || !user.image) {
    return res.status(404).send('Image not found');
  }

  res.set('Content-Type', 'image/jpeg'); // Defina o tipo correto da imagem
  res.send(user.image);
});
