import conf from "../conf/conf.js";
import { Client,ID,Databases,Storage,Query  } from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwritDatabaseId,
                conf.appwritCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwritDatabaseId,
                conf.appwritCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwritDatabaseId,
                conf.appwritCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("error is",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwritDatabaseId,
                conf.appwritCollectionId,
                slug
            )
        } catch (error) {
            console.log("error is",error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwritDatabaseId,
                conf.appwritCollectionId,
                queries,
            )
        } catch (error) {
            console.log("error is",error);
            return false;
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            
            const img =  await this.storage.createFile(
                
                conf.appwritBucketId,
                ID.unique(),
                file
            );
            return img;
        } catch (error) {
            console.log("error is",error);
            // return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                conf.appwritBucketId,
                fileId,
            )
        } catch (error) {
            throw error
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwritBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;