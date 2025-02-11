// async function getData(){
//     let response = await fetch("http://localhost:3000/students");
//     let result = await response.json();
//     displayData(result);
// }
// function displayData(data){
//     let container = document.getElementById("container");
//     data.forEach(ele=>{
//         let item = document.createElement("div")
//         item.innerHTML = `
//         <p><b>Student-ID:</b>${ele.id}</p>
//         <p><b>Student-name:</b>${ele.name}</p>
//         `;
//         container.appendChild(item)
    
// })
// }
// getData();
// async function postData(){
//     let options = {
//         "method" : "Post",
//         "header" : {
//         "content-Type" : "application/json"
//         },
//            "body" : JSON.stringify({
//             "id" : "6",
//             "name" : "mouni N"
//         })
//     }
//     let response = await fetch("http://localhost:3000/students",options);
//     if (response.ok){
//         console.log("Data submitted")
//     }else{
//         console.log("error")
//     }
// }
// postData();
// async function updatewholeData(){
//     let options = {
//         "method" : "PUT",
//         "headers" : {
//             "content-Type" : "application/JSON"
//         },
//         "body" : JSON.stringify({
//             "id" : "4",
//             "name" : "vamshi p"
//         })
//     }
//     let response = await fetch("http://localhost:3000/students/4",options);
//     if (response.ok){
//         console.log("Data submitted")
//     }else{
//         console.log("error")
//     }
// }
// updatewholeData();
async function saveData() {
    let input = document.getElementById("name");
    let options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "name": input.value
        })
    }
    let response = await fetch("http://localhost:3000/students", options);
    if (response.ok) {
        input.value = '';
        getData();
    }
}

async function getData() {
    let response = await fetch("http://localhost:3000/students");
    let students = await response.json();
    displayData(students);
}

function displayData(students) {
    let container = document.getElementById("container");
    container.innerHTML = ``;
    students.forEach(student => {
        let item = document.createElement("div");
        item.innerHTML = `
            <p><b>ID : </b>${student.id} </p>
            <p><b>NAME : </b>${student.name}</p>
            <button onclick='deleteData("${student.id}")'>Delete</button>
        `;
        container.appendChild(item);
    });
}
async function deleteData(id) {
    let options = {
        "method": "DELETE"
    }
    let response = await fetch(`http://localhost:3000/students/${id}`, options);
    if (response.ok) {
        console.log("Deleted");
        getData();
    }
}

async function deleteAllData() {
    let response = await fetch("http://localhost:3000/students", { method: "GET" });
    let students = await response.json();
    students.forEach(student => deleteData(student.id));
}
getData();