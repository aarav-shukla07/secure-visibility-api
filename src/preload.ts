import { contextBridge, ipcRenderer } from 'electron';

// Expose a safe, limited API to the renderer process
contextBridge.exposeInMainWorld('api', {
  toggleProtection: (protect: boolean) => {
    ipcRenderer.send('toggle-protection', protect);
  },
});
