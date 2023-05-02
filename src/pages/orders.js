import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Header from "../components/header";
import Footer from "../components/footer";
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
const Orders = () => {
  const classes = useStyles();
  const [orders, setOrderItems] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  const getOrders = async () => {
    const res = await axios.get('http://127.0.0.1:8000/store/orders/', {
      headers: {
        'Authorization': `JWT ${accessToken}`
      }
    });
    if (res.status >= 200 && res.status <= 301) {
      setOrderItems(res.data);
    }
  }

  useEffect(() => {
    getOrders();
  }, [])


  return (
    <>
      <Header />
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Your Orders
        </Typography>
        {orders.length === 0 ? (
          <Typography variant="body1">Your have no orders.</Typography>
        ) : (
          <Grid container spacing={2}>
            {
              orders.map((item, index) => (
                item.items.map((productItem, index) => (
                  <Grid item xs={12} key={item.id}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <img src={`https://picsum.photos/${index + 200}`} alt={productItem.product.title} className={classes.itemImage} />
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6" className={classes.itemTitle}>
                          {productItem.product.title}
                        </Typography>
                        <Typography variant="body2" className={classes.itemPrice}>
                          Price: ${productItem.unit_price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              ))
            }
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  )
}

export default Orders;