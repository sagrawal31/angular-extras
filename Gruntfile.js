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
    uglify: {
      build: {
        files: {
          '<%=yeoman.dist %>/angular-extras.min.js': ['<%=yeoman.src %>/app.js'],
          '<%=yeoman.dist %>/angular-extras-dom.min.js': ['<%=yeoman.src %>/extras/dom.js'],
          '<%=yeoman.dist %>/angular-extras-array.min.js': ['<%=yeoman.src %>/extras/array.js'],
          '<%=yeoman.dist %>/angular-extras-form-directives.min.js': ['<%=yeoman.src%>/directives/form/**.js'],
          '<%=yeoman.dist %>/angular-extras-list-directives.min.js': ['<%=yeoman.src%>/directives/list/**.js'],
          '<%=yeoman.dist %>/angular-extras-page-directives.min.js': ['<%=yeoman.src%>/directives/page/**.js'],
          '<%=yeoman.dist %>/angular-extras-services.min.js': ['<%=yeoman.src%>/services/**.js'],
          '<%=yeoman.dist %>/angular-extras-factories.min.js': ['<%=yeoman.src%>/factories/**.js']
        }
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
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
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      }
    }
  }, grunt.registerTask('default', ['uglify']));
};