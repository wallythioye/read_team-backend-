const userService = require('../services/userService');

const app = require('../app');


exports.register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await userService.loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  try {
    const result = await userService.logoutUser(token);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};