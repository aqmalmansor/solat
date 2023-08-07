interface SelectComponentProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
  options: React.ReactNode[] | false;
}
const Select = ({
  label,
  onChange,
  value,
  options,
}: SelectComponentProps): JSX.Element => {
  return (
    <div className="mb-3 w-full px-3 md:mb-0">
      <label
        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
        htmlFor="grid-state"
      >
        {label}
      </label>
      <div className="relative">
        <select
          onChange={(e) => onChange(e)}
          value={value}
          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 capitalize leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          id="grid-state"
        >
          <option value="">Please select one of the option</option>
          {options}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
