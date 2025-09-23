# This file configures node-gyp to compile the native C++ addon.
# It defines the source files and platform-specific settings.
{
  'targets': [
    {
      'target_name': 'visibility_addon',
      'sources': [
        'src/native/main.cpp'
      ],
      'include_dirs': [
        "<!(node -p \"require('node-addon-api').include\")"
      ],
      'dependencies': [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      'cflags!': ['-fno-exceptions'],
      'cflags_cc!': ['-fno-exceptions'],
      'xcode_settings': {
        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        'CLANG_CXX_LIBRARY': 'libc++',
        'MACOSX_DEPLOYMENT_TARGET': '10.13' # Set a reasonable deployment target
      },
      'msvs_settings': {
        'VCCLCompilerTool': { 
          'ExceptionHandling': 1,
          # This line explicitly tells the Windows compiler where to find napi.h
          'AdditionalIncludeDirectories': [
            '<!(node -p "require(\'node-addon-api\').include")'
          ]
        },
      },
      'conditions': [
        ['OS=="win"', {
          'sources': ['src/native/win/visibility.cpp'],
          'libraries': ['-luser32'] # Link against the User32 library for WinAPI functions
        }],
        ['OS=="mac"', {
          'sources': ['src/native/mac/visibility.mm'], # .mm for Objective-C++
          'xcode_settings': {
            'OTHER_LDFLAGS': ['-framework AppKit', '-framework CoreGraphics']
          }
        }],
        ['OS=="linux"', {
          'sources': ['src/native/linux/visibility.cpp'],
          'libraries': ['-lX11'] # Link against the X11 library
        }]
      ]
    }
  ]
}

