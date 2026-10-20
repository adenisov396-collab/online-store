import * as React from "react";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
function KorzinaContent({ handleDecreaseItem, updateCartIt, item }) {
  return (
    <div className="cart-item">
      {item.name} - {item.quantity} шт. - {item.footer}
      <Grid container alignContent={"center"} justifyContent={"center"}>
        <Button
          size="large"
          variant="outlined"
          onClick={() => handleDecreaseItem(item.id)}
          sx={{ margin: "5px 5px" }}
        >
          -
        </Button>
        <Button
          size="large"
          variant="outlined"
          onClick={() => updateCartIt(item.id, 1)}
          sx={{ margin: "5px 5px" }}
        >
          +
        </Button>
      </Grid>
      <Divider />
    </div>
  );
}
export default KorzinaContent;
