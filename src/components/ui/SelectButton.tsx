

export const SelectDays = ({ handleChange} : {handleChange: any}) => {
  return (
    <div className="md:max-w-[200px] max-w-[100px]  mx-auto">
      <form className="">
        <label htmlFor="days" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Days</label>
        <select
          id="days"
          className="text-xs bg-gray-50 border border-gray-300 text-gray-900 md:text-sm rounded-lg block w-full p-1.5 md:p-2.5 dark:bg-white/[0.2] dark:border-white/[0.1] dark:placeholder-gray-400 dark:text-white"
          onChange={(e) => handleChange(Number(e.target.value))}
        >
          <option style={{ backgroundColor: '#111111' }} value="7">7 Days</option>
          <option style={{ backgroundColor: '#111111' }} value="30">30 Days</option>
          <option style={{ backgroundColor: '#111111' }} value="60">2 Months</option>
          <option style={{ backgroundColor: '#111111' }} value="365">1 Year</option>
        </select>
      </form>
    </div>
  );
};

export default SelectDays;
