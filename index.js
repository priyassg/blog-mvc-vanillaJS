class BlogPostApp {
  constructor(el) {
    this.el = el;
    this.contentContainer = el.querySelector("#content-container");
    this.modal = this.el.querySelector("#new-post-modal");
    this.form = this.el.querySelector("form");
    this.error = this.el.querySelector('.error');

    /* Setup Event Listeneres */
    this.el
      .querySelector(".create-new")
      .addEventListener("click", this.createNewBlogClickEvent.bind(this));

    this.contentContainer.addEventListener(
      "click",
      this.handleEditDeleteClickEvents.bind(this)
    );

    this.el.addEventListener("edit-blog", () => {
      console.log("Edit Blog");
    });

    this.form.addEventListener("submit", this.onFormSubmit.bind(this));

    /* Bind functions to the context */
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);

    /* starting point */
    this.initData();
  }

  //Get Blogs data asynchronously and create document nodes.
  initData() {
    getBlogData().then(({ data }) => {
      this.blogData = data;
      this.render();
    });
  }

  /* render the existing state -> which is in this.blogData 
    TODO: I am utlizing the same render method for Edit and Delete.
    Performance can be improved by not rendering all the Blogs again, instead only editing a specific node.
  */
  render() {
    var frag = new DocumentFragment();
    this.blogData.forEach(blog => {
      const blogEl = new Blog(blog);
      frag.appendChild(blogEl);
    });
    this.contentContainer.innerHTML = "";
    this.contentContainer.appendChild(frag);
  }

  /*[Handle Click Event]*/
  createNewBlogClickEvent() {
    this.toggleModal();
  }

  /*[Handle Click Event]*/
  handleEditDeleteClickEvents(e) {
    this.toggleErrorField();
    const fn = e.target.classList.contains("edit")
      ? this.onEdit
      : e.target.classList.contains("delete")
      ? this.onDelete
      : "";
    if (typeof fn === "function") {
      fn(e);
    }
  }

  /*[Handle Click Event]*/
  onFormSubmit(e) {
    e.preventDefault();
    this.formData = new FormData(this.form);
    const title = this.formData.get("title");
    const text = this.formData.get("text");

    const submitData = this.edit
      ? { title, text, id: this.currentBlogID }
      : { title, text };

    if (title !== "" && text !== "") {
      //POST Form Submit async call
      submitForm(submitData, this.edit)
        .then(() => {
          if (this.edit) {
            const index = this.blogData.findIndex(
              el => this.currentBlogID === el.id
            );
            this.blogData[index].title = title;
            this.blogData[index].text = text;
          } else {
            this.blogData.unshift({
              title,
              text,
              date: formatTimestamp()
            });
          }
          this.render();
          this.toggleModal();
        })
        .catch(function() {
            this.error.innerHTML = 'Error Submitting Form';
            this.toggleErrorField();
        });
    } else {
        this.error.innerHTML = 'Empty form';
        this.toggleErrorField();
    }
  }

  onEdit(e) {
    this.edit = true;
    this.toggleModal();
    this.setBlogData(e);
  }

  onDelete(e) {
    //async call to delete the blog
    this.setBlogData(e);
    deleteBlog(this.currentBlogID)
      .then(() => {
        const index = this.blogData.findIndex(
          el => el.id === this.currentBlogID
        );
        this.blogData.splice(index, 1);
        this.render();
      })
      .catch(() => {
        this.error.innerHTML = 'Error Deleting Blog. Please Try again';
      });
  }

  /* [State Management] to keep track of the Blog element that is either being deleted or Edited. */
  setBlogData(e) {
    const container = e.target.closest(".tile");
    const id = container.getAttribute("data-id");

    this.currentBlogID = Number(id);
  }

  toggleModal() {
    if (this.modal.style.display === "block") {
      this.modal.style.display = "none";
    } else {
      this.modal.style.display = "block";
    }
  }

  toggleErrorField(){
      if(this.error.classList.contains('display')){
          this.error.classList.remove('display');
          this.error.innerHTML = '';
      }else{
          this.error.classList.add('display');
          this.error.innerHTML = 'Error Submitting Form';
      }
  }
}

class Blog {
  constructor(data) {
    this.template = document.querySelector("#blog-tile");
    this.container = this.createNode(data);

    return this.container;
  }

  createNode(data) {
    var clone = this.template.content.cloneNode(true);
    const container = clone.querySelector(".tile");
    container.setAttribute("data-id", data.id);
    const title = clone.querySelector(".title");
    title.textContent = data.title || "";
    const timestamp = clone.querySelector(".timestamp");
    timestamp.textContent = formatTimestamp(data.timestamp) || "";
    const content = clone.querySelector(".content");
    content.textContent = data.text || "";
    return clone;
  }
}

new BlogPostApp(document.getElementById("app"));
