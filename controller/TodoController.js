import AppController from "./AppController.js";
import Todo from "../model/Todo.js";

class TodoController extends AppController {
    index(){
        let status = 200;
        let message = "Hello World";

        const reqBody = this.Request.body;
        const reqParams = this.Request.params;
        const resBody = { body: reqBody, params: reqParams, message};

        return this.Response(resBody, status);
    }

    async create(){
        const data = Todo.validate(this.Request.body);

        return this.Response(data);
    }
}

export default new TodoController;