import "./Carts.css"
import { Divider } from "@mui/material";
//import { useKorzinaContext } from "../KorzinaContext/KorzinaContext";
import { useKorzinaContext } from "../KorzinaContext/KorzinaContext";

function Card({id, name, img, desc, footer}) {
  const { addToCart } = useKorzinaContext();
  return (
    <div className="card">
      <div className="card__img-wrapper">
        <img
          src={img}
          className="card__img"
          alt="фото блюда"
          style={{ display: "block" }}
        />
      </div>
      <Divider />
      <div className="card__content">
        <div className="card_name">{name}</div>
        <div className="card__desc">{desc}</div>
      </div>
      <div className="card__footer">
        <div className="card__footer--btn">{footer} ₽</div>
        <button
          className="card__footer--btn"
          onClick={() => addToCart({ id, name, footer })}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}
export default Card;
