// -*- coding: utf-8 -*-
/*
=======================================================
Terkin telemetry demo program for JavaScript/TypeScript
=======================================================

Documentation
-------------
https://github.com/daq-tools/terkin-javascript


Synopsis
--------
Run demonstration program from the command line::

    # Send fixed measurements "temperature" => 42.84, "humidity" => 83
    # to defined target sink.
    yarn run-demo

    # Send a periodic, slowly oscillating sawtooth signal.
    yarn run-sawtooth

*/

import process from 'process';

// Acquire HTTP API library.
import { TelemetryNode } from './terkin';


class Example {

  telemetry_node: TelemetryNode;

  constructor(telemetry_node) {
    this.telemetry_node = telemetry_node;
  }

  single() {
    // Emit single sample of an example payload.
    const data = {"temperature": 42.84, "humidity": 83.01};
    this.telemetry_node.transmit(data);

  }

  async sawtooth() {

    // Set timezone.
    //date_default_timezone_set("Europe/Berlin");

    // Emit sample of a sawtooth signal each second, periodically
    while (true) {
      const data = {second: new Date().getUTCSeconds()};
      this.telemetry_node.transmit(data);
      await this.sleep(1000);
    }

  }

  sleep(ms) {
    // https://stackoverflow.com/questions/14249506/how-can-i-wait-in-node-js-javascript-l-need-to-pause-for-a-period-of-time
    // https://github.com/nodejs/node-v0.x-archive/issues/7283
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    })
  }

}

function main() {

  // Read command line arguments.
  let action;
  if (process.argv.length > 1) {
    action = process.argv[2];

  } else {
    action = 'single';
  }

  // Create TelemetryNode object handle.
  const telemetry:TelemetryNode = new TelemetryNode(
    "https://daq.example.org/api",
    {
      "realm": "mqttkit-1",
      "network": "testdrive",
      "gateway": "terkin",
      "node": "js-node-01",
    }
  );

  // Run example scenario.
  const example = new Example(telemetry);
  if (action == 'single') {
    example.single();

  } else if (action == 'sawtooth') {
    example.sawtooth();

  } else {
    console.error(`Action "${action}" undefined.`);

  }

}

main();
