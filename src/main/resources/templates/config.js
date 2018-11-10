var serverurl='http://localhost:8070';






function setconfig($rootScope){
console.log('----setconfig-----');

    $rootScope.config={
        invesitgaterest : serverurl + '/investigate',
        stockallrest : serverurl + '/stocks',
        stockrest : serverurl + '/stock',
        apple: 'myapple'
    };


}

