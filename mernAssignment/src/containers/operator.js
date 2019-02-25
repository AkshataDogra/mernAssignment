import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import CreateUser from '../components/createUser';
import CreatePerson from '../components/createPerson';
import UpdatePerson from '../components/updatePerson';

var idValue ="";

class Operator extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            activeTab: '1',
            updateId: "",
            btnClicked: "false"
         };
         
         this.toggleTab = this.toggleTab.bind(this);
         idValue = Math.random().toString(36).substr(2, 9);
         console.log (idValue);
    }

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
              activeTab: tab
            });
        }
    }

    onClickOk () {
        localStorage.setItem ("id", `${this.state.updateId}`);
        this.setState ({btnClicked: true});
        console.log (this.state.btnClicked);
    }

    onLogout () {
        localStorage.removeItem ("token");
        const history = this.props.history;
        history.push ('./');
    }

    onClickCreate () {
        console.log ('In onClickCreate');
        this.refs.user.createUser ();
        this.refs.per.createPerson ();
    }

    onChangeInput (e) {
        this.setState ({ [e.target.name]: e.target.value });
    }

    render() { 
        return (
            <div >
                <Nav tabs>s
                    <NavItem>
                        <NavLink
                            onClick={() =>  this.toggleTab('1') }> MY PROFILE </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() =>  this.toggleTab('2') }> UPDATE MY PROFILE </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() =>  this.toggleTab('3') }> CREATE NEW USER </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => this.toggleTab('4')}> UPDATE USER </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={ this.onLogout.bind (this) }> Logout </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId='1'>
                        <label>Welcome</label>
                        <UpdatePerson value={true}></UpdatePerson>
                    </TabPane>
                    <TabPane tabId='2'>
                        <label>Update Your Information</label>
                        <UpdatePerson value={false}></UpdatePerson>
                    </TabPane>
                    <TabPane tabId='3'>
                        <label>Create User</label>
                        <CreateUser value={idValue} ref = 'user'></CreateUser>
                        <br /><br />
                        <label>Create Person Information</label>
                        <CreatePerson value={idValue} ref = 'per'></CreatePerson>
                        <div className='container'>
                            <input 
                                type='button' 
                                className='btn btn default btn-success' 
                                value='Send for Approval'
                                onClick={this.onClickCreate.bind (this)} />
                        </div>
                    </TabPane>
                    <TabPane tabId='4'>
                        <label><b>Enter the PersonalUniqueId: </b></label>
                        <input type='text'
                            name='updateId'
                            className='form-control'
                            value={this.state.updateId } 
                            onChange={ this.onChangeInput.bind(this) }/>
                            <br />
                        <input type='button'
                            value='OK'
                            className='btn btn-default btn-success'
                            onClick={this.onClickOk.bind (this)} />
                        <br />
                        {
                            this.state.btnClicked === "true" &&
                            <div>
                                <label>Update Person</label>
                                <UpdatePerson value='false'></UpdatePerson>
                            </div>
                        }
                    </TabPane>
                    <TabPane></TabPane>
                </TabContent>
            </div>
         );
    }

}
 
export default Operator;