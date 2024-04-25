$(document).ready(function () {
  $.get("http://localhost:3000/users", function (data) {
    data.forEach(function (user) {
      $("#userTable").append(
        "<tr><td>" +
          user.email +
          "</td><td>" +
          user.nickname +
          "</td><td>" +
          user.tipoacesso +
          "</td></tr>"
      );
    });
  });
});
