import { Parallax } from "react-parallax";
import galerie1 from "./galerie1.jpg";

export default function BgParallax1() {
  return (
    <Parallax className="image" bgImage={galerie1} strength={200}></Parallax>
  );
}
