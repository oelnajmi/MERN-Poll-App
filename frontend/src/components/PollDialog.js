import { useState } from 'react'
import { usePollsContext } from '../hooks/usePollsContext'

let dialogStyles = {
    maxWidth: '60%',
    margin: '0 auto',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '999',
    background: ' #F8FFFA',
    padding: '30px 0px 0px',
    borderRadius: '10px',
    color: 'black'
};

let formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    overflow: 'auto'
}

let dialogSubmitButtonStyles = {
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'none',
    fontWeight: 'bold',
    color: '#8FBC8F',
    margin: '0px'
};

let dialogCloseButtonStyles = {
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'none',
    fontWeight: 'bold',
    color: '#FF9494',
    margin: '0px'
};

let bottomRowStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'left',
    width: '65%',
    padding: '10px'
}

let labelStyle = {
    padding: '10px'
}

let errorStyle = {
    padding: '10px',
    color: '#FF9494',
    fontWeight: 'bold',
}

const PollDialog = ({ show, close }) => {
    const {dispatch} = usePollsContext()

    const [title, setTitle] = useState('')
    const [firstPollOption, setFirstPollOption] = useState('')
    const [secondPollOption, setSecondPollOption] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const poll = {title, firstPollOption, secondPollOption}
        console.log(title, firstPollOption, secondPollOption)

        const response = await fetch('/api/polls', {
            method: 'POST',
            body: JSON.stringify(poll),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setFirstPollOption('')
            setSecondPollOption('')
            setError(null)
            console.log('new poll added')
            dispatch({type: 'CREATE_POLL', payload: json})
        }
    }

    let dialog = (
        <div style={dialogStyles}>

            <form style={formStyle}>
                <label style={labelStyle}>
                    <input type="text" 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    name="title" 
                    placeholder="Title"/>
                </label>
                <label style={labelStyle}>
                    <input type="text" 
                    onChange={(e) => setFirstPollOption(e.target.value)}
                    value={firstPollOption}
                    name="firstPollOption" 
                    placeholder="Option 1"/>
                </label>
                <label style={labelStyle}>
                    <input type="text" 
                     onChange={(e) => setSecondPollOption(e.target.value)} 
                     value={secondPollOption} 
                     name="secondPollOption" 
                     placeholder="Option 2"/>
                </label>
                <div style={bottomRowStyle}>
                    <button onClick={handleSubmit} style={dialogSubmitButtonStyles}>Submit</button>
                    <button onClick={close} style={dialogCloseButtonStyles}>Cancel</button>
                </div>
                <div>
                {error && <div className='error' style={errorStyle}>All Fields Are Required</div>}
                </div>

            </form>
            
        </div>
        
    );

    return (
        <div>
             {show && dialog}
        </div>
    )
}

export default PollDialog