class Loading {
	constructor (opts) {
		Object.assign(this, opts);
	}
	render () {
		let loadingElem = document.createElement('div');
		let loadingContentElem = document.createElement('div');
		let loadingIconElem = document.createElement('div');
		let loadingTextElem = document.createElement('p');
		loadingElem.className = 'loading';
		loadingContentElem.className = 'loading-wrap';
		loadingIconElem.className = 'loading-icon';
		loadingTextElem.className = 'loading-text';
		loadingTextElem.innerText = this.loadingText || '加载中...';

		loadingContentElem.appendChild(loadingIconElem);
		loadingContentElem.appendChild(loadingTextElem);
		loadingElem.appendChild(loadingContentElem);
		document.body.appendChild(loadingElem);
	}
	destroy () {
		let loadingElem = document.getElementsByClassName('loading');
		if (loadingElem.length) {
			loadingElem[0].parentNode.removeChild(loadingElem[0]);
		}
	}
}
export default Loading;
