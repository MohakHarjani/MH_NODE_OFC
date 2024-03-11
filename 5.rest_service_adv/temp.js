 //  document.getElementById('editForm').style.display='none'
 getAllUsers();
 let edit = false;

 //=========================================================================================
 function deleteUser(id)
 {   
     fetch('http://localhost:8080/user/' + id, {
         method: 'DELETE'
     })
     .then((response) => {

         window.location.reload();
         


     })
 }
 //=======================================================================================
 function postUser()
 {
     let id = document.getElementsById('id').value
     let name = document.getElementsById('name').value
     let password = document.getElementsById('password').value
     let profession = document.getElementsById('profession').value

     let user = {id, name, password, profession};
     let stringUser = JSON.stringify(user);

     if (edit == true)
     {
         updateUser(user);
         return;
     }
     
     fetch(
            'http://localhost:8080/user/' + id, 
             { 
                 method : 'POST',
                 headers :  { 'Content-Type' : 'application/json'},
                 body : stringUser 
             }
            
         )
     .then((response)=>{

         window.location.reload();
     })
 }
 function updateUser(user)
 {
     let stringUser = JSON.stringify(user);
     console.log(stringUser)
     console.log(user)

     fetch(
            'http://localhost:8080/user/' + id, 
             { 
                 method : 'PUT',
                 headers :  { 'Content-Type' : 'application/json'},
                 body : stringUser 
             }
            
         )
     .then((response)=>{

         window.location.reload();
     })
    
 }
 //======================================================================================
 function startEdit(id, name, password, value)
 {
     console.log(id, name, password)
     edit = true
     document.getElementById('id').value = id;
     document.getElementById('name').value = name;
     document.getElementById('password').value = password
     document.getElementById('profession').value = profession
     // document.getElementById('editForm').style.display='inline'

 }
 //================================================================================================
 function populateTable(userList)
 {
     let userTableBody = document.getElementById('userTableBody');
     
     userList.map((user)=>{


         let userTableRow = document.createElement("tr");

         let userTableDescId = document.createElement('td')
         userTableDescId.innerText = user.id;

         let userTableDescName = document.createElement('td')
         userTableDescName.innerText = user.name;

         let userTableDescPassword = document.createElement('td')
         userTableDescPassword.innerText = user.password;

         let userTableDescProfession = document.createElement('td')
         userTableDescProfession.innerText = user.profession;

         //appending td in tr
         userTableRow.append(userTableDescId);
         userTableRow.append(userTableDescName);
         userTableRow.append(userTableDescPassword);
         userTableRow.append(userTableDescProfession);

         let delTd = document.createElement('td')
         delTd.innerHTML =`<button onclick = deleteUser(${user.id})> DELETE</button>`

         let editTd = document.createElement('td')
         editTd.innerHTML =`<button onclick = startEdit(${user.id}, ${user.name}, ${user.password}, ${user.profession})> EDIT </button>`

         
         //append buttons to tr
         userTableRow.append(delTd);
         userTableRow.append(editTd);
       

         //appending tr in tbody
         userTableBody.append(userTableRow);

     })
     
 }
 //==================================================================================================
 function getAllUsers()
 {
     fetch('http://localhost:8080/user/all', {
         method : 'GET'
     })
     .then((response)=>{
         response.json()
                 .then((userList)=>{

                     populateTable(userList);


                 })
     })
 }
 //=============================================================================================

