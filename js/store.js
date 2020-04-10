class Store{
    constructor(name){

        let blogs;

        let localStorage = window.localStorage;

        this.getBlogs = async () => {
            let blogs = JSON.parse(localStorage.getItem('name'));
            if(!blogs){
                blogs = await getBlogData();
                return blogs;
            }
            return blogs;
        }

        this.setLocalStorage = (value) => {
            localStorage.setItem(name, value);
        }
    }

    async delete(id){
        return await deleteBlog(id);
    }
}

const baseUrl = 'https://restedblog.herokuapp.com/priya/api';

async function submitForm(blogData, isEdit) {
  await axios({
    method: "post",
    url: isEdit
      ? `${baseUrl}/${blogData.id}`
      : `${baseUrl}`,
    data: blogData
  });
}

async function getBlogData() {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
}

async function deleteBlog(id) {
  await axios.delete(`${baseUrl}/${id}`);
}