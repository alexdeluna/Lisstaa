// =====================================================
// LISTA DE COMPRAS - V1.1
// =====================================================


// =====================================================
// ELEMENTOS DAS TELAS
// =====================================================

const telaPrincipal = document.getElementById("telaPrincipal");
const telaCriarLista = document.getElementById("telaCriarLista");
const telaComprar = document.getElementById("telaComprar");


// =====================================================
// ELEMENTOS DA TELA PRINCIPAL
// =====================================================

const botaoCriarLista =
    document.getElementById("botaoCriarLista");


// =====================================================
// ELEMENTOS DA TELA CRIAR LISTA
// =====================================================

const nomeItem =
    document.getElementById("nomeItem");

const quantidadeItem =
    document.getElementById("quantidadeItem");

const botaoAdicionarItem =
    document.getElementById("botaoAdicionarItem");

const listaItens =
    document.getElementById("listaItens");

const contadorItens =
    document.getElementById("contadorItens");

const botaoFinalizarLista =
    document.getElementById("botaoFinalizarLista");

const botaoVoltarPrincipal =
    document.getElementById("botaoVoltarPrincipal");


// =====================================================
// ELEMENTOS DA TELA DE COMPRA
// =====================================================

const listaCompra =
    document.getElementById("listaCompra");

const totalCompra =
    document.getElementById("totalCompra");

const botaoVoltarLista =
    document.getElementById("botaoVoltarLista");


// =====================================================
// DADOS DA APLICAÇÃO
// =====================================================

let lista = [];


// =====================================================
// GERAR ID PARA CADA ITEM
// =====================================================

function gerarId() {

    return Date.now() +
        Math.floor(Math.random() * 1000);

}


// =====================================================
// SALVAR LISTA NO CELULAR
// =====================================================

function salvarLista() {

    localStorage.setItem(
        "listaComprasV11",
        JSON.stringify(lista)
    );

}


// =====================================================
// CARREGAR LISTA DO CELULAR
// =====================================================

function carregarLista() {

    const dados =
        localStorage.getItem("listaComprasV11");


    if (!dados) {

        lista = [];

        return;

    }


    try {

        lista = JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao carregar lista:",
            erro
        );

        lista = [];

    }

}


// =====================================================
// MOSTRAR UMA TELA
// =====================================================

function mostrarTela(tela) {

    telaPrincipal.classList.add("escondido");

    telaCriarLista.classList.add("escondido");

    telaComprar.classList.add("escondido");


    tela.classList.remove("escondido");

}


// =====================================================
// ATUALIZAR CONTADOR
// =====================================================

function atualizarContador() {

    const quantidade =
        lista.length;


    if (quantidade === 0) {

        contadorItens.textContent =
            "0 itens";

    } else if (quantidade === 1) {

        contadorItens.textContent =
            "1 item";

    } else {

        contadorItens.textContent =
            quantidade + " itens";

    }

}


// =====================================================
// MOSTRAR OS ITENS DA LISTA
// =====================================================

function renderizarLista() {

    listaItens.innerHTML = "";


    atualizarContador();


    if (lista.length === 0) {

        listaItens.innerHTML = `
            <p class="lista-vazia">
                Nenhum item adicionado.
            </p>
        `;

        return;

    }


    lista.forEach((item) => {

        const elemento =
            document.createElement("div");


        elemento.className =
            "item-lista";


        elemento.innerHTML = `

            <div class="item-lista-topo">

                <span class="item-lista-nome">
                    ${escaparHTML(item.nome)}
                </span>

                <span class="item-lista-quantidade">
                    Qtd.: ${item.quantidade}
                </span>

            </div>


            <div class="item-lista-acoes">

                <button
                    class="botao-editar"
                    data-id="${item.id}"
                >
                    Editar
                </button>

                <button
                    class="botao-excluir"
                    data-id="${item.id}"
                >
                    Excluir
                </button>

            </div>

        `;


        listaItens.appendChild(elemento);

    });


    configurarBotoesItens();

}


// =====================================================
// PROTEÇÃO CONTRA HTML DIGITADO PELO USUÁRIO
// =====================================================

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");

    elemento.textContent = texto;

    return elemento.innerHTML;

}


// =====================================================
// CONFIGURAR BOTÕES EDITAR / EXCLUIR
// =====================================================

function configurarBotoesItens() {

    const botoesEditar =
        document.querySelectorAll(".botao-editar");


    const botoesExcluir =
        document.querySelectorAll(".botao-excluir");


    botoesEditar.forEach((botao) => {

        botao.addEventListener("click", () => {

            editarItem(
                Number(botao.dataset.id)
            );

        });

    });


    botoesExcluir.forEach((botao) => {

        botao.addEventListener("click", () => {

            excluirItem(
                Number(botao.dataset.id)
            );

        });

    });

}


// =====================================================
// ADICIONAR ITEM
// =====================================================

function adicionarItem() {

    const nome =
        nomeItem.value.trim();


    const quantidade =
        Number(quantidadeItem.value);


    if (nome === "") {

        alert(
            "Digite o nome do item."
        );

        nomeItem.focus();

        return;

    }


    if (
        !Number.isInteger(quantidade) ||
        quantidade <= 0
    ) {

        alert(
            "Digite uma quantidade válida."
        );

        quantidadeItem.focus();

        return;

    }


    const novoItem = {

        id: gerarId(),

        nome: nome,

        quantidade: quantidade,

        valorUnitarioCentavos: 0,

        comprado: false

    };


    lista.push(novoItem);


    salvarLista();

    renderizarLista();


    // Limpa os campos

    nomeItem.value = "";

    quantidadeItem.value = "";


    nomeItem.focus();

}


// =====================================================
// EDITAR ITEM
// =====================================================

function editarItem(id) {

    const item =
        lista.find((item) => item.id === id);


    if (!item) {

        return;

    }


    const novoNome =
        prompt(
            "Nome do item:",
            item.nome
        );


    if (novoNome === null) {

        return;

    }


    const nomeLimpo =
        novoNome.trim();


    if (nomeLimpo === "") {

        alert(
            "O nome do item não pode ficar vazio."
        );

        return;

    }


    const novaQuantidade =
        prompt(
            "Quantidade:",
            item.quantidade
        );


    if (novaQuantidade === null) {

        return;

    }


    const quantidade =
        Number(novaQuantidade);


    if (
        !Number.isInteger(quantidade) ||
        quantidade <= 0
    ) {

        alert(
            "Quantidade inválida."
        );

        return;

    }


    item.nome =
        nomeLimpo;


    item.quantidade =
        quantidade;


    salvarLista();

    renderizarLista();

}


// =====================================================
// EXCLUIR ITEM
// =====================================================

function excluirItem(id) {

    const item =
        lista.find((item) => item.id === id);


    if (!item) {

        return;

    }


    const confirmar =
        confirm(
            `Deseja excluir "${item.nome}"?`
        );


    if (!confirmar) {

        return;

    }


    lista =
        lista.filter(
            (item) => item.id !== id
        );


    salvarLista();

    renderizarLista();

}


// =====================================================
// FINALIZAR LISTA
// =====================================================

function finalizarLista() {

    if (lista.length === 0) {

        alert(
            "Adicione pelo menos um item antes de finalizar."
        );

        return;

    }


    renderizarTelaCompra();

    mostrarTela(telaComprar);

}


// =====================================================
// MOSTRAR TELA DE COMPRA
// =====================================================

function renderizarTelaCompra() {

    listaCompra.innerHTML = "";


    lista.forEach((item) => {

        const elemento =
            document.createElement("article");


        elemento.className =
            "item-compra";


        if (item.comprado) {

            elemento.classList.add(
                "comprado"
            );

        }


        elemento.innerHTML = `

            <div class="item-compra-topo">

                <span class="item-compra-nome">
                    ${escaparHTML(item.nome)}
                </span>

                <span class="item-compra-quantidade">
                    Qtd.: ${item.quantidade}
                </span>

            </div>


            <div class="item-compra-conteudo">

                <div>

                    <label>
                        Valor unitário
                    </label>

                    <input
                        type="text"
                        class="campo-valor-compra"
                        inputmode="numeric"
                        placeholder="R$ 0,00"
                        autocomplete="off"
                        data-id="${item.id}"
                        value="${item.valorUnitarioCentavos > 0
                            ? centavosParaMoeda(item.valorUnitarioCentavos)
                            : ""}"
                    >

                </div>


                <button
                    class="botao-comprado"
                    data-id="${item.id}"
                >
                    ${item.comprado
                        ? "✓ Comprado"
                        : "Marcar como comprado"}
                </button>

            </div>


            <div class="subtotal">

                Subtotal:

                <strong>
                    ${centavosParaMoeda(
                        item.valorUnitarioCentavos *
                        item.quantidade
                    )}
                </strong>

            </div>

        `;


        listaCompra.appendChild(elemento);

    });


    configurarCamposCompra();

    atualizarTotalCompra();

}


// =====================================================
// CENTAVOS → MOEDA
// =====================================================

function centavosParaMoeda(centavos) {

    return (
        centavos / 100
    ).toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}


// =====================================================
// DIGITAÇÃO MONETÁRIA COM CENTAVOS
// =====================================================
//
// 1      → R$ 0,01
// 12     → R$ 0,12
// 125    → R$ 1,25
// 1250   → R$ 12,50
//
// O valor armazenado é sempre inteiro em centavos.
// =====================================================

function configurarCamposCompra() {

    const campos =
        document.querySelectorAll(
            ".campo-valor-compra"
        );


    campos.forEach((campo) => {

        campo.addEventListener(
            "input",
            () => {

                let numeros =
                    campo.value.replace(
                        /\D/g,
                        ""
                    );


                if (numeros === "") {

                    campo.value = "";


                    const id =
                        Number(campo.dataset.id);


                    const item =
                        lista.find(
                            (item) => item.id === id
                        );


                    if (item) {

                        item.valorUnitarioCentavos =
                            0;

                    }


                    salvarLista();

                    atualizarTotalCompra();

                    return;

                }


                numeros =
                    numeros.replace(
                        /^0+(?=\d)/,
                        ""
                    );


                const centavos =
                    Number(numeros);


                campo.value =
                    centavosParaMoeda(
                        centavos
                    );


                const id =
                    Number(campo.dataset.id);


                const item =
                    lista.find(
                        (item) => item.id === id
                    );


                if (item) {

                    item.valorUnitarioCentavos =
                        centavos;

                }


                salvarLista();

                atualizarTotalCompra();

            }
        );

    });


    const botoes =
        document.querySelectorAll(
            ".botao-comprado"
        );


    botoes.forEach((botao) => {

        botao.addEventListener(
            "click",
            () => {

                const id =
                    Number(botao.dataset.id);


                const item =
                    lista.find(
                        (item) => item.id === id
                    );


                if (!item) {

                    return;

                }


                item.comprado =
                    !item.comprado;


                salvarLista();


                renderizarTelaCompra();

            }
        );

    });

}


// =====================================================
// ATUALIZAR TOTAL
// =====================================================

function atualizarTotalCompra() {

    let totalCentavos = 0;


    lista.forEach((item) => {

        totalCentavos +=
            item.valorUnitarioCentavos *
            item.quantidade;

    });


    totalCompra.textContent =
        centavosParaMoeda(
            totalCentavos
        );

}


// =====================================================
// BOTÃO CRIAR NOVA LISTA
// =====================================================

botaoCriarLista.addEventListener(
    "click",
    () => {

        lista = [];


        salvarLista();

        renderizarLista();

        mostrarTela(telaCriarLista);

        nomeItem.focus();

    }
);


// =====================================================
// BOTÃO ADICIONAR ITEM
// =====================================================

botaoAdicionarItem.addEventListener(
    "click",
    adicionarItem
);


// =====================================================
// ENTER NO CAMPO NOME
// =====================================================

nomeItem.addEventListener(
    "keydown",
    (evento) => {

        if (evento.key === "Enter") {

            quantidadeItem.focus();

        }

    }
);


// =====================================================
// ENTER NO CAMPO QUANTIDADE
// =====================================================

quantidadeItem.addEventListener(
    "keydown",
    (evento) => {

        if (evento.key === "Enter") {

            adicionarItem();

        }

    }
);


// =====================================================
// FINALIZAR LISTA
// =====================================================

botaoFinalizarLista.addEventListener(
    "click",
    finalizarLista
);


// =====================================================
// VOLTAR PARA MENU PRINCIPAL
// =====================================================

botaoVoltarPrincipal.addEventListener(
    "click",
    () => {

        mostrarTela(telaPrincipal);

    }
);


// =====================================================
// VOLTAR PARA LISTA
// =====================================================

botaoVoltarLista.addEventListener(
    "click",
    () => {

        renderizarLista();

        mostrarTela(telaCriarLista);

    }
);


// =====================================================
// INICIALIZAÇÃO
// =====================================================

carregarLista();

renderizarLista();


// =====================================================
// SERVICE WORKER
// =====================================================

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("sw.js")
                .then(() => {

                    console.log(
                        "Service Worker registrado."
                    );

                })
                .catch((erro) => {

                    console.error(
                        "Erro no Service Worker:",
                        erro
                    );

                });

        }
    );

}
