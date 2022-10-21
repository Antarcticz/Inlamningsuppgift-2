const form = document.querySelector('#validationForm');
const errorMessage = document.querySelector('#errorMessage');

const validateText = (id) => {
    const input = document.querySelector(id);
    const regExText = /^[a-öA-Ö\s\-]*$/;

    if(input.value.trim() === '') {
        console.log(id + ": has to have a value.");
        return setError(input);
    } 
    else if(input.value.length < 2) {
        console.log(id + ": has to have 2 or more letters.");
        return setError(input);
    }
    else if(!regExText.test(input.value)) {
        console.log(id + ": cant contain numbers and symbols.");
        return setError(input);
    }
    else {
        return setSuccess(input);
    }
}

const validateEmail = (id) => {
    const email = document.querySelector(id);
    const regExMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;

    if(email.value.trim() === '') {
        console.log(id + ": has to have a value");
        return setError(email);
    }
    else if(!regExMail.test(email.value)) {
        console.log(id + ": has to have correct symbols.");
        return setError(email);
    }
    else {
        return setSuccess(email);
    }
}

const validatePassword = (id) => {
    const password = document.querySelector('#password');
    const repeatPassword = document.querySelector('#repeatPassword');
    const regExPassword = /^\S*$/;

    if(password.value.trim() === '') {
        console.log(id + ": has to have a value.");
        return setError(password);
    }
    else if(!regExPassword.test(password.value)) {
        console.log(id + ": cant contain whitespace.")
        return setError(password);
    }   //! skriver ut error för password och passwordError även om det bara är fel på 1 av dom.
    else if(password.value.length < 6) {
        console.log(id + ": has to have 6 or more characters.");
        return setError(password);
    }
    else if(password.value !== repeatPassword.value) {
        console.log(id + ": has to be equal to password.");
        return setError(repeatPassword);
    }
    else if(password.value === repeatPassword.value) {
        return setSuccess(password);
    }
}

const validateCheck = (id) => {
    const checkbox = document.querySelector(id);

    if(!checkbox.checked) {
        console.log(id + ": you have to check the checkbox.");
        return setError(checkbox);
    }
    else {
        return setSuccess(checkbox);
    }
}

const setSuccess = (input) => {
    input.classList.remove();
    input.classList.add();
    return true;
}

const setError = (input) => {
    input.classList.add();
    input.classList.remove();
    input.focus();
    return false;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const errors = [];
    
    for(let i = 0; i < form.length; i++) {
        const inputId = '#' + form[i].id;
    
        if(form[i].type === 'text') {
            errors[i] = validateText(inputId);
        } 
        else if(form[i].type === 'email') {
            errors[i] = validateEmail(inputId);
        }
        else if(form[i].type === 'password') {
            errors[i] = validatePassword(inputId);
        }
        else if(form[i].type === 'checkbox') {
            errors[i] = validateCheck(inputId);
        }
    }
    // console.log(errors);

    if(errors.includes(false)) { 
        console.log('Somthing went wrong!');
        errorMessage.classList.remove('d-none');
    }
    else if(errors.includes(true)) {
        console.log('Success! Your information has been added to the database.');
        errorMessage.classList.add('d-none');

        const user = {
            FirstName: firstName.value,
            LastName: lastName.value,
            Email: email.value,
            Password: password.value, 
        }
        console.log(user); 
    }
});