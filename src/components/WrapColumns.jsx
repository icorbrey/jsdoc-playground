import './WrapColumns.jsx.css';
import React from 'react';

/**
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 */
export function WrapColumns({ children }) {
    return (
        <div className="wrap-columns">
            {children}
        </div>
    );
}
