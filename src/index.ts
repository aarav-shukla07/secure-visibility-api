import bindings = require("bindings");
const native = bindings("protect");

export function preventCapture(hwnd: number): boolean {
  return native.preventCapture(hwnd);
}
