This is an example of Issue #31 within the kld-intersections project.

**Installation**

- Clone project
- Install dependencies

```bash
npm install
```

**Important Files**

- index.html - includes the SVG
- script.ts - includes the example code.

**Run example website**

```bash
npm run example
```

**View example**

- Open browser
- Navigate to http://localhost:8080/

**Issue**

Within `index.html`, notice that the SVG uses a defs and use syntax.

```xml
<svg width="500">
  <defs>
    <symbol viewBox="0 0 88 72" id="poly">
        <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z"></path>
    </symbol>
    <symbol id="poly2">
        <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z" fill="#ccc"></path>
    </symbol>
  </defs>
  <g>
    <use href="#poly" />
    <use href="#poly2" />
    <line x1="0" x2="250" y1="0" y2="75" stroke="blue" stroke-width="2" id="line" />
  </g>
</svg>
```

The symbol `#poly` uses a viewBox property to adjust the element's size, while the `#poly2` element does not.

If you open the console you'll see that the Intersection points are:

```
points: Array(2)
  0: Point2D {x: 15.65217391304348, y: 4.695652173913044}
  1: Point2D {x: 82.3529411764706, y: 24.705882352941178}
```

These points match the intersection of the smaller polygon, but not the single intersection of the bigger polygon.

This indicates that kld-intersections is not taking the viewbox into account. This is primarily due to the user not addressing the viewBox property when they created the path shape.

The ask is for kld-intersections to include an example of creating a path with a viewBox that adjusts the intersection so that the result is an array with a single Point2D object that shows the intersection of the line with the bigger polygon.