const selectCoin = document.querySelector('#select-coin')

// exibir dados da moeda
function showCoin(coin) {
  document.querySelector('#coinOpen').innerHTML = 'R$ ' + coin.open
  document.querySelector('#coinHigh').innerHTML = 'R$ ' + coin.high
  document.querySelector('#coinLow').innerHTML = 'R$ ' + coin.low

  document.querySelector('#coinBuy').innerHTML = 'R$ ' + coin.buy
  document.querySelector('#coinSell').innerHTML = 'R$ ' + coin.sell

  porcentCoin(coin)
}

//exibir Título e Ícone
function returnCoinYahoo(response, nameCoin) {
  let coins = response.data.coins

  for (c in coins) {
    let name = coins[c].symbol
    if (name.includes(nameCoin)) {
      document.querySelector('#name-coin').innerHTML = coins[c].name
      document.querySelector('#icon-coin').src = coins[c].iconUrl
    }
  }
}

function porcentCoin(coin) {
  let coinPorcent = document.querySelector('#coin-porcent')
  let dif = coin.buy - coin.open
  let porcent = (dif / coin.open) * 100
  coinPorcent.innerHTML = '% ' + porcent.toFixed(3)

  if (porcent > 0) {
    coinPorcent.classList.add('coinGreen')
  } else {
    coinPorcent.classList.add('coinRed')
  }
}

selectCoin.addEventListener('click', () => {
  // Título do card
  const nameCoin = selectCoin.value.toUpperCase()
  // Exibições
  document.querySelector('#spinner-coin').classList.add('visually-hidden')
  document.querySelector('#waiting-coin').classList.add('visually-hidden')
  document.querySelector('#card-coin').classList.remove('visually-hidden')
  document.querySelector('#table-coin').classList.remove('visually-hidden')

  //request API YAHOO FINANCE
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      'X-RapidAPI-Key': '13fbdde0c0mshcffe67efffbb958p18df62jsn3b4cda583684'
    }
  }

  fetch(
    'https://coinranking1.p.rapidapi.com/search-suggestions?referenceCurrencyUuid=yhjMzLPhuIDl',
    options
  )
    .then(response => response.json())
    .then(response => returnCoinYahoo(response, nameCoin))

  //request API MERCADO BITCOIN

  async function consultCoin() {
    coin = selectCoin.value
    const data = await fetch(
      `https://www.mercadobitcoin.net/api/${coin}/ticker`
    )
    const c = await data.json()
    showCoin(c.ticker)
  }
  consultCoin()
  setInterval(consultCoin, 30000)
})
//Chamada original Yahoo
// function returnCoinYahoo(response) {
//   let coins = response.data.coins

//   for (c in coins) {
//     console.log(coins[c])
//   }
// }

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
//     'X-RapidAPI-Key': '13fbdde0c0mshcffe67efffbb958p18df62jsn3b4cda583684'
//   }
// }

// fetch(
//   'https://coinranking1.p.rapidapi.com/search-suggestions?referenceCurrencyUuid=yhjMzLPhuIDl',
//   options
// )
//   .then(response => response.json())
//   .then(response => returnCoinYahoo(response))
//   .catch(err => console.error(err))
//
