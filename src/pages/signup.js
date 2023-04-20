import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card } from '@mui/material';
import axios from "axios";
import { Navigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignUp = () => {
  // const initialValues = {
  //   "username": "",
  //   "password": "",
  //   "email": "",
  //   "first_name": "",
  //   "last_name": ""
  // }
  // const [formValues, setFormValues] = React.useState(initialValues);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  // const submit = () => {
  //   console.log("formvalues.. ", formValues);
  // }

  const registerApi = async (data) => {

    let res = await axios.post('http://127.0.0.1:8000/auth/users/', data);
    if (res.status === 201) {
      window.location.href = "/"
    }

    // http://127.0.0.1:8000/auth/users/
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      username: data.get('username'),
    });
    await registerApi(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card variant="outlined" sx={{ width: "fit-content", margin: 'auto', marginTop: '5rem', borderRadius: "40px" }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    size='small'
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                  // value={formValues.username}
                  // onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size='small'
                    autoComplete="given-name"
                    name="first_name"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    // value={formValues.first_name}
                    // onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size='small'
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    autoComplete="family-name"
                  // value={formValues.last_name}
                  // onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size='small'
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  // value={formValues.email}
                  // onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size='small'
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  // value={formValues.password}
                  // onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item sx={{ mb: "2rem" }}>
                  <Link href="/" style={{ textDecoration: "none" }} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Card>
    </ThemeProvider>
  );
}

export default SignUp;