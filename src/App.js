import React from 'react';
import './App.css'
import { auth, createUserProfileDocument } from './services/firebase'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import DashBoard from './components/layout/DashBoard';
import LogInSignUp from './components/LogInSignUp';
import AddTodoItem from './components/AddTodoItem';
import { Grid } from '@material-ui/core';


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
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navbar currentUser={this.state.currentUser} />
        <Grid container direction='row' justify='space-between' alignItems='flex-start' className='bottom-section'>
          <Grid item xs={12}>
 
            <Switch>
              <Route exact path='/' render={(props) => (
                <DashBoard {...props} currentUser={this.state.currentUser} />
              )} />
              <Route path='/add/:id?' render={(props) => (
                <AddTodoItem {...props} currentUser={this.state.currentUser} />
              )} />
              <Route path='/auth' render={(props) => (
                <LogInSignUp {...props} currentUser={this.state.currentUser} />
              )} />
            </Switch>

            { this.state.currentUser ? null :
              <Redirect to='/auth' /> 
            }

          </Grid>
        </Grid>
      </BrowserRouter>
    );
  }
}

export default App;
