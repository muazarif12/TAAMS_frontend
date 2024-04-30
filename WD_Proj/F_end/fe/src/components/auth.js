import SignUp from './signup';
import LogIn from './login';
import { Box } from '@mui/material';



const AuthPage = () => {

    return (

        <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box sx={{ margin: "5px" }}>
        <SignUp />
      </Box>
      <Box>
        <LogIn />
      </Box>
    </Box>
    );
    };

export default AuthPage;