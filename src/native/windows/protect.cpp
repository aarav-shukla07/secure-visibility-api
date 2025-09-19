#include <napi.h>
#include <windows.h>

Napi::Boolean ProtectWindow(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsBuffer()) {
        Napi::TypeError::New(env, "Expected Buffer").ThrowAsJavaScriptException();
        return Napi::Boolean::New(env, false);
    }

    auto buffer = info[0].As<Napi::Buffer<char>>();
    HWND hwnd = *reinterpret_cast<HWND*>(buffer.Data());

    BOOL result = SetWindowDisplayAffinity(hwnd, WDA_EXCLUDEFROMCAPTURE);
    return Napi::Boolean::New(env, result);
}

Napi::Boolean UnprotectWindow(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsBuffer()) {
        Napi::TypeError::New(env, "Expected Buffer").ThrowAsJavaScriptException();
        return Napi::Boolean::New(env, false);
    }

    auto buffer = info[0].As<Napi::Buffer<char>>();
    HWND hwnd = *reinterpret_cast<HWND*>(buffer.Data());

    BOOL result = SetWindowDisplayAffinity(hwnd, WDA_NONE);
    return Napi::Boolean::New(env, result);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("protectWindow", Napi::Function::New(env, ProtectWindow));
    exports.Set("unprotectWindow", Napi::Function::New(env, UnprotectWindow));
    return exports;
}

NODE_API_MODULE(windows_protect, Init)
