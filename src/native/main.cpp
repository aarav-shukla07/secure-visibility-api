#include <napi.h>
#include "visibility.h"

// This function now returns a Napi::Value (a boolean)
Napi::Value SetWindowProtected(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 2 || !info[0].IsBuffer() || !info[1].IsBoolean()) {
        Napi::TypeError::New(env, "Expected a Buffer (window handle) and a Boolean (enable)").ThrowAsJavaScriptException();
        // Returning undefined here as an exception is thrown.
        return env.Undefined();
    }

    Napi::Buffer<uint8_t> handleBuffer = info[0].As<Napi::Buffer<uint8_t>>();
    bool enable = info[1].As<Napi::Boolean>().Value();

    // *** THE CRITICAL FIX ***
    // The Buffer's data is the raw pointer value. We need to dereference it.
    // This correctly interprets the bytes inside the buffer as the window handle.
    void* handle = *reinterpret_cast<void**>(handleBuffer.Data());

    // Call the implementation and get the true/false result
    bool success = setWindowProtectedImpl(handle, enable);

    // Return the result to JavaScript
    return Napi::Boolean::New(env, success);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "setWindowProtected"), Napi::Function::New(env, SetWindowProtected));
    return exports;
}

NODE_API_MODULE(visibility_addon, Init)

