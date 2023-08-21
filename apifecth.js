console.log("Tarea API Fetch");

const url = "https://reqres.in/api/users?delay=3";
const HTMLResponse = document.querySelector("#elements");

function onclickPeople(){
    fetch(url)
    .then(response => response.json())
    .then(api => {
        // console.log(api);
        const users = api.data;
        // console.log(users);
        const tpl = users.map((user) => {
            return `
            <div class="card col-4 m-4" style="width: 17rem; color: #ffffff; background-color: #3a3a3a;"">
                <img src="${user.avatar}" class="card-img-top my-2" alt="${user.first_name}'s avatar" style="border-radius: 20px;">
                <div class="card-body">
                 <p class="card-text">
                 <div class = "row"> First Name: ${user.first_name}</div>
                 <div class = "row"> Last Name: ${user.last_name}</div>
                 <div class = "row"> Email: ${user.email}</div>
                 </p>
                </div>
            </div>`;
        }).join("");
        // console.log(tpl);
        HTMLResponse.innerHTML = `<div class="row justify-content-center align-items-center">${tpl}</div>`;

    })
    .catch(error => console.log(error));
}