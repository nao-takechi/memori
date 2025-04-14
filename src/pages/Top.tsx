import { useState } from "react";
import { FC } from "react";

const Top: FC = () => {
  const [value, setValue] = useState("");

  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/diaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ diary: value }),
      });
      const data = await res.json();
      console.log("登録成功:", data);
    } catch (e) {
      console.error("登録失敗:", e);
    }
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
