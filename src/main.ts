import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { SecureVisibility } from './index';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    // Start with the window hidden to prevent content flashing
    show: false,
  });

  // Correctly load the index.html file from the project root.
  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));

  // NEW STRATEGY: Use the 'did-finish-load' event on webContents.
  // This event fires when the renderer process has finished loading the page,
  // which is typically one of the last events in the window setup process.
  // This provides the highest probability that the native window handle is stable and valid.
  mainWindow.webContents.once('did-finish-load', () => {
    SecureVisibility.protect(mainWindow);
  });
  // We still listen for 'ready-to-show' to manually show the window.
  // This ensures the window only appears after our 'did-finish-load' listener is attached.
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

