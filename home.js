// const coin = document.querySelector('#coin')

var coins = ['btc', 'eth']

function showCoin(coin, coinName) {
  document.querySelector(`#${coinName}Buy`).innerHTML = coin.buy
  document.querySelector(`#${coinName}Sell`).innerHTML = coin.sell
  document.querySelector(`#${coinName}Open`).innerHTML = coin.open
  document.querySelector(`#${coinName}High`).innerHTML = coin.high
  document.querySelector(`#${coinName}Low`).innerHTML = coin.low
}

setInterval(function () {
  fetch(`https://www.mercadobitcoin.net/api/btc/ticker`)
    .then(c => c.json())
    .then(coinConsult => showCoin(coinConsult.ticker, 'btc'))

  fetch(`https://www.mercadobitcoin.net/api/eth/ticker`)
    .then(c => c.json())
    .then(coinConsult => showCoin(coinConsult.ticker, 'eth'))

  fetch(`https://www.mercadobitcoin.net/api/axs/ticker`)
    .then(c => c.json())
    .then(coinConsult => showCoin(coinConsult.ticker, 'axs'))
}, 3000)

// })
