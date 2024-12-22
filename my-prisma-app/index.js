// Load environment variables
require('dotenv').config();

const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 5000;

// Supabase configuration
const supabaseUrl = 'https://irdimxzysvawzjqcjxnj.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY; // Ensure this is set in your .env file
const supabase = createClient(supabaseUrl, supabaseKey);

// Endpoint to get a user by ID
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Endpoint to get a note by ID
app.get('/note/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Fixed template literal syntax
});
