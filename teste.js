const c = require('process');
const s = require('dotenv');

// Carrega as variáveis do .env
s.config();

console.log(c.env.NEXT_PUBLIC_SECRET_KEY);