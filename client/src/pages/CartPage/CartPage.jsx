import { useEffect, useState } from "react";
import cls from "./CartPage.module.css";
import axiosInstance from "../../shared/lib/axiosInstance";

export default function CartPage({ user }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);




  // Загружаем корзину при открытии страницы
  const getCart = async () => {
    try {
      const response = await axiosInstance.get("/cart");
      if (response.status === 200) {
        setCart(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка при загрузке корзины");
    } finally {
      setLoading(false);
    }
  };

  // Удалить один товар
  const handleDelete = async (itemId) => {
    try {
      await axiosInstance.delete(`/cart/${itemId}`);
      setCart((prev) => prev.filter((item) => item.Item?.id !== itemId));
    } catch (error) {
      console.error(error);
      alert("Ошибка при удалении товара");
    }
  };

  // Очистить всю корзину
  const handleClear = async () => {
    if (!window.confirm("Очистить корзину?")) return;
    try {
      await axiosInstance.delete("/cart");
      setCart([]);
    } catch (error) {
      console.error(error);
      alert("Ошибка при очистке корзины");
    }
  };

  //  Увеличить количество
  const handleIncrease = async (itemId) => {
    try {
      await axiosInstance.post("/cart", { itemId, quantity: 1 }); // повторное добавление увеличивает
      setCart((prev) =>
        prev.map((item) =>
          item.Item?.id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error(error);
      alert("Ошибка при увеличении количества");
    }
  };

  //  Уменьшить количество
  const handleDecrease = async (itemId) => {
    const item = cart.find((el) => el.Item?.id === itemId);
    if (item.quantity <= 1) return handleDelete(itemId);
    try {
      await axiosInstance.put(`/cart/${itemId}`, {
        quantity: item.quantity - 1,
      });
      setCart((prev) =>
        prev.map((el) =>
          el.Item?.id === itemId ? { ...el, quantity: el.quantity - 1 } : el
        )
      );
    } catch (error) {
      console.error(error);
      alert("Ошибка при уменьшении количества");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  if (loading) return <p>Загрузка...</p>;

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * (item.Item?.price || 0),
    0
  );

  return (
    <div className={cls.container}>
      <div className={cls.cartContainer}>
        <h1>Мой рюкзак</h1>

        {cart.length === 0 ? (
          <p>В рюкзаке пока пусто.</p>
        ) : (
          <>
            <table className={cls.table}>
              <thead>
                <tr>
                  <th>Метла</th>
                  <th>Описание</th>
                  <th>Цена</th>
                  <th>Количество</th>
                  <th>Удалить</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.Item?.name}</td>
                    <td>{item.Item?.desc}</td>
                    <td>{item.Item?.price}</td>
                    <td>
                      <div className={cls.quantityBox}>
                        <button
                          className={cls.qtyBtn}
                          onClick={() => handleDecrease(item.Item?.id)}
                        >
                          −
                        </button>
                        <button
                          className={cls.qtyBtn}
                          onClick={() => handleIncrease(item.Item?.id)}
                        >
                          +
                        </button>
                        <span>{item.quantity}</span>
                      </div>
                    </td>
                    <td>
                      <button
                        className={cls.deleteBtn}
                        onClick={() => handleDelete(item.Item?.id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={cls.total}>
              <strong>Итого:</strong> {total} галлеонов
            </div>

            <button
              onClick={handleClear}
              className={cls.clearBtn}
              
            >
              Очистить рюкзак
            </button>
          </>
        )}
      </div>
    </div>
  );
}
