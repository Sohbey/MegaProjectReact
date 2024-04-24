/* eslint-disable no-useless-catch */ // Disabling eslint rule for redundant try-catch blocks

// Importing necessary modules and configurations
import config from "../config/config"; // Importing the app configuration
import { Client, ID, Databases, Storage, Query } from "appwrite"; // Importing required modules from appwrite

// Creating a service class for handling database and storage operations
export class Service {
    client = new Client(); // Creating a new Client instance
    databases; // Declaring a databases variable
    bucket; // Declaring a bucket variable
    
    // Constructor to initialize the client, databases, and bucket with appwrite configurations
    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl) // Setting appwrite endpoint from config
            .setProject(config.appWriteProjectId); // Setting appwrite project ID from config
        this.databases = new Databases(this.client); // Creating a new Databases instance with the client
        this.bucket = new Storage(this.client); // Creating a new Storage instance with the client
    }

    // Method to create a new post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument( // Creating a new document in the database
                config.appWriteDatabaseId, // Database ID from config
                config.appWriteCollectionId, // Collection ID from config
                slug, // Slug for the post
                {
                    title, // Post title
                    content, // Post content
                    featuredImage, // Featured image URL
                    status, // Post status
                    userId, // User ID associated with the post
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error); // Logging error if creation fails
        }
    }

    // Method to update an existing post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument( // Updating a document in the database
                config.appWriteDatabaseId, // Database ID from config
                config.appWriteCollectionId, // Collection ID from config
                slug, // Slug of the post to update
                {
                    title, // Updated post title
                    content, // Updated post content
                    featuredImage, // Updated featured image URL
                    status, // Updated post status
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error); // Logging error if update fails
        }
    }

    // Method to delete a post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument( // Deleting a document from the database
                config.appWriteDatabaseId, // Database ID from config
                config.appWriteCollectionId, // Collection ID from config
                slug // Slug of the post to delete
            );
            return true; // Returning true if deletion is successful
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error); // Logging error if deletion fails
            return false; // Returning false if deletion fails
        }
    }

    // Method to get a post by its slug
    async getPost(slug) {
        try {
            return await this.databases.getDocument( // Retrieving a document from the database
                config.appWriteDatabaseId, // Database ID from config
                config.appWriteCollectionId, // Collection ID from config
                slug // Slug of the post to retrieve
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error); // Logging error if retrieval fails
            return false; // Returning false if retrieval fails
        }
    }

    // Method to get multiple posts with optional queries
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments( // Listing documents from the database
                config.appWriteDatabaseId, // Database ID from config
                config.appWriteCollectionId, // Collection ID from config
                queries // Optional queries to filter posts
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error); // Logging error if retrieval fails
            return false; // Returning false if retrieval fails
        }
    }

    // File upload service

    // Method to upload a file to storage
    async uploadFile(file) {
        try {
            return await this.bucket.createFile( // Uploading a file to storage
                config.appWriteBucketId, // Bucket ID from config
                ID.unique(), // Generating a unique ID for the file
                file // File to upload
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error); // Logging error if upload fails
            return false; // Returning false if upload fails
        }
    }

    // Method to delete a file from storage
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile( // Deleting a file from storage
                config.appWriteBucketId, // Bucket ID from config
                fileId // ID of the file to delete
            );
            return true; // Returning true if deletion is successful
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error); // Logging error if deletion fails
            return false; // Returning false if deletion fails
        }
    }

    // Method to get a preview of a file
    getFilePreview(fileId) {
        return this.bucket.getFilePreview( // Retrieving a preview of a file from storage
            config.appWriteBucketId, // Bucket ID from config
            fileId // ID of the file
        );
    }
}

// Creating an instance of Service
const service = new Service();
export default service; // Exporting the instance of Service
