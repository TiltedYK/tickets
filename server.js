const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Adjust with your own MySQL credentials
const pool = mysql.createPool({
  host: 'localhost',       // or your DB host
  user: 'root',
  password: '',            // your password
  database: 'mydatabase'
});

// GET /purchase?eventId=10 => increments billets_vendus for eventId=10
app.get('/purchase', async (req, res) => {
  const eventId = req.query.eventId;
  if (!eventId) {
    return res.status(400).send('No eventId');
  }
  try {
    // Increments billets_vendus by 1
    await pool.query(
      'UPDATE evenement SET billets_vendus = billets_vendus + 1 WHERE id_evenement = ?',
      [eventId]
    );
    // Show success page or redirect
    // Here we just return text
    return res.send('Ticket purchased! billets_vendus incremented.');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
