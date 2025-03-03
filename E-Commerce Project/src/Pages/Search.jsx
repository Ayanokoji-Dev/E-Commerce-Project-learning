import { useEffect, useState } from 'react'
import '../Styles/Sreach.css'
import ProductList from '../Components/ProductList';

const Search = () => {


    const [searchValue,setSearchValue]=useState('');

    const [searchedProducts,setSearchedProducts]=useState('');

    const [searchAllowed,setSearchAllowed]=useState(false);

    useEffect(()=>{
        const fechSearch =async () =>
            await fetch(`https://dummyjson.com/products/search?q=${searchValue}`)
                .then(res => res.json())
                .then(data => setSearchedProducts(data.products));
                
        fechSearch();
    },[searchAllowed])

    let searchTimeout;

    const handleSearchClick=()=>{
        setSearchAllowed(true);

        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(()=>{
            setSearchAllowed(false);
        },1000)
    }

    return (
        <div className='search'>
            <div className="searchBar">
                <input
                type="text"
                className='searchInput'
                placeholder='Search...'
                value={searchValue}
                onChange={(e)=>{setSearchValue(e.target.value)}}
                />
                <button 
                className="searchBtn"
                onClick={()=>{handleSearchClick()}}
                >
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <ProductList apiData={searchedProducts} notFoundMessage='Product Searched was not found' />
        </div>
    )
}

export default Search
