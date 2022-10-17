class Valida {
    constructor() {
        this.form = document.querySelector('.formulario')
        this.eventos()
    }

    eventos() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const camposValidos = this.isValid()
        const senhasValidas = this.passwordValid()

        if(camposValidos && senhasValidas) {
            alert('Formulário Foi Enviado')
            this.form.submit()
        }
    }

    isValid() {
        let valid = true

        // impedir de gerar o erro mais de uma vez 
        for (let repeat of this.form.querySelectorAll('.error-text')) {
            repeat.remove()
        }

        //                   seleciona todos input do form com classe validos
        for (let campo of this.form.querySelectorAll('.validos')) {
            //                   elemento irmão anterior
            const label = campo.previousElementSibling.innerText
            if (!campo.value) {  // se campo nao existir
                this.createError(campo, ` O campo ${label} não pode estar em branco.`)
                valid = false
            }

            if (campo.classList.contains('cpf')) {
                if (!this.ValidaCpf(campo)) valid = false
            }

            if (campo.classList.contains('usuario')) {
                if (!this.ValidaUsuario(campo)) valid = false
            }
        }
        return valid
    }

    passwordValid() {
        let valid = true

        const senha = this.form.querySelector('.senha')
        const repetirSenha = this.form.querySelector('.repetir-senha')

        if (senha.value !== repetirSenha.value) {
            this.createError(senha, 'Campos Senha e Repetir Senha precisam ser iguais.')
            valid = false
        }

        if(senha.value.length < 6 || senha.value.length > 12) {
            this.createError(senha, 'Campos Senha precisa ter entre 6 e 12 caractere.')
            valid = false
        }
      return valid
    }

    ValidaCpf(campo) {
        // pegar o valor que foi colocado no campo cpf
        const cpf = new ValidaCPF(campo.value)
        if (!cpf.valida()) {
            this.createError(campo, 'Cpf Inválido.')
            return false
        }
        return true
    }

    ValidaUsuario(campo) {
        let valid = true
        let usuario = campo.value

        if (usuario.length < 3 || usuario.length > 12) {
            this.createError(campo, 'Usuário precisa ter entre 3 e 12 caracteres.')
            valid = false
        }

        //          qualquer coisa de a-z(maiusculo e minusculo) e de 0-9
        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(campo, 'Usuário só pode conter letras e/ou números.')
            valid = false
        }
        return valid
    }

    createError(campo, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        //                depois do campo, adicionar o elemento div
        campo.insertAdjacentElement('afterend', div)
    }
}

const validacao = new Valida()