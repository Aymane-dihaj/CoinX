interface SelectButtonProps {
  handleChange: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectType: React.FC<SelectButtonProps> = ({ handleChange }) => {
  return (
    <div>
      <form className="md:max-w-[200px] max-w-[100px]  mx-auto">
        <label htmlFor="days" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Type</label>
        <select
          id="days"
          className="text-xs bg-gray-50 border border-gray-300 text-gray-900 md:text-sm rounded-lg block w-full p-1.5 md:p-2.5 dark:bg-white/[0.2] dark:border-white/[0.1] dark:placeholder-gray-400 dark:text-white"
          onChange={(e) => handleChange(e.target.value)}
        >
          <option style={{ backgroundColor: '#111111' }} value="prices">Price</option>
          <option style={{ backgroundColor: '#111111' }} value="market_caps">Market Cap</option>
          <option style={{ backgroundColor: '#111111' }} value="total_volumes">Total Volume</option>
        </select>
      </form>
    </div>
  );
};

export default SelectType;
