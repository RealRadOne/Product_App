import React, { useEffect, useState, useCallback } from 'react';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import styles from './components/module.module.css';

async function fetchProductData(page,limit){
  const response = await fetch(`http://localhost:3001/api/get_products?page=${page}&limit=${limit}`);
  if(!response.ok){
    throw new Error('Failed to fetch products');
  }
  return response.json();
}


async function fetchSearchData({searchTerm,filterType,minPrice,maxPrice}){
  const response = await fetch(
    `http://localhost:3001/api/search_products?value=${encodeURIComponent(searchTerm)}&type=${filterType}&minPrice=${minPrice}&maxPrice=${maxPrice}`
);
if(!response.ok){
  throw new Error('Failed to fetch search results');
}
return response.json();
}

function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('200');
  const [searchResults, setSearchResults] = useState([]);

  const isSearching = !!(
    searchTerm || filterType !== 'All' || minPrice !== '0' || maxPrice !== '200'
  );

  const fetchProducts = useCallback(async (pageToFetch) => {
    setLoading(true);
    try{
    const data = await fetchProductData(pageToFetch,limit);
    if(data.length<limit){
      setHasMore(false);
      console.log("No longer any products!");
    }
    setProducts(prevProducts=>prevProducts.concat(data));
  }   catch(err){
      console.error(err);
    } finally{
      setLoading(false);
    }
  }, [limit]);

  //Any time the search filters change the function is re-created
  const fetchSearchResults = useCallback(async () => {
    setLoading(true);
    try{
      const data = await fetchSearchData({searchTerm,filterType,minPrice,maxPrice});
      setSearchResults(data);
    } catch(err){
      console.error(err);
    } finally{
      setLoading(false);
    }
  }, [searchTerm, filterType, minPrice, maxPrice]);

  useEffect(() => {
    if (!isSearching && page!=1) {
      fetchProducts(page);
    }
  }, [page, isSearching, fetchProducts]);

  useEffect(() => {
    if (isSearching) {
      fetchSearchResults();
    }
  }, [isSearching, fetchSearchResults]);


  useEffect(() => {
    if (isSearching) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      //Detect a scroll and increment the page number
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, isSearching]);

  useEffect(() => {
    if (!isSearching) {
      setSearchResults([]);
      setProducts([]);
      setPage(1);
      setHasMore(true);
      fetchProducts(1);
    }
  }, [isSearching,fetchProducts]);

  return (
    <div className={styles.mainContainer}>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilterType={setFilterType}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      <div style={{ flex: 1 }}>
        <h1 className={styles.title}>Product List</h1>
        <ProductList products={isSearching ? searchResults : products} />
        {loading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading more products...</p>}
      </div>
    </div>
  );
}

export default App;
