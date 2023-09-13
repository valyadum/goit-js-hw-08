import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
 const emailInput = document.querySelector('input');
 const messagesInput = document.querySelector('textarea');
//const { email, message } = form.elements;
const LOCALSTORAGE_KEY = "feedback-form-state";
updateOutput();
form.addEventListener('input', throttle(writeForm, 500));
const formData = {};
function writeForm(event) {
    formData[event.target.name] = event.target.value;
    //console.log(formData);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
    
}
updateOutput();
form.addEventListener("submit", saveMessage);
function saveMessage(event) {
    if (emailInput.value === '' || messagesInput.value === '') {
        return alert('Всі поля повинні бути заповнені');
    }
    event.preventDefault();
    console.log(formData);
    localStorage.removeItem(LOCALSTORAGE_KEY);
    form.reset();
    
}
function updateOutput(event) {
    const saveFormData = localStorage.getItem(LOCALSTORAGE_KEY);
    const parsedFormData = JSON.parse(saveFormData);  
    if (parsedFormData) {
        emailInput.value = parsedFormData.email;
        messagesInput.value = parsedFormData.message;
    }
    else {
        emailInput.value = '';
    messagesInput.value = '';
    }
    
}