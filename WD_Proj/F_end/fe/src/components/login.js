import { Grid, TextField, Button, Paper, Avatar, Typography } from '@mui/material';
import { useFormik } from "formik";
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { useDispatch } from "react-redux";
import { login } from "../redux/user.reducer";
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const LogIn = ({handleChange}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
    },
    onSubmit: async (values) => {
      const response = await axios.post('http://localhost:5600/auth/login', values);
      if (response.data.msg === "Logged in" && response.status === 200) {
        NotificationManager.success(response.data.msg);
        dispatch(login({ token: response.data.token, role: values.role }));




        switch (values.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'teacher':
            navigate('/teacher');
            break;
          case 'student':
            navigate('/student');
            break;
          default:
            navigate('/unauthorized');
            break;
        }
      } else {
        NotificationManager.error(response.data.msg || response.data.error);
      }
    },

    
  });

  return (
   
    <Grid >      
      <form onSubmit={formik.handleSubmit}>    
      <Paper elevation={10} style={{ padding: 20, height: '45vh', width: 280, margin: "0 auto" }}>
      <Grid align='center'>
        <Avatar style={{ backgroundColor: '#1bbd7e' }}><LockOutlinedIcon /></Avatar>
        <h2>LogIn</h2>
      </Grid>
      <TextField
        onChange={formik.handleChange}
        value={formik.values.email}
        name="email"
        label="Email"
        placeholder='Enter Email'
        variant="standard"
        fullWidth required
      />
      <TextField
        onChange={formik.handleChange}
        value={formik.values.password}
        name="password"
        label="Password"
        placeholder='Enter Password'
        variant="standard"
        fullWidth required
      />

      <TextField
        onChange={formik.handleChange}
        value={formik.values.role}
        name="role"
        label="Role"
        placeholder='Enter Role'
        variant="standard"
        fullWidth required
      />
      <Button type='submit' color='primary' variant="contained" style={{ margin: '8px 0' }} fullWidth>Log in</Button>

      <Typography>
        Don't have an account?
        <Link href="#" onClick={()=>handleChange("event",1)} style={{ marginLeft: '5px' }}>
          Sign Up here
        </Link>
      </Typography>

    </Paper>
    </form>
    </Grid>
  );
};

export default LogIn;
