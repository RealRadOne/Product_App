const {Pool} = require('pg');
const { db } = require('../config/config');

//const pool, I don't plan to reassign it.
const pool = new Pool(db);

//async is to define a function that returns a promise.
//await is used inside an async function to pause execution until a Promise returns back with "promised data".
// A promise is a way for the function to say that it will eventually deliver.[pending,fulfilled and rejected]
async function putProduct(req,res){
    const { id, value, type, image_url, price } = req.body;
    try{
        const result = await pool.query(
            'INSERT INTO products (id,value,type,image_url,price) VALUES ($1,$2,$3,$4,$5)',[id,value,type,image_url,price]
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
            // I get all data but omit data that has already been shown on the screen
            // Bad query scans all data and omits, in future, maintain lastseen per ID and pick ones where ID>lastseen
            // Postgres has a B-Tree it will scan better with the latter
            'SELECT * FROM products ORDER BY price DESC LIMIT $1 OFFSET $2',
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
    //% appended to make %head% match suffix and prefix both
    const name = `%${req.query.value || ''}%`;
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
    }catch(err){
        console.error('Error searching');
        res.status(500).json({error: 'Failed to search products'});
    }
}
module.exports = {putProduct,getInfProducts,searchProducts}