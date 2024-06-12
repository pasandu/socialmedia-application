import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import MealPlanCreator from './pages/Meal';
import UserProfile from './pages/UserProfile';
import MealImages from './pages/MealImages';
import MealContainer from './pages/MealContainer';
import UpdateMeal from './pages/UpdateMeal';
import Profile from './pages/Profile';
import MealUpdate from './pages/MealUpdate';
import EditMealPage from './pages/EditMealPage';
import UpdatedMeal from './pages/UpdatedMeal';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/home' element={<LandingPage/>}/>
          <Route exact path='/create-post' element={<CreatePost/>}/>
          <Route exact path='/post' element={<Post/>}/>
          <Route exact path='/meal' element={<MealPlanCreator/>}/>
          <Route exact path='/user-profile' element={<UserProfile/>}/>
          <Route exact path='/ima' element={<MealImages/>}/>
          <Route exact path='/meals/:mealId' element={<MealContainer/>}/>
          <Route exact path='/update-meals/:mealId' element={<UpdateMeal/>}/>
          {/* <Route path='/meals/:mealId/update' element={<MealUpdate />} /> */}
          <Route  exact path='/meals/:mealId/update' element={<UpdatedMeal />} />

          <Route exact path='/profile' element={<Profile/>}/>
          
        

          


        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
