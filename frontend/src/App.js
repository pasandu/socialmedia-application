import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/home' element={<LandingPage/>}/>
          <Route exact path='/create-post' element={<CreatePost/>}/>
          <Route exact path='/user-profile' element={<UserProfile/>}/>



        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
