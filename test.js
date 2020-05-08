let success = false
let lines = []
function search(x, y, arr) {
  const c = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  const total = sumArr(arr)
  if (total < c) {
    success = false
    return
  }

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i]

    if (c === current) {
      lines.push(current)
      success = true
      break
    }
    if (current > c) continue
    let other = [...arr]
    other.splice(i, 1)
    let cury = (current * y) / c
    let curx = (current * x) / c
    search(x - curx, y - cury, other)
  }
}

function searchXY() {}

function sumArr(array) {
  return eval(array.join('+'))
}
search(3, 4, [3, 4, 6])
console.log(success)
console.log(lines.length)
