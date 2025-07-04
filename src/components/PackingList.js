import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div>
      <div>
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
              key={item.id}
            />
          ))}
        </ul>
      </div>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        {/*onChange={(e) => setSortBy(e.target.value) also works*/}
        <option value="input">by packing order</option>
        <option value="description">by description</option>
        <option value="packed">by packed status</option>
      </select>
      <button onClick={onClearList}>Clear</button>
    </div>
  );
}
