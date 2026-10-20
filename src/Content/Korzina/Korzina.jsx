import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//import "./Korzina.css";
import { Divider } from "@mui/material";
import React, { useState } from "react";
import Buy from "../Buy/Buy";
import KorzinaContent from "../KorzinaContent/KorzinaContent";
//import { useKorzinaContext } from "../KorzinaContext/KorzinaContext";
import { useKorzinaContext } from "../KorzinaContext/KorzinaContext";
function Korzina({ open, handleClose }) {
  const { cartItems, clearCart, updateCartIt } = useKorzinaContext();
  const [totalPrice, setTotalPrice] = React.useState(0);
  React.useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.quantity * item.footer;
      });
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cartItems]);
  const [openb, setOpenb] = useState(false);
  const openbuy = () => {
    if (cartItems.length > 0) {
      setOpenb(true);
    }
  };
  const handleClosebuy = () => {
    setOpenb(false);
  };
  const handleDecreaseItem = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item && item.quantity === 1) {
      updateCartIt(itemId, -1);
    } else {
      updateCartIt(itemId, -1);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Корзина</DialogTitle>
      <Divider />
      <DialogContent>
        {cartItems.length === 0 ? (
          <DialogContentText id="alert-dialog-description">
            Корзина пока пуста!
          </DialogContentText>
        ) : (
          cartItems.map((item) => (
            <KorzinaContent
              handleDecreaseItem={handleDecreaseItem}
              updateCartIt={updateCartIt}
              key={item.id}
              item={item}
            />
          ))
        )}
      </DialogContent>
      <Divider />
      <DialogTitle id="alert-dialog-title">
        {"Итого: " + totalPrice.toFixed(2) + " руб."}
      </DialogTitle>
      <Divider />
      <DialogActions>
        <Button onClick={clearCart}>Очистить</Button>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={openbuy} disabled={cartItems.length === 0}>
          Оформить заказ
        </Button>
        <Buy
          openb={openb}
          handleClosebuy={handleClosebuy}
          totalPrice={totalPrice}
          handleClose={handleClose}
        />
      </DialogActions>
    </Dialog>
  );
}
export default Korzina;
