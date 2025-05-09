import React, { useEffect, useState, useCallback } from 'react';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import styles from './components/module.module.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('200');
  const [searchResults, setSearchResults] = useState([]);

  const isSearching = searchTerm || filterType !== 'All' || minPrice !== '0' || maxPrice !== '200';

  const fetchProducts = useCallback((pageToFetch) => {
    setLoading(true);
    fetch(`http://localhost:3001/api/get_products?page=${pageToFetch}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        if (data.length < limit) {
          setHasMore(false);
        }
        setProducts(prevProducts => [...prevProducts, ...data]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [limit]);

  const fetchSearchResults = useCallback(() => {
    if (!isSearching) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:3001/api/search_products?value=${encodeURIComponent(searchTerm)}&type=${filterType}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [searchTerm, filterType, minPrice, maxPrice, isSearching]);

  useEffect(() => {
    if (!isSearching) {
      fetchProducts(page);
    }
  }, [page, isSearching, fetchProducts]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  useEffect(() => {
    if (!isSearching) {
      setProducts([]);
      setPage(1);
      setHasMore(true);
    }
  }, [isSearching]);

  useEffect(() => {
    if (isSearching) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, isSearching]);

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
