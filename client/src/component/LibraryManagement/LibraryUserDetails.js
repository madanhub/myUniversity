// Author - Dhruvi Shah
var LibraryUserDetails = (function () {
  var userId = "";

  var getId = function () {
    return userId;
  };

  var setId = function (Id) {
    userId = Id;
  };

  return {
    getId: getId,
    setId: setId
  }

})();

export default LibraryUserDetails;