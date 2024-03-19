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
        console.log(`Conta criada com sucesso para ${this.nomeUsuario}.`);
    }

    checarExtrato() {
        console.log(`Extrato da conta ${this.#numeroConta}:\nSaldo: ${this.#saldo}\nNome do usuário: ${this.nomeUsuario}\nProfissão do usuário: ${this.profissaoUsuario}`);
    }

    solicitarEmprestimo(valor) {
        console.log(`Solicitação de empréstimo de ${valor} realizada na conta ${this.#numeroConta}.`);
    }

    static imprimirInstrucoes() {
        console.log("Instruções gerais para uso das contas:\n...");
    }

    get numeroConta() {
        return this.#numeroConta;
    }

    get saldo() {
        return this.#saldo;
    }

    set saldo(novoSaldo) {
        this.#saldo = novoSaldo;
    }
}

class ContaCorrente extends Conta {
    #limiteChequeEspecial;
    #taxaManutencao;
    static contasCorrente = [];

    constructor(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario, limiteChequeEspecial, taxaManutencao) {
        super(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario);
        this.#limiteChequeEspecial = limiteChequeEspecial;
        this.#taxaManutencao = taxaManutencao;
        ContaCorrente.contasCorrente.push(this);
    }

    gerenciarLimiteChequeEspecial(novoLimite) {
        this.#limiteChequeEspecial = novoLimite;
        console.log(`Limite do cheque especial alterado para ${novoLimite} na conta ${this.numeroConta}.`);
    }

    calcularTaxaManutencao() {
        console.log(`Taxa de manutenção da conta ${this.numeroConta}: ${this.#taxaManutencao}`);
    }

    static listarTodasContasCorrente() {
        console.log("Contas correntes criadas:");
        for (const conta of ContaCorrente.contasCorrente) {
            console.log(`- ${conta.numeroConta}`);
        }
    }

    get limiteChequeEspecial() {
        return this.#limiteChequeEspecial;
    }

    get taxaManutencao() {
        return this.#taxaManutencao;
    }
}

class ContaPoupanca extends Conta {
    #taxaJuros;
    #limiteSaques;
    static melhoresInvestimentos = ["Tesouro Direto", "Ações"];

    constructor(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario, taxaJuros, limiteSaques) {
        super(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario);
        this.#taxaJuros = taxaJuros;
        this.#limiteSaques = limiteSaques;
    }

    calcularJuros() {
        const juros = this.saldo * (this.#taxaJuros / 100);
        console.log(`Juros calculados para a conta ${this.numeroConta}: ${juros}`);
    }

    gerenciarLimiteSaques(novoLimite) {
        this.#limiteSaques = novoLimite;
        console.log(`Limite de saques alterado para ${novoLimite} na conta ${this.numeroConta}.`);
    }

    static verificarMelhorInvestimento() {
        console.log("Melhores investimentos para contas poupança:", ContaPoupanca.melhoresInvestimentos);
    }

    get taxaJuros() {
        return this.#taxaJuros;
    }

    get limiteSaques() {
        return this.#limiteSaques;
    }
}

//Utilizando o código
const contaCorrente1 = new ContaCorrente(1001, 800, "Kauê", "Estagiário", 500, 10);
const contaPoupanca1 = new ContaPoupanca(1002, 7500, "Jamile", "Arquiteta", 10000, 15);

contaCorrente1.criarConta();
contaPoupanca1.criarConta();

contaCorrente1.checarExtrato();
contaPoupanca1.checarExtrato();

Conta.imprimirInstrucoes();

contaCorrente1.gerenciarLimiteChequeEspecial(1000);
contaCorrente1.calcularTaxaManutencao();

ContaCorrente.listarTodasContasCorrente();

contaPoupanca1.calcularJuros();
contaPoupanca1.gerenciarLimiteSaques(5);

ContaPoupanca.verificarMelhorInvestimento();