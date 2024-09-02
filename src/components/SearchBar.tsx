import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchBar = ({search, onSearchChange} : {search: string, onSearchChange: Function}) => {

  

  return (
    <div className='w-full px-2 lg:px-40 '>
        <div className='m-4 gap-4 rounded-3xl bg-softDark flex items-center p-3'>
            <SearchRoundedIcon style={{color: 'gray'}}/>
            <input type="text" value={search} onChange={(e) => {onSearchChange(e)}} className='lg:text-lg  w-full text-sm text-white focus:outline-none  placeholder-white/[0.3] bg-transparent' placeholder='Search For Coins'/>
        </div>
    </div>
  )
}

export default SearchBar
