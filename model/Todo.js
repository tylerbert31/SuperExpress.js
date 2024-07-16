import AppModel from "./AppModel.js";

class Todo extends AppModel {
    constructor() {
        super();
        this.collection_name = "todos";

        this.schema = this.z.object({
            title: this.z.string({ required_error: "Title is required", invalid_type_error: "Title must be a string" }),
            description: this.z.string({ invalid_type_error: "Description must be a string."}).optional(),
            due_date: this.z.string().date(),
            done: this.z.number({ default: 0, invalid_type_error: "Done must be 0 or 1."}).optional(),
            done_at: this.z.string().optional(),
            archived: this.z.number({ default: 0, invalid_type_error: "Archived must be 0 or 1."}).optional(),
        });
    }
}

export default new Todo;