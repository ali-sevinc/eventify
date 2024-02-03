import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  onClick?: () => void;
  type: "button" | "submit";
  model: "btn" | "txt";
};

const btnStyles = {
  common: "focus:outline-none font-semibold duration-200 ",
  btn: "bg-gray-50 px-4 py-2 hover:bg-gray-300 text-gray-800 focus:ring-1 focus:ring-green-300 ",
  txt: "text-gray-50 hover:scale-105 ",
};

export default function Button({ children, type, model, onClick }: PropsType) {
  return (
    <button
      onClick={onClick ? onClick : () => {}}
      type={type}
      className={`${btnStyles.common} ${btnStyles[model]}`}
    >
      {children}
    </button>
  );
}
