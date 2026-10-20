import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
//import { Grid2 } from "@mui/material";
import React, { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ViewZakaz from "../ViewZakaz/ViewZakaz";
import { getAllOrdersFromDb, removeOrderFromDb, clearOrdersDb } from "../KorzinaContext/KorzinaContext";
function ListZakaz({ opens, handleCloseZ }) {
  const [open, setOpen] = React.useState(-1);
  const [orders, setOrders] = useState([]);
  const handleClick = (index) => {
    setOpen(index === open ? -1 : index);
  };
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const storedOrders = await getAllOrdersFromDb();
        setOrders(storedOrders);
      } catch (error) {
        console.error("Ошибка загрузки заказов из IndexedDB:", error);
      }
    };
    if (opens) {
      loadOrders();
    }
  }, [opens]);
  const clearZ = async () => {
    try {
      await clearOrdersDb();
      setOrders([]);
    } catch (error) {
      console.error("Ошибка очистки заказов из IndexedDB:", error);
    }
  };
  const removeOrder = async (id, index) => {
    try {
      await removeOrderFromDb(id);
      setOrders(orders.filter((_, i) => i !== index));
      if (index === open) {
        setOpen(-1);
      }
    } catch (error) {
      console.error("Ошибка удаления заказа из IndexedDB:", error);
    }
  };
  return (
    <Dialog
      open={opens}
      onClose={handleCloseZ}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{"Просмотр заказов"}</DialogTitle>
      <DialogContent>
        {orders.length === 0 ? (
          <DialogContentText id="alert-dialog-description">
            Заказов пока нет!
          </DialogContentText>
        ) : (
          orders.map((order, index) => (
            <div key={order.id}>
              <Divider />
              <Grid container sx={{ margin: "5px 5px 10px 5px" }}>
                <ListItemButton
                  onClick={() => handleClick(index)}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Typography variant="h6">
                    Заказ № {index + 1}: Покупатель: {order.name}
                  </Typography>
                  <ListItemButton sx={{ justifyContent: "end" }}>
                    {index === open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => removeOrder(order.id, index)}
                  >
                    <DeleteIcon />
                  </Button>
                </ListItemButton>
                <ViewZakaz order={order} open={index === open} />
              </Grid>
              <Divider />
            </div>
          ))
        )}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleCloseZ}>Выйти</Button>
        <Button onClick={clearZ}>Отменить заказы</Button>
      </DialogActions>
    </Dialog>
  );
}
export default ListZakaz;
