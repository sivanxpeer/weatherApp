import './App.css';
import MainPage from './components/mainPage/MainPage';
import Favorites from './components/favorites/Favorites';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Route path="/" exact={true} component={MainPage} />
          <Route path="/favorites" exact={true} component={Favorites} />
      </Router>
    </div >
  );
}

export default App;
