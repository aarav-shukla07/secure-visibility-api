#import <AppKit/AppKit.h>
#include <napi.h>

void setWindowVisibility(void* handle, bool preventCapture) {
    // On macOS, the native handle from Electron is a pointer to the NSView.
    NSView* view = (__bridge NSView*)handle;
    if (!view) {
        return;
    }

    NSWindow* window = [view window];
    if (!window) {
        return;
    }

    // Set the window's sharing type.
    // NSWindowSharingTypeNone prevents the content from being captured.
    // NSWindowSharingTypeReadWrite is the default.
    NSWindowSharingType sharingType = preventCapture ? NSWindowSharingTypeNone : NSWindowSharingTypeReadWrite;
    
    // Ensure this is run on the main thread, as it's a UI operation.
    dispatch_async(dispatch_get_main_queue(), ^{
        [window setSharingType:sharingType];
    });
}
