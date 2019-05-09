import React, { Component } from 'react';
import axios from './config/axios'
import '../../client/src/App.css' 
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import Home from './components/layout/Home'
import ContactList from './components/contacts/List'
import ContactNew from './components/contacts/New'
import ContactShow from './components/contacts/Show'
import ContactEdit from './components/contacts/Edit'

import UserRegister from './components/authentication/Register'
import UserLogin from './components/authentication/Login'
import UserLogout from './components/authentication/Logout'
import axios from './config/axios';

class App extends Component {
  constructor(props){
    super(props) 
    this.state = {
      isAuthenticated: !!localStorage.getItem('token'),
    }
    this.handleIsAuthenticated = this.handleIsAuthenticated.bind(this)
  }

  handleIsAuthenticated(bool) {
    this.setState(() => ({
      isAuthenticated: bool
    }))
  }

  render() {
    return (
      <BrowserRouter>
        <div className = "container">
          <h2 className = "heading"> Contact Manager </h2>
          <div className = "links">
          <Link to="/"> Home </Link> | 
          <Link to="/contacts">Contacts</Link> |

          {
            this.state.isAuthenticated && <Link to="/users/logout"> |Logout </Link>
          }

          {
            !this.state.isAuthenticated && (
              <div>
                <Link to="/users/register"> Register</Link> |
                <Link to="/users/login">Login </Link>
              </div>
            )
          }
          </div>
        

          <Switch> 
            <Route path="/" component={Home} exact={true} />
            <Route path="/contacts" component={ContactList} exact={true} />
            <Route path="/contacts/new" component={ContactNew} exact={true} />
            <Route path="/contacts/edit/:id" component={ContactEdit} exact={true} />
            <Route path="/contacts/:id" component={ContactShow} />

            <Route path="/users/register" component={UserRegister} />
            <Route path="/users/login" render={() => <UserLogin handleIsAuthenticated={this.handleIsAuthenticated}/> } /> 
            <Route path = "/users/logout" component = {()=>{
              localStorage.clear()
              axios.defaults.headers['x-auth'] = null
              return(
                <div>
                  <p>
                    'Successfully logged out !!'
                  </p>
                </div>
              )
            }}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;