var types = ["String","Byte", "Short", "Integer","Long","Float","Double"];
var cyclingTitle;

document.addEventListener("DOMContentLoaded", function() {
		cyclingTitle = document.getElementById("title");
		var cycle = setInterval(function () {populateGeneric()}, 4000);
});

function populateGeneric(){
		var index = Math.floor(Math.random()*7);
		cyclingTitle.innerHTML = types[index] + " OP";
}
function validateFormInput(oForm) {
//Example using the “required” attribute
 var msgEmpty = "The following form data is required: \n";
 var msg ="";
 var elements = oForm.elements;
	 for(var i = 0; i < elements.length; i++) {
		 if (elements[i].value == null || elements[i].value == "") {
		 var element_name= elements[i].getAttribute("name");
		 var element_req= elements[i].getAttribute("required");
		if (element_req) {
			msg+=element_name + "\n";
			}
		}
	}
	if(msg == ""){
		alert("Thanks for filling everything. Mailto: will now kick in.");
		}
		else{
		alert(msgEmpty + " "+ empty);
		}
 }
