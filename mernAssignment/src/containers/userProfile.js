import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import UpdatePerson from '../components/updatePerson';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
             activeTab: '1'
         };
         this.toggleTab = this.toggleTab.bind(this);
         
        //  console.log("this.state.props",this.props.location.state);
    }

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
              activeTab: tab
            });
        }
    }

    onLogout () {
        localStorage.removeItem ("token");
        const history = this.props.history;
        history.push ('./');
    }

    render() { 
        return ( 
            <div >
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            onClick={() =>  this.toggleTab('1') }> Welcome </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => this.toggleTab('2')}> Update Your Information </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={ this.onLogout.bind (this) }> Logout </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab} className='tab tab-border'>
                    <TabPane tabId='1'>
                        <br /><br /><br />
                        <label>Welcome</label>
                        <UpdatePerson value={true}></UpdatePerson>
                    </TabPane>
                    <TabPane tabId='2'>
                        <br /><br /><br />
                        <label>Update Your Information</label>
                        <UpdatePerson value={false}></UpdatePerson>
                    </TabPane>
                    <TabPane tabId='3'>
                        <label>Logout</label>                        
                    </TabPane>
                </TabContent>
            </div>
         );
    }
}
 
export default UserProfile;