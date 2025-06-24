function sayHello() {
   
    var name = document.getElementById("nameInput").value;
var message = "Hello " + name + "!";
 document.getElementById("greetingArea").innerText = message;
}
