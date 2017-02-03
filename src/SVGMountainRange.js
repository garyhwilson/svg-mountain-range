import Utils from './modules/Utils';
import Coords from './modules/Coords';
import Render from './modules/Render';

/**
 * Blah blah blah
 * 
 * @export
 * @class SVGMountainRange
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
    const utils = new Utils();
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
    } = utils.mergeDeep(defaultConfig, config);

    const coords = new Coords(stage, initPeaks, peaks, valleys, flats);
    const svg = new Render(coords, stage, valleys, fill, shadow, ridge);

    return svg;
  }

}
