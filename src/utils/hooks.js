import {useState} from 'react'

export function useLocalStorage (key, initialValue) {
  const [value, _setValue] = useState(window.localStorage.getItem(key) || initialValue)
  const setValue = _value => {
    window.localStorage.setItem(key, _value)
    _setValue(_value)
  }
  return [value, setValue]
}
