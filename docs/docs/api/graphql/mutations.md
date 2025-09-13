# GraphQL Mutations

This guide provides examples of GraphQL mutations for the RuPaul's Drag Race API. All mutations require authentication.

## Authentication

All mutations require a valid JWT token in the Authorization header:

```javascript
const headers = {
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'application/json'
};
```

## Queen Mutations

### Update Queen

```graphql
mutation UpdateQueen($id: ID!, $input: QueenUpdateInput!) {
  updateQueen(id: $id, input: $input) {
    id
    name
    legalName
    birthDate
    hometown
    socialMedia {
      instagram
      twitter
      tiktok
      website
    }
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "5e5da29fb479040e7ca22c3d",
  "input": {
    "name": "Updated Queen Name",
    "legalName": "Updated Legal Name",
    "hometown": "New York",
    "socialMedia": {
      "instagram": "@updatedqueen",
      "twitter": "@updatedqueen",
      "website": "https://updatedqueen.com"
    }
  }
}
```

### Update Queen Social Media Only

```graphql
mutation UpdateQueenSocialMedia($id: ID!, $input: QueenUpdateInput!) {
  updateQueen(id: $id, input: $input) {
    id
    name
    socialMedia {
      instagram
      twitter
      tiktok
      website
    }
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "5e5da29fb479040e7ca22c3d",
  "input": {
    "socialMedia": {
      "instagram": "@newinstagram",
      "twitter": "@newtwitter"
    }
  }
}
```

## Season Mutations

### Update Season

```graphql
mutation UpdateSeason($id: ID!, $input: SeasonUpdateInput!) {
  updateSeason(id: $id, input: $input) {
    id
    number
    type
    franchise
    premiereDate
    finaleDate
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "5e5d8107b99afea2ec5c91b3",
  "input": {
    "number": 2,
    "type": "ALL_STARS",
    "franchise": "US",
    "premiereDate": "2016-08-25",
    "finaleDate": "2016-11-17"
  }
}
```

### Update Season Dates Only

```graphql
mutation UpdateSeasonDates($id: ID!, $input: SeasonUpdateInput!) {
  updateSeason(id: $id, input: $input) {
    id
    number
    premiereDate
    finaleDate
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "5e5d8107b99afea2ec5c91b3",
  "input": {
    "premiereDate": "2016-08-25",
    "finaleDate": "2016-11-17"
  }
}
```

## Episode Mutations

### Update Episode

```graphql
mutation UpdateEpisode($id: ID!, $input: EpisodeUpdateInput!) {
  updateEpisode(id: $id, input: $input) {
    id
    number
    title
    airDate
    seasonId
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "5e61b98943eb39b23bf4fbd5",
  "input": {
    "number": 1,
    "title": "Updated Episode Title",
    "airDate": "2016-08-25"
  }
}
```

### Update Episode Title Only

```graphql
mutation UpdateEpisodeTitle($id: ID!, $input: EpisodeUpdateInput!) {
  updateEpisode(id: $id, input: $input) {
    id
    title
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "5e61b98943eb39b23bf4fbd5",
  "input": {
    "title": "New Episode Title"
  }
}
```

## Batch Operations

### Update Multiple Queens

```graphql
mutation UpdateMultipleQueens($updates: [QueenUpdateInput!]!) {
  updateQueens(updates: $updates) {
    id
    name
    updatedAt
  }
}
```

**Variables:**
```json
{
  "updates": [
    {
      "id": "5e5da29fb479040e7ca22c3d",
      "input": {
        "hometown": "New York"
      }
    },
    {
      "id": "5e61c29feb0096b730c88cb3",
      "input": {
        "hometown": "Boston"
      }
    }
  ]
}
```

## Error Handling

GraphQL mutations can return errors. Always check for errors in your responses:

```javascript
const response = await fetch('/graphql', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: UPDATE_QUEEN_MUTATION,
    variables: { 
      id: 'queen-id',
      input: { name: 'New Name' }
    }
  })
});

const result = await response.json();

if (result.errors) {
  console.error('GraphQL errors:', result.errors);
  // Handle specific errors
  result.errors.forEach(error => {
    if (error.extensions?.code === 'UNAUTHENTICATED') {
      // Redirect to login
    } else if (error.extensions?.code === 'FORBIDDEN') {
      // Show permission error
    }
  });
} else {
  console.log('Updated data:', result.data);
}
```

## Common Error Codes

| Error Code | Description | Action |
|------------|-------------|---------|
| `UNAUTHENTICATED` | No valid JWT token provided | Redirect to login |
| `FORBIDDEN` | Insufficient permissions | Show permission error |
| `NOT_FOUND` | Resource not found | Show not found error |
| `VALIDATION_ERROR` | Input validation failed | Show validation errors |
| `INTERNAL_ERROR` | Server error | Show generic error |

## Best Practices

1. **Always authenticate**: Include JWT token in Authorization header
2. **Validate input**: Check input data before sending mutations
3. **Handle errors**: Implement proper error handling for all mutation responses
4. **Use specific fields**: Only request the fields you need in the response
5. **Optimistic updates**: Consider optimistic updates for better UX
6. **Batch operations**: Use batch mutations when updating multiple resources
7. **Rate limiting**: Be aware of rate limits for mutations

## Rate Limiting

Mutations have stricter rate limits than queries:

- **Authenticated users**: 100 mutations per hour
- **Admin users**: 500 mutations per hour

## Permissions

Different mutation operations require different permission levels:

- **Update Queen**: Requires `queen:update` permission
- **Update Season**: Requires `season:update` permission  
- **Update Episode**: Requires `episode:update` permission
- **Batch operations**: Requires `admin` permission

## Example Implementation

Here's a complete example of updating a queen with error handling:

```javascript
async function updateQueen(queenId, updateData) {
  const mutation = `
    mutation UpdateQueen($id: ID!, $input: QueenUpdateInput!) {
      updateQueen(id: $id, input: $input) {
        id
        name
        legalName
        hometown
        socialMedia {
          instagram
          twitter
        }
        updatedAt
      }
    }
  `;

  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          id: queenId,
          input: updateData
        }
      })
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.updateQueen;
  } catch (error) {
    console.error('Failed to update queen:', error);
    throw error;
  }
}

// Usage
try {
  const updatedQueen = await updateQueen('5e5da29fb479040e7ca22c3d', {
    name: 'New Queen Name',
    hometown: 'New York'
  });
  console.log('Queen updated:', updatedQueen);
} catch (error) {
  console.error('Update failed:', error.message);
}
```
