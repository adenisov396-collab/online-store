import './App.css'
import Card from './Content/Card/Card'
import Korzina from './Content/Korzina/Korzina'
//import KorzinaProvider from './Content/KorzinaContext/korzinaContext'
import KorzinaProvider from './Content/KorzinaContext/KorzinaContext'
//import List from '@mui/material'
import List from '@mui/material/List'
import React, { useState } from 'react'
import ListZakaz from './Content/ListZakaz/ListZakaz'
 

const data = [
  {
    id: 1,
    name: "Носок",
    img: "/nosok.svg",
    desc: "Если и спасаться от холода, то по-праздничному",
    footer: "100  ",
  },
  {
    id: 2,
    name: "Корона",
    img: "/corona.svg",
    desc: "Кто-то потерял",
    footer: "1300  ",
  },
  {
    id: 3,
    name: "Карамелька",
    img: "/caramel.svg",
    desc: "С ней вкуснее любой стол",
    footer: "150  ",
  },
  {
    id: 4,
    name: "Подарок",
    img: "/gift.svg",
    desc: "Сюрприииз",
    footer: "550  ",
  },
  {
    id: 5,
    name: "Ёлочка",
    img: "/elka.svg",
    desc: "Новый год только с ней",
    footer: "2500  ",
  },
  {
    id: 6,
    name: "Олень",
    img: "/olen.svg",
    desc: "Куда же без него",
    footer: "600  ",
  },
  {
    id: 7,
    name: "Свечка",
    img: "/sveca.svg",
    desc: "Перегорела гирлянда? Свечка в помощь",
    footer: "250  ",
  },
  {
    id: 8,
    name: "Дед Мороз",
    img: "/ded.svg",
    desc: "Главный по-красному носу",
    footer: "800  ",
  },
  {
    id: 9,
    name: "Шарик",
    img: "/ball.svg",
    desc: "Украсит любую ёлочку",
    footer: "400  ",
  },
];

function App() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [opens, setOpens] = useState(false);
  const OpenZ = () => {
    setOpens(true);
  };
  const handleCloseZ = () => {
    setOpens(false);
  };
  return (
    <KorzinaProvider>
      <>
        <div className="navigator">
          <div className="name">МАГАЗИН НОВОГОДНЕГО НАСТРОЕНИЯ</div>
        </div>
        <div className="cards">
          {data.map((it) => (
            <Card
              key={it.id}
              id={it.id}
              name={it.name}
              img={it.img}
              desc={it.desc}
              footer={it.footer}
            />
          ))}
        </div>
       
        <List className="footer">
          <footer className="footer-content">
            <div className="info">Выбирай и покупай!</div>
            <div className="cart">
              <div className="cart_i" onClick={handleClickOpen}>
                Корзина <img src={"/korzina.svg"} className="card_img" />
              </div>
              <div className="cart_i" onClick={OpenZ}>
                Просмотр заказов
              </div>
              <Korzina open={open} handleClose={handleClose} />
              <ListZakaz opens={opens} handleCloseZ={handleCloseZ} />
            </div>
            <div className="ft-niz">
              <div className="SocSeti">
                <div className="Seti">Мы в Социальных сетях!</div>
                <div className="icon">
                  <div className="icon-item">
                    <a href="#" target="_blank">
                      <img src={"/vk.svg"} className="card_img" />
                    </a>
                    <a href="#" target="_blank">
                      <img src={"/tg.svg"} className="card_img" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="Contacts">
                <div className="contact_text">Контакты</div>
                <div className="pocta">fvt22voa1@gmail.com</div>
                <div className="adress">г. Пенза, ул. Низких цен 2</div>
              </div>
            </div>
          </footer>
        </List>
      </>
    </KorzinaProvider>
  );
}
export default App;
