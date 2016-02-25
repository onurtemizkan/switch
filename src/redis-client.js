"use strict";

const redis = require("redis");
const l = require("./logger");

let client;

function init() {
  client = redis.createClient()
    .on("error", (err) => {
      console.log("Error " + err);
    });
}

function redisOps() {
  return {
    set: (key, value) => {
      if(!client) {
        init();
      }
      l.set(key, value);
      return client.set(key, value, redis.print);
    },
    get: (key, response) => {
      if(!client) {
        init();
      }
      let a;
      client.get(key, (err, res) => {
        if(!err) {
          if(res === null) {
            l.notFound(key);
            a = {
              success: false,
              result: res
            };
          } else {
            l.get(key, res);
            a = {
              success: true,
              result: res
            };
          }
        } else {
          l.error(key);
          a = {
            success: false,
            result: err
          };
        }
        response.json(a);
      });
    },
    getAll: (response) => {
      client.scan(0, (err, res) => {
        console.log(res);
        response.json(res[1]);
      });
    }
  };
}

module.exports = redisOps();
