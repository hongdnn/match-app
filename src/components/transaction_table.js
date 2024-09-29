import React from 'react';

const TransactionTable = ({ transactions, selectedTransactions, handleTransactionCheckboxChange }) => {
    return (
        <div className="table-container">
            <table border="1" className="table-style">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Customer Name</th>
                        <th>Order Id</th>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Transaction Type</th>
                        <th>Transaction Date</th>
                        <th>Transaction Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedTransactions.some(selectedTxn => selectedTxn._id === transaction._id)}
                                    onChange={() => handleTransactionCheckboxChange(transaction)}
                                />
                            </td>
                            <td>{transaction.customerName}</td>
                            <td>{transaction.orderId}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.product}</td>
                            <td>${transaction.price.toFixed(2)}</td>
                            <td>{transaction.transactionType}</td>
                            <td>{transaction.transactionDate}</td>
                            <td>${transaction.transactionAmount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;