const { Pool } = require('pg');
const { db } = require('../config/config');


const pool = new Pool(db);

const randomImageUrl = (seed) => `https://picsum.photos/seed/${seed}/300/200`;
const randomPrice = () => (Math.random() * 100 + 10).toFixed(2);

async function seedProducts() {
    const result = await pool.query('SELECT current_user, current_database();');
    console.log('🛠 Connected as:', result.rows[0]);

    const testString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const types = ['Clothes', 'Food', 'Electronics', 'Supplies', 'Misc'];

    const client = await pool.connect();
    try {
        await client.query('DELETE FROM products');

        for (let i = 0; i < 26; i++) {
            await client.query(
                'INSERT INTO products (value, type, image_url, price) VALUES ($1, $2, $3, $4)',
                [
                    'Product ' + testString.charAt(i),
                    types[i % 4],
                    randomImageUrl(i),
                    randomPrice()
                ]
            );
        }
        console.log('✅ Seeded 26 products successfully with images and prices.');
    } catch (err) {
        console.error('Error seeding products:', err);
    } finally {
        client.release();
    }
}

seedProducts();
