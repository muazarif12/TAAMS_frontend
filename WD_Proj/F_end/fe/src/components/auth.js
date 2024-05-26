import SignUp from './signup';
import LogIn from './login';
import { Box, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

const AuthPage = () => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  return (
    <Grid container style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Paper elevation={20} style={{ width: 320, margin: "20px auto" }}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Log In" />

        <Tab label="Sign Up" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <LogIn handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp />
      </TabPanel>
    </Paper>
    </Grid>
  );
};

export default AuthPage;