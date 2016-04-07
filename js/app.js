var prayerPartnerApp = angular.module('prayerPartnerApp', []);

prayerPartnerApp.controller('GeneratorCtrl', ['$scope', '$location',
function($scope, $location) {
  $scope.list = "Natalie\nDave\nLisa\nMatt\nSarah\nJon\nCandice\nJulio\nWonji\nSean";
  $scope.beforeDesc = "Enter names, separated by line.";
  $scope.afterDesc = "";
  $scope.generate = function() {
    var nameArr = $scope.list.split("\n");
    var matchArr = [];

    for (var i=0; i<nameArr.length; i++) {
      for (var j=0; j<nameArr.length; j++) {
        var matchStr = i+"/"+j;
        var matchStrInvert = j+"/"+i;
        if (i !== j && matchArr.indexOf(matchStr) === -1 && matchArr.indexOf(matchStrInvert) === -1) {
          matchArr.push(matchStr);
        }
      }
    }

    var numStrArr = [];

    for (var k in nameArr) {
      numStrArr.push(k);
    }

    var weekArr = [];
    var temp = 0;
    var tempNumStrArr = numStrArr.slice();

    while (matchArr.length > 0) {
      shuffle(matchArr);
      var weekText = "";
      var eachWeekArray = [];

      for (var index in matchArr) {
        var str = matchArr[index];
        var numArr = str.split("/");

        var index0 = tempNumStrArr.indexOf(numArr[0].toString());
        var index1 = tempNumStrArr.indexOf(numArr[1].toString());

        if (index0 > -1 && index1 > -1) {
          tempNumStrArr.splice(index0, 1);
          var indexB = tempNumStrArr.indexOf(numArr[1].toString());
          tempNumStrArr.splice(indexB, 1);

          var first = nameArr[numArr[0]];
          var second = nameArr[numArr[1]];
          weekText += (first + " with " + second);
          weekText += "\n";
          eachWeekArray.push(str);
        }
      }

      shuffle(tempNumStrArr);
      var leftArr = [];
      while (tempNumStrArr.length > 0) {
        leftArr.push(tempNumStrArr[0]);
        if (leftArr.length == 2) {
          var first2 = nameArr[leftArr[0]];
          var second2 = nameArr[leftArr[1]];
          weekText += (first2 + " with " + second2);
          weekText += "\n";
          leftArr = [];
        }
        tempNumStrArr.splice(0, 1);
      }

      for (var l in eachWeekArray) {
        var object = eachWeekArray[l];
        var removeIndex = matchArr.indexOf(object);
        matchArr.splice(removeIndex, 1);
      }

      var removedLastLine = weekText.substring(0, (weekText.length - 1));
      weekArr.push(removedLastLine);

      tempNumStrArr = numStrArr.slice();
    }

    var lastStr = "";
    var weekNo = 1;
    for (var m in weekArr) {
      var weekFinalStr = weekArr[m];
      lastStr += "Week #" + weekNo + ":\n" + weekFinalStr + "\n\n";
      weekNo++;
    }

    $scope.afterDesc = "Done! Copy the text and save it somewhere.";
    $scope.list = lastStr;
  }
}]);

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
