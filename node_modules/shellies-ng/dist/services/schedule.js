"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
const base_1 = require("./base");
/**
 * The Schedule service allows execution of RPC methods at fixes times or intervals.
 */
class ScheduleService extends base_1.Service {
    constructor(device) {
        super('Schedule', device);
    }
    /**
     * Lists all existing scheduled jobs.
     */
    list() {
        return this.rpc('List');
    }
    /**
     * Creates a new scheduled job.
     * @param job - The job to add.
     */
    create(job) {
        return this.rpc('Create', { ...job });
    }
    /**
     * Updates an existing scheduled job.
     * @param job - The job to update.
     */
    update(job) {
        return this.rpc('Update', { ...job });
    }
    /**
     * Deletes a scheduled job.
     * @param id - ID of the job to delete.
     */
    delete(id) {
        return this.rpc('Delete', {
            id,
        });
    }
    /**
     * Deletes all existing scheduled jobs.
     */
    deleteAll() {
        return this.rpc('DeleteAll');
    }
}
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.js.map