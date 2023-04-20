import { useState } from 'react';
import { Button, Container, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/header';
import Footer from '../components/footer';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  itemImage: {
    width: '100%',
    maxWidth: '150px',
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  itemPrice: {
    marginBottom: theme.spacing(2),
  },
  itemQuantity: {
    width: '80px',
    marginRight: theme.spacing(2),
  },
  deleteButton: {
    marginLeft: 'auto',
  },
}));

const cartItems = [{ id: 1, title: 'Product 1', price: 10.99, quantity: 2, }, { id: 2, title: 'Product 2', price: 19.99, quantity: 1, },];
//cartItems
const Cart = ({ setCartItems }) => {
  const classes = useStyles();
  const [quantities, setQuantities] = useState(cartItems.map((item) => item.quantity));

  const handleQuantityChange = (index, event) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(event.target.value);
    setQuantities(newQuantities);
  };

  const handleDeleteItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    setQuantities(newCartItems.map((item) => item.quantity));
  };

  const handleCheckout = () => {
    alert('Checkout button clicked!');
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <Grid container spacing={2}>
            {cartItems.map((item, index) => (
              <Grid item xs={12} key={item.id}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <img src={`https://picsum.photos/${index + 200}`} alt={item.title} className={classes.itemImage} />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" className={classes.itemTitle}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" className={classes.itemPrice}>
                      Price: ${item.price.toFixed(2)}
                    </Typography>
                    <div>
                      <TextField
                        label="Quantity"
                        type="number"
                        size="small"
                        value={quantities[index]}
                        onChange={(event) => handleQuantityChange(index, event)}
                        inputProps={{
                          min: 1,
                          max: 10,
                          step: 1,
                        }}
                        className={classes.itemQuantity}
                      />
                      <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => handleDeleteItem(index)} className={classes.deleteButton}>
                        Delete
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleCheckout}>
                Checkout
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
