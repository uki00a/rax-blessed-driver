import BlessedDriver from './driver';

export default createDriver(blessed = require('blessed'), screenOptions = {}) {
  return new BlessedDriver(blessed, screenOptions);
}
