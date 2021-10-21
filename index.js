// 'Validator' object contructor
function Validator(options) {
  // function thực hiện validate
  function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    var errorMessage = rule.test(inputElement.value);
    errorElement.innerHTML = errorMessage;
    if (errorMessage) {
      inputElement.parentElement.classList.add("invalid");
    } else {
      inputElement.parentElement.classList.remove("invalid");
    }
  }
  //   get element of form need validate
  var formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach((rule) => {
      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        //   Xử lý blur ra khỏi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        // Xủ lý khi người dùng nhập vào input
        inputElement.oninput = function () {
          var errorElement =
            inputElement.parentElement.querySelector(".form-message");
          errorElement.innerHTML = "";
        };
      }
    });
  }
}

// Define rules
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? null : message || "Vui lòng nhập tên đăng nhập";
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? null : message || "Vui lòng nhập đúng email";
    },
  };
};
Validator.minLenght = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? message || null
        : `Vui lòng nhập hơn ${min} kí tự`;
    },
  };
};
Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value == getConfirmValue()
        ? null
        : message || "Vui lòng nhập đúng pass";
    },
  };
};
