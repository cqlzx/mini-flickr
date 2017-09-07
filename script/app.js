var app = angular.module("miniFlickr", ['akoenig.deckgrid']);

app.controller("photoController", function ($http, $scope) {
    $http.get('/api/v1/photos')
        .then(function (response) {
            $scope.photos = response.data;
        })
});