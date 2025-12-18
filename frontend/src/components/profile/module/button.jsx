import { BeatLoader } from "react-spinners";

const Button = ({ FA, disabled, title, isLoading = false, style }) => {
  // console.log(disabled, isLoading);

  return (
    <button
      disabled={disabled || isLoading}
      onClick={FA}
      className={` ${
        !isLoading && !disabled
          ? `bg-blue-500 text-white`
          : `cursor-not-allowed bg-gray-200 text-gray-600`
      } block h-12 w-full rounded-[14px] ${style}`}
    >
      {isLoading ? (
        <BeatLoader color="#3b82f6" size={15} className="mt-2" />
      ) : (
        <p className="fontbol"> {title} </p>
      )}
    </button>
  );
};

export default Button;
