import React from "react";
import './styles/Home.css'; // Ensure CSS is properly linked
import {Link} from 'react-router-dom';
const Home = () => {

  return (
    <div className="container">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="algo-images">
        <img src="Algo.png" alt="Algorithm" />
        <img src="vis.png" alt="Visualizer" />
        
        <h2 className="headline">"Experience the Magic of Algorithm Visualization"</h2>
      </div>
      <div className="algo-types " >
       
      <Link to="/sorting" style={{padding:"5px"}}>
        <img src="sorting.png" alt="Sorting" height={150} />
      
      </Link>
      
      <Link to="/pf" style={{padding:"5px"}}>
        <img src="graph.png" alt="Pathfinding" height={150} />
      </Link>
      
      <Link to="/recursion" style={{padding:"5px"}}>
        <img src="recursion.jpeg" alt="Tree" height={150} />
      </Link>
      
      <Link to="/linkedlist" style={{padding:"5px"}}>
        <img src="LinkedList.png" alt="Graph" height={150} />
      </Link>
      
      </div>
      <div>
       

      </div>
      
    </div>

    
  );


}

export default Home;
