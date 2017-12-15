import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './header';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import Feature from './feature';
import RequireAuth from './auth/require_auth';
class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/" render={() => <div>Home Page</div>} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/signup" component={Signup} />
          <Route path="/feature" component={RequireAuth(Feature)} />
        </Switch>
      </div>
    );
  }
}
export default App;
