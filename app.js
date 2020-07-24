const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

//to make our code more reusable we need to create separate function
//a function that will generate our code to DOM and display added list in a browser

const generateTemplate = todo => {

    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>`;

   list.innerHTML += html;// we use += to append to add list 
};

addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();//trim() removes white spaces before or after value
    // console.log(todo);
    if(todo.length){
        generateTemplate(todo); //invoke function 
        addForm.reset();
    }
});


// DELETE ADDED LIST

list.addEventListener('click', e => {
//if the target of cantain list contains a specific class
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});


//SEARCH & FILTERING TODOS

//filter to do list it will take in term and compare

const filterTodos = (term) => {
    // console.log(term);// displays typed in value
    // console.log(list.childrem); //displays HTMLCollection li list which is not an array
    // console.log(Array.from(list.children));//this will convert to array

    Array.from(list.children)
        .filter((todo) => {
            // if this todo list contains the term's value - returns true
            // but we need value that does not contain so we reverse it 
            // by adding ! mark
            return !todo.textContent.toLowerCase().includes(term);
            // now it includes values that dont have a term
            // cycle through array using forEach()
        })
        .forEach((todo) => {
            todo.classList.add('filtered');
        });

        //when they do match we need to remove filtered class
        Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));

};



//keyup event
//input in search tab will listen to keyup and fire function
search.addEventListener('keyup', () => {
//get the value that was typed in in input field
    const term = search.value.trim().toLowerCase();// .toLowerCase() if they'll type in Upper case
    filterTodos(term);
});