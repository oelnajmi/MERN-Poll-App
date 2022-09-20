import { createContext, useReducer } from 'react'

export const PollsContext = createContext()

export const pollsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POLLS':
            return {
                polls: action.payload
            }
        case 'CREATE_POLL':
            return {
                polls: [action.payload, ...state.polls]
            }
        case 'UPDATE_POLL':
            return {
                polls: [...state.polls]
            }
        default:
            return state
    }
}

export const PollsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pollsReducer, {
        polls: null
    })

    return (
        <PollsContext.Provider value={{...state, dispatch}}>
            { children }
        </PollsContext.Provider>
    )
}