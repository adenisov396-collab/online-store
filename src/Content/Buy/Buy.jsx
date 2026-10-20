import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
//import { useKorzinaContext } from "../KorzinaContext/KorzinaContext";
import { useKorzinaContext } from "../KorzinaContext/KorzinaContext";
//import { addOrderToDb } from "../KorzinaContext"
import { addOrderToDb } from "../KorzinaContext/KorzinaContext"

function Buy({ openb, handleClosebuy, totalPrice, handleClose }) {
  const { cartItems, clearCart } = useKorzinaContext();
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.items = cartItems;
    try {
      await addOrderToDb(formJson);
      await clearCart();
      handleClosebuy();
      handleClose();
    } catch (error) {
      console.error("Ошибка сохранения заказа в IndexedDB:", error);
    }
  };
  return (
    <Dialog
      sx={{ display: "flex", justifyContent: "center" }}
      open={openb}
      onClose={handleClosebuy}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slotProps={{
        paper: {
          component: "form",
          onSubmit,
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">{"Оформление заказа"}</DialogTitle>
      <Divider />
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Имя"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="tel"
          name="tel"
          label="Телефон"
          type="tel"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Адрес Email"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <Divider />
      <DialogTitle id="alert-dialog-title">{"Мой заказ"}</DialogTitle>
      <DialogContent sx={{ fontWeight: "450" }}>
        {cartItems.map((item) => (
          <div key={item.id}>
            {item.name} - {item.quantity} шт. - {item.footer}
          </div>
        ))}
      </DialogContent>
      <Divider />
      <DialogTitle id="alert-dialog-title">
        {"Итого: " + totalPrice.toFixed(2) + " руб."}
      </DialogTitle>
      <Divider />
      <DialogActions>
        <Button onClick={handleClosebuy}>Выйти</Button>
        <Button type="submit">Оплатить</Button>
      </DialogActions>
    </Dialog>
  );
}
export default Buy;
