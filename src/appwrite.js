import { Databases, Client, Query, ID } from "appwrite";
import { config } from "./config";

const DATABASE_ID = config.appwrite.databaseId;
const METRICS = config.appwrite.collectionId;
const PROJECT_ID = config.appwrite.projectId;

const client = new Client()
  .setEndpoint(config.appwrite.endpoint)
  .setProject(PROJECT_ID);


const database =  new Databases(client);
export const updateSearchcount = async (searchTerm, movie) => {
  try{
    const response=await database.listDocuments(
        DATABASE_ID,
        METRICS,
        [Query.equal("searchTerm",searchTerm)]
    );
    if(response.documents.length>0){
      const doc=response.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        METRICS,    
        doc.$id,
        { count: doc.count + 1 }
      );
    }else{
      await database.createDocument(
        DATABASE_ID,
        METRICS,
        ID.unique(),
        {
          searchTerm: searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
      );
    }
  }catch(error){
    console.error(error);
  }
};
export const getTrendingSearches=async()=>{
  try{
    const response=await database.listDocuments(
      DATABASE_ID,
      METRICS,
      [Query.orderDesc("count"),Query.limit(10)]
    );
    return response.documents;  
  } catch(error){
    console.error(error);
    return[];
  } }
