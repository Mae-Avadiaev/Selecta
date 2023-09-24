import {useState} from "react";

export const useSelector = () => {

    const [changes, setChanges] = useState({added: [], deleted: []})

    const handleSelectChanges = (id, action) => {
        if (action === 'add') {
            const foundDeletedId = changes.deleted.find(deletedId => deletedId === id)
            if (foundDeletedId) {
                setChanges(prevState => {
                    const newDeletedArray = prevState.deleted.filter(deletedId => deletedId !== foundDeletedId)
                    return {...prevState, deleted: [...newDeletedArray]
                    }})
            } else {
                setChanges(prevState => {
                    return {...prevState, added: [...prevState.added, id]}
                })
            }
        } else if (action === 'delete') {
            const foundAddedId = changes.added.find(addedId => addedId === id)
            if (foundAddedId) {
                setChanges(prevState => {
                    const newAddedArray = prevState.added.filter(addedId => addedId !== foundAddedId)
                    return {...prevState, added: [...newAddedArray]}
                })
            } else {
                setChanges(prevState => {
                    return {...prevState, deleted: [...prevState.deleted, id]}
                })
            }
        }
    }

    return {changes, setChanges, handleSelectChanges}
}