import React, { useContext, useMemo, useState } from 'react';
import { FiSearch, FiSliders } from 'react-icons/fi';

import Knob from '../../../../components/admin/knob/Knob';
import { SettingsContext } from '../../../../context/context';
import Search from '../../../../components/admin/search/Search';
import { AnimatePresence } from 'motion/react';

const Settings = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const settingsList = [
    {
      key: 'signup',
      title: 'Enable Admin Registration',
      description:
        'Allow visitors to create administrator accounts through the registration page.',
    },
    {
      key: 'notifications',
      title: 'Dashboard Notifications',
      description:
        'Receive notifications for order activity, announcements and important system updates.',
    },
  ];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    if (!query) {
      setSearchResult([]);
      return;
    }

    const filtered = settingsList.filter((item) =>
      item.title.toLowerCase().includes(query)
    );

    setSearchResult(filtered);
  };

  const handleCLoseSearch = () => {
    setSearching(false);
    setSearchResult([]);
  };

  const displayedSettings = useMemo(() => {
    if (!searchQuery.trim()) return settingsList;

    return settingsList.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>

            <p className="mt-2 text-gray-500">
              Configure how your dashboard behaves and manage administrator
              preferences.
            </p>
          </div>
        </div>

        {/* Search */}
        {!searching && (
          <button
            onClick={() => setSearching(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
          >
            <FiSearch size={18} className="text-gray-600" />
          </button>
        )}
      </div>

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

      {/* Settings */}

      <div className="space-y-4">
        {displayedSettings.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
            <FiSliders className="mx-auto text-gray-300" size={36} />

            <h2 className="mt-4 text-lg font-semibold">No settings found</h2>

            <p className="mt-2 text-gray-500">
              Try searching for something else.
            </p>
          </div>
        )}

        {displayedSettings.map((item) => (
          <div
            key={item.key}
            className="rounded-2xl border border-gray-200 bg-white p-6 transition"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      settings[item.key]
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {settings[item.key] ? 'Enabled' : 'Disabled'}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {item.description}
                </p>
              </div>

              <Knob
                enabled={settings[item.key]}
                onclick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    [item.key]: !prev[item.key],
                  }))
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;

// import React, { useState, useContext } from "react";
// import { FiSearch, FiX } from "react-icons/fi";
// import Knob from "../../../../components/admin/knob/Knob";
// import { SettingsContext } from "../../../../context/context";

// const Settings = () => {
//   const { settings, setSettings } = useContext(SettingsContext);

//   const [searching, setSearching] = useState(false);
//   const [searchResult, setSearchResult] = useState([]);

//   console.log("Settings", settings)

//   // Settings list (searchable)
//   const settingsList = [
//     {
//       key: "signup",
//       title: "Enable SignUp for Multiple Users",
//       description:
//         "Allow anyone to visit the signup page and create accounts with admin capabilities.",
//     },
//     {
//       key: "notifications",
//       title: "Enable Dashboard Notifications",
//       description:
//         "Receive notifications regarding admin activities and system updates.",
//     },
//   ];

// const handleSearch = (e) => {
//   const query = e.target.value.toLowerCase();

//   if (!query) {
//     setSearchResult([]);
//     return;
//   }

//   const filtered = settingsList.filter((item) =>
//     item.title.toLowerCase().includes(query)
//   );

//   setSearchResult(filtered);
// };

//   const handleCloseSearch = () => {
//     setSearching(false);
//     setSearchResult([]);
//   };

//   const displayedSettings =
//     searchResult.length > 0 ? searchResult : settingsList;

//   return (
//     <div className="p-4">
//       {/* Header */}
//       <div className="w-full flex items-center justify-between p-2">
//         <h1 className="flex flex-col gap-1">
//           <span className="font-medium text-amber-800 text-lg md:text-xl">
//             Settings
//           </span>
//           <span className="font-light text-sm">
//             Manage your preferences and account details
//           </span>
//         </h1>

//         {/* Search button */}
//         <button
//           onClick={() => setSearching(true)}
//           className={`text-gray-700 text-lg ${searching && "hidden"}`}
//         >
//           <FiSearch />
//         </button>
//       </div>

//       {/* Search Input */}
//       {searching && (
//         <div className="sticky top-15 flex items-center gap-2 p-2">
//           <input
//             type="text"
//             placeholder="Search settings..."
//             onChange={handleSearch}
//             className="w-full border rounded-lg p-2 text-sm"
//           />

//           <button
//             onClick={handleCloseSearch}
//             className="text-gray-600 text-lg"
//           >
//             <FiX />
//           </button>
//         </div>
//       )}

//       {/* Settings Content */}
//       <div className="w-full flex flex-col gap-3 p-2">
//         {displayedSettings.map((item) => (
//           <div
//             key={item.key}
//             className="rounded-xl bg-gray-100 p-4 flex items-center justify-between"
//           >
//             <p className="flex flex-col gap-2">
//               <span className="font-medium">{item.title}</span>
//               <span className="font-light text-xs md:text-sm max-w-[80%]">
//                 {item.description}
//               </span>
//             </p>

//             <Knob
//               onclick={() =>
//                 setSettings((prev) => ({
//                   ...prev,
//                   [item.key]: !prev[item.key],
//                 }))
//               }
//               enabled={settings[item.key]}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Settings;

// re write settings to appear more professional
// and more okay
