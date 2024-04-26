if (window.addEventListener) window.addEventListener("load", init, false);

// установка обработчиков для форм и элементов форм.
function init() {
    for (var i = 0; i < document.forms.length; i++) {
        var form = document.forms[i];

        var formValidation = false;

        for (var j = 0; j < form.elements.length; j++) {
            var e = form.elements[j];

            // пропускаем все что не поле ввода.
            if (e.type != "text") {
                continue;
            }

            // проверка имеются ли атрибуты требующие проверки.
            var pattern = e.getAttribute("data-val");

            if (pattern) {
                e.onchange = validateInput; // обработчик на изменение.
                formValidation = true; // форма требует проверку.
            }
        }
        if (formValidation) {
            form.onsubmit = validateForm; // установка обработчика для формы на submit
        }
    }
}

//checkbox validation
function validateCheckbox() {
    var chekboxes = document.getElementsByName('sex')
    for (var i = 0; i < chekboxes.length; i++) {
        if(chekboxes[i].checked){
            invalid = false;
            return;
        } else {
            invalid = true;
        }
    }
}


//password validation
function validatePassword() {
    var pass = document.getElementById('password');
    var cpass = document.getElementById('cpassword');
    if (pass.value != cpass.value || pass.value == "" || cpass.value == ""){
        pass.className = "error";
        cpass.className ="error";
        var msg = cpass.dataset.valMsg;
        var msgId = cpass.dataset.valMsgId;
        document.getElementById(msgId).innerHTML = msg;
        invalid = true;
    } else {
        pass.className = "valid";
        cpass.className ="valid";
        invalid = false;
    }
}

// обработчик на изменение содержимого полей ввода.
function validateInput() {
    var pattern = this.dataset.val,
        msg = this.dataset.valMsg,
        msgId = this.dataset.valMsgId,
        value = this.value;

    var res = value.search(pattern);
    if (res == -1) {
        document.getElementById(msgId).innerHTML = msg;
        this.className = "error";
    }
    else {
        document.getElementById(msgId).innerHTML = "";
        this.className = "valid";
    }
}

var invalid = false;
// обработчик на submit формы.
function validateForm() {
    validatePassword();
    validateCheckbox();

    for (var i = 0; i < this.elements.length; ++i) {
        var e = this.elements[i];
        if (e.type == "text" && e.onchange != null) {
            e.onchange();
            if (e.className == "error") invalid = true;
        }
    }

    if (invalid) {
        alert("Please fill out the form correctly");
        return false;
    }
}
