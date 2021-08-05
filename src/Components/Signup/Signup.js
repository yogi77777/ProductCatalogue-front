import React, { Component } from 'react';
import './Signup.css';
import {connect} from 'react-redux'
import {updateEmailTokenState} from '../../redux/login/loginActions'

export class Signup extends Component {

    constructor()
    {
    super();
    this.state={
        name:"",
        email:"",
        password1:"",
        password2:""
    }
    }

    SignUp=(e)=>
    {   
        e.preventDefault()
        if(this.state.email=="" || this.state.password1=="" || this.state.name=="" || this.state.email==null || this.state.password1==null || this.state.name==null)
        {
            window.alert("Email or password or name should not be blank")
        }
        else
        {
        fetch("http://ec2-3-239-106-130.compute-1.amazonaws.com/rest-auth/registration/",
        {
        method:"Post",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(this.state)
        })
        .then((res)=>{return res.json()})
        .then((response)=>
        {
           if(response.key==undefined)
           {
            var str="";
            for(let i=0;i<response.email.length;i++)
            str=str+"\n"+response.email[i];
            for(let i=0;i<response.password1.length;i++)
            str=str+"\n"+response.password1[i];
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
                    <h2>Signup</h2>
                    <form>
                        <input placeholder='Your name' type='text'  onChange={(event)=>{this.setState({name:event.target.value})}}></input>
                        <input placeholder='Your email' type='text'  onChange={(event)=>{this.setState({email:event.target.value})}}></input>
                        <input placeholder='Your password' type='password'  onChange={(event)=>{this.setState({password1:event.target.value,password2:event.target.value})}}></input>
                        <button className='' onClick={(e)=>this.SignUp(e)}>Submit</button>
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(Signup);
