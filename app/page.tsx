import { CanvasComponent } from "./components/Canvas";
import { Overlay } from "./components/Overlay";

export default function Home() {
  return (
    <main className="main-container">
      <CanvasComponent />
      <Overlay />
    </main>
  );
}
