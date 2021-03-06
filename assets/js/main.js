/*********************************************************************************************
drilling
**********************************************************************************************/

/**
* returns true if there is something to drill
* false otherwise
**/
function isTodoDrill(){
    var stor=window.localStorage;    
    var drill_problems_string =stor.getItem("drill_problems");
    if ( drill_problems_string == null || typeof drill_problems_string == undefined) {
        return false;
    }
    
    
    var drill_problems = JSON.parse( stor.getItem("drill_problems"));
    if (drill_problems.keys_todo.length>0) {
      return true;
    } 
    return false;
}

/**
* returns true if the URL is in Todo drill list
* false otherwise
*
* usage isUrlInDrillTodo(window.location.pathname)
**/
function isUrlInDrillTodo_u(parUrl){
    var stor=window.localStorage;    
    var drill_problems_string =stor.getItem("drill_problems");
    if (drill_problems_string ==  null || typeof drill_problems_string == undefined) {
        return false;
    }
    
    
    var drill_problems = JSON.parse( drill_problems_string );
    if (drill_problems.keys_todo.length == 0) {
      return false;
    } 
    
    var urlToCheck = removeDomainFromUrl(parUrl);
    
    for (var i=0; i<drill_problems.keys_todo.length; i++) {
       if (urlToCheck === stor.getItem(drill_problems.keys_todo[i])){
        return true;
       }
    }
    return false;
}

/**
* returns true if current window's URL is in Todo drill list
* false otherwise
**/
function isCurrentWindowInDrillTodo(){
     return isUrlInDrillTodo_u(window.location.pathname);
}

/**
* for http://127.0.0.1:4000/javascript/problem/drill-url-ws.html
* returns  "/javascript/problem/drill-url-ws.html"
**/
function removeDomainFromUrl(theUrl){
    return theUrl.replace(/^.*\/\/[^\/]+/, '');
}

/**
* returns URL of next problem to drill
* null
**/
function getNextUrlToDrill(){
   var stor=window.localStorage;  
   var drill_problems_string =stor.getItem("drill_problems");    
   if (drill_problems_string ==  null || typeof drill_problems_string == undefined) {
        return null;
    }    
   
   var drill_problems = JSON.parse( drill_problems_string);
    if (drill_problems.keys_todo.length == 0) {
      return null;
    }    
   var currentUrlNom = Math.floor(Math.random()*drill_problems.keys_todo.length);
   return stor.getItem(drill_problems.keys_todo[currentUrlNom]);    
}

/**
* calculate and return string like
* "Problems to drill 2 of 3" 
**/
function getDrillNumbers(){
   var stor=window.localStorage;  

   var drill_problems = JSON.parse( stor.getItem("drill_problems"));
   var todoNum=drill_problems.keys_todo.length;
   var totalNum=drill_problems.keys_done.length+todoNum;
   return "Problems to drill "+todoNum+" of "+totalNum;
}

/**
*  returns array of the permalinks for todo drilling problems
**/
function getDrillTodoPermalinks(){
   var stor=window.localStorage;  

   var drill_problems = JSON.parse( stor.getItem("drill_problems"));
   var todoKeys=drill_problems.keys_todo;
    
    var permalinks=[];
    for (var i=0; i<todoKeys.length; i++) {
        permalinks.push(stor.getItem(todoKeys[i]));
    }
    return permalinks;
}
/**
* removes all drilling information from storage and reloading page
**/
function cleanDrillData(){
   var stor=window.localStorage;  
    
    var drill_problems_string =stor.getItem("drill_problems");
    if (typeof drill_problems_string == undefined) {
        return;
    }
    
    
    var drill_problems = JSON.parse( drill_problems_string );
    if (drill_problems.keys_todo.length == 0 && drill_problems.keys_done.length == 0) {
      return;
    } 
    
    for (var i=0; i<drill_problems.keys_todo.length; i++) {
        stor.removeItem(drill_problems.keys_todo[i]);
    }

    for (var i=0; i<drill_problems.keys_done.length; i++) {
        stor.removeItem(drill_problems.keys_done[i]);    
    }
         
    stor.removeItem("drill_problems");
    location.reload();
}

/**
*  finds key in WebStorage for problem Url
**/
function getDrillProblemKeyByUrl_u(parUrl){

    var stor=window.localStorage;    
    var drill_problems_string =stor.getItem("drill_problems");
    if (typeof drill_problems_string == undefined) {
        return null;
    }
    
    
    var drill_problems = JSON.parse( drill_problems_string );
    if (drill_problems.keys_todo.length == 0 && drill_problems.keys_done.length == 0) {
      return null;
    } 
    
    var urlToCheck = removeDomainFromUrl(parUrl);
    
    for (var i=0; i<drill_problems.keys_todo.length; i++) {
       if (urlToCheck === stor.getItem(drill_problems.keys_todo[i])){
        return drill_problems.keys_todo[i];
       }
    }

    for (var i=0; i<drill_problems.keys_done.length; i++) {
       if (urlToCheck === stor.getItem(drill_problems.keys_done[i])){
        return drill_problems.keys_done[i];
       }
    }

    return null;

}

/**
*  finds key in WebStorage for current window url
**/
function getDrillProblemKeyByUrl(){
    getDrillProblemKeyByUrl_u(window.location.pathname);
}

/**
* proceeses [KnowThe problem] button click for "urlParam" problem
*    moves problem key from todo to done
*    picks next problem
*    reload window
**/
function knowTheProblem_u(urlParam){
   var stor=window.localStorage;  
    
    var problemKey= getDrillProblemKeyByUrl_u(urlParam);
    var drill_problems = JSON.parse( stor.getItem("drill_problems") );
    
    if (problemKey != null) {
        var index = drill_problems.keys_todo.indexOf(problemKey);   
        if (index !== -1) {
            drill_problems.keys_todo.splice(index, 1);
        }

        var index = drill_problems.keys_done.indexOf(problemKey);   
        if (index == -1) {
            drill_problems.keys_done.push(problemKey);
        }
    }
    stor.setItem("drill_problems", JSON.stringify(drill_problems) );
    
    var nextProblem= getNextUrlToDrill();
    if (nextProblem ==null) {
        alert("Congrats! you are done with drill");
        window.location = "/";
    } else {
        window.location = getNextUrlToDrill();
    }

}

/**
* do knowTheProblem_u for current window
**/
function knowTheProblem(){
    knowTheProblem_u(window.location.pathname);
}


/**
* do knowTheProblem_u for current window
**/
function doNotKnowTheProblem(){
    window.location = getNextUrlToDrill();
}



function knowit(){
  problemUrls.splice(currentUrlNom,1);
  setNextUrlIndex();
  showCurrentProblem();    
}
    
function donotknowit(){
  setNextUrlIndex();
  showCurrentProblem();    
}

function setNextUrlIndex(){
   currentUrlNom = Math.floor(Math.random()*problemUrls.length);
}
    
function showCurrentProblem(){
        console.log("showCurrentProblem - start");
    if (problemUrls.length==0) {
        document.getElementById('iframeproblem').src = "about:blank";
        alert("there is no more probles to dril!!");
        return;
    }
    // document.getElementById('iframeproblem').src = problemUrls[currentUrlNom];
    window.location = problemUrls[currentUrlNom];
    //displayNumbers();
}

function displayNumbers(){
    document.getElementById('showNumbers').innerHTML="Probles to drill "+problemUrls.length+" of "+initialUrlCount;
}

/******************************************************************************************
marked problems
******************************************************************************************/
function markCurrentProblem(){
    markProblem(window.location.pathname);
}

/**
*   see markProblem(parUrl)+ reload page
**/
function markCurrentProblem_reload(){
    markCurrentProblem();
    location.reload();
}


function markProblem(parUrl){
  var urlToMark = removeDomainFromUrl(parUrl);
    
  var stor=window.localStorage;  
  var marked_problems_str=stor.getItem("marked_problems");
  var marked_problems;    
  if (marked_problems_str == null) {
      marked_problems=[parUrl];
  } else {
      marked_problems = JSON.parse( stor.getItem("marked_problems") );    
      for (var i=0; i< marked_problems.length; i++) {
          if (marked_problems[i] == urlToMark) { return; }
      }
      marked_problems.push(urlToMark);
  }
  stor.setItem("marked_problems", JSON.stringify(marked_problems) );    
     
//        window.location = getNextUrlToDrill();
    
}

/**
* returns array with marked problems URL
* returns null if there is no "marked_problems" item in storage
**/
function getAllMarkedProblemUrls(){
    
  var stor=window.localStorage;  
  var marked_problems_str=stor.getItem("marked_problems");
  if (marked_problems_str == null) {
      return null;
  } 
  return JSON.parse( marked_problems_str );        
}
/**
* returns true if there is marked problems
* false otherwise
**/
function isMarkedProblems(){
    var stor=window.localStorage;    
    var marked_problems_string =stor.getItem("marked_problems");
    if ( marked_problems_string == null || typeof marked_problems_string == undefined) {
        return false;
    } 
    return true;
}


/**
* returns true if current problem is marked
* false otherwise
**/
function isCurrentProblemMarked(){
    return isProblemMarked(window.location.pathname);
}


/**
* returns true if problem with URL is marked
* false otherwise
**/

function isProblemMarked(parUrl){
    var urlToCheck = removeDomainFromUrl(parUrl);
    
    var stor=window.localStorage;    
    var marked_problems_string =stor.getItem("marked_problems");
    if ( marked_problems_string == null || typeof marked_problems_string == undefined) {
        return false;
    } 
    
    var marked_problems = JSON.parse(marked_problems_string);
    for (var i=0; i< marked_problems.length; i++) {
          if (marked_problems[i] == urlToCheck) { return true; }
    }
    return false;
}

/**
*   see unMarkProblem(parUrl)+ reload page
**/
function unMarkCurrentProblem_reload(){
    unMarkCurrentProblem();
    location.reload();
}


/**
*   see unMarkProblem(parUrl)
**/
function unMarkCurrentProblem(){
    unMarkProblem(window.location.pathname);
}

/**
*   returns true if the problem was removed
*   false otherwise - usually case when problem was not in list 
**/
function unMarkProblem(parUrl){    
  var urlToMark = removeDomainFromUrl(parUrl);
    
  var stor=window.localStorage;  
  var marked_problems_str=stor.getItem("marked_problems");
  var marked_problems;    
  if (marked_problems_str == null) {
      return false;
  } 
  marked_problems = JSON.parse( marked_problems_str);    
  for (var i=0; i< marked_problems.length; i++) {
      if (marked_problems[i] == urlToMark) { 
          marked_problems.splice(i,1);
          if (marked_problems.length == 0) {
            stor.removeItem("marked_problems");
          } else {
            stor.setItem("marked_problems", JSON.stringify(marked_problems) );    
          }
          return true; 
      }
  }

  return false; 
}

/**
* removes all marked_problems
**/
function cleanAllMarkedProblems(){
  var stor=window.localStorage;  
  stor.removeItem("marked_problems");
}


/******************************************************************************************
tagged problems
******************************************************************************************/
function tagCurrentProblem(){
    tagProblem(window.location.pathname);
}

/**
*   see tagProblem(parUrl)+ reload page
**/
function tagCurrentProblem_reload(){
    tagCurrentProblem();
    location.reload();
}


function tagProblem(parUrl){
  var urlToTag = removeDomainFromUrl(parUrl);
    
  var stor=window.localStorage;  
  var tagged_problems_str=stor.getItem("tagged_problems");
  var tagged_problems;    
  if (tagged_problems_str == null) {
      tagged_problems=[parUrl];
  } else {
      tagged_problems = JSON.parse( stor.getItem("tagged_problems") );    
      for (var i=0; i< tagged_problems.length; i++) {
          if (tagged_problems[i] == urlToTag) { return; }
      }
      tagged_problems.push(urlToTag);
  }
  stor.setItem("tagged_problems", JSON.stringify(tagged_problems) );    
     
//        window.location = getNextUrlToDrill();
    
}

/**
* returns array with tagged problems URL
* returns null if there is no "tagged_problems" item in storage
**/
function getAllTaggedProblemUrls(){
    
  var stor=window.localStorage;  
  var tagged_problems_str=stor.getItem("tagged_problems");
  if (tagged_problems_str == null) {
      return null;
  } 
  return JSON.parse( tagged_problems_str );        
}
/**
* returns true if there is tagged problems
* false otherwise
**/
function isTaggedProblems(){
    var stor=window.localStorage;    
    var tagged_problems_string =stor.getItem("tagged_problems");
    if ( tagged_problems_string == null || typeof tagged_problems_string == undefined) {
        return false;
    } 
    return true;
}


/**
* returns true if current problem is tagged
* false otherwise
**/
function isCurrentProblemTagged(){
    return isProblemTagged(window.location.pathname);
}


/**
* returns true if problem with URL is tagged
* false otherwise
**/

function isProblemTagged(parUrl){
    var urlToCheck = removeDomainFromUrl(parUrl);
    
    var stor=window.localStorage;    
    var tagged_problems_string =stor.getItem("tagged_problems");
    if ( tagged_problems_string == null || typeof tagged_problems_string == undefined) {
        return false;
    } 
    
    var tagged_problems = JSON.parse(tagged_problems_string);
    for (var i=0; i< tagged_problems.length; i++) {
          if (tagged_problems[i] == urlToCheck) { return true; }
    }
    return false;
}

/**
*   see unTagProblem(parUrl)+ reload page
**/
function unTagCurrentProblem_reload(){
    unTagCurrentProblem();
    location.reload();
}


/**
*   see unTagProblem(parUrl)
**/
function unTagCurrentProblem(){
    unTagProblem(window.location.pathname);
}

/**
*   returns true if the problem was removed
*   false otherwise - usually case when problem was not in list 
**/
function unTagProblem(parUrl){    
  var urlToTag = removeDomainFromUrl(parUrl);
    
  var stor=window.localStorage;  
  var tagged_problems_str=stor.getItem("tagged_problems");
  var tagged_problems;    
  if (tagged_problems_str == null) {
      return false;
  } 
  tagged_problems = JSON.parse( tagged_problems_str);    
  for (var i=0; i< tagged_problems.length; i++) {
      if (tagged_problems[i] == urlToTag) { 
          tagged_problems.splice(i,1);
          if (tagged_problems.length == 0) {
            stor.removeItem("tagged_problems");
          } else {
            stor.setItem("tagged_problems", JSON.stringify(tagged_problems) );    
          }
          return true; 
      }
  }

  return false; 
}

/**
* removes all tagged_problems
**/
function cleanAllTaggedProblems(){
  var stor=window.localStorage;  
  stor.removeItem("tagged_problems");
}

/******************************************************************************************
common utilities
******************************************************************************************/

/**
* Shows / hides specific block on the page. Designed to be used as onclick event 
*
*idButton - id of button that toggles visibility of content
*idTarget - id of the div (could be other element) that would hides/shows
*toggleContentName - part of the name of the togle button. E.g. for "tip" would be "Show tip" / "Hide tip"
**/
function toggleVisibility(idButton, idTarget, toggleContentName) {
	var targetEle = document.getElementById(idTarget);
	var buttonEle = document.getElementById(idButton);    
    
    if (targetEle.style.display == "block" ){
        targetEle.style.display = "none";
		buttonEle.value = "Show "+toggleContentName;
    } else {
        targetEle.style.display = "block";
		buttonEle.value = "Hide "+toggleContentName;
    }
} 

/**
* Shows / hides specific block on the page by ID. 
* add teturns false; to block <a ..> reload page
**/
function simpleToggleVisibility(idTarget) {
	var targetEle = document.getElementById(idTarget);
    
    if (targetEle.style.display == "block" ){
        targetEle.style.display = "none";
    } else {
        targetEle.style.display = "block";
    }
    
} 
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

/******************************************************************************************
Problem specific
******************************************************************************************/



    
/** Executes String as JavaScript. 
*   Parameter: idTextAreaWithJsCode - id of the the textarea element that contains text to evaluate
*
*   here is fragment of HTML that is using the function
*
*    <input type="button" class="toggle-button" id="toggleEval" onclick="toggleVisibility('toggleEval', 'eval', 'eval')" value="Show eval"/>
*    <div id="eval" style="display: none">
*            <textarea  id="evalme" class="eval-textarea">Type your script here.</textarea>
*            <br/>    
*            <input type="button" class="eval-button" id="evalbut" onclick="doEval('evalme')" value="Execute script"/>
*    </div>    
*
**/
function doEval(idTextAreaWithJsCode) {
	var textArea = document.getElementById(idTextAreaWithJsCode);
    var jsToEval= textArea.value;
    
    try {
      eval(jsToEval);
    } catch(e) {
      alert("Fix errors in you script: "+ e);    
      var err = e.constructor('Error in Evaled Script: ' + e.message);
      // +3 because `err` has the line number of the `eval` line plus two.
      err.lineNumber = e.lineNumber - err.lineNumber + 3;
      throw err;
    }
} 
