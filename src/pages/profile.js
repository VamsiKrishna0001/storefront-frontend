import Header from '../components/header';
import Footer from '../components/footer';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    borderRadius: '50%',
    objectFit: 'cover',
    margin: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2),
    width: '15ch',
  },
  title: {
    fontSize: '3rem',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
  },
  textfield: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    paddingBottom: theme.spacing(1),
    // width: '20ch'
  },
  card: {
    // backgroundColor: '#ff6b6b',
    // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    width: '80%',
  }
}));

const Profile = () => {
  const classes = useStyles();
  const userData = JSON.parse(localStorage.getItem("usersData"));
  const accessToken = localStorage.getItem('accessToken');
  const initialValues = {
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
    username: userData.username
  }

  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const updateProfileApi = async (data) => {
    let res = await axios.put('http://127.0.0.1:8000/auth/users/me/', data, {
      headers: {
        'Authorization': `JWT ${accessToken}`
      }
    })
    if (res.status >= 200 && res.status <= 301) {
      localStorage.setItem("usersData", JSON.stringify(res.data));
    }
  }

  const submit = async () => {
    let data = {
      email: formValues.email,
      first_name: formValues.first_name,
      last_name: formValues.last_name
    }
    await updateProfileApi(data);
  }

  // Generate a random image URL using the Unsplash API
  const image = `https://source.unsplash.com/random/${Math.floor(Math.random() * 1000) + 500}`;

  return (
    <>
      <Header />
      <div className={classes.root}>
        <Typography className={classes.title} variant="h1">
          Profile
        </Typography>
        {/* <Card className={classes.card}> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img className={classes.avatar} src={image} alt="Profile" />
          </Grid>
          <Grid item xs={12} md={6} container direction="column">
            <Grid item className={classes.textfield}>
              <TextField
                id="username"
                label="Username"
                name='username'
                disabled
                variant="outlined"
                value={formValues.username}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item className={classes.textfield}>
              <TextField
                label="Email"
                id="email"
                name='email'
                variant="outlined"
                fullWidth
                value={formValues.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item className={classes.textfield}>
              <TextField
                label="First Name"
                name='first_name'
                id="first_name"
                variant="outlined"
                value={formValues.first_name}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item className={classes.textfield}>
              <TextField
                label="Last Name"
                name='last_name'
                id="last_name"
                value={formValues.last_name}
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={submit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* </Card> */}
      </div>
      <Footer />
    </>
  );
}


export default Profile;