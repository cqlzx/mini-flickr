var app = angular.module("miniFlickr", ['akoenig.deckgrid', 'me-lazyload']);

app.controller("photoController", function ($http, $scope, $filter) {
    $http.get('/api/v1/photos')
        .then(function (response) {
            $scope.photos = response.data;

            $scope.filteredPhotos = $scope.photos;
            $scope.pinFilter = 'all';

            $scope.pin = function (pinIndex) {
                $scope.photos[pinIndex].pinned = !$scope.photos[pinIndex].pinned;
            };

            $scope.togglePinned = function (s) {
                $scope.pinFilter = s;
                if (s === 'pinned') {
                    if ($scope.tagsFilter === '') {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {pinned: true});
                    } else {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {pinned: true, tags: $scope.tagsFilter});
                    }
                } else if (s === 'all') {
                    if ($scope.tagsFilter === '') {
                        $scope.filteredPhotos = $scope.photos;
                    } else {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {tags: $scope.tagsFilter});
                    }
                }
            };

            $scope.searchTags = function () {
                if ($scope.tagsFilter === '') {
                    if ($scope.pinFilter === 'all') {
                        $scope.filteredPhotos = $scope.photos;
                    } else if ($scope.pinFilter === 'pinned') {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {pinned: true});
                    }
                } else {
                    if ($scope.pinFilter === 'all') {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {tags: $scope.tagsFilter});
                    } else if ($scope.pinFilter === 'pinned') {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {pinned: true, tags: $scope.tagsFilter});
                    }
                }
            }
        });

});