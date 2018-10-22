cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "acidhax.cordova.chromecast.ChromecastApi",
    "file": "plugins/acidhax.cordova.chromecast/chrome.cast.js",
    "pluginId": "acidhax.cordova.chromecast",
    "clobbers": [
      "chrome.cast"
    ]
  },
  {
    "id": "acidhax.cordova.chromecast.EventEmitter",
    "file": "plugins/acidhax.cordova.chromecast/EventEmitter.js",
    "pluginId": "acidhax.cordova.chromecast"
  },
  {
    "id": "acidhax.cordova.chromecast.tests",
    "file": "plugins/acidhax.cordova.chromecast/tests/tests.js",
    "pluginId": "acidhax.cordova.chromecast"
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-crosswalk-webview": "2.4.0",
  "cordova-android-support-gradle-release": "1.4.5",
  "cordova-support-google-services": "1.2.1",
  "acidhax.cordova.chromecast": "0.0.1-alpha"
};
// BOTTOM OF METADATA
});