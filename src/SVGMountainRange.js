import Utils from './modules/Utils';
import Coords from './modules/Coords';
import Render from './modules/Render';

export default class SVGMountainRange {

  constructor(obj) {
    const utils = new Utils();

    const config = obj || { };
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

    this._config = utils.mergeDeep(defaultConfig, config);

    const {
      initPeaks,
      stage,
      peaks,
      fill,
      shadow,
      ridge,
      valleys,
      flats
    } = this._config;

    const coords = new Coords(stage, initPeaks, peaks, valleys, flats);
    const svg = new Render(coords, stage, valleys, fill, shadow, ridge);

    return svg;
  }

}
