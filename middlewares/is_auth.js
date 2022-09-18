import jwt  from 'jsonwebtoken';

export default async (req, res, next) => {
  const authHeader =  req.get('Authorization');
  
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    return next(error);
  }
  const token = authHeader.split(' ')[1];
  console.log(token)
 let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  } catch (err) {
    err.statusCode = 500;
    return next(err);
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    return next(error);
  }
  req.userId = decodedToken.userId;
  next();
};