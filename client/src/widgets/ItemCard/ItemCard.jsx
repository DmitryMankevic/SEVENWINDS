import React from "react";
import cls from "./ItemCard.module.css";
import axiosInstance from "../../shared/lib/axiosInstance";

export default function ItemCard({ item }) {
  if (!item) return null;

  const addToCart = async () => {
    try {
      await axiosInstance.post("/cart", { itemId: item.id, quantity: 1 });
      alert(`${item.name} добавлен в корзину!`);
    } catch (error) {
      console.error(error);
      alert("Ошибка при добавлении в корзину");
    }
  };

  return (
    <div className={cls.card}>
      <div className={cls.header}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "340px", height: "450px", borderRadius: "8px" }}
        />
        <h2 className={cls.name}>{item.name}</h2>
      </div>

      <p className={cls.desc}>{item.desc}</p>

      <div className={cls.footer}>
        <span className={cls.price}>{item.price} галлеонов</span>
        <button onClick={addToCart} className={cls.buyButton}>
          Купить
        </button>
      </div>
    </div>
  );
}
