import MergeObjects from './MergeObjects';
import MountainRangeCoordinates from './MountainRangeCoordinates';
import RenderMountainRange from './RenderMountainRange';

/**
 * Blah blah blah
 * 
 * @class SVGMountainRange
 * @requires MergeObjects
 * @requires MountainRangeCoordinates
 * @requires RenderMountainRange
 */
export default class SVGMountainRange {

  /**
   * Create blah blah blah
   * 
   * @param {Object} [config={ }] - Configuration settings for every apsect of generating the SVG mountain range.
   * @returns {Object} Returns the results of the merge between the target and source objects.
   * 
   * @memberOf SVGMountainRange
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
