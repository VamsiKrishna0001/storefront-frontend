import { Box, Typography } from "@mui/material";

const Footer = () => {
  const address = `${Math.floor(Math.random() * 100) + 1} Main St, Anytown USA`;

  return (
    <Box sx={{ background: 'linear-gradient(180deg, #FF0000 0%, #000000 100%)', p: 6 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
        About Us
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#FFFFFF' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porttitor blandit ex, in ultrices magna convallis eget.
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF', mt: 4 }}>
        Random Address
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#FFFFFF' }}>
        {address}
      </Typography>
    </Box>
  );
};

export default Footer;