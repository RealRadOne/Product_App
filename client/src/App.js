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

  const fetchProducts = useCallback(() => {
    if (!hasMore) return;
    setLoading(true);
    fetch(`http://localhost:3001/api/get_products?page=${page}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        if (data.length < limit) {
          setHasMore(false); // No more products to fetch
        }
        setProducts(prevProducts => [...prevProducts, ...data]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [page, limit, hasMore]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.value.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || product.type === filterType;
    const matchesMinPrice = minPrice === '' || parseFloat(product.price) >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || parseFloat(product.price) <= parseFloat(maxPrice);

    return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice;
  });

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
        <h1 style={{ textAlign: 'center' }}>Product List</h1>
        <ProductList products={filteredProducts} />
        {loading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading more products...</p>}
      </div>
    </div>
  );
}

export default App;
