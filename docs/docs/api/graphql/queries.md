# GraphQL Queries

This guide provides examples of common GraphQL queries for the RuPaul's Drag Race API.

## Basic Queries

### Get All Queens

```graphql
query GetAllQueens {
  queens {
    edges {
      node {
        id
        name
        legalName
        hometown
        stats {
          totalSeasons
          isWinner
        }
      }
    }
    totalCount
  }
}
```

### Get a Specific Queen

```graphql
query GetQueen($id: ID!) {
  queen(id: $id) {
    id
    name
    legalName
    birthDate
    hometown
    socialMedia {
      instagram
      twitter
      website
    }
    seasons {
      seasonId
      placement
      challengeWins
      isWinner
    }
    stats {
      totalSeasons
      totalEpisodes
      challengeWins
      lipSyncWins
      isWinner
      isMissCongeniality
    }
  }
}
```

### Get Queen by Name

```graphql
query GetQueenByName($name: String!) {
  queen(name: $name) {
    id
    name
    legalName
    hometown
    stats {
      totalSeasons
      isWinner
    }
  }
}
```

## Season Queries

### Get All Seasons

```graphql
query GetAllSeasons {
  seasons {
    edges {
      node {
        id
        number
        type
        franchise
        premiereDate
        finaleDate
        queens {
          queenId
          placement
          isWinner
        }
      }
    }
    totalCount
  }
}

### Get a Specific Season

```graphql
query GetSeason($id: ID!) {
  season(id: $id) {
    id
    number
    type
    franchise
    premiereDate
    finaleDate
    episodes {
      id
      number
      title
      airDate
    }
    queens {
      queenId
      placement
      challengeWins
      lipSyncWins
      isWinner
      isMissCongeniality
    }
  }
}
```

### Get Season by Number

```graphql
query GetSeasonByNumber($number: Int!) {
  season(number: $number) {
    id
    number
    type
    franchise
    premiereDate
    queens {
      queenId
      placement
      isWinner
    }
  }
}
```

## Episode Queries

### Get Episodes for a Season

```graphql
query GetSeasonEpisodes($seasonId: ID!) {
  episodes(seasonId: $seasonId) {
    edges {
      node {
        id
        number
        title
        airDate
        challenges {
          name
          type
          winner {
            name
          }
        }
        eliminations {
          queen {
            name
          }
          reason
        }
      }
    }
    totalCount
  }
}
```

### Get a Specific Episode

```graphql
query GetEpisode($id: ID!) {
  episode(id: $id) {
    id
    number
    title
    airDate
    seasonId
    challenges {
      id
      name
      type
      winner {
        id
        name
      }
    }
    eliminations {
      id
      queen {
        id
        name
      }
      reason
    }
  }
}
```

## Filtered Queries

### Filter Queens by Hometown

```graphql
query GetQueensByHometown($hometown: String!) {
  queens(filter: { hometown: $hometown }) {
    edges {
      node {
        id
        name
        hometown
        stats {
          totalSeasons
        }
      }
    }
    totalCount
  }
}
```

### Filter Queens by Season

```graphql
query GetQueensBySeason($seasonId: ID!) {
  queens(filter: { seasonId: $seasonId }) {
    edges {
      node {
        id
        name
        seasons {
          seasonId
          placement
          challengeWins
          isWinner
        }
      }
    }
    totalCount
  }
}
```

### Filter Seasons by Type

```graphql
query GetSeasonsByType($type: SeasonType!) {
  seasons(filter: { type: $type }) {
    edges {
      node {
        id
        number
        type
        franchise
        premiereDate
        queens {
          queenId
          placement
        }
      }
    }
    totalCount
  }
}
```

## Pagination

### Paginated Queens Query

```graphql
query GetPaginatedQueens($first: Int, $after: String) {
  queens(pagination: { first: $first, after: $after }) {
    edges {
      node {
        id
        name
        stats {
          totalSeasons
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
```

### Paginated Seasons Query

```graphql
query GetPaginatedSeasons($first: Int, $after: String) {
  seasons(pagination: { first: $first, after: $after }) {
    edges {
      node {
        id
        number
        type
        franchise
        premiereDate
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
```

## Sorting

### Sort Queens by Name

```graphql
query GetQueensSortedByName {
  queens(sort: { field: NAME, direction: ASC }) {
    edges {
      node {
        id
        name
        stats {
          totalSeasons
        }
      }
    }
    totalCount
  }
}
```

### Sort Queens by Birth Date

```graphql
query GetQueensSortedByBirthDate {
  queens(sort: { field: BIRTH_DATE, direction: DESC }) {
    edges {
      node {
        id
        name
        birthDate
        stats {
          totalSeasons
        }
      }
    }
    totalCount
  }
}
```

## Search

### Search All Content

```graphql
query SearchAll($query: String!) {
  search(query: $query, type: ALL) {
    queens {
      id
      name
      hometown
    }
    seasons {
      id
      number
      type
      franchise
    }
    episodes {
      id
      title
      airDate
    }
    totalCount
  }
}
```

### Search Queens Only

```graphql
query SearchQueens($query: String!) {
  search(query: $query, type: QUEEN) {
    queens {
      id
      name
      legalName
      hometown
      stats {
        totalSeasons
        isWinner
      }
    }
    totalCount
  }
}
```

### Search Seasons Only

```graphql
query SearchSeasons($query: String!) {
  search(query: $query, type: SEASON) {
    seasons {
      id
      number
      type
      franchise
      premiereDate
    }
    totalCount
  }
}
```

## Complex Queries

### Get Queen with Full Season Details

```graphql
query GetQueenWithSeasons($id: ID!) {
  queen(id: $id) {
    id
    name
    legalName
    hometown
    socialMedia {
      instagram
      twitter
      website
    }
    seasons {
      seasonId
      placement
      episodeCount
      challengeWins
      lipSyncWins
      isWinner
      isMissCongeniality
    }
    stats {
      totalSeasons
      totalEpisodes
      challengeWins
      lipSyncWins
      isWinner
      isMissCongeniality
    }
  }
}
```

### Get Season with Full Episode and Queen Details

```graphql
query GetSeasonWithDetails($id: ID!) {
  season(id: $id) {
    id
    number
    type
    franchise
    premiereDate
    finaleDate
    episodes {
      id
      number
      title
      airDate
      challenges {
        name
        type
        winner {
          name
        }
      }
      eliminations {
        queen {
          name
        }
        reason
      }
    }
    queens {
      queenId
      placement
      episodeCount
      challengeWins
      lipSyncWins
      isWinner
      isMissCongeniality
    }
  }
}
```

## Variables

When using these queries, you'll need to provide variables. Here are some examples:

```json
{
  "id": "5e5da29fb479040e7ca22c3d",
  "name": "Yuhua Hamasaki",
  "hometown": "New York",
  "seasonId": "5e5d8107b99afea2ec5c91b3",
  "type": "ALL_STARS",
  "first": 10,
  "after": "cursor_string_here",
  "query": "drag race"
}
```

## Best Practices

1. **Use specific fields**: Only request the fields you need to minimize data transfer
2. **Implement pagination**: Use cursor-based pagination for large datasets
3. **Use filters**: Apply filters to reduce the amount of data returned
4. **Cache results**: Implement caching for frequently accessed data
5. **Handle errors**: Always handle GraphQL errors gracefully
6. **Use fragments**: Create reusable fragments for common field sets

## Error Handling

GraphQL queries can return errors. Always check for errors in your responses:

```javascript
const response = await fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: GET_QUEEN_QUERY,
    variables: { id: 'queen-id' }
  })
});

const result = await response.json();

if (result.errors) {
  console.error('GraphQL errors:', result.errors);
} else {
  console.log('Data:', result.data);
}
```
