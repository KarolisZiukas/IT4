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

$(document).ready(function () {
    initialize();
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

function addReviewsNumbers() {
    var reviews= $("section#reviews article");
    var dropdown = $("select#review-select");
    dropdown.find("option[value!='new']").remove();
    console.log(reviews.length);
    for (var i = 0; i < reviews.length; i++) {
        dropdown.append(
            "<option value='" + i + "'>" + i + "</option>"
        )
    }
}

function reviewSelectChanged(reviewValue) {
    var addButton = $("#submitReview");
    var changeButton = $("#edit-button");
    var deleteButton = $("#delete-button");
    if (reviewValue === "new") {
        addButton.show();
        changeButton.hide();
        deleteButton.hide();
        clearEditingFields();
    } else {
        addButton.hide();
        changeButton.show();
        deleteButton.show();
        fillEditingFields(reviewValue);
    }
}

function fillEditingFields(reviewNo) {
    var review = $("section#reviews article").eq(reviewNo);
    $("#name-field").val(review.find("h2").text());
    $("#review-field").val(review.find("p").text());
}
//Egzistuojančių HTML dokumento žymių tekstinio turinio pakeitimas (pvz. paragrafo teksto pakeitimas)
function editReview() {
    var review = $("section#reviews article").eq($("#review-select").val());
    var nameField = $("#name-field").val();
    var reviewField = $("#review-field").val();

    review.find("h2").text(nameField);
    review.find("p").text(reviewField);
}

//Naujų žymių įterpimas (pvz. teksto gale pridėti paragrafą su tekstu, įvestu įvedimo lauke)
function addReview() {
    var nameField = $("#name-field").val();
    var reviewField = $("#review-field").val();

    if (nameField.length > 0 && reviewField.length > 0) {
        $("section#reviews").append(
            "<article class='justAdded red'>" +
            "<h2>" + nameField + "</h2>" +
            "<p>" + reviewField + "</p>" +
            "</article>"
        )
    }
    initialize();
}

//Egzistuojančių žymių išmetimas (pvz. ištrinti įvedimo lauke numeriu nurodytą paragrafą)
function deleteReview() {
    $("section#reviews article").eq($("#review-select").val()).remove();
    initialize();
}

//Egzistuojančių žymių stiliaus pakeitimas (atributui style priskiriant naują reikšmę)
function selectReviewColor(color) {
    $("p").css('background-color', color);
}

function initialize() {
    addReviewsNumbers();
    reviewSelectChanged("new")
}
