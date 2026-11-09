/* Drag & drop berbasis pointer events (mouse + sentuh) + cadangan "ketuk lalu ketuk tujuan". */
PK.dnd = ({ root, itemSel, zoneSel, onDrop }) => {
  let sel = null, drag = null;
  const zoneAt = (x, y) => document.elementsFromPoint(x, y).map((e) => e.closest(zoneSel)).find((z) => z && root.contains(z));
  const select = (it) => { sel && sel.classList.remove('ok-glow'); sel = it; it && it.classList.add('ok-glow'); };
  const drop = (it, zone) => {
    if (!zone) return false;
    const ok = onDrop(it, zone);
    if (ok) { it.classList.remove('ok-glow'); sel = null; }
    return ok;
  };
  const down = (e) => {
    const it = e.target.closest(itemSel); if (!it || it.classList.contains('placed') || e.button > 0) return;
    const r = it.getBoundingClientRect();
    drag = { it, x0: e.clientX, y0: e.clientY, ox: e.clientX - r.left, oy: e.clientY - r.top, ghost: null, moved: false, id: e.pointerId };
    root.setPointerCapture?.(e.pointerId);
  };
  const move = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 6) return;
    if (!drag.ghost) {
      const g = drag.it.cloneNode(true); const r = drag.it.getBoundingClientRect();
      g.classList.add('dragging'); g.style.cssText = `position:fixed;left:0;top:0;width:${r.width}px;height:${r.height}px;margin:0;z-index:90;pointer-events:none;transform:translate(${r.left}px,${r.top}px) scale(1.1) rotate(3deg)`;
      document.body.append(g); drag.ghost = g; drag.it.style.opacity = '.3'; drag.moved = true;
    }
    drag.ghost.style.transform = `translate(${e.clientX - drag.ox}px,${e.clientY - drag.oy}px) scale(1.1) rotate(3deg)`;
    root.querySelectorAll(zoneSel).forEach((z) => z.classList.remove('over')); zoneAt(e.clientX, e.clientY)?.classList.add('over');
  };
  const up = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const { it, ghost, moved } = drag; drag = null;
    root.querySelectorAll(zoneSel).forEach((z) => z.classList.remove('over'));
    if (!moved) { select(sel === it ? null : it); PK.sfx('pop'); return; }
    const zone = zoneAt(e.clientX, e.clientY), ok = drop(it, zone);
    it.style.opacity = '';
    if (ok) { ghost.remove(); return; }
    ghost.style.transition = 'transform .25s cubic-bezier(.3,1.4,.5,1)'; ghost.style.transform = `translate(${it.getBoundingClientRect().left}px,${it.getBoundingClientRect().top}px)`;
    setTimeout(() => ghost.remove(), 260);
  };
  const click = (e) => { const z = e.target.closest(zoneSel); if (sel && z && !drag) { const it = sel; drop(it, z); } };
  root.addEventListener('pointerdown', down); root.addEventListener('pointermove', move); root.addEventListener('pointerup', up); root.addEventListener('pointercancel', up); root.addEventListener('click', click);
  return { select };
};
