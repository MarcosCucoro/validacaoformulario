// Importação do Validator para e-mail
import isEmail from 'validator/lib/isEmail';

// Constante para armazenar as mensagens de Erro
const SHOW_ERROR_MESSAGES = 'show-error-message';

// Constantes para armazenar o que está sendo digitado no formulário
const form = document.querySelector('.form') as HTMLFormElement;
const username = document.querySelector('.username') as HTMLInputElement;
const email = document.querySelector('.email') as HTMLInputElement;
const password = document.querySelector('.password') as HTMLInputElement;
const password2 = document.querySelector('.password2') as HTMLInputElement;

// Captura do evento de Submit no formulário
form.addEventListener('submit', function (event) {
    event.preventDefault();
    hideErrorMessages(this);
    checkForEmptyFields(username, email, password, password2);
    checkEmail(email);
    checkEqualPasswords(password, password2);
    if (shouldSendForm(this)) console.log('Formulário enviado');
});

// Função para fazer o check se todos os campos estão preenchidos
function checkForEmptyFields(...inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
        if (!input.value) showErrorMessage(input, 'Campo não pode ficar vazio');
    });
}

// Funcão para checkar se o e-mail é válido, através do validator
function checkEmail(input: HTMLInputElement): void {
    if (!isEmail(input.value)) showErrorMessage(input, 'Email inválido');
}

// Função para checkar se as senhas são iguais
function checkEqualPasswords(
    password: HTMLInputElement,
    password2: HTMLInputElement,
) {
    if (password.value !== password2.value) {
        showErrorMessage(password, 'Senhas não batem');
        showErrorMessage(password2, 'Senhas não batem');
    }
}

// Função para ocultar as mensagem de Erro
function hideErrorMessages(form: HTMLFormElement): void {
    form.querySelectorAll(`.${SHOW_ERROR_MESSAGES}`).forEach((item) =>
        item.classList.remove(SHOW_ERROR_MESSAGES),
    );
}

// Função para exibir as mensagens de Erro
function showErrorMessage(input: HTMLInputElement, msg: string): void {
    const formFields = input.parentElement as HTMLDivElement;
    const errorMessage = formFields.querySelector(
        '.error-message',
    ) as HTMLSpanElement;
    errorMessage.innerText = msg;
    formFields.classList.add(SHOW_ERROR_MESSAGES);
}

// Função para validar os checks e caso positivo enviar os formulário
function shouldSendForm(form: HTMLFormElement): boolean {
    let send = true;
    form.querySelectorAll(`.${SHOW_ERROR_MESSAGES}`).forEach(
        () => (send = false),
    );
    return send;
}
