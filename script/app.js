var app = angular.module("miniFlickr", ['akoenig.deckgrid']);

app.controller("photoController", function ($http, $scope) {
    $http.get('/api/v1/photos')
        .then(function (response) {
            $scope.photos = response.data;
        })

    $scope.togglePin = function (pinIndex) {
        console.log(pinIndex);
        $scope.photos[pinIndex].pinned = !$scope.photos[pinIndex].pinned;
    }
});