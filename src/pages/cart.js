import { useEffect, useState } from 'react';
import { Button, Container, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import RemoveIcon from '@mui/icons-material/Remove';
import { InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from "axios";

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

// const cartItems = [{ id: 1, title: 'Product 1', price_with_tax: 10.99, quantity: 2, }, { id: 2, title: 'Product 2', price_with_tax: 19.99, quantity: 1, },];
//cartItems
const Cart = () => {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityChange = (event, id) => {
    const newQuantity = parseInt(event.target.value);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };


  const handleQuantityIncrease = (productId) => {
    setQuantities(prevState => {
      const newQuantity = { ...prevState };
      if (!newQuantity[productId]) {
        newQuantity[productId] = 0;
      }
      newQuantity[productId] = Math.min(newQuantity[productId] + 1, 50);
      return newQuantity;
    });
  };

  const handleQuantityDecrease = (productId) => {
    setQuantities(prevQuantity => {
      const newQuantity = { ...prevQuantity };
      if (newQuantity[productId] > 0) {
        newQuantity[productId] -= 1;
      }
      return newQuantity;
    });
  };
  const handleDeleteItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    setQuantities(newCartItems.map((item) => item.quantity));
  };

  const getCartItems = async () => {
    const res1 = await axios.get('http://127.0.0.1:8000/store/carts/6d083216-0fcb-4f2a-a547-4575a841c5ba/');
    if (res1.status >= 200 && res1.status <= 301) {
      setCartItems(res1.data.items);
      setTotalPrice(res1.data.total_price);
      for await (const pr of res1.data.items) {
        setQuantities(prevState => {
          const newQuantity = { ...prevState };
          if (!newQuantity[pr.product.id]) {
            newQuantity[pr.product.id] = 0;
          }
          newQuantity[pr.product.id] = pr.quantity;
          return newQuantity;
        })
      }
    }
  }

  useEffect(() => {
    const getCartList = async () => {
      await getCartItems();
    }
    getCartList();
  }, [])

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
                    <img src={`https://picsum.photos/${index + 200}`} alt={item.product.title} className={classes.itemImage} />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" className={classes.itemTitle}>
                      {item.product.title}
                    </Typography>
                    <Typography variant="body2" className={classes.itemPrice}>
                      Price: ${item.product.unit_price.toFixed()}
                    </Typography>
                    <div>
                      <TextField
                        label="Quantity"
                        type="number"
                        size="small"
                        // value={quantity}
                        value={quantities[item.product.id] || 0}
                        onChange={(e) => handleQuantityChange(e, item.product.id)}
                        InputProps={{
                          disableUnderline: true,
                          inputProps: {
                            min: 0,
                            max: 50,
                            step: 1,
                            style: { textAlign: 'center', fontSize: '16px' },
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="reduce quantity"
                                onClick={() => handleQuantityDecrease(item.product.id)}
                                size="large"
                                disabled={quantities[item.product.id] <= 0}
                              >
                                <RemoveIcon />
                              </IconButton>
                            </InputAdornment>

                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="increase quantity"
                                onClick={() => handleQuantityIncrease(item.product.id)}
                                size="large"
                                disabled={quantities[item.product.id] >= 50}
                              >
                                <AddIcon />
                              </IconButton>
                            </InputAdornment>

                          ),
                        }}
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
              <Typography variant="h4" >Total Price: $ {totalPrice}</Typography>
              <Button variant="contained" color="primary" onClick={handleCheckout}>
                Order Now
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
