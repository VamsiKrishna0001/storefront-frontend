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
import Header from '../components/header';
import axios from "axios";
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

const Login = () => {

  const signInApi = async (data) => {

    let res = await axios.post('http://127.0.0.1:8000/auth/jwt/create', data);
    if (res.status >= 200 && res.status <= 301) {
      localStorage.setItem('accessToken', res.data?.access);
      localStorage.setItem('refreshToken', res.data?.refresh);
      if (res.data?.access) {

        let res1 = await axios.get('http://127.0.0.1:8000/auth/users/me', {
          headers: {
            'Authorization': `JWT ${res.data?.access}`
          }
        });
        console.log("res1 ", res1);
        if (res1.status >= 200 && res1.status <= 301) {
          console.log("res1 ", res1.data);
          localStorage.setItem("usersData", JSON.stringify(res1.data));
        }

      }
      window.location.href = "/products"
    }

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await signInApi(data);
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                size='small'
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                size='small'
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container sx={{ mb: "2rem" }}>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/sign-up" style={{ textDecoration: "none" }} variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default Login;