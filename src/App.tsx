import Parallax from "./components/Parallax/Parallax";
import { DrawableElementProp } from "./types/DrawableElement";

function App() {
  const elementsArr: DrawableElementProp[] = [
    {
      size: 100,
      imgUrl:
        "https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      vel: 1.5,
    },
    {
      size: 250,
      imgUrl:
        "https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      vel: 2.5,
    },
    {
      size: 300,
      imgUrl:
        "https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      vel: 2,
    },
    {
      size: 150,
      imgUrl:
        "https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      vel: 1.5,
    },
    {
      size: 400,
      imgUrl:
        "https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      vel: 1.1,
    },
  ];
  return <Parallax elementsArr={elementsArr}></Parallax>;
}

export default App;
