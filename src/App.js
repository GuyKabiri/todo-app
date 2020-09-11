import React from 'react';
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import TodoList from './components/TodoList';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter className='app'>
      <Navbar />
      <div className='row'>
        <div className='col s3'>
          <Sidebar />
        </div>
        <div className='col s9'>
          <div className='bottom-section'>
            <Switch>
              <Route exact path='/' component={TodoList} />
              <Route path='/login' component={LogIn} />
              <Route path='/signup' component={SignUp} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
