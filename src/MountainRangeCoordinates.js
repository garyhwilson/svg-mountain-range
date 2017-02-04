/**
 * @class MountainRangeCoordinates
 */

export default class {

 /**
   * Returns x/y coordinate objects in an array with procedurally generate points.
   *
   * @function constructor
   * @memberOf MountainRangeCoordinates
   * @param {Object} stage - The stage configuration object.
   * @param {array} [initPeaks] - The initial defined peaks, instead of random.
   * @param {Object} peaks - The peaks configuration object.
   * @param {Object} valleys - The valleys configuration object.
   * @param {array} [flats] - the flats configuration object.
   * @returns {array} x/y coordinate objects in an array with procedurally generate points
   */
  constructor(stage, initPeaks, peaks, valleys, flats) {
    let points = 0;

    if (initPeaks && initPeaks.length) {
      points = initPeaks.slice();
    } else {
      points = this.definePeaks(peaks.count, valleys.minY, peaks.minY, peaks.maxY, peaks.startWithPeak);
    }

    points = this.subdividePeaks(points, peaks.detail, valleys.minY, peaks.maxY);

    const mapping = this.mapPointsToObject(stage, points);
    let coords = 0;

    if (flats) {
      coords = this.defineFlats(mapping, flats);
    } else {
      coords = mapping;
    }

    return coords;
  }

  /**
   * Returns a randomly generated y-axis point for a tall peak.
   *
   * @memberOf MountainRangeCoordinates
   * @param {number} peakMinY - The minimum y-axis limit for the new point.
   * @param {number} peakMaxY - The maximum y-axis limit for the new point.
   * @returns {number} Randomly generated y-axis point for a tall peak.
   */
  definePeakY(peakMinY, peakMaxY) {
    return Math.floor(Math.random() * (peakMaxY - peakMinY) + peakMinY);
  }

  /**
   * Returns a randomly generated low valley y-axis value.
   *
   * @memberOf MountainRangeCoordinates
   * @param {number} peakMinY - The minimum y-axis limit for a peak point.
   * @param {number} valleyMinY - The minimum y-axis limit for a valley point.
   * @returns {number} Randomly generated low valley y-axis value.
   */
  defineValleyY(peakMinY, valleyMinY) {
    return Math.floor(Math.random() * (peakMinY - valleyMinY) + valleyMinY);
  }

  /**
   * Returns an array of y-axis points.
   *
   * @memberOf MountainRangeCoordinates
   * @param {number} count - The count of tallest mountain peaks.
   * @param {number} valleyMinY - The lowest y-axis point.
   * @param {number} peakMinY - The lowest y-axis point for the tallest peaks.
   * @param {number} peakMaxY - The highest y-axis point for the tallest peaks.
   * @param {boolean} [startWithPeak] - True if the left most point is a peak instead of a valley.
   * @returns {array} Array of y-axis points that define the main geography of the mountain peaks.
   */
  definePeaks(count, valleyMinY, peakMinY, peakMaxY, startWithPeak) {
    const retryLimit = 100;
    const startY = startWithPeak ? peakMinY : valleyMinY;

    let retry = 0;
    let peakY = 0;
    let valleyY = 0;
    let points = 0;
    let insertDelta = 1;

    if (startWithPeak) {
      points = [startY, this.defineValleyY(peakMinY, valleyMinY), startY];
      insertDelta = 2;
    } else {
      points = [startY];
    }

    for (let i = 0; i < count * 2; i += 2) {
      do {
        peakY = this.definePeakY(peakMinY, peakMaxY);
        retry += 1;
      } while (retry < retryLimit && peakY > peakMaxY);

      do {
        valleyY = this.defineValleyY(peakMinY, valleyMinY);
      } while (valleyY < valleyMinY);

      points.splice(i + insertDelta, 0, peakY);
      points.splice(i + insertDelta + 1, 0, valleyMinY);
    }

    return points;
  }

  /**
   * Return random y-axis position based on two points.
   *
   * @memberOf MountainRangeCoordinates
   * @param {number} point1 - First point to subdivide.
   * @param {number} point2 - Second point to subdivide.
   * @param {number} passes - The number of times to subdivide the points.
   * @param {number} minY - The minimum y-axis limit for the new point.
   * @param {number} maxY - The maximum y-axis limit for the new point.
   * @returns Randomly offset Y-axis point.
   */
  subdivide(point1, point2, passes, minY, maxY) {
    const retryLimit = 100;
    const diff = Math.abs(point1 - point2);
    const lowPoint = point1 < point2 ? point1 : point2;
    const midpoint = Math.floor(diff / 2) + lowPoint;
    const spread = Math.floor(midpoint / passes);

    let retry = 0;
    let delta = 0;

    do {
      delta = Math.floor(Math.random() * spread);
      retry += 1;
    } while (retry < retryLimit && (midpoint + delta > maxY || midpoint + delta < minY));

    if (Math.floor(Math.random() * 2) === 1) {
      delta *= -1;
    }

    return midpoint + delta;
  }

  /**
   * Return array of random subdivided y-axis points.
   *
   * @memberOf MountainRangeCoordinates
   * @param {array} points - An array of y-axis points.
   * @param {number} passes - The number of times to subdivide the points.
   * @param {number} minY - The minimum y-axis limit for the new point.
   * @param {number} maxY - The maximum y-axis limit for the new point.
   * @returns {array} Array of random subdivided y-axis points.
   */
  subdividePeaks(points, passes, minY, maxY) {
    const arr = points.splice(0);

    for (let pass = 0; pass < passes; pass += 1) {
      for (let i = 0; i < arr.length - 1; i += 2) {
        arr.splice(i + 1, 0, this.subdivide(arr[i], arr[i + 1], passes, minY, maxY));
      }
    }

    return arr;
  }

  /**
   * Return an array of X and Y coordinate objects.
   *
   * @memberOf MountainRangeCoordinates
   * @param {Object} stage - The stage configuration object.
   * @param {array} points - An array of y-axis points.
   * @returns Array of X and Y coordinate objects.
   */
  mapPointsToObject(stage, points) {
    const pointCount = points.length;
    const xInc = stage.width / (pointCount - 1);
    const coords = [];

    for (let point = 0; point < pointCount; point += 1) {
      coords.push({
        x: xInc * point,
        y: stage.height - points[point]
      });
    }

    return coords;
  }

  /**
   * Returns a coordinates array with leveled y-axis values for a specific width at given positions.
   *
   * @memberOf MountainRangeCoordinates
   * @param {array} coords - The coordinates array.
   * @param {number} pos - The x-axis position to start leveling.
   * @param {number} width - The width of the area to be leveled.
   * @param {string} align - The alignment of either left or right.
   * @param {string} name - The name of the leveled area.
   * @returns Coordinate object with a leveled y-axis value for a specific width at a given
   * position.
   */
  levelArea(coords, pos, width, align, name) {
    const obj = coords.slice();
    const stageWidth = obj[obj.length - 1].x - obj[0].x;

    let index = 0;
    let desiredX = Math.floor(stageWidth * pos);

    switch (align) {
      case 'right':
        desiredX -= width;
        break;

      case 'center':
        desiredX -= Math.floor(width / 2);
        break;

      default:
        break;
    }

    for (let i = 0; i < obj.length; i += 1) {
      if (!index && obj[i].x > desiredX) {
        index = i;
        obj[i].flatName = name;
      } else if (index && obj[i].x - obj[index].x <= width) {
        obj[i].y = obj[index].y;
      }
    }

    return obj;
  }

  /**
   * Returns the coordinates array with flattened areas.
   *
   * @memberOf MountainRangeCoordinates
   * @param {array} coords - The coordinates array.
   * @param {array} flats - The flats configuration array.
   * @returns {array} The coordinates array with flattened areas.
   */
  defineFlats(coords, flats) {
    let obj = coords.slice();

    for (let i = 0; i < flats.length; i += 1) {
      obj = this.levelArea(obj, flats[i].pos, flats[i].width, flats[i].align, flats[i].name);
    }

    return obj;
  }

}
