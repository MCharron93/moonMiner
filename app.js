//---Notes

//up-to-date count of resource--- completed, needs style
let cheese = 0

//upgrades have different modifiers---completed
//4 upgrades with modifiers(1 passive and one active on-clicks--- completed 
let clickUpgrades = {
  hammer: {
    price: 5,
    quanity: 0,
    multiplier: 1,
    automatic: false
  },
  star: {
    price: 50,
    quanity: 0,
    multiplier: 3,
    automatic: false
  },
  clouds: {
    price: 10,
    quanity: 0,
    multiplier: 20,
    automatic: true
  },
  twin: {
    price: 500,
    quanity: 0,
    multiplier: 50,
    automatic: true
  }
}

//image that can be clicked for resource ---completed, needs style
function onclickMine() {
  cheese++
  
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
  cheeseElem.innerText = 'Total: ' + cheese.toString()
  
  let hammerPrice = document.getElementById('hammer')
  hammerPrice.innerHTML = 'Hammer: ' + clickUpgrades.hammer.price.toString()
  
  let starPrice = document.getElementById('star')
  starPrice.innerHTML = 'Star Power: ' + clickUpgrades.star.price.toString()
  
  let cloudPrice = document.getElementById('clouds')
  cloudPrice.innerHTML = 'Clouds: ' + clickUpgrades.clouds.price.toString()

  let twinPrice = document.getElementById('twin')
  twinPrice.innerHTML = 'Twin Kirby: ' + clickUpgrades.twin.price.toString()

  let modifierElem = document.getElementById('modifiers')
  modifierElem.innerHTML = 'Modifiers: ' + drawMultiplier()
}

setInterval(automMine, 4000)

update()
