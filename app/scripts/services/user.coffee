'use strict'

angular.module('projectsApp')
  .factory 'User', ($resource) ->
    $resource '/api/:level/:id',
      id: '@id'
    ,
      update:
        method: 'PUT'
        params:
          level: 'users'

      get:
        method: 'GET'
        params:
          level: 'users'
          id: ''

      profile:
        method: 'GET'
        params:
          level: 'profile'
          id: '' 