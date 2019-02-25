import React, { Component } from 'react';
import LoginService from '../services/loginService';
import Options from '../components/dropboxOptions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            UserName: "",
            Password: "",
            Users: [],
            RoleName:"AccessUser",
            RoleNames: ["Access User", "Operator", "Administrator"]
         };
         this.service = new LoginService ();
    }

    onChangeUser (e) {
        this.setState ({ [e.target.name]: e.target.value });
    }

    //CLEAR 
    onClickClear (e) {
        this.setState ({UserName: ""});
        this.setState ({Password: ""});
    }

    //LOGIN SERVICE
    onClickLogin  () {
        let loginUser = {
            UserName: this.state.UserName,
            Password: this.state.Password
        };

        // console.log (this.state.RoleName);
        this.service
        .getUser (loginUser)
        .then (res => res.json ())
        .then (resp => {
            console.log (resp.data);
            localStorage.setItem ("id", `${resp.data.UserId}`);
            localStorage.setItem ("role", `${resp.data.RoleName}`);
        })
        .catch (error => console.log (error.status));

        var userRole = localStorage.getItem("role");
        // if (userRole === this.state.RoleName) {   
            console.log ("here");
            this.service
            .authUser (loginUser)
            .then (res => res.json())
            .then (resp => {
                // console.log (JSON.stringify(resp.token));
                localStorage.setItem ("token", `Bearer ${resp.token}`);
                var token = JSON.stringify (resp.token);
                if (token){
                    if (userRole === this.state.RoleName ) {
                        if (userRole === "AccessUser") {
                            const history = this.props.history;
                            // alert (JSON.stringify (loginUser));
                            history.push ('./userProfile');
                        } else if (userRole === "Operator") {
                            const history = this.props.history;
                            // alert (JSON.stringify (loginUser));
                            history.push ('./operator');
                        } else {
                            console.log ("......");    
                            const history = this.props.history;
                            // alert (JSON.stringify (loginUser));
                            history.push ('./admin');
                        }
                    } else {
                        alert ("Your roles don't match.");
                    }
                } else {
                    alert ("Sorry something went wrong. Please try again later.");
                }
            })
            .catch (error => console.log (error.status));
        } 
    
    render() { 
        return (
            <div className='container'>
                <br /><br /><br /><br />
                <div className='col-5 bg-light'>
                    <h1>Login</h1> <br />
                    <div className='form-group'>
                        <label >Name</label>
                        <input type='text'
                            name='UserName'
                            className='form-control'
                            value={this.state.UserName} 
                            onChange={this.onChangeUser.bind(this)} />
                    </div>
                    <div className='form-group'>
                        <label >Password</label>
                        <input type='password'
                            name='Password'
                            className='form-control'
                            value={this.state.Password} 
                            onChange={this.onChangeUser.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label>Choose Role</label>
                        <select
                            name="RoleName"
                            className="form-control"
                            value={this.state.RoleName}
                            onChange={this.onChangeUser.bind(this)}>
                            {
                                this.state.RoleNames.map((val, idx) => (
                                    <Options key={idx} value={val} />
                                ))
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                    <input type='button'
                                        value='Clear'
                                        className='btn btn-default btn-warning'
                                        onClick={ this.onClickClear.bind(this) } />
                                    </td>
                                    <td>
                                    <input type='button'
                                        value='Login'
                                        className='btn btn-default btn-success'
                                        onClick={this.onClickLogin.bind (this)} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br /><br />
                    </div>
                </div>
                <br />
                <label>Create an account.</label>
                <a href='./register.js'><u>Sign Up</u></a>
            </div>     
        );
    }
}
 
export default Login;