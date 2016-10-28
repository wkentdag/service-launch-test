# service-launch-test

Test repo to demonstrate inability to launch an app executable inside a `node-windows` Windows Service (re: [`node-windows#138`](https://github.com/coreybutler/node-windows/issues/138)).

This is just a simple script that launches an arbitrary `.exe` file via `execa` (google chrome by default). It works as intended when run normally (`node app.js`), but fails to actually launch the application when run inside of the windows service (`node service.js`).


## Setup
* `npm install`

## Steps to Reproduce
* install Chrome and close any active windows
* `node app.js`
  * :+1: chrome is now open!
* `node service.js`
  * :-1: nothing happened...
  * ...even though `daemon\testlaunch.out.log` indicates that the script was fired and there is no error output in `daemon\testlaunch.err.log`

## Notes
* This script launches Google Chrome just as a convenient example. The app I'm actually trying to launch is an Electron-bundled password manager called [Buttercup](https://github.com/buttercup-pw/buttercup/releases/tag/v0.2.0-alpha), which you can demo in this repo by changing `app.js:L9` to `execa(myAppExe)` after installing buttercup.
* I noticed some differences in the script behavior depending on which app I tried to launch, which might be relevant:
  * When launching either app via `node app.js`, the command prompt window is blocked until you `^C` the script. If the script is launching buttercup, it logs `app.js:L11-12` to the console as expected when you kill it; however, with chrome, it logs nothing. When the script is run inside the windows service, it never logs anything except for `executing...done` no matter what app you try to launch
* I tried executing a variety of different commands via the `node` cli or the service in order to eliminate any other potential bugs (as described in the node-windows issue):
  * running `execa('echo', ['unicorns'])` as suggested in the execa docs logs the expected output to the console or to the service log
  * running `execa('exit 3')` or other error-producing commands logs the expected error output to the console or the service error log
  * running `execa('absolute\path\to\launch.bat')` works with `node app.js` and runs inside the service but will not launch the app
  * launching the app asynchronously with `start`: works with `node app.js`, runs inside the service, doesn't launch the app
