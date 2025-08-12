import {Client,Databases,Storage,Query, ID} from "appwrite"
import conf from "../config/conf";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({slug,title,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId    
                }
            )
        }
        catch(err){
            console.log("Appwrite error : Create Post : "+ err);
            throw err;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch (err) {
            console.log("Appwrite error : Update Post : "+ err);
            throw err;
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        }
        catch(err){
            console.log("Appwrite error : Delete Post : " + err);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(err){
            console.log("Appwrite error : Get Document "+err);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        }
        catch(err){
            console.log("Appwrite error : GetPosts : "+ err);
            return false;
        }
    }

    //file related serivce

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(err){
            console.log("Appwrite Serivce : Upload File : "+ err);
            throw err;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId 
            )
            return true;
        }catch(err){
            console.log("Appwrite Serivce : Delete File : "+ err);
            return false;
        }
    }

    getFilePreview(fileId){
        try{
            return this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            );
        }catch(err){
            console.log("Appwrite serivce : GetFilePreview : " + err);
            throw err;
        }
    }
}

const service = new Service();

export default service;