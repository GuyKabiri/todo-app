import React from 'react';
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import TodoList from './components/TodoList';

function App() {
  return (
    <BrowserRouter className='app'>
      <Navbar />
      <div className='bottom-section'>
      <Sidebar />
      <Switch>
        <Route path='/' component={TodoList} />
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
