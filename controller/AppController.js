class AppController {
    constructor() {
        this.callFirst = this.callFirst.bind(this);
        this.wrapMethods();
        this.Request = {};
      }
    
      callFirst(methodName, ...args) {
        if(args[0]['method']){
            this.Request['headers'] = args[0].rawHeaders;
            this.Request['body'] = args[0].body;
            this.Request['params'] = args[0].params;
            this.Request['query'] = args[0].query;
            this.Request['method'] = args[0].method;
            this.Request['url'] = args[0].url;
            this.Request['all'] = args[0];
            this.res = args[1];
        }
      }
    
      wrapMethods() {
        const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
          .filter(name => name !== 'constructor' && typeof this[name] === 'function');
    
        for (const name of methodNames) {
          const originalMethod = this[name];
          this[name] = (...args) => {
            this.callFirst(name, ...args);
            return originalMethod.apply(this, args);
          };
        }
    }

    Response(data, status = 200){
        return this.res.status(status).json(data);
    }
}

export default AppController;