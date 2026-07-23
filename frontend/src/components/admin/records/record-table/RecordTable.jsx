import React from 'react';
import { FiEye, FiTrash } from 'react-icons/fi';
import Placeholder from '../placeholder/Placeholder';
import EmptyState from '../empty-state/EmptyState';

const RecordTable = ({
  loading,
  error,
  records,
  displaySearchResult,
  showDetails,
  setShowDetails,
  setClose,
  setLogIdToDelete,
}) => {
  if (loading) return <Placeholder />;

  if (error)
    return (
        <EmptyState
          title={'No Activity Logs'}
          des={
            "Product activity will appear here whenever a product is created, updated or deleted. Once your store starts receiving activity, you'll be able to monitor every change from this page."
          }
        />
    );

  if (records.length === 0)
    return (
      <EmptyState
        title={'No Activity Logs'}
        des={
          "Product activity will appear here whenever a product is created, updated or deleted. Once your store starts receiving activity, you'll be able to monitor every change from this page."
        }
      />
    );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="px-6 py-4">S/N</th>
              <th className="px-6 py-4">Product ID</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {displaySearchResult.map((record, index) => (
              <tr
                key={record.id}
                className="border-t border-gray-300 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-5 font-medium">
                  {records.length - index}
                </td>

                <td className="px-6 py-5 font-medium">
                  {record.product_id || '--'}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                <td className="px-6 py-5 text-gray-500">
                  {new Date(record.created_at).toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  {showDetails === record.id ? (
                    <div className="rounded-xl bg-gray-100 p-3 w-100 sm:whitespace-pre-wrap">
                      {record.details || '"empty"'}
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDetails(record.id)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <FiEye size={16} />
                      View Details
                    </button>
                  )}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    {showDetails === record.id && (
                      <>
                        <button
                          onClick={() => setShowDetails(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Hide
                        </button>

                        <button
                          onClick={() => {
                            setClose(true);
                            setLogIdToDelete(record.id);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FiTrash size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordTable;
