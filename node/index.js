const express = require('express');
const { queryPromise } = require('./queryPromise');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const insert = `INSERT INTO people(name) values('nome novo ${new Date().toISOString().split('T').join(' ')}')`;
    await queryPromise.query(insert);
    const allPeoples = await queryPromise.query('SELECT * FROM people');
    const html = `<h1>Full Cycle Rocks!</h1>\n
    <ul>
     ${allPeoples?.map(p => `<li>${p?.name}</li>`)?.join('')}
    </ul>`;
    res.send(html);
});

app.listen(port, () => {
    console.log('Rodando na porta ', port);
});