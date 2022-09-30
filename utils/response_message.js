const responseData = ({ statusCode = 200, message, data }) => {
  const response = {}
  response.statusCode = statusCode
  response.message = message
  response.data = data

  return response
}

export default responseData