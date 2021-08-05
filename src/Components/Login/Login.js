import React, { Component } from 'react';
import './Login.css';
import {connect} from 'react-redux'
import {updateEmailTokenState} from '../../redux/login/loginActions'

class Login extends Component {

    constructor()
    {
    super();
    this.state={
        email:"",
        password:""
    }
    }

    Login=(e)=>
    {   e.preventDefault()
        if(this.state.email=="" || this.state.password=="" || this.state.email==null || this.state.password==null)
        {
            window.alert("Email or password should not be blank")
        }
        else
        {
        fetch("http://ec2-3-239-106-130.compute-1.amazonaws.com/rest-auth/login/",
        {
        method:"Post",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(this.state)
        })
        .then((res)=>{return res.json()})
        .then((response)=>
        {
            console.log(response)
            if(response.key==undefined)
            {
             var str="";
             if(response.email!=undefined)
             {
             for(let i=0;i<response.email.length;i++)
             str=str+"\n"+response.email[i];
             }
             if(response.email==undefined)
             {
             for(let i=0;i<response.non_field_errors.length;i++)
             str=str+"\n"+response.non_field_errors[i];
             }
             window.alert(str)
           }
           else
           {
            this.props.updateEmailTokenState(this.state.email,response.key)
            localStorage.setItem('email',this.state.email);
        
           }
          
        })
        .catch((e)=>
        {
            console.log(e)
        })
    }
}
    render() {
        return (
            <div className='loginCompnent'>
                <div className='loginFormCard'>
                    <h2>Login</h2>
                    <form>
                        <input placeholder='Your email' type='text'  onChange={(event)=>{this.setState({email:event.target.value})}}></input>
                        <input placeholder='Your password' type='password' onChange={(event)=>{this.setState({password:event.target.value})}}></input>
                        <button className='' onClick={(e)=>this.Login(e)} >Submit</button>
                    </form>
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(Login);
