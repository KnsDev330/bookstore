import { FC } from "react";

const HorizontalLine: FC<{ className?: string }> = ({ className }) => <div className={`w-auto h-[1px] bg-border ${className || ''}`}></div>

export default HorizontalLine;