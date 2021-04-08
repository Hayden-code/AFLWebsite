var selectEl = document.querySelector("#teamList")
var submitEl = document.querySelector("#submitButton");
var inputEl = document.querySelector("#userName");
var selectEl = document.querySelector("#teamList");
var localIndex=0;
var signUpPageEl = document.querySelector("#signUpPage");
var mainPageEl = document.querySelector("#mainPage");
var settingsEl = document.querySelector("#settings");

var requestUrl = 'https://api.squiggle.com.au/?q=teams';
    
fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        mainPageEl.style.display = "none";
        for (var i = 0; i < data.teams.length; i++) {
              
            var createOption = document.createElement('option');      
                    
            createOption.textContent = data.teams[i].name;
            createOption.value = data.teams[i].name;
                            
            selectEl.appendChild(createOption);
               
            }
        
    });
 

submitEl.addEventListener("click", saveData);     

function saveData(event){
    event.preventDefault();
    var userData = {user:"", team:""};
    userData.user = inputEl.value;
    userData.team = selectEl.value;
    console.log(userData);
    var local = localStorage.setItem(localIndex, JSON.stringify(userData));

    // display main page and hide first page
    displayMainPage();
}

// display main page and hide first page
function displayMainPage(){
    // hides signUp page
    signUpPageEl.dataset.state = "hidden";
    signUpPageEl.style.display = "none";

    // display main page
    mainPageEl.dataset.state = "visible";
    mainPageEl.style.display = "block";

}

// display signUp page and hides main page
function displaySignUpPage(){
    // hides signUp page
    mainPageEl.dataset.state = "hidden";
    mainPageEl.style.display = "none";

    // display main page
    signUpPageEl.dataset.state = "visible";
    signUpPageEl.style.display = "block";

}


// event listner for settings button
settingsEl.addEventListener('click',displaySignUpPage);