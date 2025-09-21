"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preventCapture = preventCapture;
const bindings = require("bindings");
const native = bindings("protect");
function preventCapture(hwnd) {
    return native.preventCapture(hwnd);
}
//# sourceMappingURL=index.js.map