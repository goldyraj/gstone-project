var app = angular.module('DateDemo',['ui.bootstrap']);

/*
* Note the use of the filter service
*/
function DateDemoController($scope,$filter)
{
  $scope.processDate = function(dt)
  {
    return $filter('date')(dt, 'dd-MM-yyyy');
  }
}