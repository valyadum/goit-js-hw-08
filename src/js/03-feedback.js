import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector(' input');
const messagesInput = document.querySelector('textarea');

const LOCALSTORAGE_KEY = "feedback-form-state";
let formData = {};

form.addEventListener('input', throttle(writeForm, 500));
form.addEventListener("submit", saveMessage);

updateOutput();

function writeForm(event) {
    formData = {
        email: emailInput.value,
        message: messagesInput.value,
    };
    //formData[event.target.name] = event.target.value;
    //console.log(formData);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function saveMessage(event) {
    event.preventDefault();
    const { email, message } = event.currentTarget.elements;
    console.log({ email: email.value, message: message.value });

    if (email.value === '' || message.value === '') {
        return alert('Всі поля повинні бути заповнені');
    }

    localStorage.removeItem(LOCALSTORAGE_KEY);
    form.reset();
    formData = {};
}
function updateOutput() {
    let saveFormData = localStorage.getItem(LOCALSTORAGE_KEY);
    if (saveFormData) {
        const parsedFormData = JSON.parse(saveFormData);
        emailInput.value = parsedFormData.email;
        messagesInput.value = parsedFormData.message;
    }
    else {
        emailInput.value = '';
        messagesInput.value = '';
    }

}
