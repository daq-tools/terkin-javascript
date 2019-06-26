/**
 *
 * Terkin Telemetry Client
 * =======================
 *
 * About
 * -----
 * Terkin Telemetry client library for JavaScript, written in TypeScript.
 *
 * Terkin is a client-side library, framework and concept for doing telemetry on
 * embedded compute nodes usually resembling sensor nodes of a sensor network.
 *
 * https://github.com/daq-tools/terkin-javascript
 *
 */
import request from 'request';

export class TelemetryNode {
  /**
   *
   * Telemetry node client: Highlevel network participant API.
   *
   */

  api_uri: string;
  realm: string;
  network: string;
  gateway: string;
  node: string;

  channel_uri: string;

  client: TelemetryClient;

  constructor(api_uri, options) {
    this.api_uri = api_uri;
    this.realm   = options['realm'];
    this.network = options['network'];
    this.gateway = options['gateway'];
    this.node    = options['node'];

    this.channel_uri = `${this.api_uri}/${this.realm}/${this.network}/${this.gateway}/${this.node}`;
    console.log('Channel URI: ', this.channel_uri);

    this.client = new TelemetryClient(`${this.channel_uri}/data`);
  }

  transmit(data) {
    return this.client.transmit(data);
  }

}

export class TelemetryClient {
  /**
   *
   * Telemetry data client: Lowlevel API.
   *
   */
  
  uri: string;

  constructor(uri) {
    this.uri = uri;
  }

  transmit(data) {
    /**
     *
     * Submit telemetry data using HTTP POST request
     * Serialization: x-www-form-urlencoded
     *
     * https://github.com/request/request
     *
     */

    //$payload = http_build_query($data);

    // Use key 'http' even if you send the request to https://...
    const options = {
      method: 'POST',
      uri: this.uri,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      form: data,
    };

    const json_data = JSON.stringify(data);

    console.info(`Transmitting data ${json_data}.`);
    request(options, function(error, response, body) {
      if (error) {

        // Print the error if one occurred
        console.error(`Submitting telemetry data to '${options.uri}' failed: ${error}. data=${JSON.stringify(json_data)}`);

        // Print the response status code
        console.log('Response status:', response && response.statusCode);

        // Print the response.
        console.log('Response body:', body);

      } else {

        // Print the response.
        console.log('Request successful');
        console.log('Response body:', body);

      }
    });
    
  }

}
