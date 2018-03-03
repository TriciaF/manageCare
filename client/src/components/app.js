'use strict';

import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ManageCare from './manageCare';
import PatientList from './patient-list';
import NavBar from './nav-bar';
import {clearAuth} from '../actions/auth';
import {Redirect} from 'react-router-dom';

export class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log('enter App componentWillReceiveProps');
    if (nextProps.loggedIn && !this.props.loggedIn) {
        // When we are logged in, start login timer
        this.startLogoutWithInactivity();
    } else if (!nextProps.loggedIn && this.props.loggedIn) {
        // Stop refreshing when we log out
        this.stopPeriodicRefresh(); 
        this.props.history.push('/')
    };
};

  startLogoutWithInactivity(){
    console.log('startLogoutWithInactity');
    this.logoutTimer = setInterval( () => this.props.dispatch(clearAuth()), 6 * 60000);
  };

  componentWillUnmount() {
      this.stopPeriodicRefresh();
  };
 
  stopPeriodicRefresh() {
    console.log('stopPeriodRefresh');
      if (!this.logoutTimer) {
          return;
      }
      clearInterval(this.logoutTimer);
  }
    render() {

      console.log('render App');
        return ( 
          <div className = "app" >
            <NavBar />
            <Route exact path="/" component= {ManageCare}/>
            <Route exact path="/patient" component= {PatientList}/>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  logoutWarning: state.auth.logoutWarning,
  loggedIn: state.auth.loggedIn,
  hasAuthToken: state.auth.authToken
});


export default withRouter(connect(mapStateToProps)(App));
