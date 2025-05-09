const {Pool} = require('pg');

const pool = new Pool({
    user: 'myuser',
    host: 'localhost',
    database: 'productsdb',
    password: 'mypassword',
    port: 5432,
})

async function getProducts(req,res){
    try{
        const result = await pool.query('SELECT * FROM products ORDER BY id');
        res.json(result.rows);
    }catch(err){
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

async function putProduct(req,res){
    const { ID, Name, Type } = req.body;
    try{
        const result = await pool.query(
            'INSERT INTO products (id,value,type) VALUES ($1,$2,$3)',[ID,Name,Type]
        );
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error('Error adding product:', err);
        res.status(500).json({ error: 'Failed to add product' });
    }
}

async function getInfProducts(req,res){
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page-1)*limit;

    try{
        const result = await pool.query(
            'SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2',
            [limit,offset]
        );
        res.json(result.rows);
    }
    catch(err){
        console.error('Error fetching products',err);
        res.status(500).json({error:'Failed to fetch products'});
    }
}

module.exports = {getProducts,putProduct,getInfProducts,searchProducts}