import { FC } from "react";

const VerticalLine: FC<{ className?: string }> = ({ className }) => <div className={`w-[1px] h-full bg-border ${className || ''}`}></div>

export default VerticalLine;