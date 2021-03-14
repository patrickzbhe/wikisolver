import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000/' });


const Display = ({ location }) => {
    const [graphData, setGraphData] = useState([]);
  
    useEffect(() => {
        async function fetchApi() {
            const { w1, w2, breadth } = queryString.parse(location.search);
            let result = await API.get(`/find?w1=${w1}&w2=${w2}&breadth=${breadth}`);
            setGraphData(result.data.payload);
            console.log(result.data.payload)
        }
        fetchApi();
    }, [location.search]);
    

  
    return (
      <div style={{flexDirection: 'row', display: 'flex'}}>
          {graphData.length > 0 ? 
          graphData.map((arr, i) => (
            <div key={i} style={{width:200, padding:20}}>
                {arr.map((word) => (
                    <p>{word[0]}</p>
                ))}
            </div>
          ))
          : "waiting on data"}
      </div>
    );
  }
  
  export default Display;