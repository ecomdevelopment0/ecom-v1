export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const truncateName = (name: string, length: number) => {
  if (name.length > length) {
    return name.slice(0, length) + "...";
  }
  return name;
};
