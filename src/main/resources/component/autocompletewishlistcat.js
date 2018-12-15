angular.
module('firstApplication').component('wishlistcat', {
    templateUrl:'/wishlistview/component/autocompletewishlistcat.html',
    bindings: { selectedcode:'<'},
    controller:['$scope', '$http', function ($scope,$http) {

        console.log('-----------------IN APP CONTRL 6----------------' );
        //rootScope.stockallrest

        $http.get('http://localhost:9000/wishlistcategorys').then(function (data) {
            //    console.log( JSON.stringify( data, null, "    ") );

            $scope.codes = [];
            for (i in data.data) {
                console.log('----DATA-------' +  data.data[i]);
                $scope.codes.push(data.data[i]);
            }
        });

        $scope.filterItems=  function (searchWord) {
            console.log('-----------------filterItems----------------'  + searchWord);
            var arr=[];
            $scope.codes.forEach(function (item) {
                // if (item.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0  ){
                //     arr.push(item);
                // }
                //
                arr.push(item);
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