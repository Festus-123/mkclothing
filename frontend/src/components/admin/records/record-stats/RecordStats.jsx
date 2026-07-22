import React from 'react';
import {
  FiDatabase,
  FiPlusCircle,
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi';

const RecordStats = ({
  totalLogs,
  totalCreatedLogs,
  totalUpdatedLogs,
  totalDeletedLogs,
}) => {
  const stats = [
    {
      title: 'Total Logs',
      value: totalLogs,
      icon: FiDatabase,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-700',
    },
    {
      title: 'Created',
      value: totalCreatedLogs,
      icon: FiPlusCircle,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Updated',
      value: totalUpdatedLogs,
      icon: FiEdit2,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Deleted',
      value: totalDeletedLogs,
      icon: FiTrash2,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:border-orange-300 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}
              >
                <Icon
                  className={stat.iconColor}
                  size={22}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default RecordStats;