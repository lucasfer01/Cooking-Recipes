import './App.css';
import AppContainer from './components/AppContainer';
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppContainer/>}/>
      </Routes>
    </div>
  );
}

export default App;
