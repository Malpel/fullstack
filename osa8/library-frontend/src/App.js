import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const ALL_AUTHORS = gql`
  {
    allAuthors {
        name
        born
        bookCount
        id
    }
  }
`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
    id
    title
    published 
    author {
        name
        born
        bookCount
        id
    }
    genres
}
`
const ALL_BOOKS = gql`
  {
      allBooks { ...BookDetails }
  }
  ${BOOK_DETAILS}
`


const ADD_BOOK = gql`
  mutation addBook($title:String!, $published:Int!, $author:String!, $genres:[String!]) {
      addBook(
          title: $title,
          published: $published,
          author: $author,
          genres: $genres
      ) {
            ...BookDetails
      }
  }
  ${BOOK_DETAILS}
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $birthyear: Int!) {
      editAuthor(
          name: $name,
          setBornTo: $birthyear
      ) {
          name
          born
          id
      }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const ALL_GENRES = gql`
  {
      allGenres {
          name
          id
      }
  }
`
const BOOKS_BY_GENRE = gql`
query allBooksByGenre($genre: String!) {
    allBooks(genre: $genre) { ...BookDetails }
    }
    ${BOOK_DETAILS}
`

const CURRENT_USER = gql`
    {
        me {
            favoriteGenre
        }
    }
`

const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

const App = () => {
    const [page, setPage] = useState('authors')
    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)

    const client = useApolloClient()
    const authors = useQuery(ALL_AUTHORS)
    const books = useQuery(ALL_BOOKS)
    const currentUser = useQuery(CURRENT_USER)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('library-user-token')
        // if loggedUserJSON exists, it's the token that exists
        if (loggedUserJSON) {
            setToken(loggedUserJSON)
        }

    }, [])

    const handleError = (error) => {
        setErrorMessage(error.graphQLErrors[0].message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) =>
            set.map(p => p.id).includes(object.id)

        const dataInStore = client.readQuery({ query: ALL_BOOKS })
        if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks: dataInStore.allBooks.concat(addedBook) }
            })
        }

        const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
        if (!includedIn(authorsInStore.allAuthors, addedBook.author)) {
            client.writeQuery({
                query: ALL_AUTHORS,
                data: { allAuthors: authorsInStore.allAuthors.concat(addedBook.author) }
            })
        }
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            updateCacheWith(addedBook)
            alert(`${addedBook.title} added`)
        }
    })


    const [addBook] = useMutation(ADD_BOOK, {
        onError: handleError,
        refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }, { query: ALL_GENRES }]
    })

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        onError: handleError,
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const [login] = useMutation(LOGIN, {
        onError: handleError,
    })

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    const loggedInStyle = { display: token ? '' : 'none' }
    const logginButtonStyle = { display: token ? 'none' : '' }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button style={loggedInStyle} onClick={() => setPage('recommended')}>recommended</button>
                <button style={logginButtonStyle} onClick={() => setPage('login')}>login</button>
                <button style={loggedInStyle} onClick={() => setPage('add')}>add book</button>
                <button style={loggedInStyle} onClick={() => logout()}>logout</button>
            </div>

            {errorMessage &&
                <div style={{ color: 'red' }}>
                    {errorMessage}
                </div>
            }

            <Authors
                show={page === 'authors'}
                result={authors}
                editAuthor={editAuthor}
            />

            <Books
                show={page === 'books'}
                result={books}
                allGenres={ALL_GENRES}
                byGenre={BOOKS_BY_GENRE}
            />

            <NewBook
                show={page === 'add'}
                addBook={addBook}
            />

            <LoginForm
                show={page === 'login'}
                login={login}
                setToken={setToken}
                setPage={setPage}
            />

            <Recommended
                show={page === 'recommended'}
                byGenre={BOOKS_BY_GENRE}
                user={currentUser}
                result={books}
            />

        </div>
    )
}

export default App