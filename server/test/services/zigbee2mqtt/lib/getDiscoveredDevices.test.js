const { expect } = require('chai');
const sinon = require('sinon');

const Zigbee2MqttService = require('../../../../services/zigbee2mqtt');

const discoveredDevices = require('./payloads/discovered_devices.json');
const expectedDevicesPayload = require('./payloads/event_device_result.json');

const gladys = {
  stateManager: {
    get: {},
  },
};
const serviceId = 'f87b7af2-ca8e-44fc-b754-444354b42fee';

describe('zigbee2mqtt getDiscoveredDevices', () => {
  // PREPARE
  const zigbee2MqttService = Zigbee2MqttService(gladys, serviceId);

  beforeEach(() => {
    gladys.stateManager.get = sinon.stub();
  });

  it('get no discovered devices', async () => {
    // EXECUTE
    const devices = zigbee2MqttService.device.getDiscoveredDevices();
    // ASSERT
    expect(devices).deep.eq([]);
  });

  it('get discovered devices', async () => {
    // PREPARE
    gladys.stateManager.get
      .onFirstCall()
      .returns(true)
      .onSecondCall()
      .returns(false)
      .onThirdCall()
      .returns(false);

    // EXECUTE
    zigbee2MqttService.device.discoveredDevices = discoveredDevices;
    const devices = zigbee2MqttService.device.getDiscoveredDevices();
    // ASSERT
    expect(devices).deep.eq(expectedDevicesPayload);
  });
});
