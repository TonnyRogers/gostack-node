import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Token not provided' });

  const [, token] = authHeader.split(' ');

  try {
    console.log('TRY');
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    console.log(decoded);
    req.userId = decoded.id;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Invalid Token' });
  }
};
