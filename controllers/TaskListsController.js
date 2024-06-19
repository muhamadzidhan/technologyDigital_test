const { TaskList } = require("../models")


module.exports = class TaskListsController {
    static async createTaskList(req, res, next) {
        try {
            const { title, description } = req.body

            console.log(req.body,"<><><><>>><><><");

            //untuk menyimpan body yang telah di input ke dalam database
            let taskList = await TaskList.create({
                title, description
            })

            //jika berhasil akan mendapat respon status 201, dan respon objek dalam bentuk JSON
            res.status(201).json(taskList)

        } catch (error) {
            // jika error akan mendapatkan pesan error
            next(error)
        }
    }

    static async getTaskList(req, res, next) {
        try {
            // membaca semua data task list yang ada pada database
            let taskList = await TaskList.findAll()

            res.status(200).json(taskList);

        } catch (error) {
            next(error)
        }
    }

    static async getTaskListById(req, res, next) {
        try {
            // mengambil id task list yang di input kan
            let id = req.params.id

            console.log(id, "INNIIIII");

            // mengecek apakah id yang di inputkan ada pada database
            let taskList = TaskList.findByPk(id)

            if (!taskList) {
                throw { name: "Task List Not Found" }
            }

            console.log(taskList, "[][][][][][][][][");

            res.status(200).json(taskList);

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async editTaskList(req, res, next) {
        try {
            const { title, description } = req.body

            let id = req.params.id

            let taskList = await TaskList.findByPk(id)

            if (!taskList) {
                throw { name: "Task List Not Found" }
            }

            let taskListUpdate = await TaskList.update({
                title, description
            }, {
                where: {
                    id
                }
            })

            res.status(200).json(taskList)

        } catch (error) {
            next(error)
        }
    }

    static async deleteTaskList(req, res, next) {
        try {
            let id = req.params.id

            let taskList = await TaskList.findByPk(id)

            if (!taskList) {
                throw { name: "Task List Not Found" }
            }

            await taskList.destroy()
            let message = `${taskList.title} has been deleted`;

            res.status(200).json({ message });

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}