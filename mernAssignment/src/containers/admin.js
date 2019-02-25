import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import Table from '../components/table';
import UpdatePerson from '../components/updatePerson';



class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeTab: '1'
         };
         this.toggleTab = this.toggleTab.bind(this);
         
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
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            onClick={() =>  this.toggleTab('1') }> MY PROFILE </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => this.toggleTab('2')}> UPDATE MY PROFILE </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => this.toggleTab('3')}> NEW REQUESTS </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={ this.onLogout.bind (this) }> LOGOUT </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
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
                        <br /><br /><br />
                        <Table></Table>
                    </TabPane>
                    <TabPane ></TabPane>
                </TabContent>
                
            </div>
         );
    }
}
 
export default Admin;