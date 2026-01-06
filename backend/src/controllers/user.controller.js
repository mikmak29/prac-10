/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export const fetchUsers = (req, res) => {
	try {
		res.status(200).json({ role: "Duelist" });
	} catch (err) {
		throw new Error(err.message);
	}
};
