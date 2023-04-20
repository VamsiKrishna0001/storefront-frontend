import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { Button, Link } from '@mui/material';


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));


const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  //secondary
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(180deg, #FF0000 0%, #000000 100%)' }}>
      <Toolbar>
        <Typography variant="h6" textAlign="start" className={classes.title}>
          Storefront
        </Typography>
        <Typography sx={{ padding: "1rem", textDecoration: "none", color: "white" }} component="a" href="/products" >Products</Typography>
        <Typography sx={{ padding: "1rem", textDecoration: "none", color: "white" }} component="a" href="/sign-up" >Orders</Typography>
        {/* <Button variant='text' color="error">Products</Button>
        <Button color="inherit">Collections</Button>
        <Button color="inherit">Orders</Button> */}
        <IconButton color="inherit" href='/cart'>
          <Badge badgeContent={2} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton
          color="inherit"
          onClick={handleMenuOpen}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem>Account</MenuItem>
          <MenuItem>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;