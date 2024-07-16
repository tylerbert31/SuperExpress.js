import PocketBase from "pocketbase";
import { z } from "zod";

const pb = new PocketBase(process.env.PB_URL);
pb.autoCancellation(false);

class AppModel {

    constructor(collection_name) {
        this.collection_name = collection_name;
        this.db = pb;
        this.z = z;
        this.schema = null; // Replace with Zod Schema
    }

    async findById(id, conditions = null) {
        if(!id){
            return { message: "ID is required"};
        }

        try {
            const res = await pb.collection(this.collection).getOne(id, conditions);
            return res;
        } catch (error) {
            return error;
        }
    }

    async findAll(conditions = null) {
        const res = await pb
            .collection(this.collection)
            .getFullList((conditions = null));
        return res;
    }

    async findPaginated(page = 1, limit, conditions = null) {
        if(page < 1){
            return { message: "Page must be greater than 0"};
        }

        limit = limit ?? 10;
        try {
            const res = await pb
            .collection(this.collection)
            .getList(page, limit, conditions);
            return res;
        } catch (error) {
            return error;
        }
    }

    async save(data) {
        if(!data){
            return { message: "Data is required"};
        }
        try {
            const res = await pb.collection(this.collection).create(data);
            return res;
        } catch (error) {
            return error;
        }
    }

    async update(id, data) {
        if(!id || !data){
            return { message: "ID and new data is required"};
        }
        const isExists = await pb.collection(this.collection).getOne(id);
        if (!isExists) {
            return { message: "Not Found" };
        }
        try {
            const res = await pb.collection(this.collection).update(id, data);
            return res;
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        if(!id){
            return { message: "ID is required"};
        }
        const isExists = await pb.collection(this.collection).getOne(id);
        if (!isExists) {
            return { message: "Not Found" };
        }
        try {
            const res = await pb.collection(this.collection).delete(id);
            return res;
        } catch (error) {
            return error;
        }
    }

    validate(data){
        const validity = this.schema.safeParse(data);
        let resData = {};

        if(!validity.success){
            resData.errors = validity.error.formErrors.fieldErrors;
        }
        else{
            resData.data = validity.data;
        }

        let success = validity.success;

        return {success: success, result: resData};
    }
}

export default AppModel;