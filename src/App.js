import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Products from './Components/Products/Products';
import Orders from './Components/Orders/Orders';
import {connect} from 'react-redux';
import {updateEmailTokenState} from './redux/login/loginActions'
import { Component } from 'react';
import store from './redux/store';


function App(props){
  return (
    <div className="App">
      <Router>
        { (props.email!="" || localStorage.getItem('email')!=null) ?
        <>
          <Header/>   
          <Switch>
            <Route path='/' component={Products} exact/>
            <Route path='/orders' component={Orders} exact/>
            <Route path='/*' render={(props) => (<Redirect {...props} to={'/'} />)}/>
          </Switch>
        </>
          :
        <>
          <Header/>   
          <Switch>
            <Route path='/' component={Login} exact/>  
            <Route path='/signup' component={Signup}/>   
            <Route path='/*' render={(props) => (<Redirect {...props} to={'/'} />)}/>
          </Switch>
        </>
        }
      </Router>

    </div>
  );
}



const mapStateToProps = (state) => ({
  email: state.login.email,
  token: state.login.token
});

const mapDispatchToProps = (dispatch) => ({
  updateEmailTokenState: (email,token) => {
      dispatch(updateEmailTokenState(email,token));
  },

});

export default connect(mapStateToProps,mapDispatchToProps)(App);
