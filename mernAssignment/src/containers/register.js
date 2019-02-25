import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    onChangeUser (e) {
        this.setState ({ [e.target.name]: e.target.value });
    }

    render() { 
        return ( 
            <div>
                <div className='container'>
                    <div className='col-5'>
                        <div className='form-group'>
                            <label >Name</label>
                            <input type='text'
                                name='UserName'
                                className='form-control'
                                value={this.state.UserName} 
                                onChange={this.onChangeUser.bind(this)} />
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input type='password'
                                name='Password'
                                className='form-control'
                                value={this.state.Password} 
                                onChange={this.onChangeUser.bind(this)} />
                        </div>
                            <div className="form-group">
                            <input type='button'
                                value='Cancel'
                                className='btn btn-warning' />
                            <input type='button'
                                value='Login'
                                className='btn btn-success' />
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Register;