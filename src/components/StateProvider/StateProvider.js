// setting up the data layer
// we need this to track the basket

import { createContext, useContext, useReducer } from 'react'
//This is the data layer
export const StateContext = createContext()

//Build a provider

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)
//This is how we use it inside the component

export const useStateValue = () => useContext(StateContext)
