
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react'
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routes/Routers';
/**
 * This function returns a JSX element that renders the main App component.
 * @returns {JSX.Element} The rendered App component with BrowserRouter, 
 * Navbar and Routers components.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routers />
      </div>
    </BrowserRouter>
  );
}

export default App;
