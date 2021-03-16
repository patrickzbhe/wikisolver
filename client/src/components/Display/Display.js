import React, { useState, useEffect } from "react";
import Xarrow from "react-xarrows";
import queryString from 'query-string';
import Loader from "react-loader-spinner";
import io from "socket.io-client";

const ENDPOINT = 'https://wikisolver.herokuapp.com/';

let socket;
const Display = ({ location }) => {
    const [graphData, setGraphData] = useState([]);
    const [horizontal, setHorizontal] = useState(true);

    useEffect(() => {
        const { w1, w2, breadth } = queryString.parse(location.search);
    
        socket = io.connect(ENDPOINT);
 
        socket.emit('get', { w1, w2, breadth }, (error) => {
          if(error) {
            alert(error);
          }
        });
      }, [ location.search]);

    useEffect(() => {
        socket.on('data', data => {
            setGraphData(data.payload);
        });
    }, []);
    

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