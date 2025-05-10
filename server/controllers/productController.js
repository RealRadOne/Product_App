const {Pool} = require('pg');
const { db } = require('../config/config');

//const pool, I don't plan to reassign it.
const pool = new Pool(db);

//async is to define a function that returns a promise.
//await is used inside an async function to pause execution until a Promise settles.
// A promise is a way for the function to say that it will eventually deliver.[pending,fulfilled and rejected]
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
    //Immutable parameters per request
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page-1)*limit;

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


async function searchProducts(req,res){
    const name = `%${req.query.value || ''}`;
    const type = req.query.type || 'All';
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || 9999;

    let queryText = `
    SELECT * FROM products
    WHERE value ILIKE $1
    AND ($2='All' OR type=$2)
    AND price BETWEEN $3 AND $4
    ORDER BY id`
    ;

    try{
        const result = await pool.query(
            queryText,[name,type,minPrice,maxPrice]
        );
        res.json(result.rows);
        console.log(result);
    }catch(err){
        console.error('Error searching');
        res.status(500).json({error: 'Failed to search products'});
    }
}
module.exports = {putProduct,getInfProducts,searchProducts}