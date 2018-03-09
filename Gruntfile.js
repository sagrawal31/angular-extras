/* global module:false */

'use strict';

module.exports = function (grunt) {
  var yeomanConfig;
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  yeomanConfig = {
    src: 'src',
    dist: 'dist'
  };

  return grunt.initConfig({
    yeoman: yeomanConfig,
    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%=yeoman.src %>',
          src: '**/*.js',
          dest: '.tmp/scripts'
        }]
      }
    },
    uglify: {
      build: {
        files: [{
          '<%=yeoman.dist %>/core.min.js': ['.tmp/scripts/app.js', '.tmp/scripts/browser.js', '.tmp/scripts/config.js'],
          '<%=yeoman.dist %>/dom.min.js': ['.tmp/scripts/extras/dom.js'],
          '<%=yeoman.dist %>/array.min.js': ['.tmp/scripts/extras/array.js'],
          '<%=yeoman.dist %>/form-directives.min.js': ['.tmp/scripts/directives/form/**.js'],
          '<%=yeoman.dist %>/list-directives.min.js': ['.tmp/scripts/directives/list/**.js'],
          '<%=yeoman.dist %>/number-directives.min.js': ['.tmp/scripts/directives/number/**.js'],
          '<%=yeoman.dist %>/page-directives.min.js': ['.tmp/scripts/directives/page/**.js'],
          '<%=yeoman.dist %>/table-directives.min.js': ['.tmp/scripts/directives/table/**.js'],
          '<%=yeoman.dist %>/factories.min.js': ['.tmp/scripts/factories/**.js'],
          '<%=yeoman.dist %>/filters.min.js': ['.tmp/scripts/filters/**.js'],
          '<%=yeoman.dist %>/ng-table-extras.min.js': ['.tmp/scripts/ng-table/**.js'],
          '<%=yeoman.dist %>/spinner.min.js': ['.tmp/scripts/spinner/**.js']
        }, {
          expand: true,
          cwd: '<%=yeoman.src%>/services',
          src: '**/*',
          dest: '<%=yeoman.dist %>',
          rename: function (dest, matchedSrcPath) {
            return dest + '/' + matchedSrcPath.replace('.js', '.min.js');
          }
        }, {
          expand: true,
          cwd: '<%=yeoman.src%>/directives/extend',
          src: '**/*',
          dest: '<%=yeoman.dist %>',
          rename: function (dest, matchedSrcPath) {
            return dest + '/' + matchedSrcPath.replace('.js', '.min.js');
          }
        }]
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        metadata: '',
        regExp: false
      }
    },
    watch: {
      scripts: {
        files: ['<%=yeoman.src %>/**/*.js'],
        tasks: ['ngAnnotate', 'uglify'],
        options: {
          spawn: false
        }
      }
    }
  }, grunt.registerTask('default', ['ngAnnotate', 'uglify']));
};