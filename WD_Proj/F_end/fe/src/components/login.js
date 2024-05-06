import { TextField, Button } from '@mui/material';
import { useFormik } from "formik";
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { useDispatch } from "react-redux";
import { login } from "../redux/user.reducer";

const LogIn = () => {
  const dispatch = useDispatch();

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
        dispatch(login({ token: response.data.token, role: values.role })); // Pass role in login action payload
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
