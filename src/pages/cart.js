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
  const cartId = localStorage.getItem('cartId');
  const accessToken = localStorage.getItem('accessToken');

  const handleQuantityChange = (event, id) => {
    const newQuantity = parseInt(event.target.value);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };


  const handleQuantityIncrease = async (productId, itemId) => {
    let data = {
      id: itemId,
    };
    setQuantities(prevState => {
      const newQuantity = { ...prevState };
      if (!newQuantity[productId]) {
        newQuantity[productId] = 0;
      }
      newQuantity[productId] = Math.min(newQuantity[productId] + 1, 50);
      data = {
        ...data,
        quantity: newQuantity[productId]
      }

      return newQuantity;
    });
    await updateCartItems(data);

  };

  const handleQuantityDecrease = async (productId, itemId) => {
    let data = {
      id: itemId,
    };
    setQuantities(prevQuantity => {
      const newQuantity = { ...prevQuantity };
      if (newQuantity[productId] > 0) {
        newQuantity[productId] -= 1;
      }
      data = {
        ...data,
        quantity: newQuantity[productId]
      }
      return newQuantity;
    });
    await updateCartItems(data);
  };
  const handleDeleteItem = async (index, productId) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    await removeItemFromCart(productId);

    setCartItems(newCartItems);
    setQuantities(newCartItems.map((item) => item.quantity));
  };

  const getCartItems = async (cartId) => {
    const res1 = await axios.get(`http://127.0.0.1:8000/store/carts/${cartId}/`);
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

  const updateCartItems = async (value) => {
    console.log("value, v", value);
    const res1 = await axios.patch(`http://127.0.0.1:8000/store/carts/${cartId}/items/${value.id}/`, { quantity: value.quantity });
    if (res1.status >= 200 && res1.status <= 301) {
      await getCartItems(cartId);
    }
  }

  const removeItemFromCart = async (id) => {
    const res1 = await axios.delete(`http://127.0.0.1:8000/store/carts/${cartId}/items/${id}`);
    if (res1.status >= 200 && res1.status <= 301) {
      await getCartItems(cartId);
    }
  }

  const createCartApi = async () => {
    let res = await axios.post('http://127.0.0.1:8000/store/carts/');
    if (res.status >= 200 && res.status <= 301) {
      if (res.data?.id) {
        console.log("res.data?.id", res.data?.id);
        localStorage.setItem("cartId", res.data?.id);
        await getCartItems(res.data?.id);
      }
    }
  }
  const createOrderApi = async (data) => {
    let res = await axios.post('http://127.0.0.1:8000/store/orders/', data, {
      headers: {
        'Authorization': `JWT ${accessToken}`
      }
    });
    if (res.status >= 200 && res.status <= 301) {
      await createCartApi();
    }
  }

  useEffect(() => {
    const getCartList = async () => {
      await getCartItems(cartId);
    }
    getCartList();
  }, [])

  const handleCheckout = async () => {
    let data = {
      cart_id: cartId
    }
    await createOrderApi(data);
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
                                onClick={() => handleQuantityDecrease(item.product.id, item.id)}
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
                                onClick={() => handleQuantityIncrease(item.product.id, item.id)}
                                size="large"
                                disabled={quantities[item.product.id] >= 50}
                              >
                                <AddIcon />
                              </IconButton>
                            </InputAdornment>

                          ),
                        }}
                      />
                      <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => handleDeleteItem(index, item.id)} className={classes.deleteButton}>
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
