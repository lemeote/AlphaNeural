import UserModel from '../user/model';
import toObjId from '../utils/toObjectType'

const router = require('express').Router();

const { Types } = require("mongoose");

router.get('/get', async (req, res) => {
    try {

        // Describe data acquisition and registration from mongoDB here.
        const allUsers = await UserModel.find({}, null, { sort: { teamNo: 1 } })


        const users = allUsers.filter(({ deletedAt }) => !deletedAt).sort((a, b) => a.teamNo - b.teamNo)

        if (users) {
            return res.send({ error: true, message: 'User found', data: users });
        }
        return res.send({ error: false, message: 'User not found', data: null });

    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

router.post('/allow', async (req, res) => {
    try {
        const { id } = req.body

        console.log('-------', id)

        const update = { approve: true };

        await UserModel.findByIdAndUpdate(toObjId(id), update)

        const allUsers = await UserModel.find()

        const users = allUsers.filter(({ deletedAt }) => !deletedAt)

        if (users) {
            return res.send({ error: true, message: 'User found', data: users });
        } else {
            return res.send({ error: false, message: 'User not found', data: null });
        }
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

router.post('/save', async (req, res) => {
    try {
        const { key, row } = req.body;

        const update = {
            firstName: row.firstName, lastName: row.lastName, userName: row.userName, role: row.role, ipAddress: row.ipAddress,
            teamNo: row.teamName, roomNo: row.roomNo, ipMsgId: row.ipMsgId, group: row.group
        };

        const newData = await UserModel.findByIdAndUpdate(toObjId(key), update, { new: true });

        if (newData) {
            return res.send({ error: true, message: 'User found', data: newData });
        }
        else {
            return res.send({ error: false, message: 'User not found', data: null });
        }
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

router.post('/saveUserProfile', async (req, res) => {
    try {
        const { userId, values } = req.body;

        const update = {
            firstName: values.firstName, lastName: values.lastName, userName: values.userName, sex: values.sex,
            birthday: values.birthday, stacks: values.stacks, netKeyId: values.netKeyId, teamNo: values.teamNo,
            roomNo: values.roomNo, ipMsgId: values.ipMsgId, sex: values.sex, group: values.group
        };

        const savedUser = await UserModel.findByIdAndUpdate(toObjId(userId), update, { new: true })

        // = await UserModel.findById(toObjId(userId))

        if (savedUser) {

            return res.send({ error: true, message: 'User found', data: savedUser });

        }
        else {
            return res.send({ error: false, message: 'User not found', data: null });
        }
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

router.post('/getUserProfile', async (req, res) => {
    try {

        const { _id: { userId } } = req.body;

        const findUser = await UserModel.findById(toObjId(userId))

        console.log('we can see the result', findUser)

        if (findUser) {

            return res.send({ error: true, message: 'User found', data: findUser });

        }
        else {
            return res.send({ error: false, message: 'User not found', data: null });
        }
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

router.post('/delete', async (req, res) => {
    try {

        const { _id: { rowId } } = req.body;

        const update = { deletedAt: Date.now() };

        const result = await UserModel.findByIdAndUpdate(toObjId(rowId), update, { new: true });

        if (result) {
            return res.send({ error: false, message: 'Score deleted', data: result });
        } else {
            return res.send({ error: true, message: 'Score not found' });
        }

    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

router.get('/getAllUsers', async (req, res) => {
    try {

        const allUsers = await UserModel.find();

        const userName = []

        for (let i = 0; i < allUsers.length; i++) {
            const fullName = allUsers[i].firstName + " " + allUsers[i].lastName
            userName.push(fullName);
        }
        if (userName) {
            return res.send({ error: true, message: 'User found', data: userName });
        }
        return res.send({ error: false, message: 'User not found', data: null });
    }
    catch (e) {

        return res.status(400).json({ message: e.message });

    }
})

router.post("/resetPassword", async (req, res) => {
    try {
        const { userId, values } = req.body

        const user = await UserModel.findById(toObjId(userId))

        if (user) {
            console.log('=================3======1');
            console.log(user);
            console.log(values);
            console.log('=================4======1');
            user.comparedPassword(values.password, async function (err, good) {
                if (err || !good) {
                    return res.status(401).send(err || 'User not found')
                }
                user.password = values.newPassword
                await user.save()
                res.send({
                    success: true
                })
            })
        }
        else {
            return res.status(401).send(err || 'User not found')
        }
        console.log('Password reset successfully');

    }
    catch (e) {
        return res.status(400).json({ message: e.message });

    }
})

export default router;
