import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';


function App() {

    return (
        <Router>
            <Routes>      
                <Route path="/" element={<Home/>}/>
                <Route path="/dashboard/:title" element={<Dashboard/>} />
                <Route path="/calendar" element={<Calendar/>}/>
            </Routes>
        </Router>
    );
}


export default App;
