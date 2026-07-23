import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from 'sonner';
import Confirm from '../../../../components/confirm/Confirm';
import { AnimatePresence } from 'motion/react';
import RecordHeader from '../../../../components/admin/records/record-header/RecordHeader';
import RecordStats from '../../../../components/admin/records/record-stats/RecordStats';
import RecordTable from '../../../../components/admin/records/record-table/RecordTable';
import Search from '../../../../components/admin/search/Search';

const Record = () => {
  const [records, setRecords] = useState([]);
  const [searching, setSeaching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [close, setClose] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [logIdToDelete, setLogIdToDelete] = useState(null);
  const [totalDeletedLogs, setTotalDeletedLogs] = useState(0);
  const [totalUpdatedLogs, setTotalUpdatedLogs] = useState(0);
  const [totalCreatedLogs, setTotalCreatedLogs] = useState(0);

  const fetchRecords = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('products_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching records:', error.message);
      setError(error.message);
      setLoading(false);
      return;
    }

    setRecords(data || []);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.value.toLowerCase();

    if (!query) {
      setSearchResults([]);
      return;
    }

    const filteredrecords = records.filter((record) => {
      const productId = record.product_id?.toString().toLowerCase() || '';
      const details = record.details?.toLowerCase() || '';
      return productId.includes(query) || details.includes(query);
    });

    setSearchResults(filteredrecords);
  };

  const handleCloseSearch = () => {
    setSeaching(false);
    setSearchResults([]);
  };

  const displaySearchResult =
    searchResults.length > 0 ? searchResults : records;

  const handleLogsTotal = (logs) => {
    let createdCount = 0;
    let updatedCount = 0;
    let deletedCount = 0;

    logs.forEach((log) => {
      if (log.action === 'created') createdCount++;
      else if (log.action === 'updated') updatedCount++;
      else if (log.action === 'deleted') deletedCount++;
    });

    setTotalCreatedLogs(createdCount);
    setTotalUpdatedLogs(updatedCount);
    setTotalDeletedLogs(deletedCount);
  };

  const handleDeleteLog = async (id) => {
    const toastId = toast.loading('Deleting log...');

    const { error } = await supabase
      .from('products_logs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting log:', error.message);
      toast.error('Failed to delete log', { id: toastId });
      return;
    }

    setClose(false);
    toast.success('Log deleted successfully', { id: toastId });
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  useEffect(() => {
    fetchRecords();
    handleLogsTotal(records);
  }, [records.length]);

  return (
    <div className="flex flex-col gap-6 px-2 md:px-0">
      {/* Header */}
      <RecordHeader searching={searching} setSeaching={setSeaching} />

      <AnimatePresence mode="wait">
        {searching && (
          <Search
            searching={searching}
            searchResults={searchResults}
            handleSearch={handleSearch}
            handleCloseSearch={handleCloseSearch}
          />
        )}
      </AnimatePresence>

      {/* Total Logs Counts / Stats*/}
      <RecordStats
        totalLogs={records.length}
        totalCreatedLogs={totalCreatedLogs}
        totalUpdatedLogs={totalUpdatedLogs}
        totalDeletedLogs={totalDeletedLogs}
      />

      {close && (
        <Confirm
          close={() => setClose(false)}
          onClick={() => handleDeleteLog(logIdToDelete)}
        />
      )}

      {/* Record Table */}
      <RecordTable
        loading={loading}
        error={error}
        records={records}
        displaySearchResult={displaySearchResult}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        setClose={setClose}
        setLogIdToDelete={setLogIdToDelete}
      />
    </div>
  );
};

export default Record;
