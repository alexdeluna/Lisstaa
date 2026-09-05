const produtos = document.querySelectorAll(".produto");

const totalCompra = document.getElementById("totalCompra");

const totalItens = document.getElementById("totalItens");
const itensComprados = document.getElementById("itensComprados");
const itensFaltantes = document.getElementById("itensFaltantes");

const botaoMarcarTodos = document.getElementById("marcarTodos");
const botaoLimparDados = document.getElementById("limparDados");


// =====================================================
// VALORES MONETÁRIOS
// =====================================================
//
// REGRA:
//
// O usuário digita somente números.
//
// 1    = 0,01
// 12   = 0,12
// 125  = 1,25
// 1250 = 12,50
//
// Internamente tudo permanece em CENTAVOS.
//
// =====================================================


// -----------------------------------------------------
// CONVERTE OS CENTAVOS PARA TEXTO MONETÁRIO
// -----------------------------------------------------

function centavosParaMoeda(centavos) {

    const valor = centavos / 100;

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// -----------------------------------------------------
// FORMATA O CAMPO ENQUANTO O USUÁRIO DIGITA
// -----------------------------------------------------

function formatarCampoMonetario(valor) {

    // Remove tudo que não for número
    let numeros = valor.replace(/\D/g, "");


    // Se não houver nada digitado
    if (numeros === "") {

        return {
            texto: "",
            centavos: 0
        };

    }


    // Remove zeros desnecessários do começo
    numeros = numeros.replace(/^0+(?=\d)/, "");


    // Converte diretamente para centavos
    const centavos = Number(numeros);


    // Formata para o padrão brasileiro
    const texto = centavosParaMoeda(centavos);


    return {
        texto: texto,
        centavos: centavos
    };

}


// =====================================================
// ATUALIZA O TOTAL DA COMPRA
// =====================================================

function atualizarLista() {

    let totalCentavos = 0;

    let comprados = 0;


    produtos.forEach((produto) => {

        const quantidade =
            Number(produto.dataset.quantidade);


        const campoValor =
            produto.querySelector(".valor-unitario");


        const subtotalElemento =
            produto.querySelector(".subtotal strong");


        // -------------------------------------------------
        // RECUPERA O VALOR EM CENTAVOS
        // -------------------------------------------------

        const valorUnitarioCentavos =
            Number(campoValor.dataset.centavos || 0);


        // -------------------------------------------------
        // CALCULA SUBTOTAL
        // -------------------------------------------------

        const subtotalCentavos =
            valorUnitarioCentavos * quantidade;


        // -------------------------------------------------
        // MOSTRA SUBTOTAL
        // -------------------------------------------------

        subtotalElemento.textContent =
            centavosParaMoeda(subtotalCentavos);


        // -------------------------------------------------
        // ACUMULA TOTAL
        // -------------------------------------------------

        totalCentavos += subtotalCentavos;


        // -------------------------------------------------
        // VERIFICA COMPRADO
        // -------------------------------------------------

        if (produto.classList.contains("comprado")) {

            comprados++;

        }

    });


    // -----------------------------------------------------
    // MOSTRA TOTAL GERAL
    // -----------------------------------------------------

    totalCompra.textContent =
        centavosParaMoeda(totalCentavos);


    // -----------------------------------------------------
    // ATUALIZA RESUMO
    // -----------------------------------------------------

    totalItens.textContent =
        produtos.length;

    itensComprados.textContent =
        comprados;

    itensFaltantes.textContent =
        produtos.length - comprados;

}


// =====================================================
// CONFIGURAÇÃO DOS PRODUTOS
// =====================================================

produtos.forEach((produto) => {

    const campoValor =
        produto.querySelector(".valor-unitario");


    const botao =
        produto.querySelector(".botao-comprado");


    // -------------------------------------------------
    // VALOR INICIAL
    // -------------------------------------------------

    campoValor.dataset.centavos = "0";


    // -------------------------------------------------
    // DIGITAÇÃO DO VALOR
    // -------------------------------------------------

    campoValor.addEventListener("input", (evento) => {

        const resultado =
            formatarCampoMonetario(evento.target.value);


        // Guarda o valor verdadeiro em centavos
        campoValor.dataset.centavos =
            resultado.centavos;


        // Mostra o valor formatado
        campoValor.value =
            resultado.texto;


        atualizarLista();

    });


    // -------------------------------------------------
    // MARCAR / DESMARCAR COMO COMPRADO
    // -------------------------------------------------

    botao.addEventListener("click", () => {

        produto.classList.toggle("comprado");


        if (produto.classList.contains("comprado")) {

            botao.textContent =
                "✓ Comprado";

        } else {

            botao.textContent =
                "Marcar como comprado";

        }


        atualizarLista();

    });

});


// =====================================================
// MARCAR TODOS
// =====================================================

botaoMarcarTodos.addEventListener("click", () => {

    produtos.forEach((produto) => {

        produto.classList.add("comprado");


        const botao =
            produto.querySelector(".botao-comprado");


        botao.textContent =
            "✓ Comprado";

    });


    atualizarLista();

});


// =====================================================
// LIMPAR DADOS
// =====================================================

botaoLimparDados.addEventListener("click", () => {

    const confirmar =
        confirm(
            "Deseja limpar todos os valores e desmarcar os itens?"
        );


    if (!confirmar) {
        return;
    }


    produtos.forEach((produto) => {

        const campoValor =
            produto.querySelector(".valor-unitario");


        const botao =
            produto.querySelector(".botao-comprado");


        // Limpa o valor
        campoValor.value = "";


        // Zera os centavos
        campoValor.dataset.centavos = "0";


        // Desmarca
        produto.classList.remove("comprado");


        // Restaura botão
        botao.textContent =
            "Marcar como comprado";

    });


    atualizarLista();

});


// =====================================================
// INICIALIZAÇÃO
// =====================================================

atualizarLista();


// =====================================================
// SERVICE WORKER
// =====================================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("sw.js")
            .then(() => {

                console.log(
                    "Service Worker registrado."
                );

            })
            .catch((erro) => {

                console.error(
                    "Erro ao registrar Service Worker:",
                    erro
                );

            });

    });

}
