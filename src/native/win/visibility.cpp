#include <windows.h>
#include <iostream>
#include "../visibility.h"

// Define WDA_EXCLUDEFROMCAPTURE if it's not available in the current SDK.
// This allows compiling with older toolchains while using modern features.
// The flag's value is 0x00000011.
#ifndef WDA_EXCLUDEFROMCAPTURE
#define WDA_EXCLUDEFROMCAPTURE 0x00000011
#endif

// The function now returns a boolean.
bool setWindowProtectedImpl(void* handle, bool enable) {
    HWND hwnd = static_cast<HWND>(handle);

    if (!IsWindow(hwnd)) {
        std::cerr << "SecureVisibility Error: The provided handle is not a valid window." << std::endl;
        return false;
    }

    // Use WDA_EXCLUDEFROMCAPTURE to make the window completely invisible during screen sharing.
    // Use WDA_NONE to revert to normal behavior.
    DWORD affinity = enable ? WDA_EXCLUDEFROMCAPTURE : WDA_NONE;

    BOOL result = SetWindowDisplayAffinity(hwnd, affinity);

    if (result == FALSE) {
        // Get and print the last error code from the OS for better debugging.
        DWORD errorCode = GetLastError();
        std::cerr << "SecureVisibility Error: SetWindowDisplayAffinity failed with OS error code: " << errorCode << std::endl;
        return false;
    }
    
    // If we reach here, the call was successful.
    return true;
}

