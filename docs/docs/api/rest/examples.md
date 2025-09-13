# API Examples

This guide provides practical examples of how to use the RuPaul's Drag Race API in your applications.

## Basic Usage

### Get All Queens
```bash
curl https://api.rpdr.com/api/queen/all
```

**Response:**
```json
[
  {
    "_id": "5e5da29fb479040e7ca22c3d",
    "name": "Yuhua Hamasaki",
    "govtname": "Yuhua Ou",
    "birthdate": "1990-03-01T00:00:00.000Z",
    "seasons": []
  }
]
```

### Get Specific Queen
```bash
curl https://api.rpdr.com/api/queen/5e5da29fb479040e7ca22c3d
```

### Get All Seasons
```bash
curl https://api.rpdr.com/api/season/all
```

### Get Episodes for a Season
```bash
curl https://api.rpdr.com/api/season/5e5d8107b99afea2ec5c91b3/episode/
```

## JavaScript Examples

### Using Fetch API
```javascript
// Get all queens
async function getAllQueens() {
  try {
    const response = await fetch('https://api.rpdr.com/api/queen/all');
    const queens = await response.json();
    console.log(queens);
  } catch (error) {
    console.error('Error fetching queens:', error);
  }
}

// Get specific queen
async function getQueen(id) {
  try {
    const response = await fetch(`https://api.rpdr.com/api/queen/${id}`);
    const queen = await response.json();
    console.log(queen);
  } catch (error) {
    console.error('Error fetching queen:', error);
  }
}
```

### Using Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.rpdr.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all queens
const getAllQueens = async () => {
  try {
    const response = await api.get('/queen/all');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Authenticated request
const createQueen = async (queenData, token) => {
  try {
    const response = await api.post('/queen', queenData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating queen:', error);
  }
};
```

## Python Examples

### Using Requests
```python
import requests

# Get all queens
def get_all_queens():
    response = requests.get('https://api.rpdr.com/api/queen/all')
    return response.json()

# Get specific queen
def get_queen(queen_id):
    response = requests.get(f'https://api.rpdr.com/api/queen/{queen_id}')
    return response.json()

# Authenticated request
def create_queen(queen_data, token):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    response = requests.post(
        'https://api.rpdr.com/api/queen',
        json=queen_data,
        headers=headers
    )
    return response.json()
```

## React Examples

### Custom Hook
```jsx
import { useState, useEffect } from 'react';

const useQueens = () => {
  const [queens, setQueens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueens = async () => {
      try {
        const response = await fetch('https://api.rpdr.com/api/queen/all');
        const data = await response.json();
        setQueens(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQueens();
  }, []);

  return { queens, loading, error };
};

// Usage in component
const QueensList = () => {
  const { queens, loading, error } = useQueens();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {queens.map(queen => (
        <li key={queen._id}>
          {queen.name} ({queen.govtname})
        </li>
      ))}
    </ul>
  );
};
```

## Node.js Examples

### Express.js Integration
```javascript
const express = require('express');
const axios = require('axios');
const app = express();

// Proxy endpoint
app.get('/api/queens', async (req, res) => {
  try {
    const response = await axios.get('https://api.rpdr.com/api/queen/all');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch queens' });
  }
});

// Cached endpoint
const cache = new Map();

app.get('/api/queens/cached', async (req, res) => {
  const cacheKey = 'all-queens';
  
  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  try {
    const response = await axios.get('https://api.rpdr.com/api/queen/all');
    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch queens' });
  }
});
```

## Error Handling

### Common Error Responses
```javascript
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    console.error('API Error:', error.response.status, error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.error('Network Error:', error.request);
  } else {
    // Something else happened
    console.error('Error:', error.message);
  }
};
```

### Retry Logic
```javascript
const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

## Best Practices

1. **Cache responses** when appropriate to reduce API calls
2. **Handle errors gracefully** with proper error messages
3. **Use pagination** for large datasets
4. **Implement rate limiting** on your side
5. **Store tokens securely** and refresh them as needed
6. **Use HTTPS** in production environments
