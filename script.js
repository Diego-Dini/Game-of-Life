const canvas = document.querySelector("#game_of_life")
const ctx = canvas.getContext("2d")

const game_grid = []

const game_prop = {
  x: 300,
  y: 300
}

const bit =1.5


onload = function() {
  canvas.width = (game_prop.x + 1) * bit
  canvas.height = (game_prop.y + 1) * bit
  crate_game_grid()
  draw_game()
  setInterval(animate, 0)

}

function animate() {

  change_game()
  draw_game()
}

function crate_game_grid() {
  for (x = 0; x <= game_prop.x; x++) {
    game_grid.push([])
    for (y = 0; y <= game_prop.y; y++) {
      if(x == 0 || x == game_prop.x || y == 0 || y == game_prop.y){
        game_grid[x].push(-1)
      } else {
        game_grid[x].push(Math.floor(Math.random() * (1 - 0 + 1)) + 0)
      }
    }
  }
}

function draw_game() {
  ctx.fillStyle = "Black"
  ctx.fillRect(0, 0, bit * game_prop.x, bit * game_prop.y)

  for (x = 0; x < game_grid.length; x++) {
    for (y = 0; y < game_grid[x].length; y++) {
      if (game_grid[x][y] == 1) {
        ctx.fillStyle = "white"
        ctx.fillRect(x * bit, y * bit, bit, bit)
      } else if (game_grid[x][y] == -1){
        ctx.fillStyle = "green"
        ctx.fillRect(x * bit, y * bit, bit, bit)
      }
    }
  }
}

function change_game() {
  for (x = 1; x < game_grid.length-1; x++) {
    for (y = 1; y < game_grid[x].length-1; y++) {
      apply_logic(x,y)
    }
  }  
}

function apply_logic(x,y) {
  let neighbor = 0
  if (game_grid[x-1][y-1] == 1) {
    neighbor++
  }
    if (game_grid[x-1][y] == 1) {
    neighbor++
  }
    if (game_grid[x-1][y+1] == 1) {
    neighbor++
  }

    if (game_grid[x][y-1] == 1) {
    neighbor++
  }
    if (game_grid[x][y+1] == 1) {
    neighbor++
  }
    if (game_grid[x+1][y-1] == 1) {
    neighbor++
  }
    if (game_grid[x+1][y] == 1) {
    neighbor++
  }
    if (game_grid[x+1][y+1] == 1) {
    neighbor++
  }

  if(neighbor > 1 && game_grid[x][y] == 0){
    game_grid[x][y] = 1
  } else if(neighbor > 3 && game_grid[x][y] == 1){
    game_grid[x][y] = 0
  } else if(neighbor = 0 && game_grid[x][y] == 1){
    game_grid[x][y] = 1
  }
}