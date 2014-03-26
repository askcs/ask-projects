'use strict'

angular.module('projectsApp')
  .controller 'MainCtrl', ($scope, $http, User, $rootScope) ->

    $scope.UserInfo = {}

    $scope.getUserInfo = () ->
      $scope.UserInfo = User.profile {id: $rootScope.currentUser.name}

#    $http.get('/api/awesomeThings').success (awesomeThings) ->
#      $scope.awesomeThings = awesomeThings