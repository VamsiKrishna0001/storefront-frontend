import Header from "../components/header";
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, TextField } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

const products = [
  {
    id: 1,
    title: 'Product 1',
    price: 9.99,
    image: 'https://picsum.photos/200',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 19.99,
    image: 'https://picsum.photos/201',
  },
  {
    id: 3,
    title: 'Product 3',
    price: 29.99,
    image: 'https://picsum.photos/202',
  },
  {
    id: 4,
    title: 'Product 4',
    price: 39.99,
    image: 'https://picsum.photos/203',
  },
  {
    id: 5,
    title: 'Product 5',
    price: 49.99,
    image: 'https://picsum.photos/204',
  },
  {
    id: 6,
    title: 'Product 6',
    price: 59.99,
    image: 'https://picsum.photos/205',
  },
  {
    id: 7,
    title: 'Product 7',
    price: 69.99,
    image: 'https://picsum.photos/206',
  },
  {
    id: 8,
    title: 'Product 8',
    price: 79.99,
    image: 'https://picsum.photos/207',
  },
  {
    id: 9,
    title: 'Product 9',
    price: 89.99,
    image: 'https://picsum.photos/208',
  },
  {
    id: 10,
    title: 'Product 10',
    price: 99.99,
    image: 'https://picsum.photos/209',
  },
  {
    id: 11,
    title: 'Product 11',
    price: 109.99,
    image: 'https://picsum.photos/210',
  },
  {
    id: 12,
    title: 'Product 12',
    price: 119.99,
    image: 'https://picsum.photos/211',
  },
  {
    id: 13,
    title: 'Product 13',
    price: 129.99,
    image: 'https://picsum.photos/212',
  },
  {
    id: 14,
    title: 'Product 14',
    price: 139.99,
    image: 'https://picsum.photos/213',
  },
  {
    id: 15,
    title: 'Product 15',
    price: 149.99,
    image: 'https://picsum.photos/214',
  },
  {
    id: 16,
    title: 'Product 16',
    price: 159.99,
    image: 'https://picsum.photos/215',
  },
  {
    id: 17,
    title: 'Product 17',
    price: 169.99,
    image: 'https://picsum.photos/216',
  },
  {
    id: 18,
    title: 'Product 18',
    price: 179.99,
    image: 'https://picsum.photos/217',
  },
  {
    id: 29,
    title: "Product 19",
    price: 25.99,
    image: "https://picsum.photos/200",
  },
];

const Products = () => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px' }}>
        {products.map((product) => (
          <Card key={product.id} sx={{ maxWidth: 345, margin: '10px' }}>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${product.price.toFixed(2)}
              </Typography>
              <TextField label="Quantity" type="number" inputProps={{ min: 0, max: 10, step: 1 }} />
            </CardContent>
            <CardActions>
              <IconButton>
                <AddShoppingCart />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Products;