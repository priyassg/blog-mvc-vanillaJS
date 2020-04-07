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
  return await axios.get(`${baseUrl}`);
}

async function deleteBlog(id) {
  await axios.delete(`${baseUrl}/${id}`);
}