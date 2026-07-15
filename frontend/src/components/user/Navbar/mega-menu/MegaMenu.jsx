import MenuColumn from "../menu-column/MenuColumn";

const MegaMenu = ({ menu }) => {
  if (!menu) return null;

  return (
    <div
      className="absolute top-full w-max left-5 bg-white shadow-2xs border-t border-gray-300 z-50 "
    >
      <div className="max-w-7xl mx-auto px-10 py-10">
        <div className="grid grid-cols-4 gap-15">
          {menu.columns.map((column) => (
            <MenuColumn
              key={column.title}
              title={column.title}
              items={column.items}
            />
          ))}

          <div>
            <h2 className="font-bold text-sm uppercase tracking-wide mb-5 font-poppins text-gray-500">{menu.stacks.title}</h2>
            <ul className="space-y-3 grid grid-cols-2 gap-4">
              {menu.stacks.items.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-col items-center gap-2 cursor-pointer rounded-xl text-sm text-gray-600 hover:text-black transition"
                >
                  {item.img && (
                    <img src={item.img} alt={item.name} className="w-20 h-20 rounded-sm object-cover" />
                  )}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <img
              src={menu.banners}
              alt=""
              className="rounded-sm h-72 w-full object-cover "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
