import React, { useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


const Watchlist = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const[result1, setResult1] = useState({});
  const[result2, setResult2] = useState({});
  const[watchlist, setWatchlist] = useState([])

  useEffect(() => {

      const fetchData = async () => {
          try {
              const res = await axios('http://127.0.0.1:8000/api/stock/', {
                method: 'GET',
                headers: {'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access')}`},
              })
              setWatchlist(res.data)
          }
          catch (err) {
          ;
          }
      }

      fetchData();
  },);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const finnhub = require('finnhub');
 
          const api_key = await finnhub.ApiClient.instance.authentications['api_key'];
          api_key.apiKey = "bua9lb748v6q418gd0i0" // Replace this
          const finnhubClient = new finnhub.DefaultApi()
          finnhubClient.companyProfile2({'symbol': query}, (error, data, response) => {
            setResult1({"name":data.name})
            console.log(data)
            console.log(localStorage.getItem('access'))
          });
          finnhubClient.quote(query, (error, data, response) => {
            console.log(data)
            if (data.c === 0) {
              setResult2([0]);
              }
              else {
            setResult2({"current":data.c, "high":data.l, "low":data.l, "open_price":data.o, "previous":data.pc})
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

  const handler = event => {
    fetch('http://127.0.0.1:8000/api/stock/', {
      method: 'POST',
      headers: {'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('access')}`},
      body: JSON.stringify(Object.assign(result1, result2))
    })
    // .then( data => data.json())
    .then(
      data => {
        console.log(data);
      }
    )
    .catch( error => console.error(error))
  };

  return (
    <div className='container mt-5'>
      <h1 className="text-info">Add stock to your watchlist</h1>
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
        {watchlist.map(item=>
          <div>
            <h2 key={item.id}>{item.name} {item.high} {item.low} {item.open_price}  {item.previous}</h2>
            <button className="btn btn-danger">Delete</button>
          </div>)}
      </div>
      <div>
        <div className={result2[0] === 0?"invisible":"visible"}>
          <h1>{result1.name}</h1>
          {Object.entries(result2).map(item=>
            <h1 key={uuidv4()}>{item}</h1>)}
          <button onClick={handler} className={Object.values(result2).length>1?"btn btn-success p-2":"invisible"} type="submit"> Add to watchlist</button>
        </div>
        <h1 className={result2.name?"visible":"invisible"}>Sorry your input is invalid, try something else!</h1>
      </div>
    </div>
  );
}

export default Watchlist;