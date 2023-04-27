export default function getInitialPos() {
  let x = 0;
  while (x < window.innerWidth / 4 || x > window.innerWidth * 0.75)
    x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor((Math.random() * window.innerHeight) / 2);

  return { x, y };
}
