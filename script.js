const passwordInput = document.getElementById("password");
const copyButton = document.getElementById("copyButton");
const generateButton = document.getElementById("generateButton");

const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");
const message = document.getElementById("message");

const characters = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%&*+-=?"
};

function generatePassword() {
    const selectedCharacters = [];

    if (uppercase.checked) {
        selectedCharacters.push(characters.uppercase);
    }

    if (lowercase.checked) {
        selectedCharacters.push(characters.lowercase);
    }

    if (numbers.checked) {
        selectedCharacters.push(characters.numbers);
    }

    if (symbols.checked) {
        selectedCharacters.push(characters.symbols);
    }

    if (selectedCharacters.length === 0) {
        passwordInput.value = "";
        strengthText.textContent = "-";
        strengthBar.style.width = "0%";
        message.textContent = "Selecione pelo menos uma opção.";
        message.style.color = "#dc2626";
        return;
    }

    let allCharacters = selectedCharacters.join("");
    let password = "";

    selectedCharacters.forEach(characterSet => {
        password += characterSet[
            Math.floor(Math.random() * characterSet.length)
        ];
    });

    while (password.length < Number(lengthInput.value)) {
        password += allCharacters[
            Math.floor(Math.random() * allCharacters.length)
        ];
    }

    password = password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    passwordInput.value = password;

    message.textContent = "";
    updateStrength(password);
}

function updateStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 14) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        strengthText.textContent = "Fraca";
        strengthText.style.color = "#dc2626";
        strengthBar.style.background = "#dc2626";
        strengthBar.style.width = "30%";
    } else if (score <= 4) {
        strengthText.textContent = "Média";
        strengthText.style.color = "#d97706";
        strengthBar.style.background = "#f59e0b";
        strengthBar.style.width = "65%";
    } else {
        strengthText.textContent = "Forte";
        strengthText.style.color = "#16a34a";
        strengthBar.style.background = "#16a34a";
        strengthBar.style.width = "100%";
    }
copyButton.addEventListener("click", async () => {
    if (!passwordInput.value) {
        message.textContent = "Gere uma senha primeiro.";
        message.style.color = "#dc2626";
        return;
    }

    try {
        await navigator.clipboard.writeText(passwordInput.value);

        message.textContent = "Senha copiada!";
        message.style.color = "#16a34a";

        setTimeout(() => {
            message.textContent = "";
        }, 2000);

    } catch (error) {
        message.textContent = "Não foi possível copiar a senha.";
        message.style.color = "#dc2626";
    }
});

lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
    generatePassword();
});

generateButton.addEventListener("click", generatePassword);

uppercase.addEventListener("change", generatePassword);
lowercase.addEventListener("change", generatePassword);
numbers.addEventListener("change", generatePassword);
symbols.addEventListener("change", generatePassword);

generatePassword();