# Secure Visibility API

A cross-platform API for preventing screen capture and recording in Electron applications. This library allows developers to protect sensitive content from being captured during screen sharing, recording, or other screen capture scenarios.

## 🚀 Features

- **Cross-Platform Support**: Windows (✅), macOS (🚧), Linux (🚧)
- **Easy Integration**: Simple TypeScript/JavaScript API
- **Native Performance**: Direct OS-level API integration
- **Privacy Protection**: Prevents content from appearing in screen captures
- **Reversible**: Can enable/disable protection dynamically

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Platform Support](#platform-support)
- [Examples](#examples)
- [Building from Source](#building-from-source)
- [Contributing](#contributing)
- [License](#license)

## 🛠 Installation

```bash
npm install secure-visibility-api
```

### Prerequisites

- Node.js 14.0.0 or higher
- Electron 10.0.0 or higher
- Platform-specific build tools (see [Building from Source](#building-from-source))

## 🚀 Quick Start

```typescript
import { preventCapture, allowCapture, isCapturePrevented } from 'secure-visibility-api';
import { BrowserWindow } from 'electron';

// Create your Electron window
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
  }
});

// Get the native window handle
const hwnd = mainWindow.getNativeWindowHandle();

// Prevent screen capture
try {
  const success = preventCapture(hwnd);
  if (success) {
    console.log('Screen capture prevention enabled');
  }
} catch (error) {
  console.error('Failed to prevent capture:', error);
}

// Check if capture is prevented
const isProtected = isCapturePrevented(hwnd);
console.log('Window is protected:', isProtected);

// Allow capture again (if needed)
allowCapture(hwnd);
```

## 📚 API Reference

### `preventCapture(hwnd: number): boolean`

Prevents screen capture and recording of the specified window.

**Parameters:**
- `hwnd` - The window handle from `BrowserWindow.getNativeWindowHandle()`

**Returns:**
- `boolean` - `true` if successful, `false` otherwise

**Throws:**
- `Error` - If the operation fails or invalid parameters are provided

### `allowCapture(hwnd: number): boolean`

Allows screen capture and recording of the specified window (reverses `preventCapture`).

**Parameters:**
- `hwnd` - The window handle from `BrowserWindow.getNativeWindowHandle()`

**Returns:**
- `boolean` - `true` if successful, `false` otherwise

**Throws:**
- `Error` - If the operation fails or invalid parameters are provided

### `isCapturePrevented(hwnd: number): boolean`

Checks if capture prevention is currently active for the specified window.

**Parameters:**
- `hwnd` - The window handle from `BrowserWindow.getNativeWindowHandle()`

**Returns:**
- `boolean` - `true` if capture is prevented, `false` if capture is allowed

**Throws:**
- `Error` - If the operation fails or invalid parameters are provided

### `getPlatform(): string`

Gets the current platform.

**Returns:**
- `string` - The platform string (`'win32'`, `'darwin'`, `'linux'`)

### `isPlatformSupported(): boolean`

Checks if the current platform is supported.

**Returns:**
- `boolean` - `true` if the platform is supported, `false` otherwise

## 🖥 Platform Support

| Platform | Status | API Used | Notes |
|----------|--------|----------|-------|
| Windows | ✅ Supported | `SetWindowDisplayAffinity` | Full support with `WDA_MONITOR` |
| macOS | 🚧 In Development | Core Graphics APIs | Planned implementation |
| Linux | 🚧 In Development | X11/Wayland APIs | Limited support due to platform restrictions |

### Windows Implementation

Uses the Windows API `SetWindowDisplayAffinity` with `WDA_MONITOR` flag to prevent:
- Screen capture tools (Snipping Tool, etc.)
- Screen recording software
- Remote desktop applications
- Screen sharing in video conferencing apps

## 💡 Examples

### Basic Usage

```typescript
import { preventCapture, allowCapture } from 'secure-visibility-api';
import { BrowserWindow, ipcMain } from 'electron';

const mainWindow = new BrowserWindow({
  width: 1200,
  height: 800
});

// Enable protection when window is ready
mainWindow.once('ready-to-show', () => {
  const hwnd = mainWindow.getNativeWindowHandle();
  preventCapture(hwnd);
});

// IPC handlers for dynamic control
ipcMain.handle('enable-protection', () => {
  const hwnd = mainWindow.getNativeWindowHandle();
  return preventCapture(hwnd);
});

ipcMain.handle('disable-protection', () => {
  const hwnd = mainWindow.getNativeWindowHandle();
  return allowCapture(hwnd);
});
```

### Advanced Usage with Error Handling

```typescript
import { 
  preventCapture, 
  allowCapture, 
  isCapturePrevented, 
  isPlatformSupported 
} from 'secure-visibility-api';

class WindowProtection {
  private hwnd: number;
  private isProtected: boolean = false;

  constructor(hwnd: number) {
    this.hwnd = hwnd;
  }

  async enableProtection(): Promise<boolean> {
    if (!isPlatformSupported()) {
      throw new Error('Platform not supported');
    }

    try {
      this.isProtected = preventCapture(this.hwnd);
      return this.isProtected;
    } catch (error) {
      console.error('Failed to enable protection:', error);
      return false;
    }
  }

  async disableProtection(): Promise<boolean> {
    try {
      const result = allowCapture(this.hwnd);
      if (result) {
        this.isProtected = false;
      }
      return result;
    } catch (error) {
      console.error('Failed to disable protection:', error);
      return false;
    }
  }

  getProtectionStatus(): boolean {
    try {
      return isCapturePrevented(this.hwnd);
    } catch (error) {
      console.error('Failed to get protection status:', error);
      return false;
    }
  }
}
```

## 🔨 Building from Source

### Prerequisites

#### Windows
- Visual Studio 2019 or later with C++ build tools
- Windows SDK

#### macOS
- Xcode Command Line Tools
- macOS SDK

#### Linux
- GCC/G++ compiler
- Python 3.x
- make

### Build Commands

```bash
# Install dependencies
npm install

# Build TypeScript and native modules
npm run build

# Build only TypeScript
npm run build:ts

# Build only native modules
npm run build:native

# Clean build artifacts
npm run clean

# Run tests
npm test
```

### Platform-Specific Builds

```bash
# Windows
npm run build:native:win32

# macOS (when implemented)
npm run build:native:darwin

# Linux (when implemented)
npm run build:native:linux
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run example app
npm run example
```

## ⚠️ Important Notes

1. **Window Handle**: Always use `BrowserWindow.getNativeWindowHandle()` to get the correct window handle
2. **Timing**: Apply protection after the window is fully loaded and visible
3. **Platform Limitations**: Some platforms may have limited or no support for capture prevention
4. **Performance**: Native modules provide optimal performance with minimal overhead
5. **Security**: This library prevents visual capture but doesn't protect against other forms of data extraction

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Create a feature branch
5. Make your changes
6. Add tests for new functionality
7. Run tests: `npm test`
8. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Windows implementation based on Microsoft's `SetWindowDisplayAffinity` API
- Inspired by the need for privacy protection in Electron applications
- Built with Node.js Native Addons API

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/aarav-shukla07/secure-visibility-api/issues) page
2. Create a new issue with detailed information
3. Include your platform, Node.js version, and Electron version

---

**Made with ❤️ for the Electron community**
