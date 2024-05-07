import { TextField, Button } from '@mui/material';
import { useFormik } from "formik";
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { useDispatch } from "react-redux";
import { login } from "../redux/user.reducer";
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
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
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        onChange={formik.handleChange}
        value={formik.values.email}
        name="email"
        label="Email"
        variant="outlined"
      />
      <TextField
        onChange={formik.handleChange}
        value={formik.values.password}
        name="password"
        label="Password"
        variant="outlined"
      />
      <TextField
        onChange={formik.handleChange}
        value={formik.values.role}
        name="role"
        label="Role"
        variant="outlined"
      />
      <Button type="Submit" variant="contained">
        LogIn
      </Button>
    </form>
  );
};

export default LogIn;
