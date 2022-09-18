import { validationResult } from 'express-validator'

function validationErrorHandler(req) {
 const vresult = validationResult(req)

  if (!vresult.isEmpty()) {
    const errors = vresult.errors
    let errorMessage = 'validation failed'

    const err = new Error(errorMessage)
    err.statusCode = 422
    err.errors = []
    errors.forEach((e) => {
      err.errors.push(e.msg)
    })

    return err
  }
  return null
}

export default validationErrorHandler

