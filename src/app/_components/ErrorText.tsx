import { XCircle } from "lucide-react";

const ErrorText = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="flex gap-1 items-center">
      {" "}
      <XCircle className="text-red-400 w-5 h-5" />
      <p className="text-red-400">{message}</p>
    </div>
  );
};

export default ErrorText;
