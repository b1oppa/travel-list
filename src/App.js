import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];
// Array.from({ length: 20 }, (_, i) => i + 1)

export default function App() {
  const [items, setItems] = useState([]);
  const handleAddItem = function (item) {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = function (id) {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggleItem = function (id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} /> {/*dont just pass setItems*/}
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Travel List</h1>;
}
function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = function (e) {
    e.preventDefault();

    if (description === undefined) {
      return;
    }

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };
    onAddItem(newItem);
    console.log(newItem);

    setDescription("");
    setQuantity(1);
  };

  return (
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What items do you need?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option>{num}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button>Add</button>
      </form>
    </div>
  );
}
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div>
      <div>
        <ul>
          {items.map((item) => (
            <Item
              item={item}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
              key={item.id}
            />
          ))}
        </ul>
      </div>
      <button>Sort</button>
      <button>Clear</button>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <div>
      <footer>You have X items on your list and you already packed X()</footer>
    </div>
  );
}
