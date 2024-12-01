import UserSchema from '../models/userSchema.js'


export default class UserServices {
    //Create User
    static async postUser(payload) {
        let resp_obj = {};
        const createPayload = new UserSchema({
            name: payload.name,
            email: payload.email,
            phone_number: payload.phone_number,
            user_pic: payload.user_pic,
            created_by: "ADMIN"
        })
        const user_resp = await createPayload.save();
        return user_resp;
    }
    //Fetch Single User
    static async fetchSingleUser(condition) {
        const findSingleUser = await UserSchema.findOne(condition).exec();
        return findSingleUser;
    }
    //Fetch All User
    static async fetchAllUser(condition) {
        const findAllUser = await UserSchema.find(condition, { __v: 0 }).sort({ created_at: -1 });
        return findAllUser;
    }
    //Update User
    static async updateUser(condition, updatePayload) {
        const updateUser = await UserSchema.findOneAndUpdate(condition, updatePayload).exec();
        return updateUser;
    }
    //Delete User
    static async deleteUser(condition) {
        const options = { rawResult: true };
        const deleteUser = await UserSchema.findOneAndDelete(condition, options).exec();
        return deleteUser;
    }


}