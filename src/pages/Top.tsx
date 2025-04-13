import { useState } from "react";
import { FC } from "react";

const Top: FC = () => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    console.log(value);
  };
  return (
    <div className="flex gap-x-4">
      <input
        className="border"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick}>OK</button>
    </div>
  );
};

export default Top;
