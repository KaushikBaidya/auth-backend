import pkg from "bcryptjs";
const { hash, compare } = pkg;
import prisma from "../config/database.js"; // Importing the default export from database.js

// Function to register a new user
export const registerUser = async (name, email, password) => {
	const hashedPassword = await hash(password, 10); // Hash the password

	// Create a new user in the database
	const user = await prisma.user.create({
		data: { name, email, password: hashedPassword },
	});

	return user; // Return the created user
};

// Function to login a user
export const loginUser = async (email, password) => {
	// Find the user by email
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) return null; // Return null if the user is not found

	// Compare the hashed password with the provided password
	const isPasswordValid = await compare(password, user.password);
	if (!isPasswordValid) return null; // Return null if the password is invalid

	return user; // Return the user if login is successful
};
