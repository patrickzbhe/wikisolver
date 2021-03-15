import React, { useState, useEffect } from "react";
import Xarrow from "react-xarrows";
import queryString from 'query-string';
import axios from 'axios';
import Loader from "react-loader-spinner";

const API = axios.create({ baseURL: 'http://127.0.0.1:5000/' });

const Display = ({ location }) => {
    const [graphData, setGraphData] = useState([]);
    const [horizontal, setHorizontal] = useState(true);
  
    useEffect(() => {
        async function fetchApi() {
            const { w1, w2, breadth } = queryString.parse(location.search);
            let result = await API.get(`/find?w1=${w1}&w2=${w2}&breadth=${breadth}`);
            setGraphData(result.data.payload);
        }
        fetchApi();
    }, [location.search]);
    

    if (horizontal) {
        return (
            <>
            <button onClick={() => {setHorizontal(!horizontal)}}>Change view direction</button>
            <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                {graphData.length > 0 ? 
                graphData.map((arr, i) => (
                    <div key={i} style={{width:'250px', padding:20}}>
                        {arr.map((word, j) => {
                            return (<><p id={`${i} ${j}`} style={{clear:'both', float:'left', color: `rgb(${255 - Math.min(word[1], 1) * 255},${0 + Math.min(word[1], 1) * 255}, 0)`}}>{word[0]}</p>
                            {i !== 0 ? <Xarrow  startAnchor='right' endAnchor='left' color={word[3] ? '#000000' :'#c4bcbc'} start={`${i-1} ${word[2]}`} end={`${i} ${j}`}/>: null}</>)
                        })}
                    </div>
                ))
                : <Loader style={{position: 'absolute', top:'40%', left:'50%', margin: '-50px 0 0 -50px'}} type="Oval" color="#00BFFF" height={100} width={100}/>
                }
                
            </div>
            </>
        )
    } else {
        return (
            <>
            <button onClick={() => {setHorizontal(!horizontal)}}>Change view direction</button>
        <div style={{flexDirection: 'column', display: 'inline-flex', alignItems: 'center', width:'100%'}}>
            {graphData.length > 0 ? 
            graphData.map((arr, i) => (
                <ul key={i} style={{width:'100%', height:'30vh', padding:20, display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    {arr.map((word, j) => {
                        return (<><li id={`${i} ${j}`} style={{clear:'both', float:'left', display:'inline-block', height:30, color: `rgb(${255 - Math.min(word[1], 1) * 255},${0 + Math.min(word[1], 1) * 255}, 0)`}}>{word[0]}</li>
                        {i !== 0 ? <Xarrow  startAnchor='bottom' endAnchor='top' color={word[3] ? '#000000' :'#c4bcbc'} start={`${i-1} ${word[2]}`} end={`${i} ${j}`}/>: null}</>)
                    })}
                </ul>
            ))
            : <Loader style={{position: 'absolute', top:'40%', left:'50%', margin: '-50px 0 0 -50px'}} type="Oval" color="#00BFFF" height={100} width={100}/>
            }
            
        </div>
        </>
        );
    }
  }
  
  export default Display;