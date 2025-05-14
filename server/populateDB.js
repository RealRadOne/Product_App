const { Pool } = require('pg');
const { db } = require('./config/config');

const pool = new Pool(db);

const mockProductNames = [
    'Headphones',
    'Shoes',
    'Trail Mix',
    'Charger',
    'Lamp',
    'Bottle',
    'Mat',
    'Power Bank',
    'Bed Sheets',
    'Wireless Mouse',
    'Face Masks',
    'Grocery Bags',
    'Laptop Stand',
    'T-Shirt',
    'HDMI Cable',
    'Cups Set',
    'Novel',
    'Phone Case',
    'Jacket',
    'Coffee Mug',
    'Stapler',
    'Noodles',
    'Fitness Band',
    'Desk Organizer Tray',
    'Sticky Notes Pack',
    'Cleaner',
    'Paper',
    'Machine',
    'Table Cloth',
    'Candles',
    'Matchsticks',
    'Frozen Mix',
    'Calendula seeds',
    'Calendar'
];

const types = ['Clothes', 'Food', 'Electronics', 'Supplies', 'Misc'];
const randomImageUrl = (seed) => `https://picsum.photos/seed/mock${seed}/300/200`;
const randomPrice = () => (Math.random() * 90 + 10).toFixed(2);

async function seedProducts() {
    const result = await pool.query('SELECT current_user, current_database();');
    console.log('🛠 Connected as:', result.rows[0]);

    const client = await pool.connect();
    try {
        // Drop and recreate table
        await client.query(`DROP TABLE IF EXISTS products`);
        await client.query(`
            CREATE TABLE products (
                id SERIAL PRIMARY KEY,
                value TEXT NOT NULL,
                type TEXT NOT NULL,
                image_url TEXT,
                price NUMERIC(10, 2)
            );
        `);

        for (let i = 0; i < mockProductNames.length; i++) {
            await client.query(
                'INSERT INTO products (value, type, image_url, price) VALUES ($1, $2, $3, $4)',
                [
                    mockProductNames[i],
                    types[i % types.length],
                    randomImageUrl(i),
                    randomPrice()
                ]
            );
        }

        console.log(`✅ Dropped, recreated, and seeded ${mockProductNames.length} products.`);
    } catch (err) {
        console.error('❌ Error during seeding:', err);
    } finally {
        client.release();
    }
}

seedProducts();
