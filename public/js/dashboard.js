$(document).ready(function () {
  $.get("http://localhost:3000/users", function (data) {
    data.forEach(function (user, index) {
      var row = $("<tr></tr>");
      row.append(
        "<td><input type='text' value='" + user.email + "' disabled></td>"
      );
      row.append(
        "<td><input type='text' value='" + user.nickname + "' disabled></td>"
      );
      row.append(
        "<td><input type='text' value='" + user.tipoacesso + "' disabled></td>"
      );
      row.append(
        "<td class='userId' style='display: none;'>" + user.id + "</td>"
      );

      var updateButton = $("<button class='btn btn-primary'>Alterar</button>");
      updateButton.click(function () {
        var inputs = row.find("input");
        if (inputs.attr("disabled")) {
          inputs.removeAttr("disabled");
          updateButton.text("Confirmar");
        } else {
          inputs.attr("disabled", "disabled");
          updateButton.text("Alterar");

          var email = inputs[0].value;
          var nickname = inputs[1].value;
          var tipoacesso = inputs[2].value;

          $.ajax({
            url: "http://localhost:3000/users/" + nickname,
            method: "PUT",
            data: JSON.stringify({
              email: email,
              nickname: nickname,
              tipoacesso: tipoacesso,
            }),
            contentType: "application/json",
          }).done(function (response) {
            alert(response.message);
          });
        }
      });
      row.append($("<td></td>").append(updateButton));

      var deleteButton = $("<button class='btn btn-danger'>Excluir</button>");
      deleteButton.click(function () {
        $.ajax({
          url: "http://localhost:3000/users/" + user.id,
          method: "DELETE",
        }).done(function (response) {
          alert(response.message);
          row.remove();
        });
      });
      row.append($("<td></td>").append(deleteButton));

      $("#userTable").append(row);
    });
  });
});
