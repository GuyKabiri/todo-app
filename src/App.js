import React from 'react';
import './App.css'
import { auth, createUserProfileDocument } from './services/firebase'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import DashBoard from './components/layout/DashBoard';
import LogInSignUp from './components/LogInSignUp';
import AddTodoItem from './components/AddTodoItem';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            }
          })
        })
        
      }
      else {
        this.setState({ currentUser: userAuth });
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render () {
    return (
      <BrowserRouter className='app'>
        <Navbar currentUser={this.state.currentUser} />
        <div className='bottom-section row'>
          <div className='col s12'>
            { this.state.currentUser ? (
            <Switch>
              <Route exact path='/' render={(props) => (
                <DashBoard {...props} currentUser={this.state.currentUser} />
              )} />
              <Route path='/add' render={(props) => (
                <AddTodoItem {...props} currentUser={this.state.currentUser} />
              )} />
              
            </Switch>
            ) : (
            <Route path='/auth' component={LogInSignUp} />
            ) }
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
