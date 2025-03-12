import { useState } from 'react';

/**
 * @param {*} param0 
 * @returns Player component
 */
export default function Player({ initialName, symbol, isActive }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        // If new state depends on the previous state value, pass a function to state updating function.
        // State updates are not performed instantly but at some time in the future (when React has time for it)
        setIsEditing((editing) => !editing);
    }

    /**
     * Event is passed automatically by React when the event is triggered.
     * @param {*} event 
     */
    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = isEditing ?
        (<input type="text" required value={playerName} onChange={handleChange} />) : // Two-way binding
        (<span className="player-name">{playerName}</span>);

    let buttonCaption = isEditing ? "Save" : "Edit";

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{buttonCaption}</button>
        </li>
    )
}