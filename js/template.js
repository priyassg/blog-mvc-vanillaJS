class Template{
    /**
     * Format of the Blog
     */
    blogItems(items){
        return items.reduce((a, c) => {
            return a + `<li data-id="${c.id}"><article class="tile">
                    <div class="blog-header">
                        <h2 class="title">${c.title}</h2>
                        <div class="timestamp">${formatTimestamp(c.timestamp)}</div>
                    </div>
                    <p class="content">${c.text}</p>
                    <div class="blog-item-actions">
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                </article></li>`
        },'')
        
    }
}

function formatTimestamp(value) {
    const map = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sept",
      9: "Oct",
      10: "Nov",
      11: "Dec"
    };
    const date = value ? new Date(value) : new Date();
    const month = map[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }