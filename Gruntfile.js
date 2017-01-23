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
        files: [{
          '<%=yeoman.dist %>/core.min.js': ['<%=yeoman.src %>/app.js', '<%=yeoman.src %>/browser.js'],
          '<%=yeoman.dist %>/dom.min.js': ['<%=yeoman.src %>/extras/dom.js'],
          '<%=yeoman.dist %>/array.min.js': ['<%=yeoman.src %>/extras/array.js'],
          '<%=yeoman.dist %>/form-directives.min.js': ['<%=yeoman.src%>/directives/form/**.js'],
          '<%=yeoman.dist %>/list-directives.min.js': ['<%=yeoman.src%>/directives/list/**.js'],
          '<%=yeoman.dist %>/number-directives.min.js': ['<%=yeoman.src%>/directives/number/**.js'],
          '<%=yeoman.dist %>/page-directives.min.js': ['<%=yeoman.src%>/directives/page/**.js'],
          '<%=yeoman.dist %>/table-directives.min.js': ['<%=yeoman.src%>/directives/table/**.js'],
          '<%=yeoman.dist %>/factories.min.js': ['<%=yeoman.src%>/factories/**.js'],
          '<%=yeoman.dist %>/filters.min.js': ['<%=yeoman.src%>/filters/**.js'],
          '<%=yeoman.dist %>/spinner.min.js': ['<%=yeoman.src%>/spinner/**.js']
        }, {
          expand: true,
          cwd: '<%=yeoman.src%>/services',
          src: '**/*',
          dest: '<%=yeoman.dist %>',
          rename: function(dest, matchedSrcPath) {
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