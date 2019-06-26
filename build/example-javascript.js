// Synopsis
// Terkin Telemetry client library for JavaScript
var terkin = require('./terkin');

var telemetry_node = new terkin.TelemetryNode(
    "https://daq.example.org/api",
    {
        "realm": "mqttkit-1",
        "network": "testdrive",
        "gateway": "terkin",
        "node": "js-node-01",
    }
);

var data = {"temperature": 42.84, "humidity": 83.01};
telemetry_node.transmit(data);
