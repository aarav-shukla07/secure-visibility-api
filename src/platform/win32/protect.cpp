// src/platform/win32/protect.cpp
#include <napi.h>
#include <windows.h>

Napi::Boolean preventCapture(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Expected a window handle").ThrowAsJavaScriptException();
        return Napi::Boolean::New(env, false);
    }

    // Get the HWND from JavaScript (BrowserWindow.getNativeWindowHandle)
    HWND hwnd = (HWND)(uintptr_t)info[0].As<Napi::Number>().Int64Value();

    BOOL result = SetWindowDisplayAffinity(hwnd, WDA_MONITOR);

    return Napi::Boolean::New(env, result);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("preventCapture", Napi::Function::New(env, preventCapture));
    return exports;
}

NODE_API_MODULE(protect, Init)
