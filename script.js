leadList = ["this", "is", "a", "test!"];

const input = document.querySelector(".input");

const addButton = document.querySelector(".add-button");
const tabButton = document.querySelector(".tab-button");
const deleteButton = document.querySelector(".delete-button");

function render() {
    for (let i = 0; i < leadList.length; i++) {
        console.log(leadList[i]);
    }
}

render();
