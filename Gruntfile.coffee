'use strict'

module.exports = (grunt) ->

  require('load-grunt-tasks') grunt

  require('time-grunt') grunt

  grunt.initConfig

    yeoman:
      app: require('./bower.json').appPath or 'app'
      dist: 'dist'


    express:
      options:
        port: process.env.PORT or 9000

      dev:
        options:
          script: 'server.js'
          debug: true

      prod:
        options:
          script: 'dist/server.js'
          node_env: 'production'


    open:
      server:
        url: 'http://localhost:<%= express.options.port %>'


    watch:
      coffee:
        files: ['<%= yeoman.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}']
        tasks: ['newer:coffee:dist']

      coffeeTest:
        files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}']
        tasks: [
          'newer:coffee:test'
          'karma'
        ]

      compass:
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}']
        tasks: [
          'compass:server'
          'autoprefixer'
        ]

      gruntfile:
        files: ['Gruntfile.js']

      livereload:
        files: [
          '<%= yeoman.app %>/views/{,*//*}*.{html,jade}'
          '{.tmp,<%= yeoman.app %>}/styles/{,*//*}*.css'
          '{.tmp,<%= yeoman.app %>}/scripts/{,*//*}*.js'
          '<%= yeoman.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
        options:
          livereload: true

      express:
        files: [
          'server.js'
          'lib/**/*.{js,json}'
        ]
        tasks: [
          'newer:jshint:server'
          'express:dev'
          'wait'
        ]
        options:
          livereload: true
          nospawn: true # Without this option specified express won't be reloaded


    jshint:
      options:
        jshintrc: '.jshintrc'
        reporter: require('jshint-stylish')

      server:
        options:
          jshintrc: 'lib/.jshintrc'

        src: ['lib/{,*/}*.js']

      all: []


    clean:
      dist:
        files: [
          dot: true
          src: [
            '.tmp'
            '<%= yeoman.dist %>/*'
            '!<%= yeoman.dist %>/.git*'
            '!<%= yeoman.dist %>/Procfile'
          ]
        ]

      heroku:
        files: [
          dot: true
          src: [
            'heroku/*'
            '!heroku/.git*'
            '!heroku/Procfile'
          ]
        ]

      server: '.tmp'


    autoprefixer:
      options:
        browsers: ['last 1 version']

      dist:
        files: [
          expand: true
          cwd: '.tmp/styles/'
          src: '{,*/}*.css'
          dest: '.tmp/styles/'
        ]


    'node-inspector':
      custom:
        options:
          'web-host': 'localhost'


    nodemon:
      debug:
        script: 'server.js'
        options:
          nodeArgs: ['--debug-brk']
          env:
            PORT: process.env.PORT or 9000

          callback: (nodemon) ->
            nodemon.on 'log', (event) ->
              console.log event.colour
              return


            # opens browser on initial server start
            nodemon.on 'config:update', ->
              setTimeout (->
                require('open') 'http://localhost:8080/debug?port=5858'
                return
              ), 500
              return

            return


    'bower-install':
      app:
        html: '<%= yeoman.app %>/views/index.jade'
        ignorePath: '<%= yeoman.app %>/'
        exclude: ['bootstrap-sass']


    coffee:
      options:
        sourceMap: true
        sourceRoot: ''

      dist:
        files: [
          expand: true
          cwd: '<%= yeoman.app %>/scripts'
          src: '{,*/}*.coffee'
          dest: '.tmp/scripts'
          ext: '.js'
        ]

      test:
        files: [
          expand: true
          cwd: 'test/client/spec'
          src: '{,*/}*.coffee'
          dest: '.tmp/client/spec'
          ext: '.js'
        ]


    compass:
      options:
        sassDir: '<%= yeoman.app %>/styles'
        cssDir: '.tmp/styles'
        generatedImagesDir: '.tmp/images/generated'
        imagesDir: '<%= yeoman.app %>/images'
        javascriptsDir: '<%= yeoman.app %>/scripts'
        fontsDir: '<%= yeoman.app %>/styles/fonts'
        importPath: '<%= yeoman.app %>/vendors'
        httpImagesPath: '/images'
        httpGeneratedImagesPath: '/images/generated'
        httpFontsPath: '/styles/fonts'
        relativeAssets: false
        assetCacheBuster: false
        raw: 'Sass::Script::Number.precision = 10\n'

      dist:
        options:
          generatedImagesDir: '<%= yeoman.dist %>/public/images/generated'

      server:
        options:
          debugInfo: true


    rev:
      dist:
        files:
          src: [
            '<%= yeoman.dist %>/public/scripts/{,*/}*.js'
            '<%= yeoman.dist %>/public/styles/{,*/}*.css'
            '<%= yeoman.dist %>/public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            '<%= yeoman.dist %>/public/styles/fonts/*'
          ]


    useminPrepare:
      html: [
        '<%= yeoman.app %>/views/index.html'
        '<%= yeoman.app %>/views/index.jade'
      ]
      options:
        dest: '<%= yeoman.dist %>/public'


    usemin:
      html: [
        '<%= yeoman.dist %>/views/{,*/}*.html'
        '<%= yeoman.dist %>/views/{,*/}*.jade'
      ]
      css: ['<%= yeoman.dist %>/public/styles/{,*/}*.css']
      options:
        assetsDirs: ['<%= yeoman.dist %>/public']


    imagemin:
      dist:
        files: [
          expand: true
          cwd: '<%= yeoman.app %>/images'
          src: '{,*/}*.{png,jpg,jpeg,gif}'
          dest: '<%= yeoman.dist %>/public/images'
        ]

    svgmin:
      dist:
        files: [
          expand: true
          cwd: '<%= yeoman.app %>/images'
          src: '{,*/}*.svg'
          dest: '<%= yeoman.dist %>/public/images'
        ]

    htmlmin:
      dist:
        options: {}

      #collapseWhitespace: true,
      #collapseBooleanAttributes: true,
      #removeCommentsFromCDATA: true,
      #removeOptionalTags: true
        files: [
          expand: true
          cwd: '<%= yeoman.app %>/views'
          src: [
            '*.html'
            'partials/**/*.html'
          ]
          dest: '<%= yeoman.dist %>/views'
        ]


    ngmin:
      dist:
        files: [
          expand: true
          cwd: '.tmp/concat/scripts'
          src: '*.js'
          dest: '.tmp/concat/scripts'
        ]


    cdnify:
      dist:
        html: ['<%= yeoman.dist %>/views/*.html']


    copy:
      dist:
        files: [
          {
            expand: true
            dot: true
            cwd: '<%= yeoman.app %>'
            dest: '<%= yeoman.dist %>/public'
            src: [
              '*.{ico,png,txt}'
              '.htaccess'
              'vendors/**/*'
              'images/{,*/}*.{webp}'
              'fonts/**/*'
            ]
          }
          {
            expand: true
            dot: true
            cwd: '<%= yeoman.app %>/views'
            dest: '<%= yeoman.dist %>/views'
            src: '**/*.jade'
          }
          {
            expand: true
            cwd: '.tmp/images'
            dest: '<%= yeoman.dist %>/public/images'
            src: ['generated/*']
          }
          {
            expand: true
            dest: '<%= yeoman.dist %>'
            src: [
              'package.json'
              'server.js'
              'lib/**/*'
            ]
          }
        ]

      styles:
        expand: true
        cwd: '<%= yeoman.app %>/styles'
        dest: '.tmp/styles/'
        src: '{,*/}*.css'


    concurrent:
      server: [
        'coffee:dist'
        'compass:server'
      ]
      test: [
        'coffee'
        'compass'
      ]
      debug:
        tasks: [
          'nodemon'
          'node-inspector'
        ]
        options:
          logConcurrentOutput: true

      dist: [
        'coffee'
        'compass:dist'
        'imagemin'
        'svgmin'
        'htmlmin'
      ]


  # By default, your `index.html`'s <!-- Usemin block --> will take care of
  # minification. These next options are pre-configured if you do not wish
  # to use the Usemin blocks.
  # cssmin: {
  #   dist: {
  #     files: {
  #       '<%= yeoman.dist %>/styles/main.css': [
  #         '.tmp/styles/{,*/}*.css',
  #         '<%= yeoman.app %>/styles/{,*/}*.css'
  #       ]
  #     }
  #   }
  # },
  # uglify: {
  #   dist: {
  #     files: {
  #       '<%= yeoman.dist %>/scripts/scripts.js': [
  #         '<%= yeoman.dist %>/scripts/scripts.js'
  #       ]
  #     }
  #   }
  # },
  # concat: {
  #   dist: {}
  # },

  # Test settings
    karma:
      unit:
        configFile: 'karma.conf.js'
        singleRun: true

    mochaTest:
      options:
        reporter: 'spec'

      src: ['test/server/**/*.js']

    env:
      test:
        NODE_ENV: 'test'


  # Used for delaying livereload until after server has restarted
  grunt.registerTask 'wait', ->
    grunt.log.ok 'Waiting for server reload...'
    done = @async()
    setTimeout (->
      grunt.log.writeln 'Done waiting!'
      done()
      return
    ), 500
    return

  grunt.registerTask 'express-keepalive', 'Keep grunt running', ->
    @async()
    return

  grunt.registerTask 'server', (target) ->
    if target is 'dist'
      return grunt.task.run([
        'build'
        'express:prod'
        # 'open'
        'express-keepalive'
      ])
    if target is 'debug'
      return grunt.task.run([
        'clean:server'
        'bower-install'
        'concurrent:server'
        'autoprefixer'
        'concurrent:debug'
      ])
    grunt.task.run [
      'clean:server'
      'bower-install'
      'concurrent:server'
      'autoprefixer'
      'express:dev'
      # 'open'
      'watch'
    ]
    return

#  grunt.registerTask 'server', ->
#    grunt.log.warn 'The `server` task has been deprecated. Use `grunt serve` to start a server.'
#    grunt.task.run ['serve']
#    return

  grunt.registerTask 'test', (target) ->
    if target is 'server'
      return grunt.task.run([
        'env:test'
        'mochaTest'
      ])
    if target is 'client'
      return grunt.task.run([
        'clean:server'
        'concurrent:test'
        'autoprefixer'
        'karma'
      ])
    grunt.task.run [
      'env:test'
      'mochaTest'
      'clean:server'
      'concurrent:test'
      'autoprefixer'
      'karma'
    ]
    return

  grunt.registerTask 'build', [
    'clean:dist'
    'bower-install'
    'useminPrepare'
    'concurrent:dist'
    'autoprefixer'
    'concat'
    'ngmin'
    'copy:dist'
    'cdnify'
    'cssmin'
    'uglify'
    'rev'
    'usemin'
  ]

  grunt.registerTask 'heroku', ->
    grunt.log.warn 'The `heroku` task has been deprecated. Use `grunt build` to build for deployment.'
    grunt.task.run ['build']
    return

  grunt.registerTask 'default', [
    'newer:jshint'
    'test'
    'build'
  ]

  return