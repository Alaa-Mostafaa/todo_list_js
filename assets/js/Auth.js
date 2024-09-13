// sign up form ( Global variables)
document.getElementById("signUpForm").addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();
  });

let namee = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");

var users;

if (localStorage.getItem("users") === null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("users"));
}
function signup() {
  let user = {
    username: namee.value,
    useremail: email.value,
    userpassword: password.value,
  };
  // Verify that the email is in the array before registration occurs.
    const emailExists = users.some(user => user.useremail === email.value);

    if (emailExists) {
      console.log("the account is there");
      document.getElementById('error_email').innerHTML="This account is already exist "
    } else {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      alert("success");
      window.location.assign("login.html");
  }
}
console.log(users);

// Login variables
let email_login = document.getElementById("email_login");
let password_login = document.getElementById("password_login");

function login() {
  // Verify that the email is in the array before Login occurs.
  const emailExists = users.some(user => user.useremail === email_login.value);
  if (emailExists) {
    localStorage.setItem('user_email',email_login.value)
    window.location.assign('index.html');

  } else {
    document.getElementById('error_login').innerHTML="This account is not exist " 
}
}


function logout(){
    localStorage.removeItem('user_email')
    window.location.assign('index.html');

}