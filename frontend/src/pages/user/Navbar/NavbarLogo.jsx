import React from 'react';
// import logo from '../assets/logo.png' // optional image


const NavbarLogo = () => {
return (
<div className="flex items-center gap-2">
{/* Image or badge */}
<div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
M&K
</div>
<p className="text-sm font-semibold text-gray-800">M&K</p>
</div>
);
};


export default NavbarLogo;