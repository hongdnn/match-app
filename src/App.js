import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CardResult } from './components/card_result'
import OrderTable from './components/order_table'
import TransactionTable from './components/transaction_table';

const BASE_URL = process.env.REACT_APP_BASE_URL

const App = () => {
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [matchResult, setMatchResult] = useState([]);


  useEffect(() => {
    const ordersUrl = `${BASE_URL}/orders`;
    const transactionsUrl = `${BASE_URL}/transactions`;

    const fetchData = async () => {
      try {
        const [ordersRes, transactionsRes] = await Promise.all([
          axios.get(ordersUrl),
          axios.get(transactionsUrl)
        ]);

        setOrders(ordersRes.data.data);
        setTransactions(transactionsRes.data.data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    fetchData();
  }, []);


  const handleOrderCheckboxChange = (order) => {
    setSelectedOrders((prevOrders) =>
      prevOrders.some((existedOrder) => existedOrder._id === order._id)
        ? prevOrders.filter((existedOrder) => existedOrder._id !== order._id)
        : [...prevOrders, order]
    );
  };

  const handleTransactionCheckboxChange = (transaction) => {
    setSelectedTransactions((prevTransactions) =>
      prevTransactions.some((selectedTransaction) => selectedTransaction._id === transaction._id)
        ? prevTransactions.filter((selectedTransaction) => selectedTransaction._id !== transaction._id)
        : [...prevTransactions, transaction]
    );
  };

  const handleMatchExact = async () => {
    const payload = {
      orders: selectedOrders,
      transactions: selectedTransactions,
    };
    console.log("Payload: ", payload);
    try {
      const response = await axios.post(`${BASE_URL}/orders/matchExact`, payload);
      setMatchResult(response.data.data);
      console.log('Match Result:', response.data.data);
    } catch (error) {
      console.error('Error matching orders and transactions:', error);
    }
  };

  const handleMatch = async () => {
    const payload = {
      orders: selectedOrders,
      transactions: selectedTransactions,
    };
    console.log("Payload: ", payload);
    try {
      const response = await axios.post(`${BASE_URL}/orders/match`, payload);
      setMatchResult(response.data.data);
      console.log('Match Result:', response.data.data);
    } catch (error) {
      console.error('Error matching orders and transactions:', error);
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ padding: '50px 20px' }}>
          <h2 style={{ color: '#00509e' }}>Orders</h2>
          < OrderTable
            orders={orders}
            selectedOrders={selectedOrders}
            handleOrderCheckboxChange={handleOrderCheckboxChange} />
        </div>
        <div style={{ padding: '50px 20px' }}>

          <h2 style={{ color: '#00509e' }}>Transactions</h2>
          < TransactionTable
            transactions={transactions}
            selectedTransactions={selectedTransactions}
            handleTransactionCheckboxChange={handleTransactionCheckboxChange} />
        </div>


      </div>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          style={{
            padding: '12px 25px',
            margin: '0 10px',
            backgroundColor: '#00509e',
            width: '150px',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            flex: 1,
            cursor: 'pointer',
            fontSize: '1rem',
          }}
          onClick={handleMatchExact}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#003d7a')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00509e')}
        >
          Match Exact
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          style={{
            padding: '12px 25px',
            margin: '0 10px',
            width: '150px',
            backgroundColor: '#f2f7fa',
            color: '#4682b4',
            border: '0.5px solid #4682b4',
            borderRadius: '5px',
            flex: 1,
            cursor: 'pointer',
            fontSize: '1rem'
          }}
          onClick={handleMatch}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e2e6ea')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f2f7fa')}
        >
          Match
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {matchResult.map((match) => {
          const order = match.find(item => item.type === 'order');
          const transactions = match.filter(item => item.type === 'txn');

          return transactions.map(txn => (
            <CardResult key={txn._id} order={order} transaction={txn} />
          ));
        })}
      </div>
    </>
  );
};

export default App;
