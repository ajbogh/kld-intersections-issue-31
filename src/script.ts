import { Intersection, Shapes } from 'kld-intersections';
import { PathParser } from 'kld-path-parser';
import * as PathHandler from './PathHandler';

// Code based on https://github.com/thelonious/kld-intersections/blob/development/examples/path-line.js

const lineElem = document.getElementById('line');
const linePoint1x = parseInt(lineElem.getAttribute('x1'), 10);
const linePoint1y = parseInt(lineElem.getAttribute('y1'), 10);
const linePoint2x = parseInt(lineElem.getAttribute('x2'), 10);
const linePoint2y = parseInt(lineElem.getAttribute('y2'), 10);

const pathElem = document.querySelector('#poly path');
const pathData = pathElem.getAttribute('d');

// What about pathViewBox?

const parser = new PathParser();
const handler = new PathHandler();

parser.setHandler(handler);
parser.parseData(pathData);

const path = Shapes.path(handler.shapes);

let line = Shapes.line(linePoint1x, linePoint1y, linePoint2x, linePoint2y);

const pathIntersect = Intersection.intersect(path, line);

console.log('Line intersects path at: ', pathIntersect);
