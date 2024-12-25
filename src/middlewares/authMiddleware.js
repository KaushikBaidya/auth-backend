import { verifyToken } from "../utils/jwt.js";

const authenticate = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ error: "Access denied" });

	try {
		const decoded = verifyToken(token);
		req.userId = decoded.userId;
		next();
	} catch (err) {
		res.status(401).json({ error: "Invalid token" });
	}
};

export default authenticate;
