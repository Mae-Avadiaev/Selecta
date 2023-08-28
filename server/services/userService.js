const MongooseService = require("./MongooseService");
const UserModel = require("../models/userModel")

module.exports = class userService {

    constructor() {
        this.MongooseServiceInstance = new MongooseService(UserModel)
    }

    async addLikesSource (playlistId, user) {

        const oldArray = user.likesPool
        const newArray = [...oldArray, playlistId]

        const update = await this.MongooseServiceInstance.update(userId, {likesPool: newArray})

        console.log(`➕ Added one playlist to ${user.displayName}'s likes sources.`)

        return update
    }
}