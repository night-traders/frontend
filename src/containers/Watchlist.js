import React, { useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';


const Watchlist = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const[result1, setResult1] = useState();
  const[result2, setResult2] = useState([]);

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
            if (data.c === 0) {
              setResult2([0]);
              }
              else {
            setResult2([`Current: ${data.c}`, `High: ${data.h}`, `Low: ${data.l}`, `Open: ${data.o}`, `Previous Close: ${data.pc}`])
              }
        });
        }
        catch (err) {
        }
    }

    if (query !== '') {
      fetchData();
    }
}, [query]);

  return (
    <div className='container mt-5'>
      <h1 className="text-info">Async React Hooks</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          setQuery(search)
        }}>
        <div className='form-group'>
          <input className='form-control'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for Stocks!"
          />
        </div>
        <button className='btn btn-info' type="submit"> Search</button>
      </form>
      <br />
      <div>
        <div className={result2[0] === 0?"invisible":"visible"}>
          <h1>{result1}</h1>
          {result2.map(item=>
            <h1 key={uuidv4()}>{item}</h1>)}
          <button className={result2.length>1?"btn btn-success p-2":"invisible"} type="submit"> Add to watchlist</button>
        </div>
        <h1 className={result2[0]===0?"visible":"invisible"}>Sorry your input is invalid, try something else!</h1>
      </div>
    </div>
  );
}

export default Watchlist;