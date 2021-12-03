import './App.css';
import AppContainer from './components/AppContainer';
import {Route, Routes} from 'react-router'

export function App() {
 

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<AppContainer/>}/>
      </Routes>
    </div>
  );
}


