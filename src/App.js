import './App.css';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { Routes, Route } from "react-router-dom";
import Protected from './components/Protected';
import Checkout from './components/Checkout';


function App() {

  return (
   
    <div>
      <Routes>
          <Route path="/dashboard" element={ <Protected cmp = {Dashboard} /> } />
          <Route path="/checkout/:plan_id" element={ <Protected cmp = {Checkout} /> } />
           <Route path="/" element={ <LoginForm/> } />
           <Route path="/register" element={ <SignupForm/> } />
      </Routes>
    </div>
  );
}


export default App;
