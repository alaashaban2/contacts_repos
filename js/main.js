// add new items
//person info
showContact();
var add_form = document.getElementById('add');
add_form.addEventListener("submit",function(e){
  var personName = document.getElementById("person_name").value;
  var personNumber = document.getElementById("person_number").value;
  var id = Math.floor(Math.random() * 1000);
  if(!validateForm(personName,personNumber)){
    e.preventDefault();
    return false;
  }

  var personInfo = {
    id:id,
    personname:personName,
    personnumber:personNumber
  }
  
  
    
    var contact = [];
    if(localStorage.getItem("contact-info") == null){
      contact.push(personInfo);
      localStorage.setItem("contact-info",JSON.stringify(contact));
  }else{
    var contact = JSON.parse(localStorage.getItem("contact-info"))
    contact.push(personInfo);
    localStorage.setItem("contact-info",JSON.stringify(contact));
  }
  document.getElementById("add").reset()
  showContact();
  e.preventDefault();
})

//validation data
function validateForm(personName,personNumber){
  var alert = document.querySelector(".alert");
  var numRegex =  new RegExp('[0-9]{11}');
  var nameRegex = new RegExp(/^(?![A-Za-z]\d?$)[a-zA-Z]+\d*$/)
  let oldContacts = JSON.parse(localStorage.getItem("contact-info"))

  //check if personName if is empty or contain numbers only 
if(personName.length == 0 || nameRegex.test(personName) == false || personName.length < 4 ){
  alert.innerHTML = `<ul>
  <li>person name can not be empty</li>
  <li> person can not start by number</li>
  <li>person name can contain digits and number at the end</li>
  </ul> 
  `;
  alert.classList.remove("d-none");
  return false;
}

  //checkif contact exist before
if(oldContacts.some(contact => {return contact.personname === personName }) === true){
  alert.innerHTML = "contact name already exist"
  alert.classList.remove("d-none");
  return false;
}

//check person number contain numbers only and 11 number
if(personNumber ==0 || numRegex .test(personNumber) == false || personNumber.length != 11){
  alert.innerHTML = `<ul>
  <li>person number can not be empty</li>
  <li> person number can not contain digits</li>
  <li> person number must be 11 number</li>
  </ul> 
  `;
  alert.classList.remove("d-none");
  return false;
}
// check if contact number exist before
if(oldContacts.some(contact => {return contact.personnumber === personNumber }) === true){
  alert.innerHTML = "contact number already exist"
  alert.classList.remove("d-none");
  return false;
}

alert.classList.add("d-none");
return true;
}


// show content added by user
 function showContact(){
  var tableBody = document.querySelector(".tbody");
  tableBody.innerHTML =  "";
  if(localStorage.getItem("contact-info") == null || 
  JSON.parse(localStorage.getItem("contact-info")).length == 0){
    tableBody.innerHTML = `<tr>
    <td colspan ="4"><h2>you do not have any contacts<h2></td>
    </tr>
    `;
  } else{
    var contacts = JSON.parse(localStorage.getItem("contact-info"));
    
    contacts.forEach((element,index) => {
      tableBody.innerHTML += `<tr>
    <th scope="row">${index + 1}</th>
    <td>${element.personname}</td>
    <td>${element.personnumber}</td>
    <td><input type="checkbox" class="checking" id="${element.id}">
    <button onclick ="deleteContact(${element.id})"class="btn btn-danger">DELETE</button></td>
  </tr>`;
    });
  }
 }


  // delete  current contact
 function deleteContact(id){
   var contacts = JSON.parse(localStorage.getItem("contact-info"));
   var newContacts = contacts.filter(contact =>{
     return contact.id != id;
   })
   localStorage.setItem("contact-info",JSON.stringify(newContacts));
   showContact();
   
 }



 // check all contacts
let mainCheck = document.getElementById("check-all");

mainCheck.onclick = function(){
  let checkBoxs = document.querySelectorAll(".checking");
  let boxArray = [...checkBoxs];
  boxArray.forEach(boxs => {
   
    if( boxs.checked == true){
      boxs.checked = false
    } else{
      boxs.checked = true
    }
     
    })
    
  }
  
//delete cheked contacts contacts
function deleteChecked(){
  let checkebox = document.querySelectorAll(".checking:checked");
  let oldContact = JSON.parse(localStorage.getItem("contact-info"));
  let ids=[];
 
  checkebox.forEach(el =>{
    ids.push(Number(el.getAttribute("id")))
  });
  let newArray = oldContact.filter(con => {
    if(ids.includes(con.id) == false){
      return con;
    }
  })

  localStorage.setItem("contact-info",JSON.stringify(newArray ));
  mainCheck.checked = false;
 showContact();
  
 
}


// serach contacts
