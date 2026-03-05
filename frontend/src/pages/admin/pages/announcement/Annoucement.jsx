import React from 'react';

const Annoucement = () => {
//   const [announcing, setAnnouncing] = useState(false);

  return (
    <div className="p-2 flex flex-col gap-5">
      <h1 className="text-lg md:text-2xl text-amber-900 p-2">Annoucements</h1>
      <div className="w-full">
        <h1 className='font-ligth p-2'>Add Annoucements</h1>
        <div className="rounded-xl p-4 bg-black/3 flex flex-col gap-3 md:gap-0 md:flex-row items-center justify-between">
            <div className="w-full flex items-center gap-4 ">
              <label htmlFor="">Priority ?</label>
              <select
                name=""
                id=""
                className="border border-gray-300 rounded-xl p-2"
              >
                <option>Select Options</option>
                <option value="important">Important</option>
                <option value="very-Important">Vey Important</option>
              </select>
            </div>
              <div className="w-full flex flex-row items-center gap-4">
              <label htmlFor="">Durration ?</label>
              <input
                type="number"
                placeholder="7 days"
                className="rounded-xl p-2 border border-gray-300"
                />
            </div>
            <div className='w-full flex flex-row items-center gap-4'>
                <label htmlFor="">Data</label>
                <input 
                    type="date"
                    placeholder='12-12-120' 
                    className='border border-gray-300 rounded-xl p-2'/>
            </div>
          <div className="w-full ">
            <input
              type="text"
              placeholder="Make annoucemnets"
              required
              className="border rounded-l-xl p-2 text-sm border-gray-300 outline-none"
            />
            <button className="rounded-r-xl p-2 text-sm bg-amber-500 border border-gray-200 cusor-pointer">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Annoucement;
