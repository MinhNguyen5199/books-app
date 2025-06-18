'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Make sure this path is correct

// Manually define the structure of the Invoice object from the Stripe API
interface Invoice {
  id: string;
  created: number; // This is a UNIX timestamp
  total: number; // Amount in cents
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void' | null;
  hosted_invoice_url: string | null; // This can be null
}

// The API response from your backend
interface ApiResponse {
  data: Invoice[];
  has_more: boolean;
}

interface BillingHistoryProps {}

function BillingHistory(props: BillingHistoryProps): React.ReactElement {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [lastInvoiceId, setLastInvoiceId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth(); 

  const fetchInvoices = async (cursor: string | null) => {
    setIsLoading(true);
    if (!user) {
      console.error("User is not authenticated, cannot fetch invoices.");
      setIsLoading(false);
      return;
    }
    
    // Get a fresh token from Firebase for the API call
    const token = await user.getIdToken();

    try {
      const response = await fetch('http://localhost:4000/get-invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ starting_after: cursor })
      });

      const data: ApiResponse = await response.json();
      
      if (response.ok) {
        // Append new invoices to the end of the existing list
        setInvoices(prev => [...prev, ...data.data]);
        setHasMore(data.has_more);
        if (data.data.length > 0) {
          // Save the ID of the last invoice to use as the cursor for the next page
          setLastInvoiceId(data.data[data.data.length - 1].id);
        }
      } else {
        console.error("Failed to fetch invoices:", (data as any).message);
      }
    } catch (error) {
        console.error("An error occurred while fetching invoices:", error);
    } finally {
        setIsLoading(false);
    }
  };

  // This hook runs when the 'user' object becomes available,
  // triggering the initial fetch for the first page of invoices.
  useEffect(() => {
    if (user) {
      // Reset state if the user changes
      setInvoices([]);
      setLastInvoiceId(null);
      setHasMore(false);
      fetchInvoices(null);
    }
  }, [user]);

  const handleLoadMore = (): void => {
    // Fetches the next page of invoices using the last invoice ID as a cursor
    if (hasMore && !isLoading) {
      fetchInvoices(lastInvoiceId);
    }
  };

  return (
    <div>
      <h2>Your Invoices</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            {new Date(invoice.created * 1000).toLocaleDateString()} -
            ${(invoice.total / 100).toFixed(2)} -
            Status: {invoice.status} -
            {/* Only show the "View" link if the URL exists */}
            {invoice.hosted_invoice_url && (
              <a href={invoice.hosted_invoice_url} target="_blank" rel="noopener noreferrer">
                View
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Only show the "Load More" button if there are more invoices to fetch */}
      {hasMore && (
        <button onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}

export default BillingHistory;