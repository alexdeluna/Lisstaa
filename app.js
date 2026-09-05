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
// MENU PRINCIPAL
// =====================================================

const botaoCriarLista =
    document.getElementById("botaoCriarLista");

const botaoMinhasListas =
    document.getElementById("botaoMinhasListas");


// =====================================================
// CRIAR LISTA
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
// MINHAS LISTAS
// =====================================================

const listasSalvas =
    document.getElementById("listasSalvas");

const botaoVoltarPrincipalListas =
    document.getElementById(
        "botaoVoltarPrincipalListas"
    );


// =====================================================
// VISUALIZAÇÃO
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

const botaoComprarVisualizacao =
    document.getElementById(
        "botaoComprarVisualizacao"
    );

const botaoUsarListaVisualizacao =
    document.getElementById(
        "botaoUsarListaVisualizacao"
    );

const botaoExcluirVisualizacao =
    document.getElementById(
        "botaoExcluirVisualizacao"
    );

const botaoVoltarMinhasListas =
    document.getElementById(
        "botaoVoltarMinhasListas"
    );


// =====================================================
// COMPRA
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
// STORAGE
// =====================================================

const CHAVE_LISTAS =
    "listasComprasV11";

const CHAVE_RASCUNHO =
    "listaAtualComprasV11";


// =====================================================
// INICIALIZAÇÃO
// =====================================================

carregarListas();


// =====================================================
// ID ÚNICO
// =====================================================

function gerarId() {

    return (
        Date.now().toString() +
        "-" +
        Math.floor(
            Math.random() * 100000
        ).toString()
    );

}


// =====================================================
// DATA
// =====================================================

function obterDataAtual() {

    const agora =
        new Date();


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
// SALVAR LISTAS
// =====================================================

function salvarListas() {

    localStorage.setItem(
        CHAVE_LISTAS,
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
            CHAVE_LISTAS
        );


    if (!dados) {

        listasSalvasDados = [];

        return;

    }


    try {

        listasSalvasDados =
            JSON.parse(dados);


        if (
            !Array.isArray(
                listasSalvasDados
            )
        ) {

            listasSalvasDados = [];

        }

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


    telas.forEach(
        (telaItem) => {

            if (telaItem) {

                telaItem.classList.add(
                    "escondido"
                );

            }

        }
    );


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

    elemento.textContent =
        texto;

    return elemento.innerHTML;

}


// =====================================================
// NOVA LISTA
// =====================================================

function iniciarNovaLista() {

    listaAtual = [];

    idListaAtual = null;

    nomeLista.value = "";

    nomeItem.value = "";

    quantidadeItem.value = "";


    localStorage.removeItem(
        CHAVE_RASCUNHO
    );


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


    salvarRascunho();

    renderizarItensLista();

    nomeItem.focus();

}


// =====================================================
// RASCUNHO
// =====================================================

function salvarRascunho() {

    localStorage.setItem(
        CHAVE_RASCUNHO,
        JSON.stringify({

            nome:
                nomeLista.value.trim(),

            itens:
                listaAtual

        })
    );

}


// =====================================================
// RECUPERAR RASCUNHO
// =====================================================

function carregarRascunho() {

    const dados =
        localStorage.getItem(
            CHAVE_RASCUNHO
        );


    if (!dados) {

        return false;

    }


    try {

        const rascunho =
            JSON.parse(dados);


        if (
            !rascunho ||
            !Array.isArray(
                rascunho.itens
            )
        ) {

            return false;

        }


        listaAtual =
            rascunho.itens;


        nomeLista.value =
            rascunho.nome || "";


        return true;

    } catch (erro) {

        console.error(
            "Erro ao carregar rascunho:",
            erro
        );

        return false;

    }

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


    listaAtual.forEach(
        (item) => {

            const elemento =
                document.createElement(
                    "div"
                );


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

        }
    );


    configurarBotoesLista();

}


// =====================================================
// BOTÕES DOS ITENS
// =====================================================

function configurarBotoesLista() {

    document
        .querySelectorAll(
            "#listaItens .botao-editar"
        )
        .forEach(
            (botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        editarItem(
                            botao.dataset.id
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "#listaItens .botao-excluir"
        )
        .forEach(
            (botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        excluirItem(
                            botao.dataset.id
                        );

                    }
                );

            }
        );

}


// =====================================================
// EDITAR ITEM
// =====================================================

function editarItem(id) {

    const item =
        listaAtual.find(
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


    salvarRascunho();

    renderizarItensLista();

}


// =====================================================
// EXCLUIR ITEM
// =====================================================

function excluirItem(id) {

    const item =
        listaAtual.find(
            (item) =>
                String(item.id) ===
                String(id)
        );


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


    listaAtual =
        listaAtual.filter(
            (item) =>
                String(item.id) !==
                String(id)
        );


    salvarRascunho();

    renderizarItensLista();

}


// =====================================================
// SALVAR LISTA PREPARADA
// =====================================================

function salvarListaPreparada() {

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
            listaAtual.map(
                (item) => ({

                    id: gerarId(),

                    nome: item.nome,

                    quantidade: item.quantidade,

                    valorUnitarioCentavos:
                        Number(
                            item.valorUnitarioCentavos
                        ) || 0,

                    comprado:
                        Boolean(
                            item.comprado
                        )

                })
            )

    };


    listasSalvasDados.unshift(
        novaLista
    );


    salvarListas();


    localStorage.removeItem(
        CHAVE_RASCUNHO
    );


    listaAtual = [];

    idListaAtual =
        novaLista.id;


    renderizarListasSalvas();

    mostrarTela(
        telaMinhasListas
    );

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


            const totalItens =
                listaSalva.itens.length;


            const itensComprados =
                listaSalva.itens.filter(
                    (item) =>
                        item.comprado
                ).length;


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

                    ${totalItens}
                    ${
                        totalItens === 1
                            ? "item"
                            : "itens"
                    }

                    ${
                        itensComprados > 0
                            ? ` • ${itensComprados} comprados`
                            : ""
                    }

                </div>


                <div class="lista-salva-acoes">

                    <button
                        class="botao botao-principal botao-comprar-lista"
                        data-id="${listaSalva.id}"
                    >
                        Comprar
                    </button>


                    <button
                        class="botao botao-secundario botao-visualizar-lista"
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


                    <button
                        class="botao botao-excluir botao-excluir-lista"
                        data-id="${listaSalva.id}"
                    >
                        Excluir lista
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


    // -------------------------------------------------
    // COMPRAR
    // -------------------------------------------------

    document
        .querySelectorAll(
            ".botao-comprar-lista"
        )
        .forEach(
            (botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        abrirListaParaCompra(
                            botao.dataset.id
                        );

                    }
                );

            }
        );


    // -------------------------------------------------
    // VISUALIZAR
    // -------------------------------------------------

    document
        .querySelectorAll(
            ".botao-visualizar-lista"
        )
        .forEach(
            (botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        visualizarLista(
                            botao.dataset.id
                        );

                    }
                );

            }
        );


    // -------------------------------------------------
    // USAR NOVAMENTE
    // -------------------------------------------------

    document
        .querySelectorAll(
            ".botao-usar-lista"
        )
        .forEach(
            (botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        usarListaNovamente(
                            botao.dataset.id
                        );

                    }
                );

            }
        );


    // -------------------------------------------------
    // EXCLUIR
    // -------------------------------------------------

    document
        .querySelectorAll(
            ".botao-excluir-lista"
        )
        .forEach(
            (botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        excluirLista(
                            botao.dataset.id
                        );

                    }
                );

            }
        );

}


// =====================================================
// ENCONTRAR LISTA
// =====================================================

function encontrarLista(id) {

    return listasSalvasDados.find(
        (lista) =>
            String(lista.id) ===
            String(id)
    );

}


// =====================================================
// EXCLUIR LISTA
// =====================================================

function excluirLista(id) {

    const lista =
        encontrarLista(id);


    if (!lista) {

        return;

    }


    const confirmar =
        confirm(
            `ATENÇÃO!\n\n` +
            `Deseja realmente excluir a lista ` +
            `"${lista.nome}"?\n\n` +
            `Essa ação não poderá ser desfeita.`
        );


    if (!confirmar) {

        return;

    }


    listasSalvasDados =
        listasSalvasDados.filter(
            (listaItem) =>
                String(listaItem.id) !==
                String(id)
        );


    salvarListas();


    if (
        String(idListaAtual) ===
        String(id)
    ) {

        idListaAtual = null;

    }


    renderizarListasSalvas();

    mostrarTela(
        telaMinhasListas
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


    const quantidadeItens =
        lista.itens.length;


    const comprados =
        lista.itens.filter(
            (item) =>
                item.comprado
        ).length;


    informacoesListaVisualizacao.textContent =
        `${lista.data} • ` +
        `${quantidadeItens} ${
            quantidadeItens === 1
                ? "item"
                : "itens"
        } • ` +
        `${comprados} comprados`;


    itensListaVisualizacao.innerHTML = "";


    lista.itens.forEach(
        (item) => {

            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "item-visualizacao";


            const subtotal =
                item.valorUnitarioCentavos *
                item.quantidade;


            elemento.innerHTML = `

                <div class="item-visualizacao-topo">

                    <span class="item-visualizacao-nome">
                        ${escaparHTML(item.nome)}
                    </span>

                    <span class="item-visualizacao-quantidade">
                        Qtd.: ${item.quantidade}
                    </span>

                </div>


                <div class="lista-salva-info">

                    Valor unitário:
                    <strong>
                        ${centavosParaMoeda(
                            item.valorUnitarioCentavos
                        )}
                    </strong>

                    <br>

                    Subtotal:
                    <strong>
                        ${centavosParaMoeda(
                            subtotal
                        )}
                    </strong>

                    <br>

                    ${
                        item.comprado
                            ? "✓ Comprado"
                            : "○ Não comprado"
                    }

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


    listaAtual =
        listaOriginal.itens.map(
            (item) => ({

                id: gerarId(),

                nome: item.nome,

                quantidade: item.quantidade,

                valorUnitarioCentavos: 0,

                comprado: false

            })
        );


    nomeLista.value =
        listaOriginal.nome;


    idListaAtual = null;


    salvarRascunho();

    renderizarItensLista();

    mostrarTela(
        telaCriarLista
    );

}


// =====================================================
// ABRIR LISTA PARA COMPRA
// =====================================================

function abrirListaParaCompra(id) {

    const lista =
        encontrarLista(id);


    if (!lista) {

        return;

    }


    idListaAtual =
        lista.id;


    renderizarTelaCompra(
        lista
    );


    mostrarTela(
        telaComprar
    );

}


// =====================================================
// RENDERIZAR COMPRA
// =====================================================

function renderizarTelaCompra(lista) {

    tituloListaCompra.textContent =
        lista.nome;


    const comprados =
        lista.itens.filter(
            (item) =>
                item.comprado
        ).length;


    informacoesListaCompra.textContent =
        `${lista.data} • ` +
        `${lista.itens.length} itens • ` +
        `${comprados} comprados`;


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

    const valor =
        Number(centavos) / 100;


    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// =====================================================
// CAMPO DE VALOR
// =====================================================
//
// Digitação:
//
// 1      → R$ 0,01
// 12     → R$ 0,12
// 125    → R$ 1,25
// 1250   → R$ 12,50
//
// O banco interno sempre guarda:
// 1250
//
// e não:
// 12,50
//
// =====================================================

function configurarCamposCompra() {


    // -------------------------------------------------
    // VALORES
    // -------------------------------------------------

    document
        .querySelectorAll(
            ".campo-valor-compra"
        )
        .forEach(
            (campo) => {

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


                        const item =
                            lista.itens.find(
                                (item) =>
                                    String(item.id) ===
                                    String(
                                        campo.dataset.id
                                    )
                            );


                        if (!item) {

                            return;

                        }


                        let numeros =
                            campo.value.replace(
                                /\D/g,
                                ""
                            );


                        if (!numeros) {

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


                            campo.setSelectionRange(
                                campo.value.length,
                                campo.value.length
                            );

                        }


                        salvarListas();


                        atualizarSubtotal(
                            item
                        );


                        atualizarTotalCompra(
                            lista
                        );

                    }
                );

            }
        );


    // -------------------------------------------------
    // COMPRADO
    // -------------------------------------------------

    document
        .querySelectorAll(
            ".botao-comprado"
        )
        .forEach(
            (botao) => {

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
                                    String(
                                        botao.dataset.id
                                    )
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

            }
        );


    // -------------------------------------------------
    // EDITAR ITEM
    // -------------------------------------------------

    document
        .querySelectorAll(
            ".botao-editar-compra"
        )
        .forEach(
            (botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        editarItemDuranteCompra(
                            botao.dataset.id
                        );

                    }
                );

            }
        );

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

function atualizarSubtotal(item) {

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


            if (!botao) {

                return;

            }


            if (
                String(
                    botao.dataset.id
                ) !==
                String(item.id)
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
// TOTAL
// =====================================================

function atualizarTotalCompra(lista) {

    let totalCentavos = 0;


    lista.itens.forEach(
        (item) => {

            totalCentavos +=
                Number(
                    item.valorUnitarioCentavos
                ) *
                Number(
                    item.quantidade
                );

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


    renderizarListasSalvas();

    mostrarTela(
        telaMinhasListas
    );

}


// =====================================================
// BOTÃO CRIAR
// =====================================================

botaoCriarLista.addEventListener(
    "click",
    iniciarNovaLista
);


// =====================================================
// MINHAS LISTAS
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
// ADICIONAR ITEM
// =====================================================

botaoAdicionarItem.addEventListener(
    "click",
    adicionarItem
);


// =====================================================
// ENTER - NOME
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
    salvarRascunho
);


// =====================================================
// SALVAR LISTA
// =====================================================

botaoFinalizarLista.addEventListener(
    "click",
    salvarListaPreparada
);


// =====================================================
// CANCELAR
// =====================================================

botaoCancelarLista.addEventListener(
    "click",
    () => {

        const confirmar =
            confirm(
                "Deseja cancelar esta lista?"
            );


        if (!confirmar) {

            return;

        }


        listaAtual = [];

        nomeLista.value = "";

        nomeItem.value = "";

        quantidadeItem.value = "";


        localStorage.removeItem(
            CHAVE_RASCUNHO
        );


        mostrarTela(
            telaPrincipal
        );

    }
);


// =====================================================
// VOLTAR - MINHAS LISTAS
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
// COMPRAR A PARTIR DA VISUALIZAÇÃO
// =====================================================

botaoComprarVisualizacao.addEventListener(
    "click",
    () => {

        if (!idListaAtual) {

            return;

        }


        abrirListaParaCompra(
            idListaAtual
        );

    }
);


// =====================================================
// USAR NOVAMENTE
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
// EXCLUIR A PARTIR DA VISUALIZAÇÃO
// =====================================================

botaoExcluirVisualizacao.addEventListener(
    "click",
    () => {

        if (!idListaAtual) {

            return;

        }


        excluirLista(
            idListaAtual
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
// FINALIZAR COMPRA
// =====================================================

botaoFinalizarCompra.addEventListener(
    "click",
    finalizarCompra
);


// =====================================================
// VOLTAR DA COMPRA
// =====================================================

botaoVoltarLista.addEventListener(
    "click",
    () => {

        renderizarListasSalvas();

        mostrarTela(
            telaMinhasListas
        );

    }
);


// =====================================================
// RECUPERAR RASCUNHO
// =====================================================

if (
    carregarRascunho()
) {

    renderizarItensLista();

}


// =====================================================
// SERVICE WORKER
// =====================================================

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("sw.js")
                .then(
                    () => {

                        console.log(
                            "Service Worker registrado."
                        );

                    }
                )
                .catch(
                    (erro) => {

                        console.error(
                            "Erro no Service Worker:",
                            erro
                        );

                    }
                );

        }
    );

}
