'use strict'

let nodecg = null;
/**
 * This start NodeCG index.
 */
async function start() {
    nodecg = require('nodecg');
    return Promise.resolve();
}
module.exports.start = start;