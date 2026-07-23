import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FiCheck, FiChevronDown } from 'react-icons/fi';

const Dropdown = ({
  label,
  placeholder = 'Select an option',
  value,
  options = [],
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Label */}

      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Trigger */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3 text-left transition hover:border-amber-400 focus:border-amber-500 focus:outline-none"
      >
        <span className={`${value ? 'text-gray-800' : 'text-gray-400'}`}>
          {value || placeholder}
        </span>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <FiChevronDown size={18} />
        </motion.div>
      </button>

      {/* Menu */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.98,
            }}
            transition={{
              duration: 0.18,
            }}
            className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
          >
            {options.map((option) => {
              const optionValue =
                typeof option === 'object' ? option.value : option;

              const optionLabel =
                typeof option === 'object' ? option.label : option;

              const selected = optionValue === value;

              return (
                <button
                  key={optionValue}
                  type="button"
                  onClick={() => {
                    onChange(optionValue);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left transition

                  ${
                    selected ? 'bg-amber-50 text-amber-700' : 'hover:bg-gray-50'
                  }
                  `}
                >
                  <span>{optionLabel}</span>

                  {selected && <FiCheck size={18} className="text-amber-600" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
