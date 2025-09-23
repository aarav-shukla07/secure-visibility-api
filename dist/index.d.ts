/**
 * Prevents screen capture and recording of the specified window
 * @param hwnd - The window handle (from BrowserWindow.getNativeWindowHandle())
 * @returns true if successful, false otherwise
 * @throws Error if the operation fails
 */
export declare function preventCapture(hwnd: number): boolean;
/**
 * Allows screen capture and recording of the specified window (reverses preventCapture)
 * @param hwnd - The window handle (from BrowserWindow.getNativeWindowHandle())
 * @returns true if successful, false otherwise
 * @throws Error if the operation fails
 */
export declare function allowCapture(hwnd: number): boolean;
/**
 * Checks if capture prevention is currently active for the specified window
 * @param hwnd - The window handle (from BrowserWindow.getNativeWindowHandle())
 * @returns true if capture is prevented, false if capture is allowed
 * @throws Error if the operation fails
 */
export declare function isCapturePrevented(hwnd: number): boolean;
/**
 * Gets the current platform
 * @returns The platform string ('win32', 'darwin', 'linux')
 */
export declare function getPlatform(): string;
/**
 * Checks if the current platform is supported
 * @returns true if the platform is supported, false otherwise
 */
export declare function isPlatformSupported(): boolean;
//# sourceMappingURL=index.d.ts.map