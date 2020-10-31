import React, { useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';


const Watchlist = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const[result1, setResult1] = useState();
  const[result2, setResult2] = useState([])

  useEffect(() => {
    const fetchData = async () => {
        try {
          const finnhub = require('finnhub');
 
          const api_key = await finnhub.ApiClient.instance.authentications['api_key'];
          api_key.apiKey = "bua9lb748v6q418gd0i0" // Replace this
          const finnhubClient = new finnhub.DefaultApi()
          finnhubClient.companyProfile2({'symbol': query}, (error, data, response) => {
            setResult1([data.name])
            console.log(data)
          });
          finnhubClient.quote(query, (error, data, response) => {
            console.log(data)
            setResult2([data.c, data.h, data.l, data.o, data.pc])
        });
        }
        catch (err) {
        ;
        }
    }

    if (query !== '') {
      fetchData();
    }
}, [query]);

  return (
    <div>
      <h1>Async React Hooks</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          setQuery(search)
        }}
      >
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for Stocks!"
        />
        <button type="submit"> Search</button>
      </form>
      <br />
        <h1>Search</h1>
        <h1>{result1}</h1>
        {result2.map(item=>
          <h1 key={uuidv4()}> {item}</h1>)}
    </div>
  );
}

export default Watchlist;