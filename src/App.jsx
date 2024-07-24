import React, { Suspense } from 'react';
import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const Recursion = React.lazy(()=> import  ('./component/Recurrsion/graph'));
const PathVisualizer = React.lazy(()=> import  ('./component/Pathfinding/Pathvisualizer'));
const SinglyLinkList = React.lazy(()=> import  ('./component/SinglyLinkedlist/LinkedMain'));
const Sorting = React.lazy(()=> import  ('./component/Sorting/Sorting'));
const HomePage = React.lazy(()=> import  ('./component/Home'));

function App() {
  return (
    <div className="App">
          <Suspense  fallback={<div> Loading...</div>}>
    
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} /> {/* Use element prop instead of children */}
          <Route path="/sorting" element={<Sorting />} /> {/* Use element prop instead of children */}
          <Route path="/recursion" element={<Recursion />} /> {/* Use element prop instead of children */}
          <Route path="/linkedlist" element={<SinglyLinkList />} /> {/* Use element prop instead of children */}
          <Route path="/pf" element={<PathVisualizer />} /> {/* Use element prop instead of children */}
        </Routes>
      </Router>
      </Suspense>

    </div>
  );
}

export default App;
