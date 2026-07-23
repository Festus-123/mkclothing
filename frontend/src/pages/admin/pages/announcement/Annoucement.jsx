import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import Confirm from '../../../../components/confirm/Confirm';
import { supabase } from '../../../../supabse/supabaseClient';
import AnnouncementHeader from '../../../../components/admin/announcements/announcement-header/AnnouncementHeader';
import Search from '../../../../components/admin/search/Search';
import { AnimatePresence } from 'motion/react';
import Placeholder from '../../../../components/admin/announcements/placeholder/Placeholder';
import EmptyState from '../../../../components/admin/announcements/empty-state/EmptyState';
import AnnouncementDisplay from '../../../../components/admin/announcements/announcement-display/AnnouncementDisplay';

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

  const checkExpiredAnnouncements = async () => {
    const now = new Date();

    for (const item of announcement) {
      if (new Date(item.expires_at) <= now) {
        await handleDelete(item);
      }
    }
  };

  useEffect(() => {
    const move = () => fetchAnnouncement();

    move();
  }, []);

  useEffect(() => {
    if (!announcement.length) return;

    const move = () => checkExpiredAnnouncements();

    move();
  }, [announcement]);

  useEffect(() => {
    if (location.state?.refresh) {
      const move = () => fetchAnnouncement();

      move();
    }
  }, [location.state]);

  const displaySearchResult =
    searchResult.length > 0 ? searchResult : announcement;

  return (
    <div className="px-2 md:px-0">
      <AnnouncementHeader
        searching={searching}
        setSearching={setSearching}
        location={location}
      />

      {/* confirm delete */}
      {close && selectedAnnouncement && (
        <Confirm
          close={() => setClose(false)}
          onClick={() => handleDelete(selectedAnnouncement)}
        />
      )}

      {/* Search Area */}
      <AnimatePresence mode="wait">
        {searching && (
          <Search
            searching={searching}
            searchResults={searchResult}
            handleSearch={handleSearch}
            handleCloseSearch={handleCLoseSearch}
          />
        )}
      </AnimatePresence>

      {/* Display Announcement */}
      <div>
        {loading && <Placeholder />}

        {!loading && announcement?.length === 0 && <EmptyState />}

        {!loading && announcement?.length > 0 && (
          <AnnouncementDisplay
            loading={loading}
            announcement={announcement}
            displaySearchResult={displaySearchResult}
            location={location}
            setClose={setClose}
            setSelectedAnnouncement={setSelectedAnnouncement}
          />
        )}
      </div>
    </div>
  );
};

export default Announcement;
