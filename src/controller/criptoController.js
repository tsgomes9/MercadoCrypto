const coins = ['btc', 'ltc', 'eth', 'high', 'axs', 'algo', 'avax', 'atom']

const selectCoin = document.querySelector('#select-coin')
const selectCoin2 = document.querySelector('#select-coin2')
const buttonCoin = document.querySelector('#button-convert-coin')
const readCoin = document.querySelector('#read-coin')

var date = new Date()
var day = parseInt(String(date.getDate()))
var month = String(date.getMonth() + 1).padStart(2, '0')
var year = date.getFullYear()

var coinData = 'btc'
var coinData2 = ''
// let timestamp = date.getTime()s

//Select da sessão de ultimas negociações
selectCoin.addEventListener('click', () => {
  coinData = selectCoin.value

  coinSelect(coinData)
  resumeCoin(coinData, year, month, day)
  tableCoin(coinData)
})

//Select do conversor de moeda
buttonCoin.addEventListener('click', () => {
  coinData2 = selectCoin2.value
  convertCoin()
})

//exibir informações iniciais
async function dataCoin() {
  for (c in coins) {
    // Consulta dados API Mercado Bitcoin
    const url = await fetch(
      `https://www.mercadobitcoin.net/api/${coins[c]}/ticker/`
    )
    const data = await url.json()
    const coin = await data.ticker

    const buy = coin.buy //cotação atual

    const status = ((coin.buy - coin.open) / coin.open) * 100
    var selectStatus = document.querySelector(`#${coins[c]}-status`)

    document.querySelector(`#${coins[c]}-open`).innerHTML = `R$ ${buy}`
    selectStatus.innerHTML = `${status.toFixed(2)} %`
    document.querySelector(`#spinCoin${c}`).classList.add('visually-hidden')

    if (status > 0) {
      selectStatus.classList.clear
      selectStatus.classList.add('greenStatus')
    } else {
      selectStatus.classList.clear
      selectStatus.classList.add('redStatus')
    }
  }
}

// Sessão ultimas negociações
async function coinSelect(coinData) {
  const url = await fetch(
    `https://www.mercadobitcoin.net/api/${coinData}/ticker/`
  )
  const data = await url.json()
  const coin = await data.ticker

  document.querySelector('#coinName').innerHTML = coinData.toUpperCase()

  document.querySelector('#open-coin').innerHTML = coin.open
  document.querySelector('#high-coin').innerHTML = coin.high
  document.querySelector('#low-coin').innerHTML = coin.low
  document.querySelector('#buy-coin').innerHTML = coin.buy
}

// Sessão resumo dia anterior
async function resumeCoin(coinData, year, month, day) {
  const url = await fetch(
    `https://www.mercadobitcoin.net/api/${coinData}/day-summary/${year}/${month}/${
      day - 1
    }/`
  )
  const data = await url.json()

  document.querySelector('#data-coin').innerHTML = `0${
    day - 1
  }/${month}/${year}`
  document.querySelector('#opening-coin').innerHTML = data.opening
  document.querySelector('#closing-coin').innerHTML = data.closing
  document.querySelector('#lowest-coin').innerHTML = data.lowest
  document.querySelector('#highest-coin').innerHTML = data.highest
  document.querySelector('#volume-coin').innerHTML = data.volume
  document.querySelector('#quantity-coin').innerHTML = data.quantity
}

//Sessão histórico de negociações
async function tableCoin(coinData) {
  const url = await fetch(
    `https://www.mercadobitcoin.net/api/${coinData}/trades/`
  )
  const data = await url.json()
  document.querySelector('#coinName2').innerHTML = coinData.toUpperCase()
  let i = 9

  while (i >= 0) {
    let typeCoin = data[i].type //compra ou venda

    let typeTag = document.querySelector(`#th${i}-type`)
    if (typeCoin === 'buy') {
      typeCoin = 'Compra'
      typeTag.classList.clear
      typeTag.classList.add('buyTrade')
    } else {
      typeCoin = 'Venda'
      typeTag.classList.clear
      typeTag.classList.add('sellTrade')
    }

    document.querySelector(`#th${i}-trade`).innerHTML = data[i].price //preço
    typeTag.innerHTML = typeCoin // compra ou venda

    i -= 1 //decrementa i
  }
}

// Sessão conversor de moedas
async function convertCoin() {
  const url = await fetch(
    `https://www.mercadobitcoin.net/api/${coinData2}/ticker/`
  )
  const data = await url.json()

  var convertResult = readCoin.value / data.ticker.buy

  if (convertResult <= 0) {
    document.querySelector('#result-convert-coin').innerHTML =
      'Informe um valor maior que zero'
  } else {
    document.querySelector('#result-convert-coin').innerHTML = `R$ ${
      readCoin.value
    } equivale a ${convertResult} ${coinData2.toUpperCase()}`

    document.querySelector('#coin-name3').innerHTML = coinData2.toUpperCase()
  }

  setInterval(convertCoin, 5000)
}

// Chamadas das funções
dataCoin()
coinSelect(coinData)
resumeCoin(coinData, year, month, day)
setInterval(dataCoin, 5000)
tableCoin(coinData)
