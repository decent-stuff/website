'use client';

import { useState, useEffect } from 'react';
import { LedgerEntry } from '@/lib/db';
import { ledgerService } from '@/lib/ledger-service';

interface LedgerTableProps {
  entries?: LedgerEntry[];
  isLoading?: boolean;
  error?: string;
}

export function LedgerTable({ entries, isLoading, error }: LedgerTableProps) {
  const [sortField, setSortField] = useState<keyof LedgerEntry>('timestamp_ns');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [localEntries, setLocalEntries] = useState<LedgerEntry[]>(entries || []);
  const [localIsLoading, setLocalIsLoading] = useState<boolean>(isLoading || false);
  const [localError, setLocalError] = useState<string | undefined>(error);

  // If entries are provided as props, use them
  useEffect(() => {
    if (entries) {
      setLocalEntries(entries);
    }
  }, [entries]);

  // If isLoading is provided as props, use it
  useEffect(() => {
    if (isLoading !== undefined) {
      setLocalIsLoading(isLoading);
    }
  }, [isLoading]);

  // If error is provided as props, use it
  useEffect(() => {
    if (error !== undefined) {
      setLocalError(error);
    }
  }, [error]);

  // If no entries are provided, fetch them from the ledger service
  useEffect(() => {
    if (!entries) {
      let isMounted = true;

      const fetchEntries = async () => {
        try {
          if (!isMounted) return;

          setLocalIsLoading(true);
          setLocalError(undefined);

          // Initialize the ledger service if needed
          await ledgerService.initialize();

          // Fetch the latest entries
          await ledgerService.fetchAndStoreLatestEntries();

          // Get all entries from the database
          const allEntries = await ledgerService.getAllEntries();

          if (isMounted) {
            setLocalEntries(allEntries);
          }
        } catch (err) {
          if (isMounted) {
            setLocalError(err instanceof Error ? err.message : 'Failed to fetch ledger entries');
          }
        } finally {
          if (isMounted) {
            setLocalIsLoading(false);
          }
        }
      };

      fetchEntries().catch(err => {
        if (isMounted) {
          console.error("Error fetching ledger entries:", err);
        }
      });

      return () => {
        isMounted = false;
      };
    }
  }, [entries]);

  // Handle sorting
  const handleSort = (field: keyof LedgerEntry) => {
    if (field === sortField) {
      // Toggle sort direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default to descending (newest first)
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Sort entries
  const sortedEntries = [...localEntries].sort((a, b) => {
    // For numeric fields
    if (sortField === 'timestamp_ns' || sortField === 'blockVersion' ||
        sortField === 'blockSize' || sortField === 'blockOffset') {
      const aValue = (a[sortField] as number | undefined) || 0;
      const bValue = (b[sortField] as number | undefined) || 0;
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    // For string fields
    else if (sortField === 'key' || sortField === 'parentBlockHash' || sortField === 'description' || sortField === 'label') {
      const aValue = (a[sortField] as string | undefined) || '';
      const bValue = (b[sortField] as string | undefined) || '';
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  // Format timestamp
  const formatTimestamp = (timestamp_ns?: number) => {
    if (!timestamp_ns) return 'N/A';
    return new Date(timestamp_ns).toLocaleString();
  };

  // Format value
  const formatValue = (value: unknown) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        // If JSON stringification fails, convert to string directly
        return String(value);
      }
    }
    return String(value);
  };

  // Render loading state
  if (localIsLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (localError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{localError}</span>
      </div>
    );
  }

  // Render empty state
  if (sortedEntries.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No ledger entries found.</p>
      </div>
    );
  }

  // Render table
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-fixed text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[8%]"
              onClick={() => handleSort('key')}
            >
              Key
              {sortField === 'key' && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[8%]"
              onClick={() => handleSort('label')}
            >
              Label
              {sortField === 'label' && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]"
            >
              Value
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[10%]"
              onClick={() => handleSort('timestamp_ns')}
            >
              Timestamp
              {sortField === 'timestamp_ns' && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[8%]"
              onClick={() => handleSort('blockVersion')}
            >
              Block Version
              {sortField === 'blockVersion' && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[8%]"
              onClick={() => handleSort('blockSize')}
            >
              Block Size
              {sortField === 'blockSize' && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[15%]"
              onClick={() => handleSort('parentBlockHash')}
            >
              Parent Block Hash
              {sortField === 'parentBlockHash' && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[8%]"
              onClick={() => handleSort('blockOffset')}
            >
              Block Offset
              {sortField === 'blockOffset' && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[15%]"
              onClick={() => handleSort('description')}
            >
              Description
              {sortField === 'description' && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedEntries.map((entry, index) => (
            <tr key={entry.key || index} className="hover:bg-gray-50">
              <td className="px-3 py-2 text-xs font-medium text-gray-900 truncate hover:text-clip hover:overflow-visible hover:whitespace-normal hover:z-10 hover:bg-white" title={entry.key}>
                {entry.key}
              </td>
              <td className="px-3 py-2 text-xs text-gray-500 truncate hover:text-clip hover:overflow-visible hover:whitespace-normal hover:z-10 hover:bg-white" title={entry.label || 'N/A'}>
                {entry.label || 'N/A'}
              </td>
              <td className="px-3 py-2 text-xs text-gray-500">
                <pre className="whitespace-pre-wrap break-words max-h-40 overflow-y-auto text-xs bg-gray-50 p-2 rounded">
                  {formatValue(entry.value)}
                </pre>
              </td>
              <td className="px-3 py-2 text-xs text-gray-500 truncate hover:text-clip hover:overflow-visible hover:whitespace-normal hover:z-10 hover:bg-white" title={formatTimestamp(entry.timestamp_ns)}>
                {formatTimestamp(entry.timestamp_ns)}
              </td>
              <td className="px-3 py-2 text-xs text-gray-500 truncate hover:text-clip hover:overflow-visible hover:whitespace-normal hover:z-10 hover:bg-white" title={String(entry.blockVersion || 'N/A')}>
                {entry.blockVersion || 'N/A'}
              </td>
              <td className="px-3 py-2 text-xs text-gray-500 truncate hover:text-clip hover:overflow-visible hover:whitespace-normal hover:z-10 hover:bg-white" title={String(entry.blockSize || 'N/A')}>
                {entry.blockSize || 'N/A'}
              </td>
              <td className="px-3 py-2 text-xs text-gray-500 truncate hover:text-clip hover:overflow-visible hover:whitespace-normal hover:z-10 hover:bg-white" title={entry.parentBlockHash || 'N/A'}>
                {entry.parentBlockHash || 'N/A'}
              </td>
              <td className="px-3 py-2 text-xs text-gray-500 truncate hover:text-clip hover:overflow-visible hover:whitespace-normal hover:z-10 hover:bg-white" title={String(entry.blockOffset || 'N/A')}>
                {entry.blockOffset || 'N/A'}
              </td>
              <td className="px-3 py-2 text-xs text-gray-500 truncate hover:text-clip hover:overflow-visible hover:whitespace-normal hover:z-10 hover:bg-white" title={entry.description || 'N/A'}>
                {entry.description || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
