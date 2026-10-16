const perguntas = [
    {
        pergunta: "Você recebeu um link estranho dizendo que ganhou um prêmio. O que fazer?",
        alternativas: [
            "Clicar rapidamente para resgatar o prêmio.",
            "Verificar a origem e não clicar se parecer suspeito.",
            "Enviar o link para todos os amigos."
        ],
        correta: 1,
        explicacao: "Links suspeitos podem levar a páginas falsas usadas para roubar dados."
    },
    {
        pergunta: "Uma ferramenta de IA pede sua senha para continuar. Qual é a atitude segura?",
        alternativas: [
            "Informar a senha para liberar o acesso.",
            "Usar a mesma senha de todas as contas.",
            "Não compartilhar a senha e verificar se o pedido é legítimo."
        ],
        correta: 2,
        explicacao: "Senhas são informações privadas e não devem ser compartilhadas com ferramentas de IA."
    },
    {
        pergunta: "A Inteligência Artificial sempre fornece informações verdadeiras?",
        alternativas: [
            "Sim, a IA nunca comete erros.",
            "Não. É importante conferir as informações em fontes confiáveis.",
            "Sim, principalmente quando responde rapidamente."
        ],
        correta: 1,
        explicacao: "A IA pode produzir informações incorretas. Sempre verifique os fatos."
    },
    {
        pergunta: "Qual destas senhas é uma escolha mais segura?",
        alternativas: [
            "12345678",
            "senha123",
            "Uma senha longa, única e difícil de adivinhar."
        ],
        correta: 2,
        explicacao: "Senhas longas e únicas ajudam a proteger suas contas. Um gerenciador de senhas pode ajudar."
    },
    {
        pergunta: "Você recebeu um vídeo de uma pessoa famosa fazendo uma declaração estranha. O que fazer?",
        alternativas: [
            "Compartilhar imediatamente.",
            "Acreditar no vídeo porque parece real.",
            "Verificar a fonte e procurar confirmações confiáveis."
        ],
        correta: 2,
        explicacao: "Conteúdos manipulados por IA podem parecer reais. Confira a origem antes de compartilhar."
    }
];

const afirmacoes = [
    "A tecnologia é mais útil quando usada com responsabilidade.",
    "Proteger seus dados também é cuidar de você.",
    "Antes de compartilhar, pare, pense e verifique.",
    "A Inteligência Artificial precisa ser usada com consciência.",
    "A segurança digital começa com pequenas atitudes."
];

let indice = 0;
let pontos = 0;
let respondeu = false;

function aleatorio(lista) {
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}

function iniciarMissao() {
    indice = 0;
    pontos = 0;
    respondeu = false;

    document.getElementById("iniciar").classList.add("escondido");
    document.getElementById("missao").classList.remove("escondido");
    document.getElementById("resultado").classList.add("escondido");

    mostrarPergunta();

    document.getElementById("missao").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[indice];

    document.getElementById("contador").textContent =
        Pergunta ${indice + 1} de ${perguntas.length};

    document.getElementById("progressoBarra").style.width =
        ${(indice / perguntas.length) * 100}%;

    document.getElementById("pergunta").textContent = atual.pergunta;
    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").classList.add("escondido");

    const area = document.getElementById("alternativas");
    area.innerHTML = "";

    atual.alternativas.forEach((alternativa, posicao) => {
        const botao = document.createElement("button");
        botao.className = "alternativa";
        botao.textContent = ${String.fromCharCode(65 + posicao)}. ${alternativa};

        botao.addEventListener("click", () => {
            selecionarResposta(posicao, botao);
        });

        area.appendChild(botao);
    });
}

function selecionarResposta(posicao, botaoEscolhido) {
    if (respondeu) return;

    respondeu = true;

    const atual = perguntas[indice];
    const botoes = document.querySelectorAll(".alternativa");
    const feedback = document.getElementById("feedback");

    botoes.forEach((botao, i) => {
        botao.disabled = true;

        if (i === atual.correta) {
            botao.classList.add("correta");
        }
    });

    if (posicao === atual.correta) {
        pontos++;
        feedback.textContent = "✅ Muito bem! " + atual.explicacao;
    } else {
        botaoEscolhido.classList.add("errada");
        feedback.textContent = "💡 Vamos aprender: " + atual.explicacao;
    }

    document.getElementById("progressoBarra").style.width =
        ${((indice + 1) / perguntas.length) * 100}%;

    const proxima = document.getElementById("proxima");
    proxima.textContent =
        indice === perguntas.length - 1
            ? "Ver meu resultado 🏆"
            : "Próxima pergunta ➜";

    proxima.classList.remove("escondido");
}

function proximaPergunta() {
    if (!respondeu) return;

    indice++;

    if (indice < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById("missao").classList.add("escondido");
    document.getElementById("resultado").classList.remove("escondido");

    document.getElementById("pontuacao").textContent =
        Você acertou ${pontos} de ${perguntas.length}!;

    let mensagem;

    if (pontos === perguntas.length) {
        mensagem = "Incrível! Você é um guardião da segurança digital!";
    } else if (pontos >= 3) {
        mensagem = "Muito bem! Você já conhece várias práticas de segurança.";
    } else {
        mensagem = "Continue aprendendo! Cada resposta é uma oportunidade de melhorar.";
    }

    document.getElementById("mensagemFinal").textContent = mensagem;
    document.getElementById("afirmacaoFinal").textContent = aleatorio(afirmacoes);

    document.getElementById("resultado").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function reiniciarMissao() {
    iniciarMissao();
}

document.getElementById("tamanho").addEventListener("input", function () {
    document.getElementById("valorTamanho").textContent = this.value;
});

function gerarSenha() {
    const tamanho = Number(document.getElementById("tamanho").value);

    const grupos = [];

    if (document.getElementById("maiusculas").checked) {
        grupos.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    if (document.getElementById("minusculas").checked) {
        grupos.push("abcdefghijklmnopqrstuvwxyz");
    }

    if (document.getElementById("numeros").checked) {
        grupos.push("0123456789");
    }

    if (document.getElementById("simbolos").checked) {
        grupos.push("!@#$%&*_-+=");
    }

    if (grupos.length === 0) {
        document.getElementById("forcaTexto").textContent =
            "Selecione pelo menos um tipo de caractere.";
        return;
    }

    // Usa o gerador criptográfico do navegador para sortear caracteres.
    function sorteio(maximo) {
        const limite = Math.floor(4294967296 / maximo) * maximo;
        const numero = new Uint32Array(1);
        let valor;

        do {
            crypto.getRandomValues(numero);
            valor = numero[0];
        } while (valor >= limite);

        return valor % maximo;
    }

    const caracteres = grupos.join("");
    const resultado = [];

    // Garante ao menos um caractere de cada grupo selecionado.
    grupos.forEach(grupo => {
        resultado.push(grupo[sorteio(grupo.length)]);
    });

    while (resultado.length < tamanho) {
        resultado.push(caracteres[sorteio(caracteres.length)]);
    }

    // Embaralha os caracteres para não deixar os grupos previsíveis.
    for (let i = resultado.length - 1; i > 0; i--) {
        const j = sorteio(i + 1);
        [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
    }

    document.getElementById("senha").value = resultado.join("");

    const tipos = grupos.length;
    let nivel = "Boa";

    if (tamanho >= 16 && tipos >= 3) {
        nivel = "Forte";
    } else if (tamanho < 12 || tipos === 1) {
        nivel = "Pode melhorar";
    }

    const barra = document.getElementById("forcaBarra");
    const texto = document.getElementById("forcaTexto");

    barra.style.width =
        nivel === "Forte" ? "100%" :
        nivel === "Boa" ? "65%" : "30%";

    barra.style.background =
        nivel === "Forte" ? "#34d399" :
        nivel === "Boa" ? "#fbbf24" : "#fb7185";

    texto.textContent = "Avaliação estimada: " + nivel +
        ". Guarde a senha em um local seguro.";
}

async function copiarSenha() {
    const campo = document.getElement
