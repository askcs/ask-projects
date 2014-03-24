'use strict'

angular.module('projectsApp')
  .factory 'Session', ($resource) ->
    $resource '/api/session/'
