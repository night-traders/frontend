import React, { useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {Alert} from "react-bootstrap"


const Watchlist = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const[result1, setResult1] = useState({});
  const[result2, setResult2] = useState({});
  const[watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState("")


  // Render data on load page
  const fetchData = async () => {
      try {
          const res = await axios('http://127.0.0.1:8000/api/stock/', {
            method: 'GET',
            headers: {'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('access')}`},
          })
          setWatchlist(res.data)
          console.log(res.data)
      }
      catch (err) {
        setError("Failed to load data!")
      }
  }

  useEffect(()=>{
    fetchData();
  }, [])


  // Rerender page for each new stock search
  useEffect(() => {
    const fetchData = async () => {
        try {
          const finnhub = require('finnhub');
 
          const api_key = await finnhub.ApiClient.instance.authentications['api_key'];
          api_key.apiKey = "bua9lb748v6q418gd0i0" // Replace this
          const finnhubClient = new finnhub.DefaultApi()
          finnhubClient.companyProfile2({'symbol': query}, (error, data, response) => {
            setResult1({"name":data.name, "ticker":data.ticker})
            console.log(data)

            console.log(localStorage.getItem('access'))
          });
          finnhubClient.quote(query, (error, data, response) => {
            console.log(data)
            if (data.c === 0) {
              setResult2([0]);
              setError('Sorry your input is invalid, try something else!');
              }
              else {
                setResult2({"price_current":data.c, "price_high":data.l, "price_low":data.l, "price_open":data.o, "previous_close":data.pc})
                setError("");
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

  // Save to Database individual stock
  const saveToDataBase = () =>{

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
    .catch( error => setError('Failed to save!'))
  };
  useEffect(()=>{
  }, [result1, result2])

  // Event handler when clicking on save btn
  const handler = event => {
    if (watchlist.includes(Object.assign(result1, result2))){
      setError('Already exist in your watchlist!') 
    }
    else if (result1.name === "" || result1.ticker === "") {
      setError('You got wron data!') 
    }
    else{
      saveToDataBase();
      fetchData();
      setResult1({});
      setResult2({});
    }
  }

  // Delete Stock function
  const deleteStock = async (id) => {
    try {
        await axios(`http://127.0.0.1:8000/api/stock/${id}/`, {
          method: 'DELETE',
          headers: {'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('access')}`},
        })
        await fetchData();
    }
    catch (err) {
      setError("Failed to delete!")
    }
  }

  // Event handler on click
  const deleteHandler = event => {
    deleteStock(event.target.value);
  }

  return (
    <div className='container mt-5'>
      {error && <Alert variant="danger">{error}</Alert>}
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
        <div className={result2[0] === 0?"invisible":"visible"}>
        {Object.entries(result1).map(item=>
            <h1 key={uuidv4()}>{item}</h1>)} 
          <ul>
            {Object.entries(result2).map(([k, v])=>
              <li key={uuidv4()} className="list-group-item" ><span className="text-primary">{k.toUpperCase()}</span>: {v}</li>)}
          </ul>
            <button onClick={handler} className={Object.values(result2).length>1?"btn btn-success p-2 mb-4":"invisible d-none"} type="submit"> Add to watchlist</button>
        </div>
      </div>
      <div>
        {watchlist.map(item=>
          <div key={item.id}>
            <h2 key={item.id}>{item.ticker} {item.name} {item.price_current} {item.price_high} {item.price_low} {item.price_open}  {item.previous_close}</h2>
            <button value={item.id} onClick={deleteHandler} className="btn btn-danger" type="submit">Delete</button>
          </div>)}
      </div>
    </div>
  );
}

export default Watchlist;