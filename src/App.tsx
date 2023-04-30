import Parallax from "./components/Parallax/Parallax";
import { elementsArr } from "./data/elementsArray";

const NUMBER_COMPONENTS = 3;

function App() {
  const parallaxComponents: JSX.Element[] = [];

  for (let i = 0; i < NUMBER_COMPONENTS; i++) {
    parallaxComponents.push(
      <Parallax elementsArr={elementsArr} id={i} key={i} />
    );
  }

  return <>{parallaxComponents}</>;
}

export default App;
