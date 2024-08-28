interface SelectDaysProps {
  handleChange: React.Dispatch<React.SetStateAction<number>>;
}

export const SelectDays: React.FC<SelectDaysProps> = ({ handleChange}) => {
  return (
    <div>
      <form className="max-w-sm mx-auto ">
        <label htmlFor="days" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Days</label>
        <select
          id="days"
          className="drop-menu bg-gray-50 border border-gray-300 text-gray-900 text-sm
           rounded-lg block w-full p-2.5 dark:bg-white/[0.2]
           dark:border-white/[0.1] dark:placeholder-gray-400 dark:text-white"
          onChange={(e) => handleChange(Number(e.target.value))}
        >
          <option style={{ backgroundColor: '#1a1a1a' }} value="7">7 Days</option>
          <option style={{ backgroundColor: '#1a1a1a' }} value="30">30 Days</option>
          <option style={{ backgroundColor: '#1a1a1a' }} value="60">60 Days</option>
          <option style={{ backgroundColor: '#1a1a1a' }} value="365">365 Days</option>
        </select>
      </form>
    </div>
  );
};

export default SelectDays;
