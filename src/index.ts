import bindings from "bindings";
import type { BrowserWindow } from "electron";

let native: any;
try {
  if (process.platform === "win32") {
    native = bindings("windows_protect");
  } else if (process.platform === "darwin") {
    native = bindings("mac_protect");
  } else {
    native = bindings("linux_protect");
  }
} catch (err) {
  console.warn("Native secure display module not found:", err);
  native = {
    protectWindow: () => false,
    unprotectWindow: () => false,
  };
}

export function protectWindow(win: BrowserWindow) {
  if (!win) return false;
  const hwnd = win.getNativeWindowHandle();
  return native.protectWindow(hwnd);
}

export function unprotectWindow(win: BrowserWindow) {
  if (!win) return false;
  const hwnd = win.getNativeWindowHandle();
  return native.unprotectWindow(hwnd);
}
