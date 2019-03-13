# Tundra CLI

Tundra is a Javascript test data management utility to help streamline http data capture for end-to-end testing. The main goal is to help applications easily implement cold storage testing. To do this, Tundra uses a client-server model:

**Server**

The server listens for requests sent to it by the client and records the traffic in a specific profile.

**Client**

The client is embedded in the application and helps do two things:
* While executing a manual test runthrough, it will forward all commands sent to the the http library (e.g. fetch) to the Tundra server for offline storage.
* Additionally, when you're ready to execute an end-to-end test, the client will replay all http traffic back to the application.

## Try it out!

### Install the CLI Globally

`npm install -g tundra-cli`

### Choose an Adapter

Choose the right adapter based on the http library you use within your application:

| Http Library | Adapter |
| ------ | ------ |
| Fetch | `npm install tundra-fetch --save` |
| Axios | Coming Soon |

### Start the Tundra Server

Execute the following in a terminal at the root of your project: `tundra -f fixtures`
This will start a server at `http://localhost:9091/requests` to accept requests from an adapter.

| Parameter | Description |
| ------ | ------ |
| -p, --port | [default: 9091] The port of the Tundra server |
| -f, --fixtures-directory | [Optional] The directory of the `fixtures` folder in your project |

### Embed Tundra Adapter

Within your app, embed a compatible Tundra adapter

| Adapter | Documentation |
| ------ | ------ |
| Fetch | Coming Soon |
| Axios | Coming Soon |

### Run a Manual Test

With the server started and the client embedded and wiretapping in your application, you are all set. Simply run through your manual test with live data just as you normally would.

### Save Profile

When you are done with your manual test, go to the server console and enter the `stop` command. This will stop the server and store the http traffic in a .json file at `{fixturesDirectory}/profiles/{profileName}.json`.

### Done!

Nice. You can follow the instructions for your particular client/adapter to replay the traffic during an end-to-end test.
