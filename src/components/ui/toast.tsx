import toast, { Toaster } from 'react-hot-toast';

export const notify = (msg: string) => toast.error(msg);