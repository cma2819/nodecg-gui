'use strict'

/* Define Constants in this script */

function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

// NodeCG URL
define('NODECG_URL', 'http://localhost:9090');

// Window size
define('MAIN_WINDOW_WIDTH', 1024);
define('MAIN_WINDOW_HEIGHT', 576);