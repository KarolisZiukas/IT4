var form = $("#buy");
var reviewForm = $("#write")
var uri = "https://api.myjson.com/bins/pqbve"
form.on('submit', function (event) {
  var data = {
    email: form.find("input[name='email']").val(),
  };
  validateForm()
  event.preventDefault();
});

reviewForm.on('submit', function (event) {
var data = {
  name: reviewForm.find("input[name='name']").val(),
  review: reviewForm.find("textarea[name='reviewText']").val(),
};
  postData(data);
  event.preventDefault();
});

// Įvedimo laukas, kuriame kažkas turi būti įvesta (kuris negali būti paliktas tuščias)
function validateForm() {
  if(!isPositiveInteger(form.find("[name='number']").val())) {
    alert("Phone number must be normal number")
    return false
  }
  var email = document.forms["buy-form"]["email"].value;
  if (email == "") {
    alert("Email cannot be empty");
    return false;
  }
  var inputDate = form.find("[name='date']").val()
  if(!isStringDate(inputDate)) {
    alert("Wrong date format");
    return false;
  }
}

function isPositiveInteger(number) {
    var n = Math.floor(number);
    return n == number && n > 0;
}

function isStringDate(inputDate) {
    var array = inputDate.split('/');
    if (array.length !== 3) {
        return false;
    }

    if (array[0].length != 4 || array[1].length != 2 || array[2].length != 2) {
        return false;
    }

    var year = Number(array[0]);
    var month = Number(array[1]);
    var day = Number(array[2]);

    if (month < 1 || month > 12) {
        return false;
    }

    if(month == 2 && day > 28) {
      console.log(year);
      console.log(day);
      if(year%4 != 0) {
        return false;
      } else if(day != 29) {
        return false;
      }
    }

    var date = new Date(year, month, day);
    if (date.getDate() != day) {
        return false;
    }
    return true;
}

$(document).ready(function () {
});

//HTML puslapio elementų paslėpimas/parodymas (ne išmetimas)
function checkPswLenght(value) {
  var error = $("#too-short-psw")
  if(value.length > 0 && value.length < 6 ) {
    console.log(value.length);
    error.css('display', 'inline');
  } else {
    error.css('display', 'none');
  }
}

//Įvedimo formoje pateiktų duomenų serializavimas JSON formatu ir patalpinimas vienoje iš šių sistemų (naudojantis pateikiamu API):
function postData(data) {
  console.log(data.review);
      $.ajax({
          url: "https://api.myjson.com/bins",
          type: "POST",
          dataType: "json",
          data: JSON.stringify(data),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
              uri = data["uri"];
              console.log(uri);
          },
          error: function (xhr, status, error) {
              console.log(error);
          }
      });
}

function getData() {
    if (uri !== "") {
        $.ajax({
            url: uri,
            type: "GET",
            success: function (data) {
                fillTable(data)
                console.log(data);
                uri = "";
            },
            error: function () {
                console.log("error");
            }
        });
    }
}

function fillTable(data) {
    var table = $("#reviews-table");
    var row = $("<tr></tr>");
    table.append(row);
    for (var val in data) {
        row.append("<td>" + data[val] + "</td>");
    }
}
