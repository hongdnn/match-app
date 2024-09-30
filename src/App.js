import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CardResult } from './components/card_result';
import OrderTable from './components/order_table';
import TransactionTable from './components/transaction_table';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const App = () => {
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [matchResult, setMatchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, transactionsRes] = await Promise.all([
          axios.get(`${BASE_URL}/orders`),
          axios.get(`${BASE_URL}/transactions`),
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

    if (selectedOrders.length >= 1 && selectedTransactions.length === 0) {
      setMatchResult([]); 
    }
  };

  const handleTransactionCheckboxChange = (transaction) => {
    setSelectedTransactions((prevTransactions) =>
      prevTransactions.some((selectedTransaction) => selectedTransaction._id === transaction._id)
        ? prevTransactions.filter((selectedTransaction) => selectedTransaction._id !== transaction._id)
        : [...prevTransactions, transaction]
    );

    if (selectedTransactions.length >= 1 && selectedOrders.length === 0) {
      setMatchResult([]); 
    }
  };

  const handleMatchRequest = async (type) => {
    if (!selectedOrders.length || !selectedTransactions.length) {
      alert('Please select at least one order and one transaction.');
      return;
    }

    const payload = {
      orders: selectedOrders,
      transactions: selectedTransactions,
    };

    try {
      setLoading(true);
      const endpoint = type === 'exact' ? 'matchExact' : 'match';
      const response = await axios.post(`${BASE_URL}/orders/${endpoint}`, payload);
      console.log(response.data.data)
      setMatchResult(response.data.data);
    } catch (error) {
      console.error(`Error in ${type} match:`, error);
    } finally {
      setLoading(false);
    }
  };

  const onConfirmMatch = async (orderId, transactionId, status) => {
    try {
      const payload = {
        orderId,
        transactionId,
        status
      };
      const response = await axios.post(`${BASE_URL}/matches/confirm`, payload);
      if(response.status === 200) {
        handleMatchRequest();
      }
    } catch (error) {
      setLoading(false);
      console.error(`Error: `, error);
    }
  }

  return (
    <>
      <div className="content-container">
        <div className="content-box">
          <h2>Orders</h2>
          {orders.length > 0 ? (
            <OrderTable
              orders={orders}
              selectedOrders={selectedOrders}
              handleOrderCheckboxChange={handleOrderCheckboxChange}
            />
          ) : (
            <p>Loading orders...</p>
          )}
        </div>
        <div className="content-box">
          <h2>Transactions</h2>
          {transactions.length > 0 ? (
            <TransactionTable
              transactions={transactions}
              selectedTransactions={selectedTransactions}
              handleTransactionCheckboxChange={handleTransactionCheckboxChange}
            />
          ) : (
            <p>Loading transactions...</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .content-container {
          display: flex;
          justify-content: center;
          padding: 50px 20px;
        }

        .content-box {
          padding: 50px 20px 30px 0px;
        }

        h2 {
          color: #00509e;
        }

        /* Large devices (desktops) */
        @media (min-width: 1200px) {
          .content-container {
            flex-direction: row; /* Keep them side by side */
          }

          .content-box {
            padding: 50px 20px 30px 0px;
          }
        }

        /* Medium devices (tablets) */
        @media (max-width: 1199px) and (min-width: 768px) {
          .content-container {
            flex-direction: column;
            align-items: center; /* Center content on medium screens */
          }

          .content-box {
            width: 80%;
            padding: 40px 0; /* Adjust padding */
          }
        }

        /* Small devices (phones) */
        @media (max-width: 767px) {
          .content-container {
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
          }

          .content-box {
            width: 100%;
            padding: 20px 0; /* Minimal padding for small screens */
          }

          h2 {
            font-size: 1.5rem; /* Reduce heading size on small devices */
          }
        }
      `}</style>

      <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              padding: '12px 25px',
              margin: '0 10px',
              backgroundColor: selectedOrders.length && selectedTransactions.length ? '#00509e' : '#cccccc',
              width: '150px',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              flex: 1,
              cursor: selectedOrders.length && selectedTransactions.length ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
            }}
            onClick={() => handleMatchRequest('exact')}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = '#003d7a';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = '#00509e';
              }
            }}
            disabled={!selectedOrders.length || !selectedTransactions.length}
          >
            Match Exact
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              padding: '12px 25px',
              margin: '0 10px',
              width: '150px',
              backgroundColor: selectedOrders.length && selectedTransactions.length ? '#f2f7fa' : '#cccccc',
              color: '#4682b4',
              border: '0.5px solid #4682b4',
              borderRadius: '5px',
              flex: 1,
              cursor: selectedOrders.length && selectedTransactions.length ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
            }}
            onClick={() => handleMatchRequest()}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = '#e2e6ea';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = '#f2f7fa';
              }
            }}
            disabled={!selectedOrders.length || !selectedTransactions.length}
          >
            Match
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        {loading ? (
          <p style={{ textAlign: 'center' }}>
            <strong>Matching in progress...</strong>
          </p>
        ) : null}
        {matchResult.length > 0 && selectedOrders.length > 0 && selectedTransactions.length > 0 ? (
          matchResult.map((match) => {
            const order = match.find((item) => item.type === 'order');
            const transactions = match.filter((item) => item.type === 'txn');

            return transactions.map((txn) => <CardResult key={txn._id} order={order} transaction={txn} onConfirmMatch={onConfirmMatch} />);
          })
        ) : (
          <p style={{ textAlign: 'center' }}>
            <strong>No matches found, select orders and transactions to check!</strong>
          </p>
        )}
      </div>
    </>
  );
};

export default App;
