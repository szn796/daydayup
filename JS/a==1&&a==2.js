const a = {
  i: 1,
  valueOf () {
    return this.i++
  }
}

console.log(a == 1 && a == 2 && a == 3)