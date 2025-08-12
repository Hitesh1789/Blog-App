import {Client,Account,ID} from "appwrite";
import conf from "../config/conf";

export class authService{
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account  = new Account(this.client);
    }
    
    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //calling authmatically login after creating account
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
        }
        catch(err){
            console.log("Service error : Create Account : ", err);
            throw err;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(err){
            console.log("Service error : Login : ", err);
            throw err;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(err){
            console.log("Service error : GetUser : ", err);
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions(); 
        }
        catch(err){
            console.log("Service error : Logout : ", err);
        }
    }
}

const authservice = new authService(); //export object so that use methods withcreating object

export default authservice;