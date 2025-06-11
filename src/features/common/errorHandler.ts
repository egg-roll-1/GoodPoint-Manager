import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const errorHandler = (error: Error) => {
  if (isAxiosError(error)) {
    toast.error(`${error.response?.data?.message}`);
    return;
  }
  toast(`오류가 발생했어요!\n${error?.message}`);
};
