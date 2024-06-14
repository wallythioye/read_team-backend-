const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const redis = require('redis');
const client = redis.createClient();


// Configuration de la stratégie locale
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Incorrect email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return done(null, user);
    }
    return done(null, false, { message: 'Incorrect email or password' });
  } catch (err) {
    return done(err);
  }
});

// Configuration de la stratégie JWT
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (user) {
      done(null, user);
    } else {
      done(null, false, { message: 'Invalid token' });
    }
  } catch (error) {
    done(error, false, { message: 'Server error' });
  }
});

// Utilisation des stratégies par Passport
passport.use(jwtLogin);
passport.use(localLogin);

// Enregistrement d'un nouvel utilisateur
exports.registerUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({ ...userData, password: hashedPassword });
  await user.save();
  return user;
};

// Connexion de l'utilisateur
exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
};

exports.logoutUser = async (token) => {
  try {
    // Vérifier si le token est présent
    if (!token) {
      throw new Error('Token not provided');
    }

    // Décoder le token pour obtenir les informations de l'utilisateur (ici _id)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Révocation du token en ajoutant à une liste noire (Redis)
    await client.setAsync(`token_${token}`, 'revoked');
    await client.expireAsync(`token_${token}`, 3600); // Expiration du token en 1 heure (optionnel)

    return { message: 'Déconnexion réussie' };
  } catch (error) {
    throw new Error(`Erreur lors de la déconnexion: ${error.message}`);
  }
};