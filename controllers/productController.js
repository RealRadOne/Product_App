const Database = require('better-sqlite3');
const database = new Database(':memory');

database.exec(`DROP TABLE IF EXISTS PRODUCTS`);

database.exec(`
    CREATE TABLE IF NOT EXISTS PRODUCTS(
        ID INTEGER PRIMARY KEY,
        value TEXT,
        Type TEXT
    )
`);

const testString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const insertStmt = database.prepare('INSERT OR IGNORE INTO PRODUCTS (ID, value, Type) VALUES (?, ?, ?)');
const types = ['Clothes', 'Food', 'Electronics', 'Supplies', 'Misc'];

for (let i = 0; i < 26; i++) {
    insertStmt.run(i, 'Product ' + testString.charAt(i), types[i % 4]);
}

function getProducts(req, res) {
    const Stmt = database.prepare('SELECT * FROM PRODUCTS ORDER BY ID');
    const data = Stmt.all();
    console.log(data);
    res.json(data);
}

function putProduct(ID, Name, Type) {
    const Stmt = database.prepare('INSERT INTO PRODUCTS (ID, value, Type) VALUES (?, ?, ?)');
    Stmt.run(ID, Name, Type);
}

function updateProduct(ID,Type){
    const Stmt = database.prepare('UPDATE PRODUCTS SET Type = ? WHERE ID= ?');
    Stmt.run(Type,ID);
}

module.exports = { getProducts, putProduct, updateProduct };
