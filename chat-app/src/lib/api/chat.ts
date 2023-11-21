export const fetcherChat = async (msg: string): Promise<string> => {
  // for POC, we just echo the message back with a delay between 0 and 2 seconds
  const delay = Math.floor(Math.random() * 2000);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(msg);
    }, delay);
  });
};
