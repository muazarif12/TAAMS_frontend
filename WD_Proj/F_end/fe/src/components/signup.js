import { TextField, Button, Grid, Paper, Avatar, Typography } from '@mui/material';
import { useFormik } from "formik";
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const SignUp = ({handleChange}) => {

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    },
    onSubmit: async (values) => {
      const response = await axios.post('http://localhost:5600/auth/signup', values);
      NotificationManager.success(response.data.msg);
    },
  });

  return (

    <Grid container >
      <form onSubmit={formik.handleSubmit}>    
      <Paper elevation={10} style={{ padding: 20, height: '45vh', width: 280, margin: "0 auto" }}>
        <Grid align='center'>
          <Avatar style={{ backgroundColor: '#1bbd7e' }}><LockOutlinedIcon /></Avatar>
          <h2>SignUp</h2>
        </Grid>
        <TextField
          onChange={formik.handleChange} value={formik.values.firstName} 
          name="firstName"
          label="FirstName"
          placeholder='Enter FirstName'
          variant="standard"
          fullWidth required
        />
        <TextField
          onChange={formik.handleChange} value={formik.values.lastName} 
          name="lastName"
          label="LastName"
          placeholder='Enter LastName'
          variant="standard"
          fullWidth required
        />
        <TextField
          onChange={formik.handleChange} value={formik.values.email} 
          name="email"
          label="Email"
          placeholder='Enter Email'
          variant="standard"
          fullWidth required
        />
        <TextField
          onChange={formik.handleChange} value={formik.values.password} 
          name="password"
          label="Password"
          placeholder='Enter Password'
          variant="standard"
          fullWidth required
        />

        <TextField
          onChange={formik.handleChange} value={formik.values.role}
          name="role"
          label="Role"
          placeholder='Enter Role'
          variant="standard"
          fullWidth required
        />
        <Button type='submit' color='primary' variant="contained" style={{ margin: '8px 0' }} fullWidth>Sign Up</Button>

        <Typography >
          Already have an account?
          <Link href="#" onClick={()=>handleChange("event",0)} style={{ marginLeft: '5px' }}>
            Login here
          </Link>
        </Typography>

      </Paper>
      </form>
    </Grid>

  )
}

export default SignUp;