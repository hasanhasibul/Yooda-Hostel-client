import React from 'react';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import AddFoodItem from './components/AddFoodItem';
import AddStudent from './components/AddStudent';
import Home from './components/Home';
import StudentView from './components/StudentView';
import Distribution from './components/Distribution';
import FoodPrice from './components/FoodPrice';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Home/>} />
          <Route path="/add-item" element={< AddFoodItem/>} />
          <Route path="/add-student" element={< AddStudent/>} />
          <Route path="/student-table" element={< StudentView/>} />
          <Route path="/distribution" element={< Distribution/>} />
          <Route path="/food-price" element={< FoodPrice/>} />
        </Routes>
      </BrowserRouter>,
    </div>
  );
};

export default App;