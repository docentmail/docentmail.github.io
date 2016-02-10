---
layout: javascript-file
permalink: /javascript/subjects/problem.js
toc : |
 123
 345
---

var problems=[];
{% for thePage in site.pages %}{% if thePage.pagerole contains '(problem)' and  thePage.categories contains '(javascript)' %}    
problems.push({
categories: "{{thePage.categories}}", title: "{{thePage.title}}", permalink:"{{thePage.permalink}}", 
complexity: "{{thePage.complexity}}", author: "{{thePage.author}}", importance:"{{thePage.importance}}",     
header: "{{ thePage.header | replace: '"', '&quot;' | newline_to_br | strip_newlines | replace: '<br />', '\n"+"' }}"
});
{% endif %}{% endfor %}    




/**
* returns array of problems objects for array of vertice UUIDs
*/            
function getProblemsForTopics(vertexUUIDArray) {
    var rez=[];
    lab1: for (var i=0;i<problems.length; i++) {
        for (var j=0; j<vertexUUIDArray.length; j++){
            if (problems[i].categories.indexOf("("+vertexUUIDArray[j]+")")>-1){
                rez.push(problems[i]); 
                continue lab1;
            }
        }
    }
    
    // sort problems by complexity
    return sortByComplexity(rez);
}

/**
* sorts array of the problem by complexity
**/
function sortByComplexity(theProblemArr){
    // sort problems by complexity
    function compare(a,b) {
      if (a.complexity < b.complexity)
        return -1;
      else if (a.complexity > b.complexity)
        return 1;
      else 
        return 0;
    }

    return theProblemArr.sort(compare);
}

            
/**
* add hierarhy for problem
called on topic-for-subject    as:  addHierarchiesToProblem( problemsArray[i].permalink, problemsArray[i].categories); 
called on topic-for-subject    as:  
*/
function addHierarchiesToProblem(probUrl, categoriesString){
    var preffId="mark_problem_p_"; // unique p id is "mark_problem_p_"+probUrl
    document.getElementById(preffId+probUrl).innerHTML += "<br/>"+ buildHierarchiesForProblem( ["javascript"], categoriesString);
}


/**
*  builds list of the problems as HTML and add it as inner HTML into element with id idElementToInsert
* parameters:
*   theProblemsArray - array of the problems object  
*   idElementToInsert - ID of the div to insert list as innerHtml 
*   
**/
function insertProblemList(theProblemsArray, idElementToInsert) {    
    var rezHtml="";
    for (var i=0; i<theProblemsArray.length; i++) {
        rezHtml+=
    '        <div class="item">'+
    '            <a class="topic-problem-link" href="'+theProblemsArray[i].permalink+'">'+theProblemsArray[i].title+'</a>'+
    '            <p class="topic-problem-complexity"  id="mark_problem_p_'+theProblemsArray[i].permalink+'">complexity: <b>'+theProblemsArray[i].complexity+'</b> ;  importance: <b>'+theProblemsArray[i].importance+'</b>; author: <b>'+theProblemsArray[i].author+'</b>'+
    '            </p>'+
    '            <p>'+theProblemsArray[i].header+'</p>'+
    '            <hr/>'+
    '        </div>';




    }
    document.getElementById(idElementToInsert).innerHTML=rezHtml;

    for (var i=0; i<theProblemsArray.length; i++) {
        addTagingButton(theProblemsArray[i].permalink); 
        addMarkingButton(theProblemsArray[i].permalink); 
        addHierarchiesToProblem( theProblemsArray[i].permalink, theProblemsArray[i].categories);    
    }
    
}

            
/**
* reruns array of the problems objects for parameter permalinsArray wirh problems permalinks
* parameter:
*   permalinsArray - rray of problems permaliks
**/
function getProblemsByPermalinks(permalinsArray){
    var problemsObj=[];
    lab1:for (var i=0; i<permalinsArray.length; i++) {
        for (var j=0;j<problems.length; j++) {
            if (problems[j].permalink == permalinsArray[i]) {
                problemsObj.push(problems[j]);
                continue lab1;
            }
        }
    }
    // sort problems by complexity
    return sortByComplexity(problemsObj);
    
}
