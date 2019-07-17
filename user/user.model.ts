import * as mongoose from 'mongoose'

export interface User extends mongoose.Document {
  name: string,
  email: string,
  password: string
}

export interface UserModel extends mongoose.Model<User> {
    findByEmail(email: string, projection?: string): Promise<User>
  }

const userSchema = new mongoose.Schema({

    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    password: {
      type: String,
      required: true
    }   


  })

  userSchema.statics.findByEmail = function(email: string, projection: string){
    return this.findOne({email}, projection) //{email: email}
  }
  
  export const User = mongoose.model<User, UserModel>('User', userSchema)
  