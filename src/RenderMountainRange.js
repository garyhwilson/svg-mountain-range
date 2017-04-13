/**
 * @module RenderMountainRange
 */

/**
 * yadda
 *
 * @class RenderMountainRange
 * @memberof module:RenderMountainRange
 */

export default class {

  /**
   * Create SVG of mountain peaks.
   *
   * @function constructor
   * @param {array} coords
   * @param {Object} stage
   * @param {Object} valleys
   * @param {Object} fill
   * @param {Object} shadow
   * @param {Object} ridge
   * @returns {Object}
   * @memberof module:RenderMountainRange
   */
  constructor(coords, stage, valleys, fill, shadow, ridge) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', stage.width);
    svg.setAttribute('height', stage.height);
    svg.appendChild(
      this.createMountainPoly(
        svg,
        coords,
        stage.width,
        stage.height,
        (fill) ? fill.color : null,
        (fill) ? fill.gradient : null
      )
    );

    if (shadow) {
      svg.appendChild(this.createShadowPath(svg, stage.height, coords, valleys.minY, shadow.color, shadow.gradient));
    }

    if (ridge && ridge.color && ridge.thickness) {
      svg.appendChild(this.createRidgeline(coords, ridge.color, ridge.thickness));
    }

    return svg;
  }

  /**
   * Returns gradient definition.
   *
   * @param {Object} svg
   * @param {string} id
   * @param {Object} gradient
   * @returns {Object}
   * @memberof module:RenderMountainRange
   */
  createGradient(svgNS, id, gradient) {
    const stops = gradient.stops;
    const grad = document.createElementNS(svgNS, 'linearGradient');

    grad.setAttribute('id', id);
    grad.setAttribute('x1', gradient.x1);
    grad.setAttribute('y1', gradient.y1);
    grad.setAttribute('x2', gradient.x2);
    grad.setAttribute('y2', gradient.y2);

    for (let i = 0; i < stops.length; i += 1) {
      const stop = document.createElementNS(svgNS, 'stop');

      stop.setAttribute('offset', stops[i].offset);
      stop.setAttribute('stop-color', stops[i]['stop-color']);

      grad.appendChild(stop);
    }

    return grad;
  }

  /**
   * Return SVG polygon element of mountain peaks.
   *
   * @param {Object} svg -
   * @param {array} coords -
   * @param {number} width -
   * @param {number} height -
   * @param {string} [color] -
   * @param {Object} [gradient] -
   * @returns {Object} SVG polygon element of mountain peaks.
   * @memberof module:RenderMountainRange
   */
  createMountainPoly(svg, coords, width, height, color = '#000000', gradient) {
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const points = coords.map(coord => `${coord.x},${coord.y}`).join(' ');

    poly.setAttribute('points', `${points} ${width},${height} 0,${height}`);

    if (gradient) {
      const grad = this.createGradient(svg.namespaceURI, 'mountainGradient', gradient);
      const defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS(svg.namespaceURI, 'defs'), svg.firstChild);

      defs.appendChild(grad);
      poly.setAttribute('fill', 'url(#mountainGradient)');
    } else {
      poly.setAttribute('fill', color);
    }

    return poly;
  }

  /**
   * Add a stroke to the mountain peak ridgeline.
   *
   * @param {array} coords -
   * @param {string} [color] -
   * @param {number} [thickness] -
   * @returns {Object}
   * @memberof module:RenderMountainRange
   */
  createRidgeline(coords, color = '#000000', thickness = 1) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pointCount = coords.length;

    let points = `M ${coords[0].x} ${coords[0].y}`;

    for (let i = 1; i < pointCount; i += 1) {
      points += `L ${coords[i].x} ${coords[i].y}`;
    }

    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', thickness);
    path.setAttribute('d', points);

    return path;
  }

  /**
   * Return filled path with shadows of mountain peaks.
   *
   * @param {Object} svg
   * @param {number} height
   * @param {array} coords
   * @param {number} valleyMinY
   * @param {string} [color]
   * @param {Object} [gradient]
   * @returns {Object}
   * @memberof module:RenderMountainRange
   */
  createShadowPath(svg, height, coords, valleyMinY, color = '#000000', gradient) {
    const pointCount = coords.length;
    const startXOffset = 20;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    let startX = false;
    let endX;
    let lowestY;
    let points = '';

    for (let i = 1; i < pointCount; i += 1) {
      if (startX === false && coords[i].y > coords[i - 1].y) {
        startX = coords[i - 1].x;
        points += `M ${startX} ${coords[i - 1].y}`;
        points += ` ${coords[i].x} ${coords[i].y}`;
        lowestY = height - coords[i].y;
      }

      if (startX !== false && coords[i].y <= coords[i - 1].y) {
        if (coords[i].y < lowestY) {
          lowestY = height - coords[i].y;
        }

        endX = startX + startXOffset;
        points += ` ${endX} ${height - Math.floor(Math.random() * (lowestY - valleyMinY))} Z`;
        startX = false;
      }

      if (startX !== false) {
        points += ` ${coords[i].x} ${coords[i].y}`;

        if (coords[i].y > lowestY) {
          lowestY = height - coords[i].y;
        }

        if (i === pointCount - 1) {
          points += ` ${startX + startXOffset} ${height - Math.floor(Math.random() * (lowestY - valleyMinY))} Z`;
          startX = false;
        }
      }
    }

    if (gradient) {
      const grad = this.createGradient(svg.namespaceURI, 'shadowGradient', gradient);
      const defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS(svg.namespaceURI, 'defs'), svg.firstChild);

      defs.appendChild(grad);
      path.setAttribute('fill', 'url(#shadowGradient)');
    } else {
      path.setAttribute('fill', color);
    }

    path.setAttribute('d', points);

    return path;
  }

}
