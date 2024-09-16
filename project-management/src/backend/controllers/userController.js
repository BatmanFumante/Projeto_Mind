const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getRepository } = require('typeorm');
const User = require('../models/User');

// Registro
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userRepository = getRepository(User);
  const userExists = await userRepository.findOne({ where: { email } });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  await userRepository.save(newUser);
  res.status(201).json({ message: 'User registered successfully' });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
  res.json({ token });
};
