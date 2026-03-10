import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiX, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'sonner';
import Confirm from '../../../../components/confirm/Confirm';
import { supabase } from '../../../../supabse/supabaseClient';

const Announcement = () => {
  const location = useLocation();

  const [announcement, setAnnouncement] = useState([]);
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const fetchAnnouncement = async () => {
    setLoading(true);

    try {
      const { error, data } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setLoading(false);
        return;
      }

      setAnnouncement(data);
    } catch (error) {
      console.log('Error fetching Announcements', error.message);
    }

    setLoading(false);
  };

  const handleDelete = async (announcement) => {
    const toastId = toast.loading('Deleting Announcement...');

    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', announcement.id);

      if (error) {
        toast.error('Failed to delete Announcement', { id: toastId });
        return;
      }

      const { error: deletedErrorLog } = await supabase
        .from('products_logs')
        .insert({
          action: 'deleted',
          product_id: announcement.id,
          details: `deleted ${announcement.title} described ${announcement.description}, expiry date at ${announcement.expiry_date}`,
        });

      if (deletedErrorLog) {
        console.error('error message in display', deletedErrorLog.message);
      }

      setClose(false);
      fetchAnnouncement();
      toast.success('announcement deleted successfully', { id: toastId });
    } catch (err) {
      console.error('error deleting announcement', err.message);
      toast.error('failed to delete announcement', { id: toastId });
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    if (!query) {
      setSearchResult([]);
      return;
    }

    const filtered = announcement.filter((item) => {
      const title = item?.title?.toLowerCase() || '';
      const desc = item?.description?.toLowerCase() || '';

      return title.includes(query) || desc.includes(query);
    });

    setSearchResult(filtered);
  };

  const handleCLoseSearch = () => {
    setSearching(false);
    setSearchResult([]);
  };

  // const handleRowClick = (item) => {
  //   if (selectedAnnouncement?.id === item.id) {
  //     setSelectedAnnouncement(null);
  //   } else {
  //     setSelectedAnnouncement(item);
  //   }
  // };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchAnnouncement();
    }
  }, [location.state]);

  const displaySearchResult =
    searchResult.length > 0 ? searchResult : announcement;

  return (
    <div className="p-6">
      <div className="flex flex-row items-center justify-between">
        <h1 className="flex flex-col gap-2">
          <span className="font-medium text-lg md:text-xl text-amber-800">
            Announcement
          </span>
          <span className="font-light text-xs md:text-sm">
            Advertisements or warning made to inform users
          </span>
        </h1>

        <div className="flex flex-row items-center bg-gray-100 p-2 gap-2">
          <div className="bg-green-300 p-2 cursor-pointer">
            <Link
              to={`/dashboard/add-announcement`}
              state={{ backgroundLocation: location }}
            >
              <FiPlus />
            </Link>
          </div>

          <button
            disabled={searching}
            onClick={() => setSearching(true)}
            className="bg-gray-300 p-2 cursor-pointer"
          >
            <FiSearch />
          </button>
        </div>
      </div>

      {/* confirm delete */}
      {close && selectedAnnouncement && (
        <Confirm
          close={() => setClose(false)}
          onClick={() => handleDelete(selectedAnnouncement)}
        />
      )}

      {/* Search Area */}
      {searching && (
        <div className=" sticky top-18 bg-white z-20 p-2 flex flex-row items-center justify-between gap-4 mt-2">
          <input
            placeholder="search Announcement..."
            type="text"
            onChange={handleSearch}
            className="rounded w-full p-2 border "
          />
          <FiX className="cursor-pointer" onClick={handleCLoseSearch} />
          <span className='absolute top-1/2 text-gray-400 right-15 text-xs'>
            { searchResult.length === 0 ? 'No "item" found' : `found ${searchResult.length} items`}
          </span>
        </div>
      )}

      {/* Display Announcement */}
      <div>
        {loading && (
          <p className="font-light text-gray-500 mt-5">
            Loading announcement...
          </p>
        )}

        {!loading && announcement?.length === 0 && (
          <p className="font-light text-gray-500 mt-5">
            No announcement found!
          </p>
        )}

        {!loading && announcement?.length > 0 && (
          displaySearchResult.map((item, index) => (
            <div 
              key={index}
              className={`flex flex-row items-end justify-between mt-5 p-2 rounded-xl ${
                item.level === "less" ? "border border-green-400"
                : item.level === "moderate" ? "border border-blue-400"
                : "border border-red"
              }`}>
                <p className='flex flex-col gap-1'>
                  <span className='text-gray-600 font-medium text-xs md:text-sm'>{item.title}</span>
                  <span className='font-light text-xs max-w-[70%] md:max-w-[90%'>{item.description}</span>
                </p>
                  <div className='flex flex-row items-center gap-4 cursor-pointer'>
                  <p className='text-gray-500 text-xs md:text-sm'>{item.expiry_date} days..</p>
                  <Link 
                    to={`/dashboard/edit-announcement/${item.id}`}
                    state={{ backgroundLocation: location}}>
                    <FiEdit2 size={14}/>
                  </Link>
                  <FiTrash2 
                    className='text-red-500 text-sm'
                    onClick={() => {
                    setClose(true)
                    setSelectedAnnouncement(item)
                  }}/>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcement;