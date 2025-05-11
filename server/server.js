const express = require('express');
const path = require('path');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const config = require('./config/config')

const app = express();
const PORT = config.server.port;

app.use(express.json());
app.use(cors());

app.use('/api', productRoutes);

if(process.env.NODE_ENV !== 'test'){

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

}

module.exports = app;