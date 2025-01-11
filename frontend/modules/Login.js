// Como estou exportando como default, posso colocar qualquer nome pra ela
export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }
    
    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            alert('FORM NÃO ENVIADO');
        });
    }
}