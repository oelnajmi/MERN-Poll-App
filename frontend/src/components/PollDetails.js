import './PollDetails.css';
import {useState} from 'react';

const PollDetails = ({ poll }) => {
    const [isShown, setIsShown] = useState(false);
    const [disable, setDisable] = useState(false);
    const [firstPollResult, setFirstPollResult] = useState(poll.firstPollResult);
    const [secondPollResult, setSecondPollResult] = useState(poll.secondPollResult);

    const handleFirstResult = async (e) => {

        let firstPollResult = poll.firstPollResult + 1
        const firstPollUpdated = { firstPollResult }

        const response = await fetch('/api/polls/' + poll._id, {
            method: 'PATCH',
            body: JSON.stringify(firstPollUpdated),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        if (response.ok) {
            console.log('Updated Poll')
            setFirstPollResult(poll.firstPollResult + 1)
        }

        setIsShown(true);
      };

    const handleSecondResult = async (e) => {

        let secondPollResult = poll.secondPollResult + 1
        const secondPollUpdated = { secondPollResult }

        const response = await fetch('/api/polls/' + poll._id, {
            method: 'PATCH',
            body: JSON.stringify(secondPollUpdated),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        
        if (response.ok) {
            console.log('Updated Poll')
            setSecondPollResult(poll.secondPollResult + 1)
        }

        setIsShown(true);
    };

    return (
        <div className="poll-details" value={poll._id}>
            <div className="poll-title">
                <h4>{poll.title}</h4>
            </div>
            <div className="poll-options">
                <div className="poll-results">
                    <button disabled={disable} onClick={() => {handleFirstResult(); setDisable(true)}}>{poll.firstPollOption}</button>
                    {isShown && <h4 className="poll-result">{firstPollResult}</h4>}
                </div>
                <div className="poll-results">
                    <button disabled={disable} onClick={() => {handleSecondResult(); setDisable(true)}}>{poll.secondPollOption}</button>
                    {isShown && <h4 className="poll-result">{secondPollResult}</h4>}
                </div>
            </div>

        </div>
    )
}

export default PollDetails