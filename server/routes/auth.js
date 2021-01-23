  
const jwt = require("jsonwebtoken");


async function genToken(username) {
  try {
    const accessToken = jwt.sign({username: username}, "secret", {expiresIn: '5m'});
    const refreshToken = jwt.sign({username: username}, "secret", {expiresIn: '7d'});
    return Promise.all([accessToken, refreshToken]);
  }
  catch (err) {
    return "Error";
  }
}

async function auth(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, "secret");
    let tokens = await genToken(decoded.username);
    req.user = decoded.username;
    next();
  } catch (err) {
    // Throw error
    // use refresh token to try again
    console.log(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
  }

module.exports = {
  genToken: genToken,
  auth: auth
};