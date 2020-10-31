import React, { useState, useEffect } from 'react';

function useGiphy(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://swapi.dev/api/people/${query}/`
        );
        const data = await response.json();
        console.log(data.name)
        setResults(data.name);
      } finally {
        setLoading(false);
      }
    }

    if (query !== '') {
      fetchData();
    }
  }, [query]);

  return [results, loading];
}

export default function AsyncHooks() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, loading] = useGiphy(query);

  return (
    <div>
      <h1>Async React Hooks</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for Stocks!"
        />
        <button type="submit">Search</button>
      </form>
      <br />
      {loading ? (
        <h1>Search</h1>
      ) : (
      results
      )}
    </div>
  );
}