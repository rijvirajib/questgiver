import { StorageEngine } from '@ngxs/storage-plugin'
require('nativescript-localstorage')

export class AppStorageEngine implements StorageEngine {
  get length(): number {
    return localStorage.length
  }

  getItem(key: string): any {
    return localStorage.getItem(key)
  }

  setItem(key: string, val: any): void {
    localStorage.setItem(key, val)
  }

  removeItem(key: string): void {
    localStorage.removeItem(key)
  }

  clear(): void {
    localStorage.clear()
  }
}
