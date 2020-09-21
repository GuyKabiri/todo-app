import React from 'react';
import './App.css'
import { auth, createUserProfileDocument } from './services/firebase'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import DashBoard from './components/layout/DashBoard';


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
        <div className='row'>
          
          <div className='col s9'>
            <div className='bottom-section'>
              <Switch>
                <Route exact path='/' render={(props) => (
                  <DashBoard {...props} currentUser={this.state.currentUser} />
                )} />
                <Route path='/login' component={LogIn} />
                <Route path='/signup' component={SignUp} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
