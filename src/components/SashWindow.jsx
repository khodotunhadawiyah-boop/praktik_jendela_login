import { useRef, useState } from 'react';

const THRESHOLD = 0.3; // seret > 30% tinggi kaca → terbuka

export default function SashWindow({ open, lifted, onOpen }) {
  const ref = useRef(null);
  const startY = useRef(null);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const down = (e) => {
    if (open) return;
    startY.current = e.clientY;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const move = (e) => {
    if (startY.current === null) return;
    setOffset(Math.max(0, startY.current - e.clientY));
  };

  const up = () => {
    if (startY.current === null) return;
    const h = ref.current.getBoundingClientRect().height;
    const isTap = offset < 6;
    const passed = offset > h * THRESHOLD;

    startY.current = null;
    setDragging(false);
    setOffset(0);
    if (isTap || passed) onOpen();
  };

  const classes = [
    'sash',
    !open && 'is-initial',
    open && 'is-open',
    lifted && 'is-lifted',
    dragging && 'is-dragging',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      style={dragging ? { transform: `translateY(-${offset}px)` } : undefined}
    >
      <div className="sash-panes" aria-hidden="true" />

      <button
        type="button"
        className="sash-handle"
        aria-label="Angkat gagang untuk membuka jendela"
        disabled={open}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onClick={(e) => {
          // e.detail === 0 → dipicu keyboard (Enter/Spasi)
          if (e.detail === 0) onOpen();
        }}
      >
        <span className="sash-hint">⬆ Angkat gagang untuk membuka jendela</span>
        <span className="sash-grip" />
      </button>
    </div>
  );
}