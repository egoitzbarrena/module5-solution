(function () {
"use strict";

angular.module('public').directive('menuItemValidator', MenuItemValidator);
MenuItemValidator.$inject = [ '$q', 'MenuService',];
function MenuItemValidator($q, MenuService) {
  return {
    scope: {
      user: '='
    },
    controller: 'SignupController',
    controllerAs: 'signupCtrl',
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$asyncValidators.menuItemValidator = function(modelValue , viewValue) {
         if (ctrl.$isEmpty(modelValue)) {
            return $q.when(false);
         } else {
           var deferred = $q.defer();
           MenuService.getMenuItem(modelValue)
           .then(function (response) {
              scope.$parent.signupCtrl.setSelectedMenu(response.data);
              deferred.resolve(response);
              console.log(response.data.short_name);
           }, function (error) {
              scope.$parent.signupCtrl.setSelectedMenu({short_name: modelValue});
              deferred.reject(error);
           });//function (error)
              return deferred.promise;
         }//else
     };//ctrl.$asyncValidators.menuItemValidator = function(modelValue , viewValue)
   }//link: function(scope, elm, attrs, ctrl)
 };//return
};//function MenuItemValidator($q, MenuService)
})();
