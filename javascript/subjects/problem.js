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
* returns array of problems' permalinks for array of vertice UUIDs
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
    function compare(a,b) {
      if (a.complexity < b.complexity)
        return -1;
      else if (a.complexity > b.complexity)
        return 1;
      else 
        return 0;
    }

    rez.sort(compare);
    
    return rez;
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
