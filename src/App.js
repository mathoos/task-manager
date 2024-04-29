import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';
import Home from './pages/Home';
import Projet from './pages/Projet';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';


function App() {

    return (
        <Router>
            <Routes>      
                <Route path="/" element={<Home/>}/>
                <Route path="/projet" element={<Projet/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/calendar" element={<Calendar/>}/>
            </Routes>
        </Router>
    );
}


export default App;
