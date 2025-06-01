function converter() {
  const tipo = document.getElementById('tipo').value;
  const ingrediente = document.getElementById('ingrediente').value;
  const quantidade = parseFloat(document.getElementById('quantidade').value);
  const resultado = document.getElementById('resultado');

  const densidades = {
    farinha: { xicara: 120, colher: 15 },
    açúcar: { xicara: 200, colher: 12.5 },
    manteiga: { xicara: 227, colher: 14 },
    leite: { xicara: 240, colher: 15 },
    oleo: { xicara: 218, colher: 13.6 }
  };

  function arredondar(valor) {
    if (valor < 0.05) return "0";
    const arred = Math.round(valor * 100) / 100; // arredonda para 2 casas decimais
    if (Number.isInteger(arred)) return arred.toString();
    return arred.toFixed(2);
  }

  if (!densidades[ingrediente] || isNaN(quantidade)) {
    resultado.innerText = "Preencha os campos corretamente.";
    return;
  }

  let texto = "";
  const d = densidades[ingrediente];

  switch(tipo) {
    case "g_para_xic_colher":
      texto = `<p>${quantidade}g de ${ingrediente} equivalem a:</p>
               <ul><li>${arredondar(quantidade / d.xicara)} xícara(s)</li>
                   <li>${arredondar(quantidade / d.colher)} colher(es)</li></ul>`;
      break;
    case "xic_para_g_colher":
      texto = `<p>${quantidade} xícara(s) de ${ingrediente} equivalem a:</p>
               <ul><li>${arredondar(quantidade * d.xicara)}g</li>
                   <li>${arredondar(quantidade * d.xicara / d.colher)} colher(es)</li></ul>`;
      break;
    case "colher_para_g_xic":
      texto = `<p>${quantidade} colher(es) de ${ingrediente} equivalem a:</p>
               <ul><li>${arredondar(quantidade * d.colher)}g</li>
                   <li>${arredondar(quantidade * d.colher / d.xicara)} xícara(s)</li></ul>`;
      break;
  }

  resultado.innerHTML = texto;
}
