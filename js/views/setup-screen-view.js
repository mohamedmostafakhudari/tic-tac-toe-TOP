export class SetupScreenView {
	constructor(containerElement, template) {
		this.container = containerElement;
		this.template = template;
		this.onSubmitCallback = null;

		// Maintain a bound reference to the exact event listener function so later we can reference it and destroy it
		this.globalSubmitHandler = this.handleDelegatedSubmit.bind(this);
	}

	bindSubmit(callback) {
		this.onSubmitCallback = callback;

		this.container.addEventListener("submit", this.globalSubmitHandler);
	}

	handleDelegatedSubmit(e) {
		if (e.target && e.target.id === "game-setup-form") {
			e.preventDefault();

			// e.submitter used to include the name and value associated with the button used to submit the form
			const formData = new FormData(e.target, e.submitter);
			const data = Object.fromEntries(formData.entries());

			if (this.onSubmitCallback) {
				this.onSubmitCallback(data);
			}
		}
	}

	destroy() {
		// clear the event listener from the static container
		this.container.removeEventListener("submit", this.globalSubmitHandler);

		// clear out references so garbage collection can clean up this entire View instance
		this.onSubmitCallback = null;
		this.container.innerHTML = "";
	}

	render() {
		const fragment = this.template.content.cloneNode(true);
		this.container.innerHTML = "";
		this.container.appendChild(fragment);
	}
}
