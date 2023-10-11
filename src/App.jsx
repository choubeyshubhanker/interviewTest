import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Form, useFormik } from 'formik';
import {ContactSchema} from './validateSchema'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormHelperText } from '@mui/material';

const initialValues={
  title:"",
  firstName:"",
  lastName:"",
  contactType: "",
  contactValue : "",
}

function App() {
  const [contacts, setContacts] = useState('select');
  const [contactsData, setContactsData] = useState([]);



   const {values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, handleReset} = useFormik({
    initialValues:initialValues,
    validationSchema: ContactSchema,
    onSubmit :  (values) => {
      // same shape as initial values
      console.log(values);
      setContactsData((prev)=> [...prev,values])
      handleReset()
      
    },
   })

 

   console.log("🚀 ~ file: App.jsx:33 ~ App ~ error:", errors)

  return (
    <>
      <h1>Contact Form</h1>
      <Container maxWidth="sm" >
      
      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"flex-end"}}>
       
      <TextField
        error = {errors.title}
        id="filled-error-helper-text"
        label="Title"
        name="title"
        // defaultValue="Hello World"
        helperText={errors.title}
        variant="filled"
        value={values.title}
        onChange={handleChange}
        onBlur = { handleBlur}
      />
    
      <TextField
        error = {errors.firstName}
        id="filled-error-helper-text"
        // defaultValue="Hello World"
        helperText={errors.firstName}
        variant="filled"
        label="First Name"
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        onBlur = { handleBlur}
      />
      <TextField
        error = {errors.lastName}
        id="filled-error-helper-text"
        // defaultValue="Hello World"
        helperText={errors.lastName}
        variant="filled"
        label="Last Name"
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        onBlur = { handleBlur}
      />
      <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", gap:"10px"}}>
     <InputLabel id="demo-simple-select-label">Contact Type &nbsp;</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Contact Type"
    name="contactType"
        value={values.contactType}
        onChange={handleChange}
        onBlur={handleBlur}
  >
    <MenuItem value={"mobile"}>Mobile No.</MenuItem>
    <MenuItem value={"phone"}>Phone No.</MenuItem>
    <MenuItem value={"email"}> Email Id</MenuItem>
  </Select>
  <FormHelperText>{errors.contactType}</FormHelperText>
  <TextField
        error = {errors.contactValue}
        id="filled-error-helper-text"
        helperText={errors.contactValue}
        variant="filled"
        label="Contact Value"
        name="contactValue"
        value={values.contactValue}
        onChange={handleChange}
        onBlur = { handleBlur}
      />
      </div>
      <button type="submit" >Add To Contact</button>
      </form>

      <Box sx={{ height: 400, width: '100%' }}>
      {/* {contactsData.length > 0 &&  */}

    
        <h2>Contacts List</h2>
        {/* {contactsDatas.map(contact =>( */}
          {/* <> */}
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Contact Type</TableCell>
            <TableCell align="right">Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactsData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.contactType}</TableCell>
              <TableCell align="right">{row.contactValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
         

       
      
        
      {/* } */}
    </Box>
      
      </Container>
    </>
  )
}

export default App
