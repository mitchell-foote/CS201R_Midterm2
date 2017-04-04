angular.module('talk', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function ($scope, $http) {
            $scope.talks = [];
            $scope.pictureUrl = "";
            $scope.session = "";
            $scope.speaker = "";
            $scope.addTalk = function () {
                var newtalk = {
                    title: $scope.formContent,
                    pictureUrl: $scope.pictureUrl,
                    session: $scope.session,
                    speaker: $scope.speaker,
                    upvotes: 0
                };
                $scope.formContent = '';
                $scope.pictureUrl = '';
                $scope.session = '';
                $scope.speaker = '';
                $http.post('/talks', newtalk).success(function (data) {
                    $scope.talks.push(data);
                });
            };
            $scope.delete = function (talk) {
                $http.delete('/talks/' + talk._id)
                    .success(function (data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
            $scope.upvote = function (talk) {
                return $http.put('/talks/' + talk._id + '/upvote')
                    .success(function (data) {
                        console.log("upvote worked");
                        talk.upvotes = data.upvotes;
                    });
            };
            $scope.incrementUpvotes = function (talk) {
                $scope.upvote(talk);
            };
            $scope.getAll = function () {
                return $http.get('/talks').success(function (data) {
                    angular.copy(data, $scope.talks);
                });
            };
            $scope.getAll();

        }
    ]);