import React from "react";
import { useEffect, useState } from "react";
import ItemCard from "../../widgets/ItemCard/ItemCard";
import axiosInstance from "../../shared/lib/axiosInstance";
import cls from "./StorePage.module.css";

export default function StorePage() {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const response = await axiosInstance.get("/items");
      setItems(response.data);
    } catch (error) {
      console.error(error);
      alert("Ошибка при получении товаров");
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className={cls.cardContainer}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
