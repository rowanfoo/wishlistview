var serverurl='http://192.168.0.8:9000';






function setconfig($rootScope){
console.log('----setconfig-----');

    $rootScope.config={
        invesitgaterest : serverurl + '/investigate',
        stockallrest : serverurl + '/stocks',
        stockrest : serverurl + '/stock',
        data: serverurl + '/data'
    };


}

