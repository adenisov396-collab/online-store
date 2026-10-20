import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
function ViewZakaz({ order, open }) {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <li>
            {order.items &&
              order.items.map((item, index) => (
                <Typography key={index}>
                  - {item.name} (Кол-во: {item.quantity} - {item.footer} руб.)
                </Typography>
              ))}
          </li>
        </ListItemButton>
      </List>
    </Collapse>
  );
}
export default ViewZakaz;
