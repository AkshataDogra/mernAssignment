import React, { Component } from 'react';
import PersonService from '../services/personService';
import TableRow from './tableRow';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            requestPersons: [""],
            PersonalUniqueId: "",
            FullName: {
                FirstName: "",
                MiddleName: "",
                LastName: ""
            },
                FirstName: "",
                MiddleName: "",
                LastName: "",
            Gender: "",
            DateOfBirth: "",
            Age : "",
            Address: {},
                FlatNo: "", 
                SocietyName: "", 
                AreaName: "",
            City: "",
            State: "",
            PinCode: "",
            PhoneNo : "",
            MobileNo : "",
            PhysicalDisability: "",
            MaritalStatus : "",
            EducationStatus: "",
            BirthSign: ""
         };
        this.service = new PersonService ();    
    }

    componentDidMount () {
        this.service
            .getTempPer ()
            .then(res => res.json())
            .then(resp => {
                // console.log (resp.data[0].FullName.FirstName);
                this.setState({ requestPersons: (resp.data) });
                // console.log (this.state (requestPersons));
            })
            .catch (error => {
                console.log (`Error occurred ${error.status}`);
            });
    }

    getSelectedRow (p) {
        this.setState ({PersonalUniqueId: p.PersonalUniqueId});
        this.setState ({Gender: p.Gender});
        this.setState ({Age: p.Age});
        // this.setState ({CategoryName: p.CategoryName});
        // this.setState ({Manufacturer: p.Manufacturer});
    }

    // onClickApprove () {
    //     console.log ("In approve");
    // }

    // onClickReject () {
    //     console.log ("In reject");
    // }

    
    
    render() { 
        return ( 
            <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            {Object.keys(this.state.requestPersons[0]).map((p, i) => (
                                (p !== "_id" && p !== "__v") &&
                                <th > {p} </th>
                            ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.requestPersons.map ((prd, idx) => (
                                <TableRow
                                    key={idx}
                                    row={prd}
                                    selected={this.getSelectedRow.bind (this)}
                                    // deleted={this.onClickDelete.bind (this)}
                                    // // updated={this.onClickUpdate.bind (this)}
                                    />
                            ))}
                    </tbody>
                </table>
         );
    }
}


// class TableRow extends Component {
    
//     constructor (props) {
//         super (props);
//         this.service = new PersonService ();
//     }

//     onRowClick () { 
//         this.props.selected (this.props.row);
//      }

//      onClickApprove (e) {
//         let newVal = JSON.stringify (this.props.row);
//          console.log (newVal);
//          let id = this.props.row.PersonalUniqueID;
//          console.log (id);

//          this.service
//          .getExistingPerson (this.props.row)
//          .then (res => res.json ())
//          .then (resp => {
//              console.log (resp.data);
//              if (resp.data){
//                  console.log ("Sorry the record already exists");
//                     //  updating an existing record in permanent database
//                     this.service
//                     .updateData (this.props.row)
//                     .then (res => res.json ())
//                     .then (resp => {
//                         console.log (resp.data);
//                     })
//                     .catch (error => console.log (error.status));

//                     // removing the entry from temp database
//                     this.service
//                     .deleteTemp (this.props.row)
//                     .then (res => res.json ())
//                     .then (resp => {
//                         console.log (resp.data);
//                     })
//                     .catch (error => console.log (error.status));
//              } else {
//                 //  creating a new entry in permanent database
//                 this.service
//                 .createData (this.props.row)
//                 .then (res => res.json ())
//                 .then (resp => {
//                     console.log (resp.data);
//                 })
//                 .catch (error => console.log (error.status));

//                 // removing the entry from temp database
//                 this.service
//                 .deleteTemp (this.props.row)
//                 .then (res => res.json ())
//                 .then (resp => {
//                     console.log (resp.data);
//                 })
//                 .catch (error => console.log (error.status));
//              }
//          })
//          .catch (error => console.log (error.status));

        
        
//         alert ("Request approved");

//      }

//      onClickReject (e) {

//         let id = this.props.row.PersonalUniqueID;
//         console.log (id);
//         // removing from temp database
//         this.service
//         .deleteTemp (this.props.row)
//         .then (res => res.json ())
//         .then (resp => {
//             console.log (resp.data);
//         })
//         .catch (error => console.log (error.status));
    
//         alert ("rejected");
//     }

//     render () {
//         return (
//             <tr onClick={this.onRowClick.bind (this)}>
//             <td>{this.props.row.PersonalUniqueID}</td>
//             <td>{this.props.row.FirstName
//                 + " " + this.props.row.MiddleName
//                 + " " + this.props.row.LastName}</td>
//             <td>{this.props.row.Gender}</td>
//             <td>{this.props.row.DateOfBirth}</td>
//             <td>{this.props.row.Age}</td>
//             <td >
//             {this.props.row.FlatNo
//                 + " " + this.props.row.SocietyName
//                 + " " + this.props.row.AreaName}
//             </td>
//             <td>{this.props.row.City}</td>
//             <td>{this.props.row.State}</td>
//             <td>{this.props.row.PinCode}</td>
//             <td>{this.props.row.PhoneNo}</td>
//             <td>{this.props.row.MobileNo}</td>
//             <td>{this.props.row.PhysicalDisability}</td>
//             <td>{this.props.row.MaritalStatus}</td>
//             <td>{this.props.row.EducationStatus}</td>
//             <td>{this.props.row.BirthSign}</td>
//             <td>
//                 <input type='button' 
//                 className='btn btn-default btn-success'
//                 value='APPROVE'
//                 onClick={ this.onClickApprove.bind(this) } />
//             </td>
//             <td>
//                 <input type='button' 
//                 className='btn btn-default btn-danger'
//                 value='REJECT'
//                 onClick={ this.onClickReject.bind(this) } />
//             </td>
//         </tr>
//         );
//     }
// }
 
export default Table;