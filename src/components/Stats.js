export default function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  if (!numItems) {
    return (
      <div>
        <footer>Start adding items to your list</footer>
      </div>
    );
  }

  return (
    <div>
      <footer>
        {percentage === 100
          ? "You got everything, youre ready to go!"
          : `You have ${numItems} items on your list and you already packed ${numPacked} (${percentage}%)`}
      </footer>
    </div>
  );
}
