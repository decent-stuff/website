'use client';

import { useState, useEffect } from 'react';
import { LedgerEntry } from '@/lib/db';
import { ledgerService } from '@/lib/ledger-service';
import { LedgerTable } from '@/components/ledger-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeaderSection from '@/components/ui/header';

export default function LedgerPage() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [isPolling, setIsPolling] = useState<boolean>(false);
  const [pollingFrequency, setPollingFrequency] = useState<number>(10000); // 10 seconds

  // Fetch ledger entries on component mount
  useEffect(() => {
    fetchEntries();

    // Clean up on unmount
    return () => {
      ledgerService.stopPolling();
    };
  }, []);

  // Fetch ledger entries
  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      setError(undefined);

      // Initialize the ledger service
      await ledgerService.initialize();

      // Fetch the latest entries
      await ledgerService.fetchAndStoreLatestEntries();

      // Get all entries from the database
      const allEntries = await ledgerService.getAllEntries();
      setEntries(allEntries);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ledger entries');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle polling
  const togglePolling = () => {
    if (isPolling) {
      ledgerService.stopPolling();
      setIsPolling(false);
    } else {
      ledgerService.startPolling(pollingFrequency);
      setIsPolling(true);
    }
  };

  // Handle polling frequency change
  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const frequency = parseInt(e.target.value, 10);
    setPollingFrequency(frequency);

    // If currently polling, restart with new frequency
    if (isPolling) {
      ledgerService.stopPolling();
      ledgerService.startPolling(frequency);
    }
  };

  // Clear all entries from the database
  const clearEntries = async () => {
    try {
      await ledgerService.clearAllEntries();
      setEntries([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear ledger entries');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <HeaderSection
        title="Decent Cloud Ledger"
        subtitle="View and manage ledger data from the Decent Cloud blockchain"
      />

      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          This page displays the ledger data from the Decent Cloud blockchain. The data is stored in a local in-browser database for easy querying.
        </p>

        <div className="flex flex-wrap gap-4 mb-4">
          <Button onClick={fetchEntries} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Refresh Data'}
          </Button>

          <Button
            onClick={togglePolling}
            variant={isPolling ? "destructive" : "default"}
          >
            {isPolling ? 'Stop Auto-Refresh' : 'Start Auto-Refresh'}
          </Button>

          <div className="flex items-center">
            <span className="mr-2 text-sm">Refresh every:</span>
            <select
              value={pollingFrequency}
              onChange={handleFrequencyChange}
              className="border rounded p-1"
            >
              <option value="5000">5 seconds</option>
              <option value="10000">10 seconds</option>
              <option value="30000">30 seconds</option>
              <option value="60000">1 minute</option>
            </select>
          </div>

          <Button onClick={clearEntries} variant="outline">
            Clear Local Data
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <LedgerTable entries={entries} isLoading={isLoading} error={error} />
      </Card>
    </div>
  );
}
