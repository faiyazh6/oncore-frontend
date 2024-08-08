import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/issues', async (req, res) => {
  const data = req.body;
  try {
    const response = await fetch('https://api.usepylon.com/issues', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer pylon_api_9bf7b28f3bea51fa903f0396290eba7235d1ffb560cd8f0043159f43bc1c32d9',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;