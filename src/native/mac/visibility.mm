#import <Cocoa/Cocoa.h>
#include <iostream>
#include "../visibility.h"

// This is the final, production-ready implementation for macOS.
bool setWindowProtectedImpl(void* handle, bool enable) {
    // On macOS, Electron provides a handle to the NSView, not the NSWindow directly.
    NSView* view = static_cast<NSView*>(handle);

    // We can get the parent window from the view.
    NSWindow* window = [view window];

    if (!window) {
        std::cerr << "SecureVisibility Error (macOS): Could not get NSWindow from the provided handle." << std::endl;
        return false;
    }

    // All UI updates on macOS must happen on the main thread for stability.
    // We dispatch our code to the main queue to ensure thread safety.
    dispatch_async(dispatch_get_main_queue(), ^{
        if (enable) {
            // NSWindowSharingNone prevents the window's contents from being captured by other apps.
            // This makes it invisible in screen recordings and shares.
            [window setSharingType:NSWindowSharingNone];
        } else {
            // NSWindowSharingReadOnly is the default, allowing the window to be seen.
            [window setSharingType:NSWindowSharingReadOnly];
        }
    });

    // Return true to indicate the command was successfully dispatched.
    return true;
}

