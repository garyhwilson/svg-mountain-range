/**
 * @module SVGMountainRange
 * @requires MergeObjects
 * @requires MountainRangeCoordinates
 * @requires RenderMountainRange
 */
import MergeObjects from './MergeObjects';
import MountainRangeCoordinates from './MountainRangeCoordinates';
import RenderMountainRange from './RenderMountainRange';

/**
 * The main class for the svg-mountain-range library.
 *
 * @class SVGMountainRange
 * @todo Figure out why JSDoc3 requires are generated twice.
 * @memberof module:SVGMountainRange
 */
export default class SVGMountainRange {

  /**
   * The **create** method is used to generate the SVG mountain range as configured by the provided configuration object.
   *
   * @param {Object} [config={ }] - Configuration settings for every apsect of generating the SVG mountain range.
   * @returns {Object} Returns the results of the merge between the target and source objects.
   * @memberof module:SVGMountainRange
   */
  create(config = { }) {
    const merge = new MergeObjects();
    const defaultConfig = {
      stage: {
        width: 600,
        height: 300
      },
      peaks: {
        count: 1,
        detail: 4,
        minY: 200,
        maxY: 300
      },
      valleys: {
        minY: 50
      }
    };

    const {
      initPeaks,
      stage,
      peaks,
      fill,
      shadow,
      ridge,
      valleys,
      flats
    } = merge.mergeDeep(defaultConfig, config);

    const coords = new MountainRangeCoordinates(stage, initPeaks, peaks, valleys, flats);
    const svg = new RenderMountainRange(coords, stage, valleys, fill, shadow, ridge);

    return svg;
  }

}
