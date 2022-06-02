const coin = document.querySelector('#coin')

function showCoin(coin) {
  document.querySelector('#high').value = coin.high
  document.querySelector('#low').value = coin.low
  document.querySelector('#buy').value = coin.buy
  document.querySelector('#sell').value = coin.sell
  document.querySelector('#open').value = coin.open
}

coin.addEventListener('click', () => {
  setInterval(function () {
    const search = coin.value

    console.log(search)

    fetch(`https://www.mercadobitcoin.net/api/${search}/ticker`)
      .then(r => r.json())
      .then(coin => showCoin(coin.ticker))
  }, 1000)
})
