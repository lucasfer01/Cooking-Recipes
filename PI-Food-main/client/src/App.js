import './App.css';
import AppContainer from './components/AppContainer';
import {Route, Routes} from 'react-router'

// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import axios from 'axios'

export function App() {
 

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<AppContainer/>}/>
      </Routes>
    </div>
  );
}


