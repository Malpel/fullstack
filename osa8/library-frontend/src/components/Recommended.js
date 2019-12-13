import React from 'react'

const Recommended = (props) => {
    if (!props.show) {
        return null
    }

    if (props.user.loading) {
        return <div>loading...</div>
    }

    const favoriteGenre = props.user.data.me.favoriteGenre
    const recommendedBooks = props.result.data.allBooks.filter(b => b.genres.includes(favoriteGenre))

    return (
        <div>
            <h2>recommended for you</h2>
            <p>books in your favorite genre <b>{favoriteGenre}</b></p>
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
                    {recommendedBooks.map(a =>
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

export default Recommended