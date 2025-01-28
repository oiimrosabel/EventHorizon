export class ReverseMap<U, V> {
  public readonly reg: Map<U, V>
  public readonly rev: Map<V, U>

  constructor() {
    this.reg = new Map<U, V>()
    this.rev = new Map<V, U>()
  }

  set(key: U, val: V) {
    this.reg.set(key, val)
    this.rev.set(val, key)
  }

  getRev(key: V) {
    return this.rev.get(key)
  }

  has(key: U) {
    return this.reg.has(key)
  }

  hasRev(key: V) {
    return this.rev.has(key)
  }

  delete(key: U) {
    const val = this.reg.get(key)
    if (!val) return
    this.reg.delete(key)
    this.rev.delete(val)
  }

  clear() {
    this.reg.clear()
    this.rev.clear()
  }

  size() {
    return this.reg.size
  }
}
