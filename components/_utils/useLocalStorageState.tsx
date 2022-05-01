// @ts-nocheck
import * as React from 'react'


// this doesn't work because "window" isn't avail on the server and is throwing an error.
// Here's an article for how to handle this https://blog.sethcorker.com/question/how-to-solve-referenceerror-next-js-window-is-not-defined/
// Also worth looking into if this even needs to saved when using something like convex or react-query

// function useLocalStorageState(
//     key,
//     defaultValue = '',
//     {serialize = JSON.stringify, deserialize = JSON.parse} = {},
//   ) {
//     const [state, setState] = React.useState(() => {
//       if (window === undefined) return defaultValue
//       const valueInLocalStorage = window.localStorage.getItem(key)
//       if (valueInLocalStorage) {
//         return deserialize(valueInLocalStorage)
//       }
//       return typeof defaultValue === 'function' ? defaultValue() : defaultValue
//     })
  
//     const prevKeyRef = React.useRef(key)
  
//     React.useEffect(() => {
//       const prevKey = prevKeyRef.current
//       if (prevKey !== key) {
//         window.localStorage.removeItem(prevKey)
//       }
//       prevKeyRef.current = key
//       window.localStorage.setItem(key, serialize(state))
//     }, [key, state, serialize])
  
//     return [state, setState]
//   }
  
//   export {useLocalStorageState}