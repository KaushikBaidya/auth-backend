import { registerUser, loginUser } from "../services/authService.js";
import { generateToken } from "../utils/jwt.js";
import {
	validateRegisterInput,
	validateLoginInput,
} from "../utils/validation.js";

export const register = async (req, res) => {
	const { name, email, password } = req.body;

	const error = validateRegisterInput(name, email, password);
	if (error) return res.status(400).json({ error });

	try {
		const user = await registerUser(name, email, password);
		res.status(201).json({ message: "User registered successfully", user });
	} catch (err) {
		res
			.status(500)
			.json({ error: "Registration failed", details: err.message });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	const error = validateLoginInput(email, password);
	if (error) return res.status(400).json({ error });

	try {
		const user = await loginUser(email, password);
		if (!user)
			return res.status(400).json({ error: "Invalid email or password" });

		// Generate JWT token
		const token = generateToken({ userId: user.id });

		// Send user data and token in the response
		res.status(200).json({
			message: "Login successful",
			token,
			user: {
				name: user.name,
				email: user.email,
			},
		});
	} catch (err) {
		console.error("Login error:", err);
		res.status(500).json({ error: "Login failed", details: err.message });
	}
};
