const x = /* @__PURE__ */ new Map();
function p(i, t) {
  x.set(i, t);
}
function b(i, t) {
  const e = x.get(i);
  if (!e)
    throw new Error(`View "${i}" is not registered.`);
  return new e(t);
}
function z(i) {
  const t = i.replace(/android:/g, ""), r = new DOMParser().parseFromString(t, "application/xml").documentElement;
  return V(r);
}
function V(i) {
  const t = {};
  for (let a of i.attributes)
    t[a.name] = a.value;
  const e = b(i.tagName, t);
  return Array.from(i.children).forEach((a) => {
    const r = V(a);
    e.addView(r);
  }), e;
}
const u = {
  EXACT: "exact",
  AT_MOST: "at_most"
};
function h(i, t) {
  return { size: i, mode: t };
}
class P {
  constructor(t) {
    this.canvas = t, this.ctx = t.getContext("2d"), this.rootView = null;
  }
  setRootView(t) {
    this.rootView = t;
  }
  render() {
    if (!this.rootView)
      throw new Error("RootView not set");
    const t = this.canvas.width, e = this.canvas.height, a = h(t, u.EXACT), r = h(e, u.EXACT);
    this.rootView.measure(a, r), this.rootView.layout(0, 0), this.ctx.clearRect(0, 0, t, e), this.rootView.draw(this.ctx);
  }
  renderXML(t) {
    this.rootView = z(t), this.render();
  }
}
class L {
  constructor(t = {}) {
    this.width = t.width ?? "wrap_content", this.height = t.height ?? "wrap_content", this.weight = parseFloat(t.weight || 0), this.margin = f(t.margin), this.padding = f(t.padding), this.background = t.background || null;
  }
}
function f(i) {
  if (!i) return { top: 0, right: 0, bottom: 0, left: 0 };
  const t = parseInt(i);
  return {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
class E {
  constructor(t = {}) {
    this.props = t, this.layoutParams = new L(t), this.children = [], this.parent = null, this.measuredWidth = 0, this.measuredHeight = 0, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0;
  }
  addView(t) {
    t.parent = this, this.children.push(t);
  }
  measure(t, e) {
    this.onMeasure(t, e);
  }
  onMeasure(t, e) {
    this.measuredWidth = this.resolveSize(
      0,
      t,
      this.layoutParams.width
    ), this.measuredHeight = this.resolveSize(
      0,
      e,
      this.layoutParams.height
    );
  }
  resolveSize(t, e, a) {
    return typeof a == "number" ? a : a === "match_parent" ? e.size : a === "wrap_content" ? e.mode === u.EXACT ? e.size : e.mode === u.AT_MOST ? Math.min(t, e.size) : t : t;
  }
  layout(t, e) {
    this.left = t, this.top = e, this.right = t + this.measuredWidth, this.bottom = e + this.measuredHeight, this.onLayout();
  }
  onLayout() {
  }
  draw(t) {
    this.drawBackground(t), this.onDraw(t), this.children.forEach((e) => e.draw(t));
  }
  drawBackground(t) {
    this.layoutParams.background && (t.fillStyle = this.layoutParams.background, t.fillRect(
      this.left,
      this.top,
      this.measuredWidth,
      this.measuredHeight
    ));
  }
  onDraw(t) {
  }
}
class T extends E {
  constructor(t = {}) {
    super(t), this.layoutStrategy = null, this.children = [];
  }
  addChild(t, e = null) {
    e || (e = this.generateDefaultLayoutParams()), t.layoutParams = e, t.parent = this, this.children.push(t);
  }
  measure(t, e) {
    if (!this.layoutStrategy)
      throw new Error("LayoutStrategy not set");
    this.layoutStrategy.measure(this, t, e);
  }
  generateDefaultLayoutParams() {
    return {
      width: "wrap_content",
      height: "wrap_content",
      margin: { left: 0, top: 0, right: 0, bottom: 0 },
      weight: 0
    };
  }
  layout(t, e) {
    super.layout(t, e), this.layoutStrategy && this.layoutStrategy.layout(this);
  }
}
class S {
  measure(t, e) {
  }
  layout(t) {
  }
}
class W extends S {
  measure(t, e, a) {
    const r = t.layoutParams.padding, o = a.size - r.top - r.bottom;
    let l = 0, m = 0, g = 0, c = 0;
    t.children.forEach((n) => {
      const s = n.layoutParams;
      if (s.weight > 0) {
        m += s.weight, g += s.margin.top + s.margin.bottom;
        return;
      }
      n.measure(
        h(e.size, e.mode),
        h(o, u.AT_MOST)
      ), l += n.measuredHeight + s.margin.top + s.margin.bottom, c = Math.max(
        c,
        n.measuredWidth + s.margin.left + s.margin.right
      );
    });
    let d = o - l - g;
    d < 0 && (d = 0), t.children.forEach((n) => {
      const s = n.layoutParams;
      if (s.weight <= 0) return;
      const M = s.weight / m * d;
      n.measure(
        h(e.size, e.mode),
        h(M, u.EXACT)
      ), c = Math.max(
        c,
        n.measuredWidth + s.margin.left + s.margin.right
      );
    }), t.measuredWidth = e.size, t.measuredHeight = a.size;
  }
  layout(t) {
    const e = t.layoutParams.padding;
    let a = t.top + e.top;
    t.children.forEach((r) => {
      const o = r.layoutParams;
      a += o.margin.top, r.layout(
        t.left + e.left + o.margin.left,
        a
      ), a += r.measuredHeight + o.margin.bottom;
    });
  }
}
class H extends S {
  measure(t, e) {
    let a = 0, r = 0;
    t.children.forEach((o) => {
      o.measure(e), a += o.measuredWidth, r = Math.max(r, o.measuredHeight);
    }), t.measuredWidth = a, t.measuredHeight = r;
  }
  layout(t) {
    let e = t.left;
    t.children.forEach((a) => {
      a.layout(e, t.top), e += a.measuredWidth;
    });
  }
}
class w extends T {
  static tag = "LinearLayout";
  constructor(t = {}) {
    super(t);
    const e = t.orientation || "vertical";
    this.layoutStrategy = e === "horizontal" ? new H() : new W();
  }
}
p(w.tag, w);
class y extends E {
  static tag = "TextView";
  constructor(t = {}) {
    super(t), this.text = t.text || "", this.fontSize = parseInt(t.fontSize || 16), this.textColor = t.textColor || "#000";
  }
  measure(t) {
    const a = document.createElement("canvas").getContext("2d");
    a.font = `${this.fontSize}px sans-serif`;
    const r = a.measureText(this.text);
    this.measuredWidth = r.width;
    const o = r.actualBoundingBoxAscent || this.fontSize, l = r.actualBoundingBoxDescent || 0;
    this.measuredHeight = o + l;
  }
  onDraw(t) {
    t.fillStyle = this.textColor, t.font = `${this.fontSize}px sans-serif`, t.textBaseline = "top", t.fillText(this.text, this.left, this.top);
  }
}
p(y.tag, y);
export {
  P as Engine,
  w as LinearLayout,
  y as TextView
};
