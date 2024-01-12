import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import IDE from './pages/IDE';
import CodeBlocks from './pages/codeBlocks';

function App() {
  
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={ <CodeBlocks/> }/>
        <Route path='/compiler/:id' element={ <IDE/> }/>
      </Routes>
      
    </div>
  );
}

export default App;
