// Menu hambúrguer (mobile)
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
});

// Tema claro/escuro (preferência salva no localStorage)
const themeBtn = document.getElementById('themeBtn');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        themeBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Botão de voltar ao topo (aparece depois de rolar 300px)
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Validação do formulário de contato (só existe na página de contato)
const contactForm = document.getElementById('contactForm');

if (contactForm) {

    function showError(input, errorId, message) {
        input.classList.add('invalid');
        document.getElementById(errorId).textContent = message;
    }

    function clearError(input, errorId) {
        input.classList.remove('invalid');
        document.getElementById(errorId).textContent = '';
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // valida antes de enviar

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const successMsg = document.getElementById('successMsg');

        let isValid = true;

        if (name.value.trim().length < 3) {
            showError(name, 'nameError', 'Informe seu nome completo (mínimo de 3 caracteres).');
            isValid = false;
        } else {
            clearError(name, 'nameError');
        }

        // verifica o formato do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showError(email, 'emailError', 'Informe um e-mail válido (ex.: nome@email.com).');
            isValid = false;
        } else {
            clearError(email, 'emailError');
        }

        if (subject.value.trim() === '') {
            showError(subject, 'subjectError', 'Informe o assunto da mensagem.');
            isValid = false;
        } else {
            clearError(subject, 'subjectError');
        }

        if (message.value.trim().length < 10) {
            showError(message, 'messageError', 'A mensagem deve ter pelo menos 10 caracteres.');
            isValid = false;
        } else {
            clearError(message, 'messageError');
        }

        if (isValid) {
            successMsg.classList.add('show');
            contactForm.reset();

            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 5000);
        } else {
            successMsg.classList.remove('show');
        }
    });
}
