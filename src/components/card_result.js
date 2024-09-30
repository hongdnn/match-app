import React from 'react';

export const CardResult = ({ order, transaction, onConfirmMatch }) => {
    return (
        <div
            key={transaction._id}
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                margin: '30px 100px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#f9f9f9',
                transition: '0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)')}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00509e' }}>
                    Order
                </div>
                <div style={{ fontSize: '1.2rem', color: '#00509e' }}>
                    {transaction.status ? (
                        <strong>Confirmed</strong>
                    ) : (
                        transaction.ratio && (
                            <>
                                <strong>Match:</strong> {transaction.ratio}%
                            </>
                        )
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px" }}>Order Id</div>
                    <div>{order.orderId}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px" }}>Product</div>
                    <div>{order.product}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px" }}>Customer</div>
                    <div>{order.customerName}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px" }}>Price</div>
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
                    <div style={{ color: '#4682b4', marginBottom: "5px" }}>Product</div>
                    <div>{transaction.product}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px" }}>Customer</div>
                    <div>{transaction.customerName}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px" }}>Price</div>
                    <div>${transaction.price.toFixed(2)}</div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px" }}>Transaction Type</div>
                    <div>{transaction.transactionType}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px" }}>Transaction Date</div>
                    <div>{transaction.transactionDate}</div>
                </div>
                <div style={{ flex: 2 }}>
                    <div style={{ color: '#4682b4', marginBottom: "5px" }}>Transaction Amount</div>
                    <div>${transaction.transactionAmount}</div>
                </div>

            </div>
            {(transaction.status || transaction.ratio) &&
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                {!transaction.status &&
                    <div style={{ flex: 0 }}>
                        <button
                            style={{
                                padding: '12px 25px',
                                margin: '0 10px',
                                width: '150px',
                                backgroundColor: '#f2f7fa',
                                color: '#4682b4',
                                border: '0.5px solid #4682b4',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4682b4', e.currentTarget.style.color = '#fff')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f2f7fa', e.currentTarget.style.color = '#4682b4')}
                            onClick={() => onConfirmMatch(order._id, transaction._id, 'confirmed')}
                        >
                            Confirm
                        </button>
                    </div>
                }
                <div style={{ flex: 0 }}>
                    <button
                        style={{
                            padding: '12px 25px',
                            margin: '0 10px',
                            width: '150px',
                            backgroundColor: '#f2f7fa',
                            color: '#4682b4',
                            border: '0.5px solid #4682b4',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ff6347', e.currentTarget.style.color = '#fff')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f2f7fa', e.currentTarget.style.color = '#4682b4')}
                        onClick={() => onConfirmMatch(order._id, transaction._id, 'rejected')}
                    >
                        Reject
                    </button>
                </div>
            </div>
}
        </div>
    );
};
