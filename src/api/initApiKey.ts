import { saveApiKeySecret } from './apiClient';

export const initApiKey = async () => {
  try {
    await saveApiKeySecret();
  } catch (e) {
    console.log('Init API Key failed:', e);
  }
};
