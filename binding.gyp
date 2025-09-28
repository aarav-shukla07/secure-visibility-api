{
  "targets": [
    {
      "target_name": "visibility_addon",
      "sources": [
        "src/native/main.cpp"
      ],
      "include_dirs": [
        "<!(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
      
      'conditions': [
        # Correct syntax for checking OS is 'OS=="win"'
        ['OS=="win"', {
          'sources': [
            'src/native/win/visibility.cpp'
          ],
          'msvs_settings': {
            'VCCLCompilerTool': {
              'AdditionalIncludeDirectories': [
                '<!(node -p "require(\'node-addon-api\').include")'
              ],
            },
          },
        }],
        ['OS=="mac"', {
          'sources': [
            'src/native/mac/visibility.mm'
          ],
          'xcode_settings': {
            'OTHER_LDFLAGS': [
              '-framework AppKit'
            ],
          },
        }],
        ['OS=="linux"', {
          'sources': [
            'src/native/linux/visibility.cpp'
          ]
        }]
      ]
    }
  ]
}

