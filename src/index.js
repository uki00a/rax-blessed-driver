import BlessedDriver from './driver';

export default function createDriver(blessed = require('blessed'), screenOptions = {}) {
  return new BlessedDriver(blessed, screenOptions);
}
