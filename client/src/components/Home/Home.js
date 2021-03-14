import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Home = ({ location }) => {
    const [w1, setW1] = useState('');
    const [w2, setW2] = useState('');
    const [breadth, setBreadth] = useState(1);
  

    return (    
        <div>
            <div >
            <h1>Welcome to Triple Scramble</h1>
        
            <input placeholder="Starting word" type="text" onChange={(event) => setW1(event.target.value)} />
            <input placeholder="Final word" type="text" onChange={(event) => setW2(event.target.value)} />
            <input placeholder="Search Breadth" type="text" onChange={(event) => setBreadth(event.target.value)} />
    
            <Link onClick={e => (!w1 || !w2 || breadth < 1) ? e.preventDefault() : null} to={`/Display?w1=${w1}&w2=${w2}&breadth=${breadth}`} >
                <button color="primary" type="submit" style={{margin: 5}}  variant="contained">Join Room</button>
            </Link>
            </div>
        </div>
    );

  }
  
  export default Home;