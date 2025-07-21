leadsList = [];

const leadInput = document.querySelector(".lead-input");

const addButton = document.querySelector(".add-button");
const saveButton = document.querySelector(".save-button");
const clearButton = document.querySelector(".clear-button");

const divider = document.querySelector(".divider");

const leadsContainer = document.querySelector(".leads-container");

const savedLeads = JSON.parse(localStorage.getItem("myLeads"));

if (savedLeads) {
    leadsList = savedLeads;

    divider.style.display = "block";
    leadsContainer.style.display = "flex";

    render();
}

addButton.addEventListener("click", function () {
    if (leadInput.value.trim() === "") {
        alert("Please enter a lead.");
    } else {
        leadsList.push(leadInput.value);
        leadInput.value = "";

        divider.style.display = "block";
        leadsContainer.style.display = "flex";

        localStorage.setItem("myLeads", JSON.stringify(leadsList));
        render();
    }
});

saveButton.addEventListener("click", function () {});

clearButton.addEventListener("dblclick", function () {
    if (leadsList.length === 0) {
        alert("No leads to delete.");
    } else {
        leadsList = [];
        localStorage.clear();

        divider.style.display = "none";
        leadsContainer.style.display = "none";
        render();
    }
});

function render() {
    renderedLeads = "";
    for (let i = 0; i < leadsList.length; i++) {
        renderedLeads += `<div class="lead-item">
                            <a href="${leadsList[i]}">${leadsList[i]}</a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-x-icon lucide-x"
                                >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                         </div>`;
    }
    leadsContainer.innerHTML = renderedLeads;
}
