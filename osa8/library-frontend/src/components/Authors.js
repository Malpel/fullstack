import React, { useState } from 'react'

const Authors = (props) => {
    const [name, setName] = useState('')
    const [birthyear, setBirthyear] = useState('')

    if (!props.show) {
        return null
    }

    if (props.result.loading) {
        return <div>loading...</div>
    }

    console.log('PROPS RESULT', props.result)

    const authors = props.result.data.allAuthors
    console.log('AUTHORS', authors)

    const submit = async (e) => {
        e.preventDefault()
        let variables
        if (name === '') {
            const name = authors[0].name
            variables = { name, birthyear  }
        } else {
            variables = { name, birthyear }
        }
        await props.editAuthor({
            variables: variables
        })

        setName('')
        setBirthyear('')
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            born
            </th>
                        <th>
                            books
            </th>
                    </tr>
                    {authors.map(a =>
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h2>set birthyear</h2>
            <form onSubmit={submit}>
                <select value={name} onChange={({ target }) => setName(target.value)}>
                    {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                </select>
                <div>
                    born
                    <input
                        required
                        value={birthyear}
                        onChange={({ target }) => setBirthyear(parseInt(target.value))}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>

        </div>
    )
}

export default Authors