const sendError = (res, code, message) => res.status(code).json({ error: message });
module.exports = sendError;