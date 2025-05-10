require('dotenv').config();

console.log('Loaded env PORT:', process.env.PORT);

module.exports = {
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    },
    server: {
        port: process.env.PORT || 3001,
    }
};

console.log('Loaded env PORT:', process.env.PORT);
