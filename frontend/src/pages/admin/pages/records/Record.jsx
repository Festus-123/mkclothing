import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabse/supabaseClient";
import { toast } from "sonner";
import Confirm from "../../../../components/confirm/Confirm";

const Record = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [close, setClose] = useState(false);
  const [logIdToDelete, setLogIdToDelete] = useState(null);

  const fetchRecords = async () => {
    setLoading(true);
    const toastId = toast.loading('Fetching records...');

    const { data, error } = await supabase
      .from("products_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching records:", error.message);
      toast.error('Failed to fetch records', { id: toastId });
      setError(error.message);
      setLoading(false);
      return;
    }

    toast.success('Records updated successfully', { id: toastId });
    setRecords(data || []);
    setLoading(false);
  };

  const handleDeleteLog = async (id) => {
    const toastId = toast.loading('Deleting log...');

    const { error } = await supabase
      .from("products_logs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting log:", error.message);
      toast.error('Failed to delete log', { id: toastId });
      return;
    }

    toast.success('Log deleted successfully', { id: toastId });
    setRecords((prev) => prev.filter((record) => record.id !== id));
  }

  useEffect(() => {
    fetchRecords();
  }, [records.length]);

  const formatJSON = (value) => {
    if (!value) return "--";
    try {
      return JSON.stringify(value);
    } catch {
      return value;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-3 md:p-6">
      <h1 className="font-medium text-xl md:text-2xl text-amber-900">
        Activity Logs
      </h1>

      {loading && <p className="text-gray-500"> Loading records...</p>}

      {error && (
        <p className="text-red-500">
          Couldn't fetch records: {error}
        </p>
      )}

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
                <th className="p-3 border-b">Previous</th>
                <th className="p-3 border-b">Current</th>
                <th className="p-3 border-b">Action</th>
                <th className="p-3 border-b">Created At</th>
                <th className="p-3 border-b">Remove log</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record, index) => (
                <tr
                  key={record.id || index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium">
                    {record.product_id || "--"}
                  </td>

                  <td className="p-3 text-gray-600 wrap-break-words max-w-xs">
                    {formatJSON(record.previous)}
                  </td>

                  <td className="p-3 text-gray-600 wrap-break-words max-w-xs">
                    {formatJSON(record.current)}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        record.action === "created"
                          ? "bg-green-100 text-green-700"
                          : record.action === "updated"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {record.action}
                    </span>
                  </td>

                  <td className="p-3 text-gray-500">
                    {new Date(record.created_at).toLocaleString()}
                  </td>
                  <td 
                    onClick={() => {
                      setClose(true);
                      setLogIdToDelete(record.id);
                    }}
                    className="p-3 text-red-500 cursor-pointer">
                    <span>delete</span>
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