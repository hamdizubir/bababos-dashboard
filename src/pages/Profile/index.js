import { AttachMoney } from "@mui/icons-material";
import {
    Box,
    CardContent,
    CircularProgress,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { bababosImage } from "../../assets/logo";

const TransactionCard = ({ product }) => {
  return (
    <Stack sx={{ flexDirection: "row" }} gap={2}>
      <Box
        component="img"
        width={100}
        src={product?.image}
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
    </Stack>
  );
};

function ProfilePage() {
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

  useEffect(() => {
    queryProducts();
  }, []);

  return (
    <Stack
      height={"100%"}
      display={"flex"}
      flex={1}
      flexDirection={"row"}
      overflow={"hidden"}
      p={8}
      gap={2}
    >
      <Stack
        flex={1}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        sx={{ overflowX: "hidden", overflowY: "scroll" }}
      >
        <Typography variant="h5">Transaction History</Typography>
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
                <Grid item md={12} sm={12} xs={12} key={idx}>
                  <TransactionCard product={item} />
                </Grid>
              );
            })}
        </Grid>
      </Stack>
      <Stack flex={1} gap={2}>
        <img src={bababosImage} alt="bababosImage" />

        <Typography gutterBottom variant="h5" component="div">
          Company Name: bababos
        </Typography>
        <Typography gutterBottom variant="h5" color="text.secondary">
          Address: Gedung Centennial Tower Lt.29 Unit D-F Jl. Jendral Gatot
          Subroto Kav 24-25 RT 002 RW 002 Karet Semanggi, Setiabudi Jakarta
          Selatan, DKI Jakarta
        </Typography>
        <Typography gutterBottom variant="h5" color="text.secondary">
          Company Information: bababos adalah platform penyediaan bahan baku
          untuk manufaktur yang melakukan Just-In-Time supply chain agar
          mencapai efisiensi biaya tertinggi, melakukan agregasi permintaan
          untuk mendapatkan harga terbaik dan memberikan fleksibilitas
          pembayaran tempo untuk solusi cashflow perusahaan manufaktur.
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ProfilePage;
