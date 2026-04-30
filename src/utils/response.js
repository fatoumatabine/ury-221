const sendSuccess = (res, data, message = "Succès", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

module.exports = {
  sendSuccess,
};

