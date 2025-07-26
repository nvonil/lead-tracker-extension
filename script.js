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

    updateVisibility();
    render();
}

addButton.addEventListener("click", function () {
    if (leadInput.value.trim() === "") {
        alert("Please enter a lead.");
    } else {
        leadsList.push(leadInput.value);
        leadInput.value = "";
        localStorage.setItem("myLeads", JSON.stringify(leadsList));

        updateVisibility();
        render();
    }
});

saveButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        leadsList.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(leadsList));

        updateVisibility();
        render();
    });
});

clearButton.addEventListener("dblclick", function () {
    if (leadsList.length === 0) {
        alert("No leads to delete.");
    } else {
        leadsList = [];
        localStorage.clear();

        updateVisibility();
        render();
    }
});

leadsContainer.addEventListener("click", function (e) {
    const deleteIcon = e.target.closest(".delete-icon");
    if (deleteIcon) {
        const index = deleteIcon.dataset.index;
        deleteLead(index);
    }
});

function render() {
    let renderedLeads = "";
    for (let i = 0; i < leadsList.length; i++) {
        renderedLeads += `<div class="lead-item">
                            <span class="lead-link" data-url="${leadsList[i]}">${leadsList[i]}</span>
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
                                class="lucide lucide-x-icon lucide-x delete-icon"
                                data-index="${i}"
                                >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                         </div>`;
    }
    leadsContainer.innerHTML = renderedLeads;

    const leadLinks = document.querySelectorAll(".lead-link");
    leadLinks.forEach(function (e) {
        e.addEventListener("click", function () {
            const url = e.dataset.url;
            chrome.tabs.create({ url });
        });
    });
}

function deleteLead(index) {
    leadsList.splice(index, 1);
    localStorage.setItem("myLeads", JSON.stringify(leadsList));

    updateVisibility();
    render();
}

function updateVisibility() {
    if (leadsList.length === 0) {
        divider.style.display = "none";
        leadsContainer.style.display = "none";
    } else {
        divider.style.display = "block";
        leadsContainer.style.display = "flex";
    }
}
