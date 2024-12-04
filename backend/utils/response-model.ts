class ResponseModel<T> {
    success: boolean;
    description: string;
    content: T;
  
    constructor(success: boolean, description: string, content: T) {
      this.success = success;
      this.description = description;
      this.content = content;
    }
  }
  
  export default ResponseModel;
  