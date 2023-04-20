import Header from "../components/header";
import { InputAdornment } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, TextField, Pagination } from '@mui/material';
import { AddShoppingCart, AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { useEffect, useState } from "react";
import SideBar from "../components/sidepanle";
import Footer from "../components/footer";
import axios from "axios";

// const products = [
//   {
//     id: 1,
//     title: 'Product 1',
//     price_with_tax: 9.99,
//     image: 'https://picsum.photos/200',
//   },
//   {
//     id: 2,
//     title: 'Product 2',
//     price_with_tax: 19.99,
//     image: 'https://picsum.photos/201',
//   },
//   {
//     id: 3,
//     title: 'Product 3',
//     price_with_tax: 29.99,
//     image: 'https://picsum.photos/202',
//   },
//   {
//     id: 4,
//     title: 'Product 4',
//     price_with_tax: 39.99,
//     image: 'https://picsum.photos/203',
//   },
//   {
//     id: 5,
//     title: 'Product 5',
//     price_with_tax: 49.99,
//     image: 'https://picsum.photos/204',
//   },
//   {
//     id: 6,
//     title: 'Product 6',
//     price_with_tax: 59.99,
//     image: 'https://picsum.photos/205',
//   },
//   {
//     id: 7,
//     title: 'Product 7',
//     price_with_tax: 69.99,
//     image: 'https://picsum.photos/206',
//   },
//   {
//     id: 8,
//     title: 'Product 8',
//     price_with_tax: 79.99,
//     image: 'https://picsum.photos/207',
//   },
//   {
//     id: 9,
//     title: 'Product 9',
//     price_with_tax: 89.99,
//     image: 'https://picsum.photos/208',
//   },
//   {
//     id: 10,
//     title: 'Product 10',
//     price_with_tax: 99.99,
//     image: 'https://picsum.photos/209',
//   },
//   {
//     id: 11,
//     title: 'Product 11',
//     price_with_tax: 109.99,
//     image: 'https://picsum.photos/210',
//   },
//   {
//     id: 12,
//     title: 'Product 12',
//     price_with_tax: 119.99,
//     image: 'https://picsum.photos/211',
//   },
//   {
//     id: 13,
//     title: 'Product 13',
//     price_with_tax: 129.99,
//     image: 'https://picsum.photos/212',
//   },
//   {
//     id: 14,
//     title: 'Product 14',
//     price_with_tax: 139.99,
//     image: 'https://picsum.photos/213',
//   },
//   {
//     id: 15,
//     title: 'Product 15',
//     price_with_tax: 149.99,
//     image: 'https://picsum.photos/214',
//   },
//   {
//     id: 16,
//     title: 'Product 16',
//     price_with_tax: 159.99,
//     image: 'https://picsum.photos/215',
//   },
//   {
//     id: 17,
//     title: 'Product 17',
//     price_with_tax: 169.99,
//     image: 'https://picsum.photos/216',
//   },
//   {
//     id: 18,
//     title: 'Product 18',
//     price_with_tax: 179.99,
//     image: 'https://picsum.photos/217',
//   },
//   {
//     id: 29,
//     title: "Product 19",
//     price_with_tax: 25.99,
//     image: "https://picsum.photos/200",
//   },
// ];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const productsPerPage = 10;
  // const totalPages = Math.ceil(products.length / productsPerPage);
  const [totalPages, setTotalPages] = useState();
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  // const currentProducts = products.slice(startIndex, endIndex);
  const [quantity, setQuantity] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const initialCart = [{ id: "", title: "", price_with_tax: "", quantity: "" }];
  const [countTotalCartItems, setTotalCartItems] = useState(0);
  // const [cartItems, setCartItems] = useState[initialCart];

  // const handleQuantityChange = (index, value) => {
  //   const newCartItems = [...cartItems];
  //   newCartItems[index].quantity = value;
  //   setCartItems(newCartItems);
  // };

  // const handleQuantityDecrease = (index) => {
  //   const newCartItems = [...cartItems];
  //   if (newCartItems[index].quantity > 0) {
  //     newCartItems[index].quantity -= 1;
  //     setCartItems(newCartItems);
  //   }
  // };

  // const handleQuantityIncrease = (index) => {
  //   const newCartItems = [...cartItems];
  //   if (newCartItems[index].quantity < 10) {
  //     newCartItems[index].quantity += 1;
  //     setCartItems(newCartItems);
  //   }
  // };


  const productListWithPages = async (value) => {
    let res = await axios.get(`http://127.0.0.1:8000/store/products/?page=${value}`);
    if (res.status >= 200 && res.status <= 301) {
      setProducts(res.data.results);
    }
  }

  // useEffect(() => {
  //   console.log("yes...sd.cs");

  // }, [currentPage, setProducts])

  useEffect(() => {
    if (localStorage.getItem("cartId") === null) {
      let data = {};
      const createCartApi = async (data) => {
        let res = await axios.post('http://127.0.0.1:8000/store/carts/');
        if (res.status >= 200 && res.status <= 301) {
          if (res.data?.id) {
            localStorage.setItem("cartId", res.data?.id);
          }
        }
      }
      createCartApi(data);
    } else {
      const checkItems = async () => {
        getCartItems();
      }
      checkItems();
    }
    const productList = async () => {
      let res = await axios.get('http://127.0.0.1:8000/store/products/');
      if (res.status >= 200 && res.status <= 301) {
        let pages = res.data.count;
        let countOfPages = Math.ceil(pages / productsPerPage);
        setTotalPages(countOfPages);
        setProducts(res.data.results);
      }
    }
    productList();
  }, [])
  const handleQuantityChange = (event, id) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
    console.log(" setQuantity(event.target.value);", event.target.value, id);
    // setQuantity(event.target.value);
  };

  // const handleQuantityIncrease = () => {
  //   setQuantity((prevQuantity) => prevQuantity + 1);
  // };
  const handleQuantityIncrease = (productId) => {
    setQuantity(prevState => {
      const newQuantity = { ...prevState };
      if (!newQuantity[productId]) {
        newQuantity[productId] = 0;
      }
      newQuantity[productId] = Math.min(newQuantity[productId] + 1, 10);
      return newQuantity;
    });
  };

  // const handleQuantityDecrease = () => {
  //   setQuantity((prevQuantity) => prevQuantity - 1);
  // };
  const handleQuantityDecrease = (productId) => {
    setQuantity(prevQuantity => {
      const newQuantity = { ...prevQuantity };
      if (newQuantity[productId] > 0) {
        newQuantity[productId] -= 1;
      }
      return newQuantity;
    });
  };

  const handlePageChange = async (event, value) => {
    setCurrentPage(value);
    await productListWithPages(value)
  };

  // const currentProductsFilter = products.filter((product) => {
  //   return (
  //     product.price_with_tax >= filters.price_with_tax.min &&
  //     product.price_with_tax <= filters.price_with_tax.max &&
  //     (filters.category === "" || product.category === filters.category)
  //   );
  // });

  const getCartItems = async () => {
    const res1 = await axios.get('http://127.0.0.1:8000/store/carts/6d083216-0fcb-4f2a-a547-4575a841c5ba/items/');
    if (res1.status >= 200 && res1.status <= 301) {
      const len = res1.data.length;
      setTotalCartItems(len);
      setCartItems(res1.data)
      let itemArr = [];
      for await (const pr of res1.data) {
        console.log("pr..v.vfv ", pr);
        setQuantity(prevState => {
          const newQuantity = { ...prevState };
          console.log(pr.product.id);
          if (!newQuantity[pr.product.id]) {
            newQuantity[pr.product.id] = 0;
          }
          newQuantity[pr.product.id] = pr.quantity;
          return newQuantity;
        })
      }
    }
  }

  const addToCartApi = async (data) => {
    let res = await axios.post('http://127.0.0.1:8000/store/carts/6d083216-0fcb-4f2a-a547-4575a841c5ba/items/', data);
    if (res.status >= 200 && res.status <= 301) {
      await getCartItems();
    }
  }

  const addToCart = async (product) => {
    let data = {
      product_id: product.id,
      quantity: quantity[product.id]
    }
    await addToCartApi(data);
  }


  return (
    <>
      <Header cartItems={cartItems} count={countTotalCartItems} />
      {products.length === 0 ?
        (<Typography>No Products Available</Typography>) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px', padding: "0 3rem" }}>
            {products.map((product, index) => (
              <Card key={product.id} sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://picsum.photos/${index + 1000}`}
                  alt={product.title}
                  sx={{ objectFit: 'cover', height: '200px' }}
                />
                <CardContent sx={{ height: 'calc(100% - 200px)', backgroundColor: '#f2f2f2' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    price: <span style={{ textDecoration: "line-through" }}>${((product.price_with_tax) / (1 - 0.40)).toFixed()}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    save 40% : ${product.price_with_tax.toFixed(2)}
                  </Typography>
                  <div id={`quan-${product.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: "1rem" }}>
                    <TextField
                      label="Quantity"
                      type="number"
                      size="small"
                      // value={quantity}
                      value={quantity[product.id] || 0}
                      onChange={(e) => handleQuantityChange(e, product.id)}
                      InputProps={{
                        disableUnderline: true,
                        inputProps: {
                          min: 0,
                          max: 10,
                          step: 1,
                          style: { textAlign: 'center', fontSize: '16px' },
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="reduce quantity"
                              onClick={() => handleQuantityDecrease(product.id)}
                              size="large"
                              disabled={quantity[product.id] <= 0}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <IconButton
                              aria-label="increase quantity"
                              onClick={() => handleQuantityIncrease(product.id)}
                              size="large"
                              disabled={quantity[product.id] >= 10}
                            >
                              <AddIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CardActions>
                      <IconButton color="primary" onClick={() => addToCart(product)}>
                        <AddShoppingCart />
                      </IconButton>
                    </CardActions>
                  </div>
                </CardContent>


              </Card>
            ))}
          </div>
        )
      }

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
      </div>
      <Footer />
    </>
  )
}

export default Products;