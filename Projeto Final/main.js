function toggleVisibilidade(idElemento) {
    var elemento = document.getElementById(idElemento);
    elemento.classList.toggle("visivel");
}

document.getElementById("soliciteEmprestimoLink").addEventListener("click", function(event) {
    event.preventDefault();
    toggleVisibilidade("soliciteEmprestimo");
});

document.getElementById("abrirConta").addEventListener("click", function(event) {
    event.preventDefault();
    toggleVisibilidade("criacaoConta");
});

document.getElementById("consultaContaCorrente").addEventListener("click", function(event) {
    event.preventDefault();
    toggleVisibilidade("formConsultaContaCorrente");
});

document.getElementById("consultaContaPoupanca").addEventListener("click", function(event) {
    event.preventDefault();
    toggleVisibilidade("formConsultaContaPoupanca");
});

class Conta {
    #numeroConta;
    #saldo;

    constructor(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario) {
        this.#numeroConta = numeroConta;
        this.#saldo = saldoInicial;
        this.nomeUsuario = nomeUsuario;
        this.profissaoUsuario = profissaoUsuario;
    }

    criarConta() {
        return `Conta criada com sucesso para ${this.nomeUsuario}!`;
    }

    checarExtrato() {
        return `Número da Conta: ${this.numeroConta}, Saldo: ${this.saldo}, Nome do Usuário: ${this.nomeUsuario}, Profissão do Usuário: ${this.profissaoUsuario}`;
    }

    solicitarEmprestimo(valor) {
        this.#saldo += valor;
        console.log(`Empréstimo de R$ ${valor} solicitado com sucesso para a conta ${this.numeroConta}.`);
    }

    static imprimirInstrucoes() {
        return "Instruções gerais para o uso das contas.";
    }

    get numeroConta() {
        return this.#numeroConta;
    }

    get saldo() {
        return this.#saldo;
    }
}

class ContaCorrente extends Conta {
    #limiteChequeEspecial;
    #taxaManutencao;
    static contasCorrente = [];
    static taxaManutencaoPadrao = 50;

    constructor(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario, limiteChequeEspecial, taxaManutencao = ContaCorrente.taxaManutencaoPadrao) {
        super(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario);
        this.#limiteChequeEspecial = limiteChequeEspecial;
        this.#taxaManutencao = taxaManutencao;
        ContaCorrente.contasCorrente.push(this);
    }

    get limiteChequeEspecial() {
        return this.#limiteChequeEspecial;
    }

    get taxaManutencao() {
        return this.#taxaManutencao;
    }

    static ContasCorrente() {
        return this.contasCorrente;
    }
}

class ContaPoupanca extends Conta {
    #limiteSaques;
    #taxaJuros;
    static contasPoupanca = [];
    static melhoresInvestimentos = ["Tesouro Direto", "Ações"];
    static taxaJurosPadrao = 0.5;
    static limiteSaquesPadrao = 3;

    constructor(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario, limiteSaques = ContaPoupanca.limiteSaquesPadrao, taxaJuros = ContaPoupanca.taxaJurosPadrao) {
        super(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario);
        this.#limiteSaques = limiteSaques;
        this.#taxaJuros = taxaJuros;
        ContaPoupanca.contasPoupanca.push(this);
    }

    get limiteSaques() {
        return this.#limiteSaques;
    }

    get taxaJuros() {
        return this.#taxaJuros;
    }

    static ContasPoupanca() {
        return this.contasPoupanca;
    }

    calcularJuros() {
        const juros = (this.saldo * this.taxaJuros) / 100;
        console.log(`Juros calculados: R$ ${juros}`);
        return juros;
    }

    gerenciarLimiteSaques(novoLimite) {
        this.#limiteSaques = novoLimite;
        console.log(`Limite de saques atualizado para ${novoLimite}`);
    }

    static verificarMelhorInvestimento() {
        return this.melhoresInvestimentos;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const formConta = document.getElementById('formConta');
    const mensagem = document.getElementById('mensagem');
    const listaContas = document.getElementById('listaContas');
    const mensagemExtrato = document.getElementById('mensagemExtrato');
    const mensagemEmprestimo = document.getElementById('mensagemEmprestimo');
    const formEmprestimo = document.getElementById('soliciteEmprestimo');
    const formConsultaContaCorrente = document.getElementById('formConsultaContaCorrente');
    const formConsultaContaPoupanca = document.getElementById('formConsultaContaPoupanca');
    const mensagemContaCorrente = document.getElementById('mensagemContaCorrente');
    const mensagemContaPoupanca = document.getElementById('mensagemContaPoupanca');
    const attChequeEspecial = document.getElementById('attChequeEspecial');
    const attLimiteSaquesPoupanca = document.getElementById('attLimiteSaquesPoupanca');

    const contas = [];

    formConta.addEventListener('submit', function (event) {
        event.preventDefault();
    
        const numeroConta = parseInt(document.getElementById('numeroConta').value);
        const saldoInicial = parseFloat(document.getElementById('saldoInicial').value);
        const nomeUsuario = document.getElementById('nomeUsuario').value;
        const profissao = document.getElementById('profissao').value;
    
        const contaExistente = contas.find(conta => conta.numeroConta === numeroConta);
    
        if (contaExistente) {
            mensagem.textContent = `Já existe uma conta com o número ${numeroConta}.`;
        } else {
            const novaConta = new Conta(numeroConta, saldoInicial, nomeUsuario, profissao);
            const novaContaCorrente = new ContaCorrente(numeroConta, saldoInicial, nomeUsuario, profissao, 500, 20);
            const novaContaPoupanca = new ContaPoupanca(numeroConta, saldoInicial, nomeUsuario, profissao);
    
            contas.push(novaConta);
            ContaCorrente.contasCorrente.push(novaContaCorrente);
            ContaPoupanca.contasPoupanca.push(novaContaPoupanca);
    
            mensagem.textContent = novaConta.criarConta();
        }
    
        formConta.reset();
    });    

    document.getElementById('checarExtrato').addEventListener('click', function () {
        listaContas.innerHTML = '';
        mensagemExtrato.textContent = '';

        if (contas.length === 0) {
            mensagemExtrato.textContent = "Nenhuma conta criada ainda.";
        } else {
            mensagemExtrato.textContent = "Extrato das contas:";
            contas.forEach(function (conta) {
                const li = document.createElement('li');
                li.textContent = `Número da Conta: ${conta.numeroConta}, Saldo: ${conta.saldo}, Nome do Usuário: ${conta.nomeUsuario}, Profissão do Usuário: ${conta.profissaoUsuario}`;
                listaContas.appendChild(li);
            });
        }
    });

    formEmprestimo.addEventListener('submit', function (event) {
        event.preventDefault();
        mensagemEmprestimo.textContent = '';

        const numeroConta = parseInt(document.getElementById('contaEmprestimo').value);
        const valorEmprestimo = parseFloat(document.getElementById('valorEmprestimo').value);

        const contaExistente = contas.find(conta => conta.numeroConta === numeroConta);

        if (contaExistente) {
            contaExistente.solicitarEmprestimo(valorEmprestimo);
            mensagemEmprestimo.textContent = `Empréstimo de R$ ${valorEmprestimo} solicitado com sucesso para a conta ${numeroConta}.`;
        } else {
            mensagemEmprestimo.textContent = `Conta ${numeroConta} não encontrada. Por favor, verifique o número da conta.`;
        }

        formEmprestimo.reset();
    });

    document.getElementById('formConsultaContaCorrente').addEventListener('submit', function (event) {
        event.preventDefault();

        const numeroContaCorrente = parseInt(document.getElementById('numeroContaCorrente').value);

        const contaCorrenteEncontrada = ContaCorrente.contasCorrente.find(conta => conta.numeroConta === numeroContaCorrente);

        if (contaCorrenteEncontrada && contaCorrenteEncontrada.numeroConta === numeroContaCorrente) {
            mensagemContaCorrente.textContent = `Taxa de manutenção de R$ ${contaCorrenteEncontrada.taxaManutencao} reais.`;
            attChequeEspecial.classList.add('visivel');
        } else {
            mensagemContaCorrente.textContent = `Conta corrente ${numeroContaCorrente} não encontrada. Por favor, verifique o número da conta corrente.`;
            attChequeEspecial.classList.remove('visivel');
        }
    });

    document.getElementById('formConsultaContaPoupanca').addEventListener('submit', function (event) {
        event.preventDefault();

        const numeroContaPoupanca = parseInt(document.getElementById('numeroContaPoupanca').value);

        const contaPoupancaEncontrada = ContaPoupanca.contasPoupanca.find(conta => conta.numeroConta === numeroContaPoupanca);

        if (contaPoupancaEncontrada && contaPoupancaEncontrada.numeroConta === numeroContaPoupanca) {
            mensagemContaPoupanca.textContent = `Taxa de juros de ${contaPoupancaEncontrada.taxaJuros}%`;
            attLimiteSaquesPoupanca.classList.add('visivel');
        } else {
            mensagemContaPoupanca.textContent = `Conta poupança ${numeroContaPoupanca} não encontrada. Por favor, verifique o número da conta poupança.`;
            attLimiteSaquesPoupanca.classList.remove('visivel');
        }
    });
    document.getElementById('instrucoesGerais').addEventListener('click', function () {
        alert(Conta.imprimirInstrucoes());
    });
});