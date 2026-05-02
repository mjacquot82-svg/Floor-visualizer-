import { useState } from "react";

export default function App() {
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState([]);

  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setPoints([]);
  }

  function handleClick(e) {
    if (!image || points.length >= 4) return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints([...points, { x, y }]);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Floor Visualizer Prototype</h2>

      <input type="file" accept="image/*" onChange={handleUpload} />

      {image && (
        <div style={{ position: "relative", marginTop: 20 }}>
          <img
            src={image}
            alt="Room"
            style={{ maxWidth: "100%", cursor: "crosshair" }}
            onClick={handleClick}
          />

          {points.map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: p.x - 5,
                top: p.y - 5,
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "red",
              }}
            />
          ))}
        </div>
      )}

      {points.length === 4 && (
        <p style={{ marginTop: 20 }}>
          Floor area selected. Next step: texture overlay coming next.
        </p>
      )}
    </div>
  );
}
