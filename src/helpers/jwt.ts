import jwt from "jsonwebtoken";

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      "3st03sm1Piblick3",
      {
        expiresIn: "30d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token ");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generarJWT;
