import { Parallax } from "react-parallax";
import galerie3 from "./galerie3.jpg";

export default function BgParallax1() {
  return (
    <Parallax className="image" bgImage={galerie3} strength={200}>
      <div className="content">
        <h1 className="img-txt">naturopathy</h1>
      </div>
    </Parallax>
  );
}
