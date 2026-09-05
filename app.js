// =====================================================
// LISTA DE COMPRAS - V1.1
// =====================================================


// =====================================================
// TELAS
// =====================================================

const telaPrincipal =
    document.getElementById("telaPrincipal");

const telaCriarLista =
    document.getElementById("telaCriarLista");

const telaMinhasListas =
    document.getElementById("telaMinhasListas");

const telaVisualizarLista =
    document.getElementById("telaVisualizarLista");

const telaComprar =
    document.getElementById("telaComprar");


// =====================================================
// ELEMENTOS - MENU PRINCIPAL
// =====================================================

const botaoCriarLista =
    document.getElementById("botaoCriarLista");

const botaoMinhasListas =
    document.getElementById("botaoMinhasListas");


// =====================================================
// ELEMENTOS - CRIAR LISTA
// =====================================================

const nomeLista =
    document.getElementById("nomeLista");

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

const botaoCancelarLista =
    document.getElementById("botaoCancelarLista");


// =====================================================
// ELEMENTOS - MINHAS LISTAS
// =====================================================

const listasSalvas =
    document.getElementById("listasSalvas");

const botaoVoltarPrincipalListas =
    document.getElementById(
        "botaoVoltarPrincipalListas"
    );


// =====================================================
// ELEMENTOS - VISUALIZAR LISTA
// =====================================================

const tituloListaVisualizacao =
    document.getElementById(
        "tituloListaVisualizacao"
    );

const informacoesListaVisualizacao =
    document.getElementById(
        "informacoesListaVisualizacao"
    );

const itensListaVisualizacao =
    document.getElementById(
        "itensListaVisualizacao"
    );

const botaoUsarListaVisualizacao =
    document.getElementById(
        "botaoUsarListaVisualizacao"
    );

const botaoVoltarMinhasListas =
    document.getElementById(
        "botaoVoltarMinhasListas"
    );


// =====================================================
// ELEMENTOS - COMPRAS
// =====================================================

const tituloListaCompra =
    document.getElementById(
        "tituloListaCompra"
    );

const informacoesListaCompra =
    document.getElementById(
        "informacoesListaCompra"
    );

const listaCompra =
    document.getElementById("listaCompra");

const totalCompra =
    document.getElementById("totalCompra");

const botaoFinalizarCompra =
    document.getElementById(
        "botaoFinalizarCompra"
    );

const botaoVoltarLista =
    document.getElementById(
        "botaoVoltarLista"
    );


// =====================================================
// DADOS
// =====================================================

let listaAtual = [];

let listasSalvasDados = [];

let idListaAtual = null;


// =====================================================
// INICIALIZAÇÃO
// =====================================================

carregarListas();


// =====================================================
// GERAR IDENTIFICADOR
// =====================================================

function gerarId() {

    return (
        Date.now().toString() +
        "-" +
        Math.floor(
            Math.random() * 10000
        ).toString()
    );

}


// =====================================================
// DATA
// =====================================================

function obterDataAtual() {

    const agora = new Date();

    const dia =
        String(
            agora.getDate()
        ).padStart(2, "0");

    const mes =
        String(
            agora.getMonth() + 1
        ).padStart(2, "0");

    const ano =
        agora.getFullYear();

    return `${dia}/${mes}/${ano}`;

}


// =====================================================
// SALVAR NO LOCALSTORAGE
// =====================================================

function salvarListas() {

    localStorage.setItem(
        "listasComprasV11",
        JSON.stringify(
            listasSalvasDados
        )
    );

}


// =====================================================
// CARREGAR LISTAS
// =====================================================

function carregarListas() {

    const dados =
        localStorage.getItem(
            "listasComprasV11"
        );


    if (!dados) {

        listasSalvasDados = [];

        return;

    }


    try {

        listasSalvasDados =
            JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao carregar listas:",
            erro
        );

        listasSalvasDados = [];

    }

}


// =====================================================
// MOSTRAR TELA
// =====================================================

function mostrarTela(tela) {

    const telas = [

        telaPrincipal,

        telaCriarLista,

        telaMinhasListas,

        telaVisualizarLista,

        telaComprar

    ];


    telas.forEach((telaItem) => {

        if (telaItem) {

            telaItem.classList.add(
                "escondido"
            );

        }

    });


    tela.classList.remove(
        "escondido"
    );

}


// =====================================================
// ESCAPAR HTML
// =====================================================

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");

    elemento.textContent = texto;

    return elemento.innerHTML;

}


// =====================================================
// CRIAR NOVA LISTA
// =====================================================

function iniciarNovaLista() {

    listaAtual = [];

    idListaAtual = null;

    nomeLista.value = "";

    nomeItem.value = "";

    quantidadeItem.value = "";

    renderizarItensLista();

    mostrarTela(
        telaCriarLista
    );

    nomeLista.focus();

}


// =====================================================
// ADICIONAR ITEM
// =====================================================

function adicionarItem() {

    const nome =
        nomeItem.value.trim();

    const quantidade =
        Number(
            quantidadeItem.value
        );


    if (!nome) {

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


    listaAtual.push({

        id: gerarId(),

        nome: nome,

        quantidade: quantidade,

        valorUnitarioCentavos: 0,

        comprado: false

    });


    nomeItem.value = "";

    quantidadeItem.value = "";


    salvarListaAtualTemporaria();

    renderizarItensLista();

    nomeItem.focus();

}


// =====================================================
// SALVAR LISTA ATUAL TEMPORARIAMENTE
// =====================================================

function salvarListaAtualTemporaria() {

    localStorage.setItem(
        "listaAtualComprasV11",
        JSON.stringify({
            nome: nomeLista.value.trim(),
            itens: listaAtual
        })
    );

}


// =====================================================
// CARREGAR LISTA TEMPORÁRIA
// =====================================================

function carregarListaTemporaria() {

    const dados =
        localStorage.getItem(
            "listaAtualComprasV11"
        );


    if (!dados) {

        return false;

    }


    try {

        const listaTemporaria =
            JSON.parse(dados);


        if (
            listaTemporaria &&
            Array.isArray(
                listaTemporaria.itens
            )
        ) {

            listaAtual =
                listaTemporaria.itens;

            nomeLista.value =
                listaTemporaria.nome || "";

            return true;

        }

    } catch (erro) {

        console.error(
            "Erro ao recuperar lista temporária:",
            erro
        );

    }


    return false;

}


// =====================================================
// RENDERIZAR ITENS DA LISTA
// =====================================================

function renderizarItensLista() {

    listaItens.innerHTML = "";


    contadorItens.textContent =
        listaAtual.length === 1
            ? "1 item"
            : `${listaAtual.length} itens`;


    if (listaAtual.length === 0) {

        listaItens.innerHTML = `
            <p class="lista-vazia">
                Nenhum item adicionado.
            </p>
        `;

        return;

    }


    listaAtual.forEach((item) => {

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
                    class="botao botao-editar"
                    data-id="${item.id}"
                >
                    Editar
                </button>

                <button
                    class="botao botao-excluir"
                    data-id="${item.id}"
                >
                    Excluir
                </button>

            </div>
        `;


        listaItens.appendChild(
            elemento
        );

    });


    configurarBotoesLista();

}


// =====================================================
// BOTÕES EDITAR / EXCLUIR
// =====================================================

function configurarBotoesLista() {

    document
        .querySelectorAll(".botao-editar")
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    editarItem(
                        botao.dataset.id
                    );

                }
            );

        });


    document
        .querySelectorAll(".botao-excluir")
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    excluirItem(
                        botao.dataset.id
                    );

                }
            );

        });

}


// =====================================================
// EDITAR ITEM
// =====================================================

function editarItem(id) {

    const item =
        listaAtual.find(
            (item) =>
                String(item.id) === String(id)
        );


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


    const nome =
        novoNome.trim();


    if (!nome) {

        alert(
            "O nome não pode ficar vazio."
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


    item.nome = nome;

    item.quantidade = quantidade;


    salvarListaAtualTemporaria();

    renderizarItensLista();

}


// =====================================================
// EXCLUIR ITEM
// =====================================================

function excluirItem(id) {

    const item =
        listaAtual.find(
            (item) =>
                String(item.id) === String(id)
        );


    if (!item) {

        return;

    }


    const confirmar =
        confirm(
            `Excluir "${item.nome}"?`
        );


    if (!confirmar) {

        return;

    }


    listaAtual =
        listaAtual.filter(
            (item) =>
                String(item.id) !== String(id)
        );


    salvarListaAtualTemporaria();

    renderizarItensLista();

}


// =====================================================
// SALVAR LISTA PREPARADA
// =====================================================

function finalizarLista() {

    const nome =
        nomeLista.value.trim();


    if (!nome) {

        alert(
            "Digite um nome para a lista."
        );

        nomeLista.focus();

        return;

    }


    if (listaAtual.length === 0) {

        alert(
            "Adicione pelo menos um item."
        );

        return;

    }


    const novaLista = {

        id: gerarId(),

        nome: nome,

        data: obterDataAtual(),

        itens:
            JSON.parse(
                JSON.stringify(listaAtual)
            )

    };


    listasSalvasDados.unshift(
        novaLista
    );


    salvarListas();


    localStorage.removeItem(
        "listaAtualComprasV11"
    );


    listaAtual = [];

    idListaAtual =
        novaLista.id;


    mostrarTela(
        telaMinhasListas
    );


    renderizarListasSalvas();

}


// =====================================================
// RENDERIZAR LISTAS SALVAS
// =====================================================

function renderizarListasSalvas() {

    listasSalvas.innerHTML = "";


    if (
        listasSalvasDados.length === 0
    ) {

        listasSalvas.innerHTML = `
            <div class="cartao">

                <p class="lista-vazia">
                    Nenhuma lista salva.
                </p>

            </div>
        `;

        return;

    }


    listasSalvasDados.forEach(
        (listaSalva) => {

            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "lista-salva";


            elemento.innerHTML = `

                <div class="lista-salva-topo">

                    <div>

                        <h3 class="lista-salva-nome">
                            ${escaparHTML(
                                listaSalva.nome
                            )}
                        </h3>

                        <div class="lista-salva-data">
                            ${listaSalva.data}
                        </div>

                    </div>

                    <span class="lista-salva-id">
                        ID: ${listaSalva.id}
                    </span>

                </div>


                <div class="lista-salva-info">

                    ${listaSalva.itens.length}
                    ${
                        listaSalva.itens.length === 1
                            ? "item"
                            : "itens"
                    }

                </div>


                <div class="lista-salva-acoes">

                    <button
                        class="botao botao-principal botao-visualizar-lista"
                        data-id="${listaSalva.id}"
                    >
                        Visualizar
                    </button>

                    <button
                        class="botao botao-sucesso botao-usar-lista"
                        data-id="${listaSalva.id}"
                    >
                        Usar novamente
                    </button>

                </div>

            `;


            listasSalvas.appendChild(
                elemento
            );

        }
    );


    configurarBotoesListasSalvas();

}


// =====================================================
// BOTÕES DAS LISTAS SALVAS
// =====================================================

function configurarBotoesListasSalvas() {

    document
        .querySelectorAll(
            ".botao-visualizar-lista"
        )
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    visualizarLista(
                        botao.dataset.id
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".botao-usar-lista"
        )
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    usarListaNovamente(
                        botao.dataset.id
                    );

                }
            );

        });

}


// =====================================================
// ENCONTRAR LISTA SALVA
// =====================================================

function encontrarLista(id) {

    return listasSalvasDados.find(
        (lista) =>
            String(lista.id) === String(id)
    );

}


// =====================================================
// VISUALIZAR LISTA
// =====================================================

function visualizarLista(id) {

    const lista =
        encontrarLista(id);


    if (!lista) {

        return;

    }


    idListaAtual =
        lista.id;


    tituloListaVisualizacao.textContent =
        lista.nome;


    informacoesListaVisualizacao.textContent =
        `${lista.data} • ${lista.itens.length} ${
            lista.itens.length === 1
                ? "item"
                : "itens"
        }`;


    itensListaVisualizacao.innerHTML = "";


    lista.itens.forEach(
        (item) => {

            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "item-visualizacao";


            elemento.innerHTML = `

                <div class="item-visualizacao-topo">

                    <span class="item-visualizacao-nome">
                        ${escaparHTML(item.nome)}
                    </span>

                    <span class="item-visualizacao-quantidade">
                        Qtd.: ${item.quantidade}
                    </span>

                </div>

            `;


            itensListaVisualizacao.appendChild(
                elemento
            );

        }
    );


    mostrarTela(
        telaVisualizarLista
    );

}


// =====================================================
// USAR LISTA NOVAMENTE
// =====================================================

function usarListaNovamente(id) {

    const listaOriginal =
        encontrarLista(id);


    if (!listaOriginal) {

        return;

    }


    const novaLista = {

        id: gerarId(),

        nome: listaOriginal.nome,

        data: obterDataAtual(),

        itens:
            listaOriginal.itens.map(
                (item) => ({

                    id: gerarId(),

                    nome: item.nome,

                    quantidade: item.quantidade,

                    valorUnitarioCentavos: 0,

                    comprado: false

                })
            )

    };


    listaAtual =
        novaLista.itens;


    nomeLista.value =
        novaLista.nome;


    idListaAtual =
        novaLista.id;


    salvarListaAtualTemporaria();

    renderizarItensLista();

    mostrarTela(
        telaCriarLista
    );

}


// =====================================================
// RENDERIZAR TELA DE COMPRA
// =====================================================

function renderizarTelaCompra(lista) {

    tituloListaCompra.textContent =
        lista.nome;


    informacoesListaCompra.textContent =
        `${lista.data} • ${lista.itens.length} ${
            lista.itens.length === 1
                ? "item"
                : "itens"
        }`;


    listaCompra.innerHTML = "";


    lista.itens.forEach(
        (item) => {

            const elemento =
                document.createElement(
                    "article"
                );


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
                            value="${
                                item.valorUnitarioCentavos > 0
                                    ? centavosParaMoeda(
                                        item.valorUnitarioCentavos
                                    )
                                    : ""
                            }"
                        >

                    </div>


                    <button
                        class="botao-comprado"
                        data-id="${item.id}"
                    >
                        ${
                            item.comprado
                                ? "✓ Comprado"
                                : "Marcar como comprado"
                        }
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


                <button
                    class="botao botao-editar-compra"
                    data-id="${item.id}"
                >
                    Editar item
                </button>

            `;


            listaCompra.appendChild(
                elemento
            );

        }
    );


    configurarCamposCompra();

    atualizarTotalCompra(
        lista
    );

}


// =====================================================
// CENTAVOS → MOEDA
// =====================================================

function centavosParaMoeda(centavos) {

    return (
        centavos / 100
    ).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// =====================================================
// MÁSCARA MONETÁRIA
// =====================================================
//
// 1    → R$ 0,01
// 12   → R$ 0,12
// 125  → R$ 1,25
// 1250 → R$ 12,50
//
// O valor armazenado é inteiro em centavos.
// =====================================================

function configurarCamposCompra() {

    document
        .querySelectorAll(
            ".campo-valor-compra"
        )
        .forEach((campo) => {

            campo.addEventListener(
                "input",
                () => {

                    const lista =
                        encontrarLista(
                            idListaAtual
                        );


                    if (!lista) {

                        return;

                    }


                    const id =
                        campo.dataset.id;


                    const item =
                        lista.itens.find(
                            (item) =>
                                String(item.id) ===
                                String(id)
                        );


                    if (!item) {

                        return;

                    }


                    let numeros =
                        campo.value.replace(
                            /\D/g,
                            ""
                        );


                    if (
                        numeros === ""
                    ) {

                        item.valorUnitarioCentavos =
                            0;

                        campo.value = "";

                    } else {

                        numeros =
                            numeros.replace(
                                /^0+(?=\d)/,
                                ""
                            );


                        const centavos =
                            Number(numeros);


                        item.valorUnitarioCentavos =
                            centavos;


                        campo.value =
                            centavosParaMoeda(
                                centavos
                            );

                    }


                    salvarListas();

                    atualizarSubtotal(
                        lista,
                        item
                    );

                    atualizarTotalCompra(
                        lista
                    );

                }
            );

        });


    // -------------------------------------------------
    // COMPRADO
    // -------------------------------------------------

    document
        .querySelectorAll(
            ".botao-comprado"
        )
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    const lista =
                        encontrarLista(
                            idListaAtual
                        );


                    if (!lista) {

                        return;

                    }


                    const item =
                        lista.itens.find(
                            (item) =>
                                String(item.id) ===
                                String(botao.dataset.id)
                        );


                    if (!item) {

                        return;

                    }


                    item.comprado =
                        !item.comprado;


                    salvarListas();

                    renderizarTelaCompra(
                        lista
                    );

                }
            );

        });


    // -------------------------------------------------
    // EDITAR ITEM COMPRADO
    // -------------------------------------------------

    document
        .querySelectorAll(
            ".botao-editar-compra"
        )
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    editarItemDuranteCompra(
                        botao.dataset.id
                    );

                }
            );

        });

}


// =====================================================
// EDITAR ITEM DURANTE A COMPRA
// =====================================================

function editarItemDuranteCompra(id) {

    const lista =
        encontrarLista(
            idListaAtual
        );


    if (!lista) {

        return;

    }


    const item =
        lista.itens.find(
            (item) =>
                String(item.id) ===
                String(id)
        );


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


    const nome =
        novoNome.trim();


    if (!nome) {

        alert(
            "O nome não pode ficar vazio."
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
        nome;


    item.quantidade =
        quantidade;


    salvarListas();

    renderizarTelaCompra(
        lista
    );

}


// =====================================================
// ATUALIZAR SUBTOTAL
// =====================================================

function atualizarSubtotal(
    lista,
    item
) {

    const elementos =
        document.querySelectorAll(
            ".item-compra"
        );


    elementos.forEach(
        (elemento) => {

            const botao =
                elemento.querySelector(
                    ".botao-comprado"
                );


            if (
                !botao ||
                String(
                    botao.dataset.id
                ) !== String(item.id)
            ) {

                return;

            }


            const subtotal =
                elemento.querySelector(
                    ".subtotal strong"
                );


            if (subtotal) {

                subtotal.textContent =
                    centavosParaMoeda(
                        item.valorUnitarioCentavos *
                        item.quantidade
                    );

            }

        }
    );

}


// =====================================================
// ATUALIZAR TOTAL
// =====================================================

function atualizarTotalCompra(lista) {

    let totalCentavos = 0;


    lista.itens.forEach(
        (item) => {

            totalCentavos +=
                item.valorUnitarioCentavos *
                item.quantidade;

        }
    );


    totalCompra.textContent =
        centavosParaMoeda(
            totalCentavos
        );

}


// =====================================================
// FINALIZAR COMPRA
// =====================================================

function finalizarCompra() {

    const lista =
        encontrarLista(
            idListaAtual
        );


    if (!lista) {

        return;

    }


    salvarListas();

    alert(
        "Compra finalizada."
    );


    mostrarTela(
        telaMinhasListas
    );

    renderizarListasSalvas();

}


// =====================================================
// BOTÃO CRIAR LISTA
// =====================================================

botaoCriarLista.addEventListener(
    "click",
    iniciarNovaLista
);


// =====================================================
// BOTÃO MINHAS LISTAS
// =====================================================

botaoMinhasListas.addEventListener(
    "click",
    () => {

        renderizarListasSalvas();

        mostrarTela(
            telaMinhasListas
        );

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
// ENTER - NOME DO ITEM
// =====================================================

nomeItem.addEventListener(
    "keydown",
    (evento) => {

        if (
            evento.key === "Enter"
        ) {

            quantidadeItem.focus();

        }

    }
);


// =====================================================
// ENTER - QUANTIDADE
// =====================================================

quantidadeItem.addEventListener(
    "keydown",
    (evento) => {

        if (
            evento.key === "Enter"
        ) {

            adicionarItem();

        }

    }
);


// =====================================================
// ALTERAÇÃO DO NOME DA LISTA
// =====================================================

nomeLista.addEventListener(
    "input",
    salvarListaAtualTemporaria
);


// =====================================================
// SALVAR LISTA
// =====================================================

botaoFinalizarLista.addEventListener(
    "click",
    finalizarLista
);


// =====================================================
// CANCELAR CRIAÇÃO
// =====================================================

botaoCancelarLista.addEventListener(
    "click",
    () => {

        const confirmar =
            confirm(
                "Cancelar esta lista?"
            );


        if (!confirmar) {

            return;

        }


        listaAtual = [];

        nomeLista.value = "";

        nomeItem.value = "";

        quantidadeItem.value = "";

        localStorage.removeItem(
            "listaAtualComprasV11"
        );

        mostrarTela(
            telaPrincipal
        );

    }
);


// =====================================================
// VOLTAR DO MENU DE LISTAS
// =====================================================

botaoVoltarPrincipalListas.addEventListener(
    "click",
    () => {

        mostrarTela(
            telaPrincipal
        );

    }
);


// =====================================================
// VOLTAR PARA MINHAS LISTAS
// =====================================================

botaoVoltarMinhasListas.addEventListener(
    "click",
    () => {

        renderizarListasSalvas();

        mostrarTela(
            telaMinhasListas
        );

    }
);


// =====================================================
// USAR LISTA NOVAMENTE
// =====================================================

botaoUsarListaVisualizacao.addEventListener(
    "click",
    () => {

        if (!idListaAtual) {

            return;

        }


        usarListaNovamente(
            idListaAtual
        );

    }
);


// =====================================================
// FINALIZAR COMPRA
// =====================================================

botaoFinalizarCompra.addEventListener(
    "click",
    finalizarCompra
);


// =====================================================
// VOLTAR PARA A LISTA
// =====================================================

botaoVoltarLista.addEventListener(
    "click",
    () => {

        const lista =
            encontrarLista(
                idListaAtual
            );


        if (!lista) {

            mostrarTela(
                telaMinhasListas
            );

            return;

        }


        listaAtual =
            lista.itens;


        nomeLista.value =
            lista.nome;


        renderizarItensLista();

        mostrarTela(
            telaCriarLista
        );

    }
);


// =====================================================
// RECUPERAR RASCUNHO AO INICIAR
// =====================================================

if (
    carregarListaTemporaria()
) {

    renderizarItensLista();

}


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
