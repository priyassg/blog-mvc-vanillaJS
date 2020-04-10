class View{
    constructor(template){
        this.template = template;
        this.$blogList = document.querySelector('.blogs-list');
    }

    showBlogs(items){
        this.$blogList.innerHTML = this.template.blogItems(items);
    }

    bindDeleteBlog(handler){
        $delegate(this.$blogList, 'li .delete', 'click', ({target}) => {
			handler(_blogId(target));
		});
    }

    bindEditBlog(handler){
        $delegate(this.$blogList, 'li .edit', 'click', ({target}) => {
			handler(target);
		});
    }

    deleteBlog(id){
        this.$blogList.querySelector(`[data-id="${id}"]`).remove();
    }

}

function _blogId(element){
    return Number(element?.parentElement?.parentElement?.parentElement?.dataset?.id)
}

function $delegate(target, selector, type, handler, capture) {
	const dispatchEvent = event => {
		const targetElement = event.target;
		const potentialElements = target.querySelectorAll(selector);
		let i = potentialElements.length;

		while (i--) {
			if (potentialElements[i] === targetElement) {
				handler.call(targetElement, event);
				break;
			}
		}
	};

	$on(target, type, dispatchEvent, !!capture);
}

function $on(target, type, callback, useCapture) {
    target.addEventListener(type, callback, !!useCapture);
};