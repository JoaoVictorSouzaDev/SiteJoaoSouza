let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

class ForSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(this.settings.button);
        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault();
        this.formButton.disabled = true;
        this.formButton.innerText = "Enviando...";
    }

    async sendForm(event) {
        this.onSubmission(event);
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });

            if (response.ok) {
                alert(this.settings.sucessAlertMessage);
                window.location.href = this.settings.redirectUrl;
            } else {
                const errorData = await response.text();
                console.error("Erro na resposta do FormSubmit:", errorData);
                alert(this.settings.errorAlertMessage);
            }

        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
            alert(this.settings.errorAlertMessage);
        } finally {
            if (this.formButton) {
                 this.formButton.disabled = false;
                 this.formButton.innerText = "Enviar";
            }
        }
    }

    init() {
        if (this.form) {
            this.form.addEventListener("submit", this.sendForm);
        }
    }
}

const formSubmit = new ForSubmit({
    form: "[data-form]",
    button: "[data-button]",
X    sucessAlertMessage: "Mensagem enviada com sucesso!",
    errorAlertMessage: "Não foi possível enviar sua mensagem. Tente novamente.",
    redirectUrl: "/",
});

formSubmit.init();
