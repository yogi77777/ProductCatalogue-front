import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import store from '../../redux/store';
import {updateEmailTokenState} from '../../redux/login/loginActions'
import {connect} from 'react-redux'

export class Header extends Component {

    logout=()=>
    {
      localStorage.removeItem('email')
      this.props.updateEmailTokenState("","")
     
    }
    render() {
        return (
            <div className='headerComponent'>
                <div className='headerTitle'>
                    E Commerce
                </div>
                <div>
                    {(store.getState().login.email=="" && localStorage.getItem('email')==null) ?
                    <div>
                       <Link style={{ textDecoration: 'none', color: 'white' }} to='/'> Login</Link>

                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/signup'> Signup</Link>
                    </div>
                    :
                    <div>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/orders'>My orders     </Link>  
                        <Link onClick={()=>this.logout()} style={{ textDecoration: 'none', color: 'white' }} to='/'> Logout</Link> 
                    </div>  
                    
                  }
                    
                </div>
            </div>
        )
    }
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(Header);

