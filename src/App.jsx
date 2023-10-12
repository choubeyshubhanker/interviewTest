import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Form, useFormik } from "formik";
import { ContactSchema } from "./validateSchema";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormHelperText } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";

const initialValues = {
  title: "",
  firstName: "",
  lastName: "",
};

function App() {
  const [contactTypes, setContactTypes] = useState([
    { contactType: "select", contactValue: "" },
  ]);

  //Setting data to state other option was to set data in localstorage but as it is a form data which will be send over an API that's why I prefer storing in state.
  const [contactsData, setContactsData] = useState([]);

  // For adding multiple contact types
  const handleContactTypes = (e, index) => {
    const { name, value } = e.target;
    const list = [...contactTypes];
    list[index][name] = value;
    setContactTypes(list);
  };

  const handleContactTypesRemove = (index) => {
    const list = [...contactTypes];
    if (contactTypes.length > 1) {
      list.splice(index, 1);
      setContactTypes(list);
    }
  };

  const handleContactAdd = () => {
    setContactTypes([
      ...contactTypes,
      { contactType: "select", contactValue: "" },
    ]);
  };

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      // same shape as initial values
      console.log(values);
      const updatedData = { values, contactType: contactTypes };
      setContactsData((prev) => [...prev, updatedData]);
      handleReset();
      setContactTypes([{ contactType: "select", contactValue: "" }]);
    },
  });

  const deleteContact = (id) => {
    let updatedData = contactsData.filter((ele, idx) => {
      return id !== idx;
    });
    setContactsData(updatedData);
  };

  //  console.log("🚀 ~ file: App.jsx:33 ~ App ~ error:", errors)

  return (
    <>
      <h1>Contact Form</h1>
      <Container
        maxWidth="md"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-end",
            width: "100%",
            gap: "20px",
          }}
        >
          <TextField
            error={errors.title && touched.title}
            id="filled-error-helper-text"
            label="Title"
            name="title"
            // defaultValue="Hello World"
            helperText={errors.title}
            variant="filled"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextField
            error={errors.firstName && touched.firstName}
            id="filled-error-helper-text"
            helperText={errors.firstName}
            variant="filled"
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            error={errors.lastName && touched.lastName}
            id="filled-error-helper-text"
            helperText={errors.lastName}
            variant="filled"
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {contactTypes.map((singleType, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "10px",
                width: "100%",
              }}
            >
              <InputLabel id="demo-simple-select-label" htmlFor="contactType">
                Contact Type &nbsp;
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Contact Type"
                required
                name="contactType"
                value={singleType.contactType}
                onChange={(e) => handleContactTypes(e, idx)}
              >
                <MenuItem value={"select"}>Select</MenuItem>
                <MenuItem value={"mobile"}>Mobile No.</MenuItem>
                <MenuItem value={"phone"}>Phone No.</MenuItem>
                <MenuItem value={"email"}> Email Id</MenuItem>
              </Select>

              <TextField
                id="filled-error-helper-text"
                variant="filled"
                label="Contact Value"
                name="contactValue"
                type={singleType.contactType == "email" ? "email" : "tel"}
                required
                value={singleType.contactValue}
                onChange={(e) => handleContactTypes(e, idx)}
              />
              {idx !== 0 && (
                <ClearIcon onClick={() => handleContactTypesRemove(idx)} />
              )}
            </div>
          ))}
          <div style={{ display: "flex", gap: "20px", margin: "20px" }}>
            {contactTypes.length > 0 && contactTypes.length < 5 && (
              <button
                type="button"
                onClick={handleContactAdd}
                className="add-btn"
              >
                <span>Add Another Contact Type</span>
              </button>
            )}
            <button type="submit">Add To Contact</button>
          </div>
        </form>

        <Box sx={{ height: 400, width: "100%" }}>

          <h2>Contacts List</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              
              <TableHead>
                <TableRow>
                  
                  <TableCell>Title</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  {contactsData.map((type, id) => {
                    return (
                      <>
                        {type.contactType.map((item, id) => {
                          return (
                            <TableCell key={id} align="right">
                              {item.contactType}
                            </TableCell>
                          );
                        })}
                      </>
                    );
                  })}
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {contactsData.map((row, id) => (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.values.title}
                    </TableCell>
                    <TableCell align="right">{row.values.firstName}</TableCell>
                    <TableCell align="right">{row.values.lastName}</TableCell>

                    {row.contactType.map((value, idx) => {
                      return (
                        <TableCell key={idx} align="right">
                          {value?.contactValue}
                        </TableCell>
                      );
                    })}

                    <TableCell align="right">
                      <DeleteForeverIcon onClick={() => deleteContact(id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


        </Box>
      </Container>
    </>
  );
}

export default App;
