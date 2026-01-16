export type Operation = 'add' | 'sub' | 'mul' | 'div'

export function setOperation(op: Operation, left: number, right: number): number {
  switch (op) {
    case 'add':
      return left + right
    case 'sub':
      return left - right
    case 'mul':
      return left * right
    case 'div':
      if (right === 0) throw new Error("Division by zero")
      return left / right
    default:
      throw new Error(`Unsupported operation: ${op}`)
  }
}