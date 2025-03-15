exports.errorResponse = ({
  status = 500,
  message = "Internal Server Error",
  res,
}) => {
  return res.status(status).json({ success: false, message });
};
