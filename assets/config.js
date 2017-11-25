var ver = {
    ng: '4.0.3'
  };
  
  System.config({
  //use typescript for compilation
  transpiler: 'typescript',
  //typescript compiler options
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  map: {

    'app': './src',

    '@angular/core': 'npm:@angular/core@' + ver.ng + '/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common@' + ver.ng + '/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler@' + ver.ng + '/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser@' + ver.ng + '/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@' + ver.ng + '/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http@' + ver.ng + '/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router@' + ver.ng + '/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms@' + ver.ng + '/bundles/forms.umd.js',

    'rxjs': 'npm:rxjs@^5.0.1',
    'typescript': 'npm:typescript@2.1.5/lib/typescript.js',

    '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap@1.0.0-beta.5/bundles/ng-bootstrap.js'
  },
  packages: {
    app: {
      main: './main.ts',
      defaultExtension: 'ts'
    },
    rxjs: {
      defaultExtension: 'js'
    }
  }
});
var ver = {
    ng: '4.0.3'
  };
  
  System.config({
  //use typescript for compilation
  transpiler: 'typescript',
  //typescript compiler options
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  map: {

    'app': './src',

    '@angular/core': 'npm:@angular/core@' + ver.ng + '/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common@' + ver.ng + '/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler@' + ver.ng + '/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser@' + ver.ng + '/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@' + ver.ng + '/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http@' + ver.ng + '/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router@' + ver.ng + '/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms@' + ver.ng + '/bundles/forms.umd.js',

    'rxjs': 'npm:rxjs@^5.0.1',
    'typescript': 'npm:typescript@2.1.5/lib/typescript.js',

    '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap@1.0.0-beta.5/bundles/ng-bootstrap.js'
  },
  packages: {
    app: {
      main: './main.ts',
      defaultExtension: 'ts'
    },
    rxjs: {
      defaultExtension: 'js'
    }
  }
});
