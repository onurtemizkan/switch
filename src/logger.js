"use strict";

const colors = require("colors");

function logger() {
  return {
    set: (key, value) => {
      console.log("Setting feature " + colors.green(key) + " as " + colors.blue(value));
    },
    get: (key, value) => {
      console.log("Getting feature " + colors.green(key) + " as " + colors.blue(value));
    },
    notFound: (key) => {
      console.log(colors.yellow("No value found for key: ") + key);
    },
    error: (key, err) => {
      console.log(colors.yellow("Cannot get feature details of " + key + "\nError : " + err));
    }
  };
}

module.exports = logger();
