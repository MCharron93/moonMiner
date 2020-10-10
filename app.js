//---Notes

//up-to-date count of resource--- completed, needs style
let cheese = 0

//upgrades have different modifiers---completed
//4 upgrades with modifiers(1 passive and one active on-clicks--- completed 
let clickUpgrades = {
  hammer: {
    price: 10,
    quanity: 0,
    multiplier: 1,
    automatic: false
  },
  star: {
    price: 50,
    quanity: 0,
    multiplier: 5,
    automatic: false
  },
  clouds: {
    price: 400,
    quanity: 0,
    multiplier: 20,
    automatic: true
  },
  twin: {
    price: 1000,
    quanity: 0,
    multiplier: 50,
    automatic: true
  }
}

//image that can be clicked for resource ---completed, needs style
function onclickMine() {
  cheese++
  
  let kingElem = document.getElementById('king')
  let orig = kingElem.style.backgroundImage
  kingElem.style.backgroundImage = "url(https://i.imgur.com/fS1gBBI.gif)"
  setTimeout(function(){
    kingElem.style.backgroundImage = orig;
}, 100)

  mineModifier(false)
  update()
}

function automMine(){
  mineModifier(true)
  update()
}

function mineModifier(automatic) {
  for (const key in clickUpgrades) {
    const item = clickUpgrades[key];  
    if(item.automatic == automatic){ 
      cheese += item.multiplier * item.quanity;
    }
  }
}

function drawMultiplier(){
  let modifier = 0
  
  for (const key in clickUpgrades) { 
    const item = clickUpgrades[key];
    modifier += item.multiplier * item.quanity
  }
  return modifier
}

//disable buttons for items if not enough resources--- completed, cannot increase if not enough money
function buyClickItem(item) {
  if (cheese >= clickUpgrades[item].price) {
    cheese -= clickUpgrades[item].price
    clickUpgrades[item].quanity++
    priceIncrease(item)
    let kirbyElem = document.getElementById('kirby')
    kirbyElem.classList.add('power-up')
  }

  drawMultiplier()
  update()
}



//price of upgrade increases after every purchase---completed
function priceIncrease(purchase) {
  let double = clickUpgrades[purchase].price
  clickUpgrades[purchase].price += double
  
}

//display modifiers--- completed
//draw function for page on load AND draw updates to page--- completed first half, need to update on modifiers
function update() {
  let cheeseElem = document.getElementById("cheese")
  cheeseElem.innerText = 'Total Kandy: ' + cheese.toString()
  
  let hammerPrice = document.getElementById('hammer')
  hammerPrice.innerHTML = 'Hammer: ' + clickUpgrades.hammer.price.toString()
  
  let starPrice = document.getElementById('star')
  starPrice.innerHTML = 'Star: ' + clickUpgrades.star.price.toString()
  
  let cloudPrice = document.getElementById('clouds')
  cloudPrice.innerHTML = 'Clouds: ' + clickUpgrades.clouds.price.toString()

  let twinPrice = document.getElementById('twin')
  twinPrice.innerHTML = 'Twin: ' + clickUpgrades.twin.price.toString()

  let modifierElem = document.getElementById('modifiers')
  modifierElem.innerHTML = 'Modifiers: ' + drawMultiplier()

  let hammerInvElem = document.getElementById('hammer-inv')
  hammerInvElem.innerHTML = 'Hammers: ' + clickUpgrades.hammer.quanity.toString() + '<br> +1 click'

  let starInvElem = document.getElementById('star-inv')
  starInvElem.innerHTML = 'Stars: ' + clickUpgrades.star.quanity.toString() +'<br> +5 clicks'

  let cloudsInvElem = document.getElementById('clouds-inv')
  cloudsInvElem.innerHTML = 'Clouds: ' + clickUpgrades.clouds.quanity.toString() + '<br> +20 passive clicks'

  let twinInvElem = document.getElementById('twin-inv')
  twinInvElem.innerHTML = 'Twins: ' + clickUpgrades.twin.quanity.toString() + '<br> +50 passive clicks'
}

setInterval(automMine, 4000)

update()
