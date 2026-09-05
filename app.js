const produtos = document.querySelectorAll(".produto");

const totalCompra = document.getElementById("totalCompra");

const totalItens = document.getElementById("totalItens");
const itensComprados = document.getElementById("itensComprados");
const itensFaltantes = document.getElementById("itensFaltantes");

const botaoMarcarTodos = document.getElementById("marcarTodos");
const botaoLimparDados = document.getElementById("limparDados");


// =====================================================
// VALORES MONETÁRIOS
// Tudo é trabalhado internamente em CENTAVOS.
// =====================================================


// Converte o valor digitado para centavos
//
// Exemplos:
//
// 5       -> 500
// 5,50    -> 550
// 10,99   -> 1099
// 0,50    -> 50
//
function moedaParaCentavos(valor) {

    if (!valor) {
        return 0;
    }

    // Aceita tanto vírgula quanto ponto
    let texto = String(valor).trim().replace(",", ".");

    const numero = Number(texto);

    if (!Number.isFinite(numero)) {
        return 0;
    }

    return Math.round(numero * 100);
}


// Converte centavos para moeda brasileira
//
// 500  -> R$ 5,00
// 550  -> R$ 5,50
// 1099 -> R$ 10,99
//
function centavosParaMoeda(centavos) {

    return (centavos / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// =====================================================
// ATUALIZA A LISTA
// =====================================================

function atualizarLista() {

    // IMPORTANTE:
    // O total também será armazenado/calculado em CENTAVOS.
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
        // PEGA O VALOR UNITÁRIO
        // -------------------------------------------------

        const valorUnitarioCentavos =
            moedaParaCentavos(campoValor.value);


        // -------------------------------------------------
        // CALCULA O SUBTOTAL EM CENTAVOS
        // -------------------------------------------------

        const subtotalCentavos =
            valorUnitarioCentavos * quantidade;


        // -------------------------------------------------
        // MOSTRA O SUBTOTAL
        // -------------------------------------------------

        subtotalElemento.textContent =
            centavosParaMoeda(subtotalCentavos);


        // -------------------------------------------------
        // SOMA AO TOTAL GERAL
        // -------------------------------------------------

        totalCentavos += subtotalCentavos;


        // -------------------------------------------------
        // VERIFICA SE FOI COMPRADO
        // -------------------------------------------------

        if (produto.classList.contains("comprado")) {

            comprados++;

        }

    });


    // =====================================================
    // ATUALIZA RESUMO
    // =====================================================

    totalCompra.textContent =
        centavosParaMoeda(totalCentavos);


    totalItens.textContent =
        produtos.length;


    itensComprados.textContent =
        comprados;


    itensFaltantes.textContent =
        produtos.length - comprados;

}


// =====================================================
// CONTROLE DOS PRODUTOS
// =====================================================

produtos.forEach((produto) => {

    const campoValor =
        produto.querySelector(".valor-unitario");


    const botao =
        produto.querySelector(".botao-comprado");


    // -------------------------------------------------
    // CALCULA ENQUANTO DIGITA
    // -------------------------------------------------

    campoValor.addEventListener("input", () => {

        atualizarLista();

    });


    // -------------------------------------------------
    // MARCAR COMO COMPRADO
    // -------------------------------------------------

    botao.addEventListener("click", () => {

        produto.classList.toggle("comprado");


        if (produto.classList.contains("comprado")) {

            botao.textContent = "✓ Comprado";

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


        campoValor.value = "";


        produto.classList.remove("comprado");


        botao.textContent =
            "Marcar como comprado";

    });


    atualizarLista();

});


// =====================================================
// PRIMEIRA ATUALIZAÇÃO
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
