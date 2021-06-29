// show content added by user
showContent();
function showContent(){
    
    var tableBody = document.querySelector(".tbody");
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
     
      
    </tr>`;
      });
    }
   }
  
   
let searchMethod = document.getElementById("search-methods");
let searchTxt = document.getElementById("search-txt");
let searchForm = document.getElementById("search-form");
let message = document.querySelector(".alert"); 
searchForm.addEventListener("submit",searchContacts);


function searchContacts(e){
    e.preventDefault();
    let rows = document.querySelector(".tbody").children;
  if(searchMethod.value == "number"){

      if(searchTxt.value.length > 0 &&  /^\d+$/.test(searchTxt.value) == true){

        [...rows].forEach(row => {

            if(row.children[2].textContent == Number(searchTxt.value)){
                row.classList.add("table-success")
                row.classList.remove("d-none")
                
            } else{

                row.classList.add("d-none")
              
            }
        })

      }else {
        message.textContent = "fill search input with number";
        message.classList.remove("d-none")
      }
  }

}

