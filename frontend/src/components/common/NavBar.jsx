import React, { useState } from 'react';
import styles from './NavBar.module.css';

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <h1>M&K Clothing</h1>
        </div>

        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          <li>
            <a href="/" className={styles.link}>
              Home
            </a>
          </li>
          <li>
            <a href="/collections" className={styles.link}>
              Collections
            </a>
          </li>
          <li>
            <a href="/admin/dashboard" className={styles.link}>
              Dashboard
            </a>
          </li>
          <li>
            <a href="/contact" className={styles.link}>
              Contact
            </a>
          </li>
        </ul>

        {/* User Profile Dropdown */}
        <div className={styles.userProfile}>
          <button
            className={styles.profileButton}
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className={styles.avatar}
            />
            <span className={styles.username}>User</span>
          </button>

          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <a href="/profile" className={styles.dropdownItem}>
                Profile
              </a>
              <a href="/settings" className={styles.dropdownItem}>
                Settings
              </a>
              <hr className={styles.divider} />
              <a href="/logout" className={styles.dropdownItem + ' ' + styles.logout}>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
