import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class Student extends Component {
      constructor(props) {
      super(props);
      this.state = {open: false, email: "", name: "" };
    };
    
    handleClickOpen = () => {
      this.setState( {open:true} );
    };

    handleClose = () => {
      this.setState( {open:false} );
    };

    handleChangeEmail = (event) => {
      this.setState({email: event.target.value});
    };
    handleChangeName = (event) => {
      this.setState({name: event.target.value});
    };

  // Save course and close modal form
    handleAdd = () => {
       this.addStudent(this.state.email, this.state.name); 
       this.handleClose();
    }
  //addStudent
    addStudent = (email1, name1) =>{
      const token = Cookies.get('XSRF-TOKEN');
      fetch(`${SERVER_URL}/student/addStudent`,{
        method:'POST', 
        headers: { 'Content-Type': 'application/json',
          'X-XSRF-TOKEN': token},
          body: JSON.stringify({
            email: email1,
            name: name1
        })
    }).then((res) =>{return res.json();})
        .then((responseData) => {
          this.setState({email: responseData.email, name: responseData.name});
          toast.success("Student successfully added!",
            {position: toast.POSITION.BOTTOM_LEFT});
	})
   }	
    render()  { 
      return (
          <div>

            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
              Add Student
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                	<TextField autoFocus fullWidth label="Name" name="name" onChange={this.handleChangeName}  /> 
              		<TextField autoFocus fullWidth label="Email" name="email" onChange={this.handleChangeEmail} /> 
	              </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                  <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                </DialogActions>

            </Dialog>      
          </div>
      ); 
    }
}

  
export default Student;

