import { Device } from '../devices';
import { Service } from './base';
export interface ScheduleRpcCall {
    method: string;
    params?: Record<string, unknown>;
}
export interface ScheduleJob {
    id?: number;
    enable: boolean;
    timespec: string;
    calls: ScheduleRpcCall[];
}
export interface ScheduleListResponse {
    jobs: ScheduleJob[];
    rev: number;
}
export interface ScheduleCreateResponse {
    id: number;
    rev: number;
}
export interface ScheduleUpdateResponse {
    rev: number;
}
export interface ScheduleDeleteResponse {
    rev: number;
}
/**
 * The Schedule service allows execution of RPC methods at fixes times or intervals.
 */
export declare class ScheduleService extends Service {
    constructor(device: Device);
    /**
     * Lists all existing scheduled jobs.
     */
    list(): PromiseLike<ScheduleListResponse>;
    /**
     * Creates a new scheduled job.
     * @param job - The job to add.
     */
    create(job: ScheduleJob): PromiseLike<ScheduleCreateResponse>;
    /**
     * Updates an existing scheduled job.
     * @param job - The job to update.
     */
    update(job: Partial<ScheduleJob>): PromiseLike<ScheduleUpdateResponse>;
    /**
     * Deletes a scheduled job.
     * @param id - ID of the job to delete.
     */
    delete(id: number): PromiseLike<ScheduleDeleteResponse>;
    /**
     * Deletes all existing scheduled jobs.
     */
    deleteAll(): PromiseLike<ScheduleDeleteResponse>;
}
//# sourceMappingURL=schedule.d.ts.map