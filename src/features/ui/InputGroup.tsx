import InputContainer from "./InputContainer";

type PropsType = {
  label: string;
  name: string;
  type?: "string" | "date" | "time";
  required?: boolean;
  placeHolder: string;
  area?: boolean;
};

const inputStyles =
  "focus:outline-none text-lg w-60 px-1 focus:ring-2 focus:ring-green-500";
export default function InputGroup({
  label,
  name,
  type = "string",
  required = true,
  placeHolder,
  area,
}: PropsType) {
  return (
    <InputContainer>
      <label className="text-gray-50" htmlFor={name}>
        {label}
      </label>
      {area && (
        <textarea
          className={inputStyles}
          id={name}
          name={name}
          rows={2}
          required={required}
          placeholder={placeHolder}
        />
      )}
      {!area && (
        <input
          className={inputStyles}
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeHolder}
        />
      )}
    </InputContainer>
  );
}
