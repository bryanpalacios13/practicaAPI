console.log("Tarea API Fetch");

const HTMLResponse = document.querySelector("#elements");

// Hacer el fetch a la API
async function usersFromAPI() {
    const url = "https://reqres.in/api/users?delay=3";

    try {
        const response = await fetch(url);
        const data = await response.json();
        const users = data.data;
        return users;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}

// función que sirve para mostrar las cards de cada usuario en mi pantalla
function displayUsers(users) {
    const tpl = users
        .map((user) => {
            return `
                <div class="card col-4 m-4" style="width: 17rem; color: #ffffff; background-color: #3a3a3a;">
                    <img src="${user.avatar}" class="card-img-top my-2" alt="${user.first_name}'s avatar" style="border-radius: 50%;">
                    <div class="card-body">
                        <p class="card-text">
                            <div class="row"> ID: ${user.id}</div>
                            <div class="row"> First Name: ${user.first_name}</div>
                            <div class="row"> Last Name: ${user.last_name}</div>
                            <div class="row"> Email: ${user.email}</div>
                        </p>
                    </div>
                </div>`;
        })
        .join("");

    HTMLResponse.innerHTML = `<div class="row justify-content-center align-items-center">${tpl}</div>`;
}

// Función de para saber si mi local Storage tiene los datos
async function usersWithCache() {
    const usersJson = localStorage.getItem("data");
    let users;
    // comparando mi local Storage
    if (!usersJson) {
        // Si no hay datos mando llamar mi función que recolectará los datos del API
        users = await usersFromAPI();
        console.log(users);
        const currentTime = new Date().getTime();
        const dataToStore = {
            timestamp: currentTime,
            users: users,
        };
        localStorage.setItem("data", JSON.stringify(dataToStore));
    } else {
        const parsedData = JSON.parse(usersJson);
        console.log(parsedData);
        const currentTime = new Date().getTime();
        const lastFetchTime = parsedData.timestamp;

        // Si han pasado más de 1 min, hacer una nueva solicitud
        if (currentTime - lastFetchTime > 60000) {
            users = await usersFromAPI();
            const newDataToStore = {
                timestamp: currentTime,
                users: users,
            };
            localStorage.setItem("data", JSON.stringify(newDataToStore));
        } else { // si no ha pasado 1 min llamar los datos que tengo dentro de mi localSorage
            users = parsedData.users;
            console.log(users);
        }
    }

    return users;
}

async function onClickPeople() {
    try {
        const users = await usersWithCache();
        displayUsers(users);
    } catch (error) {
        console.log("Error:", error);
    }
}