import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'

const Books = (props) => {
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])
    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState('')
    const client = useApolloClient()

    const allBooks = props.result.data.allBooks

    useEffect(() => {
        if (filteredBooks === '') {
            setBooks(allBooks)
        } else {
            setBooks(filteredBooks)
        }

    }, [filteredBooks, allBooks, setBooks])

    useEffect(() => {
        client.query({
            query: props.allGenres
        }).then((res) => {
            setGenres(res.data.allGenres)
        })
            .catch((error) => { console.log('error:', error) })
    })

    const byGenre = () => {
        client.query({
            query: props.byGenre,
            variables: {
                genre: genre
            }
        })
            .then((response) => {
                console.log(response.data.allBooks)
                setFilteredBooks(response.data.allBooks)
            })
            .catch((error) => console.log('error:', error))
    }

    const clearFilter = () => {
        setBooks(allBooks)
    }


    if (!props.show) {
        return null
    }

    if (props.result.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h2>books</h2>

            {<select value={genre} onChange={({ target }) => setGenre(target.value)}>
                {genres.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
            </select>}
            <button onClick={byGenre}>filter by genre</button>
            <button onClick={clearFilter}>all books</button>

            <table>
                <tbody>
                    <tr>
                        <th>title</th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {books.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Books