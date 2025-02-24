const Tooltip: React.FC<{ message: string }> = ({ message }) => (
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-sm rounded py-1 px-2 shadow-md">
    {message}
  </div>
);

export default Tooltip;
