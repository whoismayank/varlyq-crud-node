const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || 'slkjdslkjdflkj';

const verifyToken = (req, res, next) => {
  // console.log(req.query);
  const list = {},
    rc = req.headers.cookie;
  rc && rc.split(';').forEach(function (cookie) {
    const parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || list.token;
  if (!token) {
    return res.status(403).json({ 'status': 'Error', 'message': 'A token is required for authentication' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ 'status': 'Error', 'message': 'Unauthorized Access' });
  }
  return next();
};
module.exports = verifyToken;
