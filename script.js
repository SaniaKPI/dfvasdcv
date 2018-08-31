
var $table = $("#tableBody");
var $numberOfForm = $("#number");
var $leftButton = $("#left");
var $rightButton = $("#right");
var $totalPages = $("#totalPages");
var currentPage = 1;
var titles;
var numOfPages;

function send() {
	
    $.ajax('https://content.guardianapis.com/search?page=' + currentPage + '&show-blocks=body&api-key=7ddad5bc-aaef-41ed-b171-c7400d32bc2f')
        .then(content => {
            numOfPages = content.response.pages;
            titles = content.response.results;
            $totalPages[0].innerHTML = numOfPages;
            
            $table.html(generateTableHtml(titles));
            showOrHide();
        })
        

}

									//${content.blocks.body[0].bodyTextSummary}

function generateTableHtml(content) {
    if (content.length) {

        return content.map(content =>`<div class = "item">${content.webTitle} 
        							  	<span class = "v">v</span>
        							  </div>
										<div class = "item accordion">
											${content.blocks.body[0].bodyTextSummary} 
											<br> <a href = "${content.webUrl}" target="_blank">Read full news</a>
										</div>
        							  `);
	    
    } else {
        return '<p>sorry we couldnt find news for you. Please try again later</p>';
    }
}

//pagination
function increase() {
	if (currentPage < numOfPages) {
		currentPage++;
		send();
	$numberOfForm[0].value = currentPage;
	}
}
function decrease() {
	if (currentPage > 1) {
		currentPage--;
		send();
	$numberOfForm[0].value = currentPage;
	}

}
function numberForm(){
	currentPage = $numberOfForm[0].value;
	showOrHide()
}
function showOrHide(){
	if (currentPage <= 1)
    	$leftButton[0].style.display = 'none';
    else
    	$leftButton[0].style.display = 'inline';

    if (currentPage >= numOfPages)
    	$rightButton[0].style.display = 'none';
    else
    	$rightButton[0].style.display = 'inline';
}


//accordination
function changeAccordination(){
	console.log("обработчик табле бади");
	console.log(window.event.target.className);
	            //window.event.target.nextElementSibling.style.display = 'block';	   // доступ к описанию
          		//window.event.target.children[0].style.transform = 'rotate(180deg)';  // доступ к галочке
          		//window.event.target.style.backgroundColor = "blue";				   // доступ к заголовку
 	if (window.event.target.className == "item"){
 		if (window.event.target.nextElementSibling.style.display == ''){
 			window.event.target.nextElementSibling.style.display = 'block';
 			window.event.target.children[0].style.transform = 'rotate(180deg)';
 			window.event.target.style.backgroundColor = "dodgerblue";
 		}
 		else{
 			window.event.target.nextElementSibling.style.display = '';
 			window.event.target.children[0].style.transform = 'rotate(0deg)';
 			window.event.target.style.backgroundColor = "";
 		}
 	}
 }
