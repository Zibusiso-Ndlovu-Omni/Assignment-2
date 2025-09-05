const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value)
  }

  return (
    <div>
      <input type="text" placeholder="Search Here" onChange={handleSearch} />
    </div>
  )
}

export default SearchBar