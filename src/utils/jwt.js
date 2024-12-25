import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const generateToken = (payload, expiresIn = "1h") => {
	return sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
	return verify(token, JWT_SECRET);
};
