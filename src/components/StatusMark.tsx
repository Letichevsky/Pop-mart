import { cn } from "@/utils/cn";

interface StatusMarkProps {
  status: "hot" | "new";
  isAbsolute?: boolean;
}

const StatusMark = ({ status, isAbsolute = false }: StatusMarkProps) => {
  return (
    <div
      className={cn(
        " text-[#fff] flex items-center justify-center text-[16px] font-[600] uppercase w-[70px] h-[30px]",
        status === "hot" && "bg-[#d20001]",
        status === "new" && "bg-[#ffb300]",
        isAbsolute && "absolute top-[8px] left-[8px] z-[10]"
      )}
    >
      {status}
    </div>
  );
};

export default StatusMark;
