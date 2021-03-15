import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Home = ({ location }) => {
    const [w1, setW1] = useState('');
    const [w2, setW2] = useState('');
    const [breadth, setBreadth] = useState(1);
  

    return (    
        <div style={{margin:10, display:'flex', alignItems:'center', flexDirection: 'column', textAlign: 'center'}}>
       
            <h1>Welcome to Wikisolver</h1>
            <p>Wikisolver lets you find a path from one wikipedia page to another, by only clicking links on the pages themselves! <br/> 
            To test it, try setting the starting word as apple, the final word as school, and the search breadth as 5.</p>
        
            <input placeholder="Starting word" type="text" onChange={(event) => setW1(event.target.value)} />
            <input placeholder="Final word" type="text" onChange={(event) => setW2(event.target.value)} />
            <input placeholder="Search Breadth" type="text" onChange={(event) => setBreadth(event.target.value)} />
    
            <Link onClick={e => (!w1 || !w2 || breadth < 1) ? e.preventDefault() : null} to={`/Display?w1=${w1}&w2=${w2}&breadth=${breadth}`} >
                <button color="primary" type="submit" style={{margin: 5}}  variant="contained">Join Room</button>
            </Link>
            
        </div>
    );

  }
  
  export default Home;