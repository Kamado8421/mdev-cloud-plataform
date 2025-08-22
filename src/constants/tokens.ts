import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

export const NEXT_PUBLIC_SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'default';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default';

