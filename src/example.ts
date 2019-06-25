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

// Acquire HTTP API library.
import TelemetryNode from './terkin';

// TelemetryNode object handle.
const telemetry:TelemetryNode = new TelemetryNode(
  "http://localhost:24642/api",
  {
    "realm": "mqttkit-1",
    "network": "testdrive",
    "gateway": "area-42",
    "node": "node-1",
  }
);

/*
  if ($argc > 2) {
    $command = $argv[1];
    $subcommand = $argv[2];
  }
*/

const command = 'run';
const subcommand = 'demo';

if (command == "run") {

  if (subcommand == "demo") {

    // Emit single sample of an example payload.
    const data = {"temperature": 42.84, "humidity": 83};
    console.log(telemetry.transmit(data));

  } else if (subcommand == "sawtooth") {
    /*
    date_default_timezone_set("Europe/Berlin");
    // Emit sample of a sawtooth signal each second, periodically
    while (true) {
      $data = array("second" => intval(strftime("%S")));
      var_dump($telemetry->transmit($data));
      sleep(1);
    }
    */
  }
}
