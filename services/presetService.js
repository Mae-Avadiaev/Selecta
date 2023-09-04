const MongooseService = require('./mongooseService')
const PresetModel = require('../models/presetModel')

module.exports = class presetService {

    constructor() {
        this.PresetMongooseService = new MongooseService(PresetModel)
    }

    async createPreset(params) {
        const preset = await this.PresetMongooseService.create(params)

        console.log(`💿 Created ${params.name} preset`)

        return preset
    }
}