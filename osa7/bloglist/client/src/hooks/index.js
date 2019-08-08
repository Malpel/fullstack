import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const resetValue = () => {
        setValue('')
    }

    const reset = {
        resetValue
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}

