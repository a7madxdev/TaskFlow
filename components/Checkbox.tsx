"use client";

import { Circle, CircleCheckBig } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  const checkboxEle = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (checkboxEle.current) {
      setChecked(checkboxEle.current.checked);
    }
  }, []);
  return (
    <div className="min-h-full flex items-center">
      <label className="" htmlFor="check">
        <span>
          {checked ? <CircleCheckBig size={16} /> : <Circle size={16} />}
        </span>
      </label>
      <input
        id="check"
        type="checkbox"
        className="appearance-none"
        ref={checkboxEle}
        onChange={(e) => setChecked(e.target.checked)}
      />
    </div>
  );
};

export default Checkbox;
