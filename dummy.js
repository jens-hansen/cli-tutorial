const sum1 = 7
const firstname = 'John'
export const add = sum2 => sum1 + sum2
export const fullName = firstname + ' Doe'
export class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
}
