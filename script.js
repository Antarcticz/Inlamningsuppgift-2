const form = document.querySelector('#validationForm');
const errorMessage = document.querySelector('#errorMessage');

const validateText = (id) => {
    const input = document.querySelector(id);    // hämtar en referens till våran input med hjälp av id
    const regExText = /^[a-öA-Ö\s\-]*$/;

    if(input.value.trim() === '') {               // Här kallar vi på setError funktionen och skickar med våran referens till input
        return setError(input);
    } 
    else if(input.value.length < 2) {
        return setError(input);
    }
    else if(!regExText.test(input.value)) {
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
        return setError(email);
    }
    else if(!regExMail.test(email.value)) {
        return setError(email);
    }
    else {
        return setSuccess(email);
    }
}

const validatePassword = () => {
    const password = document.querySelector('#password');
    const repeatPassword = document.querySelector('#repeatPassword');

    if(password.value == (' ') > 0) {
        return setError(password);
    }
    else if(repeatPassword.value == '') {
        return setError(repeatPassword);
    }
    else if(password.value != repeatPassword.value) {
        return setError(repeatPassword);
    }
    else if(password.value.length < 6) {
        return setError(password);
    }
    else if(password.value === repeatPassword.value) {
        return setSuccess(password);
    }
}

const validateCheck = (id) => {
    const checkbox = document.querySelector(id);

    if(!checkbox.checked) {
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

const setError = (input) => {        // Deklarerar setError och tar emot en input referens
    input.classList.add();
    input.classList.remove();
    input.focus();
    return false;
}

form.addEventListener('submit', e => {  // lyssnar efter ett event 'submit'
    e.preventDefault();                  // förhindrar webbläsaren att ladda om sidan
    
    const errors = [];  // skapar en tom array där vi kan lägga eventuella error
    
    for(let i = 0; i < form.length; i++) {
        const inputId = '#' + form[i].id;  // plockar ut id på den aktuella inputen
    
        if(form[i].type === 'text') {     //Kollar om den aktuella inputen är av typen text
            errors[i] = validateText(inputId); // validerar rätt typ av input
        } 
        else if(form[i].type === 'email') {     //Kollar om den aktuella inputen är av typen email
            errors[i] = validateEmail(inputId);
        }
        else if(form[i].type === 'password') {    //Kollar om den aktuella inputen är av typen password
            errors[i] = validatePassword(inputId);
        }
        else if(form[i].type === 'checkbox') {     //Kollar om den aktuella inputen är av typen checkbox
            errors[i] = validateCheck(inputId);
        }
    }
    console.log(errors);

    if(errors.includes(false)) { 
        console.log('Somthing went wrong.');
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