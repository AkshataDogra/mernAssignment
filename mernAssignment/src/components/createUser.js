import React, { Component } from 'react';
import UserService from '../services/userService';
import Options from './dropboxOptions';


class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            UserId: "",
            UserName: "",
            EmailAddress: "",
            Password: "",
            RoleId: "",
            RoleName:"AccessUser",
            RoleNames: ["Access User", "Operator", "Administrator"]
         };
         this.service = new UserService ();
    }

    componentDidMount (e) {
        this.setState ({ UserId: this.props.value });
    }

    createUser () {
        let usr = {
            UserId: this.state.UserId,
            UserName: this.state.UserName,
            EmailAddress: this.state.EmailAddress,
            Password: this.state.Password,
            RoleId: this.state.RoleId,
            RoleName: this.state.RoleName
        }

        console.log (JSON.stringify (usr));

        this.service
        .requestCreate (usr)
        .then (res => res.json())
        .then (resp => {
            alert (`Your request for creating a new user has been successfully made.
            Waiting for approval. This may take some time, please check again later.
            ${JSON.stringify (usr)}`);
            console.log (resp);
        })
        .catch (error => console.log (error.status));
        
        return usr;
        
    }

    onChangeUser (e) {
        this.setState ({ [e.target.name]: e.target.value });
    }

    onChangeRN () {
        console.log (this.state.RoleName)
        switch (this.state.RoleName) {
            case "Administrator": this.setState.RoleId = 101;
                break;
            case "Operator": this.setState.RoleId = 102;
                break;
            case "AccessUser":
            default: this.setState.RoleId = 103;
                break;
        }
    }
    
    render() { 
        return (
            <div className='form-group col-7'>
                <div className=''>
                    <label>UserId</label>
                    <input type='text'
                            name='UserId'
                            className='form-control'
                            value={ this.state.UserId } 
                            onChange={ this.onChangeUser.bind(this) }
                            disabled />
                </div>
                <div>
                    <label>UserName</label>
                    <input type='text'
                            name='UserName'
                            className='form-control'
                            value={ this.state.UserName } 
                            onChange={ this.onChangeUser.bind(this) } />
                </div>
                <div>
                    <label>EmailAddress</label>
                    <input type='text'
                            name='EmailAddress'
                            className='form-control'
                            value={ this.state.EmailAddress } 
                            onChange={ this.onChangeUser.bind(this) } />
                </div>
                <div>
                    <label>Password</label>
                    <input type='text'
                            name='Password'
                            className='form-control'
                            value={ this.state.Password } 
                            onChange={ this.onChangeUser.bind(this) } />
                </div>
                <div>
                    <label>RoleId</label>
                    <input type='text'
                            name='RoleId'
                            className='form-control'
                            value={ this.state.RoleId } 
                            onChange={ this.onChangeUser.bind(this) } />
                            {/* // onChange={ this.onChangeRN.bind(this) } /> */}
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
            </div>
        );
    }
}
 
export default CreateUser;