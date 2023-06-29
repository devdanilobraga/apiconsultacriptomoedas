// Função para obter a lista de criptomoedas da Binance
function obterCriptomoedas() {
    return fetch("https://api.binance.com/api/v3/exchangeInfo")
      .then(response => response.json())
      .then(data => {
        var criptomoedas = data.symbols.map(symbol => symbol.baseAsset);
        return criptomoedas;
      })
      .catch(error => {
        console.error("Erro ao obter criptomoedas:", error);
        return [];
      });
  }
  
  // Função para preencher o <select> com as criptomoedas
  function preencherSelect(criptomoedas) {
    var select = document.getElementById("cryptocurrency");
    
    criptomoedas.forEach(criptomoeda => {
      var option = document.createElement("option");
      option.value = criptomoeda;
      option.text = criptomoeda;
      select.appendChild(option);
    });
  }
  
  function consultarValor() {
    var criptomoeda = document.getElementById("cryptocurrency").value;
  
    // Consulta do valor em relação ao USD
    fetch("https://api.binance.com/api/v3/ticker/price?symbol=" + criptomoeda + "USDT")
      .then(response => response.json())
      .then(data => {
        var valorUSD = data.price;
  
        // Consulta do valor em relação ao BRL
        fetch("https://api.binance.com/api/v3/ticker/price?symbol=" + criptomoeda + "BRL")
          .then(response => response.json())
          .then(data => {
            var valorBRL = data.price;
  
            var resultadoContainer = document.getElementById("resultado");
            var resultadoValue = resultadoContainer.querySelector(".resultado-value");
            var resultadoLabel = resultadoContainer.querySelector(".resultado-label");
  
            resultadoValue.textContent = valorUSD;
            resultadoLabel.textContent = "Valor de " + criptomoeda + " em USD: " + valorUSD + " | Valor de " + criptomoeda + " em BRL: " + valorBRL;
          })
          .catch(error => {
            console.error("Erro ao consultar valor em BRL:", error);
          });
      })
      .catch(error => {
        console.error("Erro ao consultar valor em USD:", error);
      });
  }
  
  
  // Inicialização: obter criptomoedas e preencher o <select>
  obterCriptomoedas()
    .then(criptomoedas => {
      preencherSelect(criptomoedas);
    });
  