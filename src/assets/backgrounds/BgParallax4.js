import { Parallax } from "react-parallax";
import galerie4 from "./galerie4.jpg";

export default function BgParallax1() {
  return (
    <Parallax className="image" bgImage={galerie4} strength={200}>
      <div className="content">
        <h1 className="img-txt">naturopathy</h1>
      </div>
    </Parallax>
  );
}
