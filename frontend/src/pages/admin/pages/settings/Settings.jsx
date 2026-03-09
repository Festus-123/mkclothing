import React, { useState, useContext } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Knob from "../../../../components/admin/knob/Knob";
import { SettingsContext } from "../../../../context/context";

const Settings = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  console.log("Settings", settings)

  // Settings list (searchable)
  const settingsList = [
    {
      key: "signup",
      title: "Enable SignUp for Multiple Users",
      description:
        "Allow anyone to visit the signup page and create accounts with admin capabilities.",
    },
    {
      key: "notifications",
      title: "Enable Dashboard Notifications",
      description:
        "Receive notifications regarding admin activities and system updates.",
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

  const handleCloseSearch = () => {
    setSearching(false);
    setSearchResult([]);
  };

  const displayedSettings =
    searchResult.length > 0 ? searchResult : settingsList;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="w-full flex items-center justify-between p-2">
        <h1 className="flex flex-col gap-1">
          <span className="font-medium text-amber-800 text-lg md:text-xl">
            Settings
          </span>
          <span className="font-light text-sm">
            Manage your preferences and account details
          </span>
        </h1>

        {/* Search button */}
        <button
          onClick={() => setSearching(true)}
          className={`text-gray-700 text-lg ${searching && "hidden"}`}
        >
          <FiSearch />
        </button>
      </div>

      {/* Search Input */}
      {searching && (
        <div className="sticky top-15 flex items-center gap-2 p-2">
          <input
            type="text"
            placeholder="Search settings..."
            onChange={handleSearch}
            className="w-full border rounded-lg p-2 text-sm"
          />

          <button
            onClick={handleCloseSearch}
            className="text-gray-600 text-lg"
          >
            <FiX />
          </button>
        </div>
      )}

      {/* Settings Content */}
      <div className="w-full flex flex-col gap-3 p-2">
        {displayedSettings.map((item) => (
          <div
            key={item.key}
            className="rounded-xl bg-gray-100 p-4 flex items-center justify-between"
          >
            <p className="flex flex-col gap-2">
              <span className="font-medium">{item.title}</span>
              <span className="font-light text-xs md:text-sm max-w-[80%]">
                {item.description}
              </span>
            </p>

            <Knob
              onclick={() =>
                setSettings((prev) => ({
                  ...prev,
                  [item.key]: !prev[item.key],
                }))
              }
              enabled={settings[item.key]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
