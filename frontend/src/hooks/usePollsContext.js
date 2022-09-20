import { PollsContext } from "../context/PollContext"
import { useContext } from 'react'

export const usePollsContext = () => {
    const context = useContext(PollsContext)

    if (!context) {
        throw Error('usePollsContext must be used inside a PollsContextProvider')
    }

    return context
}