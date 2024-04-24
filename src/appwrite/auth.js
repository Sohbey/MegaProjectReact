/* eslint-disable no-useless-catch */
// Importing necessary modules and configurations
import config from "../config/config"; // Importing the app configuration
import { Client, Account, ID } from "appwrite"; // Importing required modules from appwrite

// Creating a class for authentication service
export class AuthService {
  client = new Client(); // Creating a new Client instance
  account; // Declaring an account variable

  // Constructor to initialize the client and account with appwrite configurations
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl) // Setting appwrite endpoint from config
      .setProject(config.appWriteProjectId); // Setting appwrite project ID from config

    this.account = new Account(this.client); // Creating a new Account instance with the client
  }

  // Method to create a new user account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create( // Creating a new account with provided details
        ID.unique(), // Generating a unique ID for the account
        email, // User's email
        password, // User's password
        name // User's name
      );
      if (userAccount) {
        // If account creation is successful, call login method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error; // Throw error if account creation fails
    }
  }

  // Method to login with provided email and password
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password); // Creating a new session with provided email and password
    } catch (error) {
      throw error; // Throw error if login fails
    }
  }

  // Method to get current user details
  async getCurrentUser() {
    try {
      return await this.account.get(); // Getting details of the current user
    } catch (error) {
      throw error; // Throw error if unable to get current user
    }
    // eslint-disable-next-line no-unreachable
    return null; // Return null if current user is not found
  }

  // Method to logout current user by deleting sessions
  async logout() {
    try {
        await this.account.deleteSessions(); // Deleting all sessions of the current user
    } catch (error) {
        throw error; // Throw error if logout fails
    }
  }
}

// Creating an instance of AuthService
const authService = new AuthService();

export default authService; // Exporting the instance of AuthService
