import { BrowserWindow } from 'electron';
// Use the 'bindings' package to locate the native addon
const addon = require('bindings')('visibility_addon');

export const SecureVisibility = {
  protect(window: BrowserWindow): void {
    const handle = window.getNativeWindowHandle();
    try {
      // The native addon now returns true or false.
      const success: boolean = addon.setWindowProtected(handle, true);
      
      // Provide accurate logging based on the return value.
      if (success) {
        console.log('SecureVisibility: Window protection enabled successfully.');
      } else {
        console.error('SecureVisibility: Native module failed to enable window protection.');
      }
    } catch (e: any) {
      console.error('SecureVisibility Error: Failed to call native module.', e.message);
    }
  },

  unprotect(window: BrowserWindow): void {
    const handle = window.getNativeWindowHandle();
    try {
      const success: boolean = addon.setWindowProtected(handle, false);
      if (success) {
        console.log('SecureVisibility: Window protection disabled successfully.');
      } else {
        console.error('SecureVisibility: Native module failed to disable window protection.');
      }
    } catch (e: any) {
      console.error('SecureVisibility Error: Failed to call native module.', e.message);
    }
  },
};

