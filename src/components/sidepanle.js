import { Box, FormControl, InputLabel, MenuItem, Select, Slider, Typography } from "@mui/material";
import { useState } from "react";

const SideBar = () => {

  const [filters, setFilters] = useState({
    price: { min: 0, max: Infinity },
    category: "",
  });

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginRight: '20px' }}>
        <Typography gutterBottom variant="h6" component="div">
          Filters
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={filters.category}
            onChange={(event) => setFilters({ ...filters, category: event.target.value })}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="clothing">Clothing</MenuItem>
            <MenuItem value="food">Food</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ mt: 2 }}>
          <Typography id="price-slider" gutterBottom>
            Price
          </Typography>
          <Slider
            value={[filters.price.min, filters.price.max]}
            onChange={(event, newValue) => setFilters({ ...filters, price: { min: newValue[0], max: newValue[1] } })}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
        </Box>
      </div>
    </>
  )
}

export default SideBar;