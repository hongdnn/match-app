import React from 'react';

export const CardResult = ({ order, transaction }) => {
    return (
        <div
            key={transaction._id}
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                margin: '30px 100px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#f9f9f9', // Light gray background
                transition: '0.3s', // Smooth transition for hover effect
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)')}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00509e' }}>
                    Order
                </div>
                {transaction.ratio && (
                    <div style={{ fontSize: '1.2rem', color: '#00509e' }}>
                        <strong>Match</strong> {transaction.ratio}%
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px"  }}>Order Id</div>
                    <div>{order.orderId}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px"  }}>Customer</div>
                    <div>{order.customerName}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px"  }}>Product</div>
                    <div>{order.product}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px"  }}>Price</div>
                    <div>${order.price.toFixed(2)}</div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00509e', margin: '20px 0 10px 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
                Transaction
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px" }}>Order Id</div>
                    <div>{transaction.orderId}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px"  }}>Product</div>
                    <div>{transaction.product}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px"  }}>Customer</div>
                    <div>{transaction.customerName}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px"  }}>Price</div>
                    <div>${transaction.price.toFixed(2)}</div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ flex: 1}}>
                    <div style={{ color: '#4682b4', marginBottom: "5px"  }}>Transaction Type</div>
                    <div>{transaction.transactionType}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px"  }}>Transaction Date</div>
                    <div>{transaction.transactionDate}</div>
                </div>
                <div style={{ flex: 2}}>
                    <div style={{ color: '#4682b4', marginBottom: "5px"  }}>Transaction Amount</div>
                    <div>${transaction.transactionAmount}</div>
                </div>
            </div>
        </div>
    );
};
