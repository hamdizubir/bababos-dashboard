import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

import { AttachMoney } from "@mui/icons-material";
import { Box, Button, CardContent, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bababosImage } from "../../assets/logo";
import Badge from "@mui/material/Badge";

const CartCard = ({ product }) => {
  return (
    <Stack sx={{ flexDirection: "row" }} gap={2}>
      <Box
        component="img"
        width={32}
        src={product?.image}
        alt={product?.title}
        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom fontSize={16} component="div" noWrap>
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

const CartModal = ({ open, handleClose, cartItems }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="cart-modal-title"
      aria-describedby="cart-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="cart-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Shopping Cart
        </Typography>
        <Typography id="cart-modal-description" sx={{ mb: 2 }}>
          {cartItems.map((item) => (
            <CartCard product={item} />
          ))}
        </Typography>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

function DashboardHeader({ children }) {
  let navigate = useNavigate();
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const handleClickLogout = () => {
    localStorage.clear();
    navigate("/auth/login", { replace: true });
  };

  window.addEventListener("storage", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    setCartItems(cartItems ?? []);
  });

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    setCartItems(cartItems ?? []);
  }, []);

  return (
    <Stack flex={1} height={"100dvh"}>
      <Stack
        flexDirection={"row"}
        p={4}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottom={1}
        borderColor={"gainsboro"}
      >
        <a href="/dashboard/products">
          <img src={bababosImage} alt="bababosImage" height={32} />
        </a>

        <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
          <Badge badgeContent={cartItems.length} color="primary">
            <IconButton onClick={handleOpenCart}>
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
          <Link underline="hover" href="/dashboard/profile">
            Profile
          </Link>
          <Link
            underline="none"
            style={{ cursor: "pointer" }}
            onClick={handleClickLogout}
          >
            Logout
          </Link>
        </Stack>
      </Stack>
      {children}
      <CartModal
        open={openCart}
        handleClose={handleCloseCart}
        cartItems={cartItems}
      />
    </Stack>
  );
}

export default DashboardHeader;
