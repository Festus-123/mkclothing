const MenuColumn = ({ title, items }) => {
  return (
    <div>
      <h3 className="font-bold text-sm uppercase tracking-wide mb-5 font-poppins text-gray-500">
        {title}
      </h3>

      <ul className={`space-y-3 ${items.img && "grid grid-cols-2 gap-4"}`}>
        {items.map((item) => (
          <li
            key={item}
            className=" flex items-center gap-2 cursor-pointer  text-sm text-gray-600 hover:text-black transition"
          >
            { item.img && (

                <img src={item.img} alt={item.name} className="w-5 h-5 rounded-lg object-cover mb-2" />
            )}
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuColumn;