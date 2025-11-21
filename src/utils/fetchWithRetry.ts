export const fetchWithRetry = async (requestFn: () => Promise<any>, retries = 3) => {
  let attempt = 0;

  while (attempt < retries) {
    try {
      return await requestFn();
    } catch (error) {
      attempt++;

      if (attempt >= retries) {
        throw error;
      }

      await new Promise((res: any ) => setTimeout(res, 700 * attempt));
    }
  }
};
