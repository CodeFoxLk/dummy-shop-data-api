const errorResponse = (error, req, res, next) => {
  console.log(error)
  console.log(req.body)
  const statusCode = error.statusCode || 500
  if (statusCode == 500 || !error.message) {
    error.message = 'Internal Server Error'
  }
  return res
    .status(statusCode)
    .json({ statusCode: statusCode, message: error.message, errors: error.errors ?? [] })
}

export default errorResponse


