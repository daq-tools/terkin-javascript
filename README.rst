.. image:: https://img.shields.io/github/tag/daq-tools/terkin-javascript.svg
    :target: https://github.com/daq-tools/terkin-javascript

|

.. figure:: https://ptrace.getkotori.org/2019-06-26_terkin-squirrel-small.png
    :target: https://ptrace.getkotori.org/2019-06-26_terkin-squirrel-small.png


######################################
Terkin Telemetry Client for JavaScript
######################################

*****
About
*****
Terkin Telemetry client library for JavaScript, written in TypeScript.

Terkin is a client-side library, framework and concept for doing telemetry on
embedded compute nodes usually resembling sensor nodes of a sensor network.


********
Synopsis
********
::

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


***********
Development
***********


Setup
=====
::

    yarn install


Operation
=========
Compile TypeScript in ``./src`` folder to JavaScript in ``./build`` folder::

    yarn compile

Run example program to publish single measurement reading::

    yarn run-example

Run example program to publish synthesized sawtooth signal::

    yarn run-sawtooth

Hacking
=======
Continuously watch the filesystem and run example program on change::

    yarn watch-example

Continuously watch the filesystem and run sawtooth signal example program on change::

    yarn watch-sawtooth


----

********************
Content attributions
********************

The copyright of particular images and pictograms are held by their respective owners, unless otherwise noted.

Squirrel by Maria from the Noun Project. Creative Commons CC-BY.

- https://thenounproject.com/morika/
- https://thenounproject.com/term/squirrel/83208/
