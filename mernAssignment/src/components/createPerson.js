import React, { Component } from 'react';
import PersonService from '../services/personService';
import Options from './dropboxOptions';


class CreatePerson extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            PersonalUniqueId: "",
            FullName: {},
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
            PhysicalDisability: "NO",
            MaritalStatus : "Unmarried",
            EducationStatus: "Masters",
            BirthSign: "",
            Genders: ["Male", "Female", "Third Gender"],
            Disability: ["NO", "YES"],
            MStatus: ["Unmarried", "Married", "Divorced", "Widow", "Widower"],
            EStatus: [ "Masters", "Phd", "Graduate", "Under-Graduate", "HSC", "SSC", "Illiterate"]
         };
        //  console.log (this.props);
        this.service = new PersonService ();
    }


    componentDidMount () {
        this.setState ({ PersonalUniqueId: this.props.value });
    }

    onChangeUser (e) {
        this.setState ({ [e.target.name]: e.target.value });
    }

    createPerson () {
        let per = {
            PersonalUniqueID: this.state.PersonalUniqueId,
            FullName: {
                FirstName: this.state.FirstName,
                MiddleName: this.state.MiddleName,
                LastName: this.state.LastName
            },
            FirstName: this.state.FirstName,
            MiddleName: this.state.MiddleName,
            LastName: this.state.LastName,
            Gender: this.state.Gender,
            DateOfBirth: this.state.DateOfBirth,
            Age: this.state.Age,
            Address: {
                FlatNo: this.state.FlatNo,
                SocietyName: this.state.SocietyName,
                AreaName: this.state.AreaName
            },
            FlatNo: this.state.FlatNo,
            SocietyName: this.state.SocietyName,
            AreaName: this.state.AreaName,
            City: this.state.City,
            State: this.state.State,
            PinCode: this.state.PinCode,
            PhoneNo: this.state.PhoneNo,
            MobileNo: this.state.MobileNo,
            PhysicalDisability: this.state.PhysicalDisability,
            MaritalStatus: this.state.MaritalStatus,
            EducationStatus: this.state.EducationStatus,
            BirthSign: this.state.BirthSign
        }

        console.log (per);

        this.service
        .requestCreate (per)
        .then (res => res.json())
        .then (resp => {
            alert (`Your request for creating a new user has been successfully made.
            Waiting for approval. This may take some time, please check again later.`);
            console.log (resp);
        })
        .catch (error => console.log (error.status));
        return per;
    }
    
    render() { 
        return ( 
            <div className='col-7'>
                <div className='form-group'>
                    <label>PersonalUniqueId</label>
                    <input type='text'
                        name='PersonalUniqueId'
                        className='form-control'
                        value={this.state.PersonalUniqueId } 
                        onChange={ this.onChangeUser.bind(this) }
                        disabled />
                </div>
                <div className='form-group'>
                    <label>FullName</label>
                    <div style={{display: "flex"}}>
                        <input type='text'
                            name='FirstName'
                            className='form-control'
                            placeholder='First name'
                            value={ this.state.FirstName } 
                            onChange={ this.onChangeUser.bind(this) } />
                        <input type='text'
                            name='MiddleName'
                            className='form-control'
                            placeholder='Middle name'
                            value={ this.state.MiddleName } 
                            onChange={ this.onChangeUser.bind(this) } />
                        <input type='text'
                            name='LastName'
                            className='form-control'
                            placeholder='Last name'
                            value={this.state.LastName} 
                            onChange={ this.onChangeUser.bind(this) } />
                        </div>
                    </div>
                <div className="form-group">
                    <label>Gender</label>
                        <select
                            name="Gender"
                            className="form-control"
                            value={this.state.Gender}
                            onChange={this.onChangeUser.bind(this)}>
                            {
                                this.state.Genders.map((val, idx) => (
                                    <Options key={idx} value={val} />
                                ))
                            }
                        </select>
                </div>
                <div className='form-group'>
                    <label>DateOfBirth</label>
                    <input type='text'
                        name='DateOfBirth'
                        className='form-control'
                        placeholder='dd-mm-yyyy'
                        value={ this.state.DateOfBirth } 
                        onChange={ this.onChangeUser.bind(this) } />
                </div>
                <div className='form-group'>
                    <label>Age</label>
                    <input type='text'
                        name='Age'
                        className='form-control'
                        value={ this.state.Age } 
                        onChange={ this.onChangeUser.bind(this) } />
                </div>
                <div className='form-group'>
                    <label>Address</label>
                    <div >
                        <input type='text'
                            name='FlatNo'
                            // style={{width: '25%'}}
                            className='form-control'
                            placeholder='Flat/Bungalow Number'
                            value={ this.state.FlatNo } 
                            onChange={ this.onChangeUser.bind(this) } />
                        <input type='text'
                            name='SocietyName'
                            // style={{width: '50%'}}
                            className='form-control'
                            placeholder='Society Name'
                            value={ this.state.SocietyName } 
                            onChange={ this.onChangeUser.bind(this) } />
                        <input type='text'
                            name='AreaName'
                            // style={{width: '100%'}}
                            className='form-control'
                            placeholder='Street Name/Area Name'
                            value={ this.state.AreaName } 
                            onChange={ this.onChangeUser.bind(this) } />
                    </div>
                </div>
                <div className='form-group'>
                    <label>City</label>
                    <input type='text'
                        name='City'
                        className='form-control'
                        value={ this.state.City } 
                        onChange={ this.onChangeUser.bind(this) } />
                </div>
                <div className='form-group'>
                    <label>State</label>
                    <input type='text'
                        name='State'
                        className='form-control'
                        value={ this.state.State } 
                        onChange={ this.onChangeUser.bind(this) } />
                </div>
                <div className='form-group'>
                    <label>PinCode</label>
                    <input type='text'
                        name='PinCode'
                        className='form-control'
                        value={ this.state.PinCode } 
                        onChange={ this.onChangeUser.bind(this) } />
                </div>
                <div className='form-group'>
                    <label>PhoneNo</label>
                    <input type='text'
                        name='PhoneNo'
                        className='form-control'
                        value={ this.state.PhoneNo } 
                        onChange={ this.onChangeUser.bind(this) } />
                </div>
                <div className='form-group'>
                    <label>MobileNo</label>
                    <input type='text'
                        name='MobileNo'
                        className='form-control'
                        value={ this.state.MobileNo } 
                        onChange={ this.onChangeUser.bind(this) } />
                </div>
                <div className="form-group">
                    <label>PhysicalDisability</label>
                        <select
                            name="PhysicalDisability"
                            className="form-control"
                            value={this.state.PhysicalDisability}
                            onChange={this.onChangeUser.bind(this)}>
                            {
                                this.state.Disability.map((val, idx) => (
                                    <Options key={idx} value={val} />
                                ))
                            }
                        </select>
                </div>
                <div className="form-group">
                    <label>MaritalStatus</label>
                        <select
                            name="MaritalStatus"
                            className="form-control"
                            value={this.state.MaritalStatus}
                            onChange={this.onChangeUser.bind(this)}>
                            {
                                this.state.MStatus.map((val, idx) => (
                                    <Options key={idx} value={val} />
                                ))
                            }
                        </select>
                </div>
                <div className="form-group">
                    <label>EducationStatus</label>
                        <select
                            name="EducationStatus"
                            className="form-control"
                            value={this.state.EducationStatus}
                            onChange={this.onChangeUser.bind(this)}>
                            {
                                this.state.EStatus.map((val, idx) => (
                                    <Options key={idx} value={val} />
                                ))
                            }
                        </select>
                </div>
                <div className='form-group'>
                    <label>BirthSign</label>
                    <input type='text'
                        name='BirthSign'
                        className='form-control'
                        value={ this.state.BirthSign } 
                        onChange={ this.onChangeUser.bind(this) } />
                </div>
            </div>
         );
    }
}
 
export default CreatePerson;