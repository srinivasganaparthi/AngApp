angular.module('myApp').directive('ngFiles', ['$parse', function ($parse) {

  function fn_link(scope, element, attrs) {
    var onChange = $parse(attrs.ngFiles);
    element.on('change', function (event) {
      onChange(scope, { $files: event.target.files });
    });
  };

  return {
    link: fn_link
  }
}])
  .controller('fupController', function ($scope, $http) {


    // GET THE FILE INFORMATION.
    $scope.getFileDetails = function (e) {

      $scope.files = [];
      $scope.$apply(function () {

        // STORE THE FILE OBJECT IN AN ARRAY.
        for (var i = 0; i < e.files.length; i++) {
          $scope.files.push(e.files[i])
        }

      });
    };

    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {

      //FILL FormData WITH FILE DETAILS.
      var data = new FormData();

      for (var i in $scope.files) {
        data.append("uploadedFile", $scope.files[i]);
      }

      // ADD LISTENERS.
      var objXhr = new XMLHttpRequest();
      objXhr.addEventListener("progress", updateProgress, false);
      objXhr.addEventListener("load", transferComplete, false);

      // SEND FILE DETAILS TO THE API.
      objXhr.open("POST", "http://localhost/AngularApp/api/FileUpload/UploadFiles");
      objXhr.send(data);
    }

     //UPDATE PROGRESS BAR.
    function updateProgress(e) {
      if (e.lengthComputable) {
        document.getElementById('pro').setAttribute('value', e.loaded);
        document.getElementById('pro').setAttribute('max', e.total);
      }
    }

     //CONFIRMATION.
    function transferComplete(e) {
      alert("Files uploaded successfully.");
    }

      $scope.formdata = new FormData();
    $scope.getTheFiles = function ($files) {
      angular.forEach($files, function (value, key) {
        $scope.formdata.append(key, value);
      });
    };

    //// NOW UPLOAD THE FILES.
    //$scope.uploadFiles = function () {

    //  //$http.post("api/FileUpload/UploadFiles", formdata)
    //  //              .success(function (response) {
    //  //                alert(response);
    //  //              }).error(function (error) {
    //  //                //Error Callback
    //  //              });
    //  var data = new FormData();

    //  for (var i in $scope.files) {
    //    data.append("uploadedFile", $scope.files[i]);
    //  }

    //  var request = {
    //    method: 'POST',
    //    url: 'http://localhost/AngularApp/api/FileUpload/UploadFiles',
    //    data: data
    //  };

    //  // SEND THE FILES.
    //  $http(request)
    //      .success(function (d) {
    //        alert(d);
    //      })
    //      .error(function () {
    //      });
    //}
  });