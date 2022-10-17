class ValidaCPF {
    constructor(cpfRecebido) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfRecebido.replace(/\D+/g, '')  // substituir tudo que nao for numero por nada 
            
        })
    }

    sequencia() {         // inidice 0 repetir o tamanho de cpfRecebido
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfRecebido
    } // para verificar se o cpf não e uma sequencia

    valida() {
        // se nao existir cpf limpo retorne falso
        if (!this.cpfLimpo) return false
        if (this.cpfLimpo.length !== 11) return false
        if (this.sequencia()) return false
        this.geraNovoCpf()
        
        return this.NovoCpf === this.cpfLimpo
    }

    geraNovoCpf() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2)
        const digito1 = this.calc(cpfSemDigitos)
        const digito2 = this.calc(cpfSemDigitos + digito1)
        this.NovoCpf = cpfSemDigitos + digito1 + digito2
    }

    calc(cpfSemDigitos) {
        let total = 0
        let regressivo = cpfSemDigitos.length + 1
        for (let numeros of cpfSemDigitos) {
            total += regressivo * Number(numeros)
            regressivo--
        }
        const digito = 11 - (total % 11)
        return digito < 9 ? String(digito) : '0'
    }
}
