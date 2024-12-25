export const validateRegisterInput = (name, email, password) => {
	if (!name || !email || !password) {
		return "All fields are required.";
	}
	if (password.length < 6) {
		return "Password must be at least 6 characters.";
	}
	return null;
};

export const validateLoginInput = (email, password) => {
	if (!email || !password) {
		return "All fields are required.";
	}
	return null;
};

// module.exports = { validateRegisterInput, validateLoginInput };
