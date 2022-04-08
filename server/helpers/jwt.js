const jwt = require("jsonwebtoken");

module.exports.genJWT = ( userId, firstName, email) => {
  return new Promise((resolve, reject) => {
    const payload = { userId, firstName, email };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se puede generer el token");
        }
        resolve(token);
      }
    );
  });
};
