import { Intersection, Shapes } from 'kld-intersections';
import { PathParser } from 'kld-path-parser';
import * as PathHandler from './PathHandler';
import * as ViewBox from './ViewBox';

const svgns = "http://www.w3.org/2000/svg";

// Code based on https://github.com/thelonious/kld-intersections/blob/development/examples/path-line.js

const svg = document.getElementById("root");

const poly = document.getElementById('poly');
const viewbox = new ViewBox(
	poly.getAttributeNS(null, "viewBox"),
	poly.getAttributeNS(null, "preserveAspectRatio"),
	svg.getBoundingClientRect()
);
const viewbox_matrix = viewbox.getTM(svg.getBoundingClientRect());
console.log(viewbox_matrix);

const lineElem = document.getElementById('line');
const linePoint1x = parseInt(lineElem.getAttribute('x1'), 10);
const linePoint1y = parseInt(lineElem.getAttribute('y1'), 10);
const linePoint2x = parseInt(lineElem.getAttribute('x2'), 10);
const linePoint2y = parseInt(lineElem.getAttribute('y2'), 10);

const pathElem = document.querySelector('#poly path') as SVGPathElement;
const pathData = pathElem.getAttribute('d');
console.log(pathData);

const parser = new PathParser();
const handler = new PathHandler(viewbox_matrix.inverse());

parser.setHandler(handler);
parser.parseData(pathData);
console.log(handler.shapes);

const path = Shapes.path(handler.shapes);
const line = Shapes.line(linePoint1x, linePoint1y, linePoint2x, linePoint2y);
const pathIntersect = Intersection.intersect(path, line);

for (let p of pathIntersect.points) {
	let circle = document.createElementNS(svgns, "circle");

	circle.setAttributeNS(null, "cx", p.x.toString());
	circle.setAttributeNS(null, "cy", p.y.toString());
	circle.setAttributeNS(null, "r", "3");
	circle.setAttributeNS(null, "fill", "none");
	circle.setAttributeNS(null, "stroke", "red");
	// circle.setAttributeNS(null, "stroke-width", "0.5");

	svg.appendChild(circle);
}

console.log('Line intersects path at: ', pathIntersect);
