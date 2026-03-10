import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from 'sonner';
import { FiSearch, FiTrash, FiX } from 'react-icons/fi';
import Confirm from '../../../../components/confirm/Confirm';

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

  const displaySearchResult = searchResults.length > 0 ? searchResults : records;

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
    <div className="flex flex-col gap-6 p-3 md:p-6">
      <div className="w-full flex flex-row items-center justify-between">
        <h1 className="font-medium text-xl md:text-2xl text-amber-900">
          Activity Logs
        </h1>

        <FiSearch
          className={`${searching && 'hidden'}`}
          onClick={() => setSeaching(true)}
        />
      </div>

      {/* Total Logs Counts*/}
      <div className="flex flex-row gap-4 flex-wrap font-light text-gray-700">
        <p>Total Logs: {records.length}</p>
        <p>Total Created Logs: {totalCreatedLogs}</p>
        <p>Total Updated Logs: {totalUpdatedLogs}</p>
        <p>Total Deleted Logs: {totalDeletedLogs}</p>
      </div>

      {searching && (
        <div className="sticky top-18 bg-white z-20 p-2 flex flexrow items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search Logs..."
            onChange={handleSearch}
            className="w-full rounded border p-2"
          />

          <FiX onClick={handleCloseSearch} />
          <span className='absolute top-1/2 text-gray-400 right-15 text-xs'>
            { searchResults.length === 0 ? 'No "item" found' : `found ${searchResults.length} items`}
          </span>
        </div>
      )}

      {loading && <p className="text-gray-500"> Loading records...</p>}

      {error && <p className="text-red-500">Couldn't fetch records: {error}</p>}

      {close && (
        <Confirm
          close={() => setClose(false)}
          onClick={() => handleDeleteLog(logIdToDelete)}
        />
      )}

      {!loading && records.length === 0 && (
        <p className="text-gray-500">No records found.</p>
      )}

      {!loading && records.length > 0 && (
        <div className="w-full overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border-b">S/N</th>
                <th className="p-3 border-b">Product ID</th>
                <th className="p-3 border-b">Action</th>
                <th className="p-3 border-b">Created At</th>
                <th className="p-3 border-b">Details</th>
                <th className="p-3 border-b"></th>
              </tr>
            </thead>

            <tbody>
              {displaySearchResult.map((record, index) => (
                <tr
                  key={record.id || index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{records.length - index}</td>

                  <td className="p-3 font-medium">
                    {record.product_id || '--'}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        record.action === 'created'
                          ? 'bg-green-100 text-green-700'
                          : record.action === 'updated'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {record.action}
                    </span>
                  </td>

                  <td className="p-3 text-gray-500">
                    {new Date(record.created_at).toLocaleString()}
                  </td>
                  <td
                    className="p-3 cursor-pointer lg:w-[30%]"
                    onClick={() => {
                      showDetails === record.id
                        ? setShowDetails(null)
                        : setShowDetails(record.id);
                    }}
                  >
                    {showDetails === record.id ? (
                      <span className="text-sm p-2 bg-gray-100 rounded-lg block whitespace-pre-wrap w-100">
                        {record.details || '"empty"'}
                      </span>
                    ) : (
                      'Open details'
                    )}
                  </td>
                  <td
                    onClick={() => {
                      setClose(true);
                      setLogIdToDelete(record.id);
                    }}
                    className="p-3 text-red-500 cursor-pointer"
                  >
                    {showDetails === record.id && (
                      <FiTrash className="text-red-500" size={18} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Record;
