import UserServices from "../services/user.service.js";

class UserController {
    //Create User
    static async createuser(req, res) {
        const { name, email, phone_number, user_pic } = req.body;
        const condition = { email: email };
        const isUserExists = await UserServices.fetchSingleUser(condition);
        if (isUserExists) {
            return res.status(409).json({ status: false, message: "User Already Exists" });
        }
        const payload = {
            name: name,
            email: email,
            phone_number: phone_number,
            user_pic: user_pic
        }
        try {
            const user_payload = await UserServices.postUser(payload);
            if (!!user_payload) {
                return res.status(200).json({ status: true, message: "User Created Successfully" });
            } else {
                return res.status(400).json({ status: false, message: "User not Created" });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: `Server Error ${error}` });
        }

    }
    //Fetch user
    static async getuser(req, res) {
        try {
            const condition = {};
            const getAllUser = await UserServices.fetchAllUser(condition);
            if (getAllUser.length > 0) {
                return res.status(200).json({ status: true, message: "User fetched Successfully", data: getAllUser });
            } else {
                return res.status(400).json({ status: false, message: "No Users found", data: getAllUser });
            }

        } catch (error) {
            return res.status(500).json({ status: false, message: `Server Error ${error}` });
        }
    }
    //Update User
    static async update(req, res) {
        const params_id = req.params.id;
        const payload = {
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            user_pic: req.body.user_pic
        };
        try {
            const update_resp = await UserServices.updateUser({ _id: params_id }, payload);
            if (!!update_resp) {
                return res.status(200).json({ status: true, message: "User udpated Successfully" });
            } else {
                return res.status(400).json({ status: false, message: "User not updated" });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: `Server Error ${error}` });
        }
    }
    //Delete User
    static async delete(req, res) {
        try {
            const condition = { _id: req.params.id };
            const deleteUser = await UserServices.deleteUser(condition);
            if (!!deleteUser) {
                return res.status(200).json({ status: true, message: "User Deleted Successfully" });
            } else {
                return res.status(400).json({ status: false, message: "User not deleted" });
            }

        } catch (error) {
            return res.status(500).json({ status: false, message: `Server Error ${error}` });
        }
    }
}


export default UserController;