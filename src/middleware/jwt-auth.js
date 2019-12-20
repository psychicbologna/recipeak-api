const AuthService = require('../auth/auth-service');

async function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || '';

  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }

  const payload = AuthService.verifyJwt(bearerToken);

  console.log(payload.sub)

  try {
    const user = await AuthService.getUserWithUsername(
      req.app.get('db'),
      payload.sub,
    );

    console.log('user: ', user);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized request' });
    }

    req.user = user;
    next();
  }
  catch (error) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
}


module.exports = {
  requireAuth,
};