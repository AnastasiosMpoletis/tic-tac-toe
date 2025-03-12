import { useState } from 'react';

/**
 * @param {*} param0 
 * @returns Player component
 */
export default function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing(!isEditing);
    }

    let playerName = isEditing ? <input type="text" required value={name} /> : <span className="player-name">{name}</span>;
    let buttonCaption = isEditing ? 'Save' : 'Edit';

    return (
        <li>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{buttonCaption}</button>
        </li>
    )
}