/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Object} req
 * @param {Object} req.cookie
 *
 */
export const fetchUsers = async (req, res) => {
  try {
    res.cookie("Token", 3203232, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/api/user",
    });
    res.res.status(200).json({ role: "Duelist" });
  } catch (err) {
    throw new Error({
      status: err.status,
      message: err.message,
      errorStack: err.stack,
    });
  }
};
