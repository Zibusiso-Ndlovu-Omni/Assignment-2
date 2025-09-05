import { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar"
import PostList from "../components/PostList"
import { fetchPosts } from "../api/api"

function Display() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchPosts();
        setData(posts);
      } catch (error) {
        setError("Error fetching data")
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  console.log(data)

  const handleSearch = (searchValue) => {
    const query = searchValue.toLowerCase()
    const filteredData = data.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.body.toLowerCase().includes(query)
    )
    setData(filteredData)
  }

  const pagination = (pageNumber) => {
    const postsPerPage = 10
    const startIndex = (pageNumber - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return data.slice(startIndex, endIndex)
  }

  const totalPages = data ? Math.ceil(data.length / 10) : 0

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return
    setCurrentPage(pageNumber)
  }

  const handleNextPage = () => {
    goToPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    goToPage(currentPage - 1)
  }

  return (
    <>
      <h1>Fetch and Display API data</h1>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {loading ? (
          <li>Loading...</li>
        ) : (
          <PostList posts={pagination(currentPage)} />
        )}
        {error && <li>{error}</li>}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  )
}

export default Display
