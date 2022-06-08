import './App.css'
import {Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar';
import Usestatepage from './pages/Usestatepage';
import Contextpage from './pages/Contextpage';
import Reduxpage from './pages/Reduxpage';

function App() {
  return (
    <>
    <div className="App">
      <h1>React Demo</h1>
    </div>
    <Navbar/>
    <Routes>
      <Route path="/usestate" element={<Usestatepage/>}></Route>
      <Route path="/context" element={<Contextpage/>}></Route>
      <Route path="/redux" element={<Reduxpage/>}></Route>
    </Routes>
       
   
    </>
  );
}

export default App;
