import React from 'react';

const TransactionTable = ({ transactions, selectedTransactions, handleTransactionCheckboxChange }) => {

    const handleRowClick = (transaction, event) => {
        if (event.target.type !== 'checkbox') {
            handleTransactionCheckboxChange(transaction);
        }
    };

    return (
        <div className="table-container">
            <table border="1" className="table-style">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Order Id</th>
                        <th>Product</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Transaction Type</th>
                        <th>Transaction Date</th>
                        <th>Transaction Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id} onClick={(e) => handleRowClick(transaction, e)} style={{ cursor: 'pointer' }}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedTransactions.some(selectedTxn => selectedTxn._id === transaction._id)}
                                    onChange={() => handleTransactionCheckboxChange(transaction)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </td>
                            <td>{transaction.orderId}</td>
                            <td>{transaction.product}</td>
                            <td>{transaction.customerName}</td>
                            <td>{transaction.date}</td>
                            <td>${transaction.price.toFixed(2)}</td>
                            <td>{transaction.transactionType}</td>
                            <td>{transaction.transactionDate}</td>
                            <td>${transaction.transactionAmount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx>{`
                .table-container {
                    border-radius: 10px;
                    overflow-x: auto; /* Enable horizontal scrolling on small screens */
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                }

                .table-style {
                    width: 100%;
                    border-collapse: collapse;
                    background-color: #f0f8ff;
                }

                .table-style th, .table-style td {
                    padding: 12px;
                    border: 1px solid #ccc;
                }

                .table-style th {
                    background-color: #4682b4;
                    color: white;
                    text-align: left;
                }

                .table-style tr:hover {
                    background-color: #d0eaff;
                }

                .table-style input[type="checkbox"] {
                    cursor: pointer;
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .table-style, .table-style thead, .table-style tbody, .table-style th, .table-style td, .table-style tr {
                        display: block;
                    }

                    .table-style thead tr {
                        display: none; /* Hide header on small screens */
                    }

                    .table-style tr {
                        margin-bottom: 10px;
                        border-bottom: 2px solid #ddd;
                    }

                    .table-style td {
                        display: flex;
                        justify-content: space-between;
                        padding: 10px;
                        text-align: left;
                        border: none;
                        position: relative;
                        padding-left: 50%;
                    }

                    .table-style td::before {
                        content: attr(data-label); /* Display the header for each row item */
                        position: absolute;
                        left: 10px;
                        width: calc(50% - 20px); /* Width to handle content properly */
                        font-weight: bold;
                        white-space: nowrap;
                    }

                    .table-style td[data-label="Transaction Amount"] {
                        text-align: right;
                    }
                }
            `}</style>
        </div>
    );
};

export default TransactionTable;