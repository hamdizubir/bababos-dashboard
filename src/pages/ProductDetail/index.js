import { Button, CardMedia, Stack, Typography } from "@mui/material";
import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

function ProductDetailPage() {
  let navigate = useNavigate();
  let location = useLocation();
  const product = location.state.product;
  if (!product) {
    return navigate("/dashboard/products");
  }

  const handleAddToCart = (product) => {
    const currentItems = JSON.parse(localStorage.getItem('cartItems')) ?? []
    const addedItem = [...currentItems, product]
    window.localStorage.setItem("cartItems", JSON.stringify(addedItem));
    window.dispatchEvent(new Event("storage"));
};

  return (
    <Stack flex={1} p={4}>
      <Stack flexDirection={"row"} gap={4}>
        <CardMedia
          component="img"
          height="500"
          image={product?.image}
          alt={product?.title}
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        <Stack gap={2}>
          <Typography gutterBottom variant="h5" component="div">
            {product?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Category:</strong> {product?.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Description:</strong> {product?.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Price:</strong> ${product?.price}
          </Typography>
          <Button variant="contained" onClick={() => {handleAddToCart(product)}}>Add to cart</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ProductDetailPage;
