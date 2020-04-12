class Controller{
    constructor(store, view){
        this.store = store;
        this.view = view;

        view.bindDeleteBlog(this.deleteBlog.bind(this));
        view.bindAddBlog(this.createBlog);
    }

    init(){
        console.log('Init Blog');
        this.store.getBlogs().then((blogs) => {
            this.view.showBlogs(blogs);
        })
    }

    deleteBlog(id){
        this.store.delete(id).then(() => {
            this.view.deleteBlog(id);
        })
    }

    createBlog(){
        this.view.createBlog();
    }

}