import { useEffect, useState } from "react"
import { usePollsContext } from '../hooks/usePollsContext'

//components
import PollDetails from '../components/PollDetails'
import PollDialog from '../components/PollDialog'

const Home = () => {
    const [showPollDialog, setShowPollDialog] = useState(false)
    const {polls, dispatch} = usePollsContext()

    //fire a function (once) when Home component is rendered 
    useEffect(() => {
        const fetchPolls = async () => {
            const response = await fetch('/api/polls')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_POLLS', payload: json})
            }
        }

        fetchPolls()
    }, [dispatch])

    return (
        <div className="home">
            <button onClick={() => {setShowPollDialog(true)}}>CREATE POLL</button>
            <PollDialog show={showPollDialog} close={(e) => setShowPollDialog(false)}/>
            <div className="polls">
                {polls && polls.map((poll) => (
                    <PollDetails key={poll._id} poll={poll}/>
                ))}
            </div>
        </div>
    )
}

export default Home