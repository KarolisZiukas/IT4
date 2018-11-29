var form = $("#buy");

form.on('submit', function (event) {
  var data = {
    email: form.find("input[name='email']").val(),
  };
  validateForm()
  event.preventDefault();
});

// Įvedimo laukas, kuriame kažkas turi būti įvesta (kuris negali būti paliktas tuščias)
function validateForm() {
  // if(!isPositiveInteger(form.find("[name='number']").val())) {
  //   alert("Phone number must be normal number")
  //   return false
  // }
  // var email = document.forms["buy-form"]["email"].value;
  // if (email == "") {
  //   alert("Email cannot be empty");
  //   return false;
  // }
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

    if (array[0] != year) {
        return false;
    }

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
    initialize();
});

function initialize() {
}
