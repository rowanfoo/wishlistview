angular.
module('firstApplication').component('allstock', {
    templateUrl:'/fundamentalview/component/autcompletestock.html',
    bindings: { selectedcode:'<'},
     controller:['$scope', '$http', function ($scope,$http) {

         console.log('-----------------IN APP CONTRL 6----------------' );
         //rootScope.stockallrest

        $http.get('http://localhost:8070/stocks').then(function (data) {
            //    console.log( JSON.stringify( data, null, "    ") );

            $scope.codes = [];
            for (i in data.data) {
                $scope.codes.push(data.data[i]);
            }
        });

         $scope.filterItems=  function (searchWord) {
             console.log('-----------------filterItems----------------'  + searchWord);
             var arr=[];
             $scope.codes.forEach(function (item) {
                 if (item.code.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0  ){
                     arr.push(item);
                 }

             });


             return arr;
         };

         $scope.selectedItemChange = function (item) {
             console.log( ' SUBMIT  investigate-create  selectedItem   ----'+ item);
             $scope.mycode = item.code;
             console.log( ' SUBMIT  investigate-create  selectedItem   ----'+ $scope.mycode);
             $scope.selectedcode($scope.mycode);

         }

     }]//eof contrl




});