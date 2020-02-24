class Model {
	constructor() {
		this.personData = [];
	}

	getDetails(id) {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => {
				return response.json()
			})
			.then(data => {
				this.personData = data;
				let found = false;
				for (let i = 0; i < this.personData.length; i++) {
					if (this.personData[i].id == id) {
						this.showData(this.personData[i]);
						found = true;
					}
				}
				if (found == false) {
					alert("NO USER WITH THAT ID")
				}
			})
			.catch(err => {
				alert("😰Are you sure you are connected to the internet")
			})
	}

	bindShowData = (callback) => {
		this.showData = callback;
	}
}

class View {
	constructor() {
		this.app = document.querySelector(".root");

		this.appTitle = this.createDOMElement("h1");
		this.appTitle.textContent = "GET USER DETAILS";

		this.form = this.createDOMElement("form")
		this.formInput = this.createDOMElement("input", ["form-control"]);
		this.form.appendChild(this.formInput);

		this.getDetailsButton = this.createDOMElement("button", ["btn-success", "btn"]);
		this.getDetailsButton.classList.add("center");
		this.getDetailsButton.textContent = "Get Details!";
		this.getDetailsButton.type = "Submit";
		this.form.appendChild(this.getDetailsButton);

		this.divToDisplay = this.createDOMElement("div", ["outputDiv"]);

		this.app.appendChild(this.appTitle);
		this.app.appendChild(this.form);
		this.app.appendChild(this.divToDisplay);
	}

	displayInDOM(userObject) {
		let table = this.createDOMElement("table");
		for (let field in userObject) {
			let tr = this.createDOMElement("tr");
			let tdLabel = this.createDOMElement("td");
			let tdData = this.createDOMElement("td");
			tdLabel.textContent = field;
			if (typeof userObject[field] == "object")
				tdData.textContent = JSON.stringify(userObject[field]);
			else
				tdData.textContent = userObject[field];

			tr.append(tdLabel, tdData);
			table.appendChild(tr);
		}

		this.divToDisplay.appendChild(table);
	}

	bindGetDetails(handler) {
		this.form.addEventListener("submit", event => {
			event.preventDefault();
			let input = this.formInput;
			let text = input.value;

			if (text) {
				handler(text);
				text = "";
				input.autofocus = true;
			} else {
				alert("Enter ID to search for the user!! 😠");
			}
		});
	}

	createDOMElement(tag, classList) {
		let element = document.createElement(tag)
		if (classList && classList.length > 0) {
			classList.forEach(it => {
				element.classList.add(it)
			});
		}
		return element
	}

	getDOMElement(identifier) {
		let element = document.querySelector(identifier);
		return element;
	}
}

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		this.view.bindGetDetails(this.handleGetDetails);
		this.model.bindShowData(this.renderData);
	}

	handleGetDetails = (id) => {
		this.model.getDetails(id);
	}

	renderData = (personObject) => {
		this.view.displayInDOM(personObject);
	}
}
const app = new Controller(new Model(), new View());