import { Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { AttachMoney } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onClick }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        onClick={() => {
          onClick(product);
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={product?.image}
          alt={product?.title}
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom fontSize={20} component="div" noWrap>
            {product?.title}
          </Typography>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <AttachMoney />
            <Typography variant="body2" color="text.secondary">
              {product?.price}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

function ProductsPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const queryProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("https://fakestoreapi.com/products/");
      if (res?.status === 200) {
        setProducts(res?.data);
      } else {
        setError("Error Get Products");
      }
    } catch (error) {
      setError("Error Get Products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickProductCard = (product) => {
    return navigate("/dashboard/product-detail", {
      state: { product: product },
    });
  };

  useEffect(() => {
    queryProducts();
  }, []);

  return (
    <Stack flex={1} p={4} overflow={"scroll"}>
      <Grid container spacing={2} width={"100%"}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isLoading ? (
          <Box display={"flex"} width={"100%"} justifyContent={"center"}>
            <CircularProgress />
          </Box>
        ) : null}

        {!isLoading &&
          !error &&
          products.map((item, idx) => {
            return (
              <Grid item md={3} sm={6} xs={12} key={idx}>
                <ProductCard product={item} onClick={handleClickProductCard} />
              </Grid>
            );
          })}
      </Grid>
    </Stack>
  );
}

export default ProductsPage;
