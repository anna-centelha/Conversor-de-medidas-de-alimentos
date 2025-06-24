document.addEventListener('DOMContentLoaded', function() {
    const converterBtn = document.getElementById('converterBtn');
    if (converterBtn) {
        converterBtn.addEventListener('click', converter);
    }
});

function converter() {
    const tipo = document.getElementById('tipo').value;
    const ingrediente = document.getElementById('ingrediente').value;
    const quantidadeInput = document.getElementById('quantidade');
    const quantidade = parseFloat(quantidadeInput.value);
    const resultadoDiv = document.getElementById('resultado');
    const errorMessageDiv = document.getElementById('error-message');

    resultadoDiv.classList.add('hidden');
    errorMessageDiv.classList.add('hidden');
    resultadoDiv.innerHTML = '';
    errorMessageDiv.innerHTML = '';

    const densidades = {
        farinha: { xicara: 120, colher: 15 },
        acucar: { xicara: 200, colher: 12.5 },
        manteiga: { xicara: 227, colher: 14 },
        leite: { xicara: 240, colher: 15 },
        oleo: { xicara: 218, colher: 13.6 },
        arroz: { xicara: 200, colher: 15 },
        aveia: { xicara: 90, colher: 6 },
        mel: { xicara: 340, colher: 21 },
        iogurte: { xicara: 245, colher: 15 },
        chocolate_po: { xicara: 100, colher: 6 },
        maisena: { xicara: 120, colher: 8 },
        sal: { xicara: 280, colher: 18 },
        ovo_grande: { xicara: 200, colher: 12.5 },
        fermento_po: { xicara: 100, colher: 7 },
        passas: { xicara: 165, colher: 10 }
    };

    function arredondar(valor) {
        if (valor < 0.01 && valor !== 0) return "< 0.01";
        if (valor === 0) return "0";
        const arred = Math.round(valor * 100) / 100;
        if (Number.isInteger(arred)) return arred.toString();
        return arred.toFixed(2);
    }

    if (!densidades[ingrediente] || isNaN(quantidade) || quantidade <= 0) {
        errorMessageDiv.innerText = "Por favor, preencha uma quantidade válida e maior que zero.";
        errorMessageDiv.classList.remove('hidden');
        return;
    }

    let texto = "";
    const d = densidades[ingrediente];
    let ingredienteNomeFormatado = ingrediente
        .replace('_', ' ')
        .replace('po', 'pó')
        .replace('ovo grande', 'ovo grande')
        .replace('fermento em po', 'fermento em pó');

    ingredienteNomeFormatado = ingredienteNomeFormatado.charAt(0).toUpperCase() + ingredienteNomeFormatado.slice(1);

    switch(tipo) {
        case "g_para_xic_colher":
            texto = `
                <p class="font-bold mb-2">${arredondar(quantidade)}g de ${ingredienteNomeFormatado} equivalem a:</p>
                <div class="space-y-2">
                    <p><span class="font-semibold text-orange-900">${arredondar(quantidade / d.xicara)}</span> xícara(s)</p>
                    <p><span class="font-semibold text-orange-900">${arredondar(quantidade / d.colher)}</span> colher(es) de sopa</p>
                </div>
            `;
            break;
        case "xic_para_g_colher":
            texto = `
                <p class="font-bold mb-2">${arredondar(quantidade)} xícara(s) de ${ingredienteNomeFormatado} equivalem a:</p>
                <div class="space-y-2">
                    <p><span class="font-semibold text-orange-900">${arredondar(quantidade * d.xicara)}</span>g</p>
                    <p><span class="font-semibold text-orange-900">${arredondar(quantidade * d.xicara / d.colher)}</span> colher(es) de sopa</p>
                </div>
            `;
            break;
        case "colher_para_g_xic":
            texto = `
                <p class="font-bold mb-2">${arredondar(quantidade)} colher(es) de sopa de ${ingredienteNomeFormatado} equivalem a:</p>
                <div class="space-y-2">
                    <p><span class="font-semibold text-orange-900">${arredondar(quantidade * d.colher)}</span>g</p>
                    <p><span class="font-semibold text-orange-900">${arredondar(quantidade * d.colher / d.xicara)}</span> xícara(s)</p>
                </div>
            `;
            break;
    }

    resultadoDiv.innerHTML = texto;
    resultadoDiv.classList.remove('hidden');
}
