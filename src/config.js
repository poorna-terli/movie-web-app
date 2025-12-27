// Environment Configuration
// All environment variables should be accessed through this config file
// Environment variables are loaded from .env.local file
// Vite automatically loads .env.local files (higher priority than .env)

export const config = {
  // TMDB API Configuration
  tmdb: {
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
    apiBaseUrl: import.meta.env.VITE_TMDB_API_BASE_URL || "https://api.themoviedb.org/3",
    imageBaseUrl: "https://image.tmdb.org", // Public CDN, no need for env variable
  },

  // Appwrite Configuration
  appwrite: {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  },

  // YouTube Configuration
  youtube: {
    embedBaseUrl: "https://www.youtube.com/embed", // Public URL, no need for env variable
  },
};

// Validation function to check if required environment variables are set
export const validateEnv = () => {
  const required = [
    { key: 'VITE_TMDB_API_KEY', value: config.tmdb.apiKey },
    { key: 'VITE_APPWRITE_PROJECT_ID', value: config.appwrite.projectId },
    { key: 'VITE_APPWRITE_DATABASE_ID', value: config.appwrite.databaseId },
    { key: 'VITE_APPWRITE_COLLECTION_ID', value: config.appwrite.collectionId },
  ];

  const missing = required.filter(({ value }) => !value);

  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing.map(({ key }) => key));
    if (import.meta.env.DEV) {
      console.warn('Please check your .env.local file and ensure all required variables are set.');
    }
  }

  return missing.length === 0;
};

