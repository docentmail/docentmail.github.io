---
layout: javascript-file
permalink: /vertices/vertex.js
toc : |
 123
 345
 567
---

    
var aaa="{{page.layout}}";
var bbb="{{page.permalink}}";
var ccc= "{{ page.toc | newline_to_br | strip_newlines | replace: '<br />', '\n"+"' }}";
 //replace: '<br />', '"+"'

/*
Topic UUID;
Topic name;
Topic TOC;
Topic URL;
*/


var verticesDict={};
{% for thepage in site.pages %}{% if thepage.pagerole contains '(vertex)' %}
verticesDict["{{thepage.uuid}}"] =({
uuid: "{{thepage.uuid}}", title: "{{thepage.title}}", url:"{{thepage.permalink}}", 
toc: "{{ thepage.toc | replace: "'", '&#39;'| replace: '"', '&quot;' | newline_to_br | strip_newlines | replace: '<br />', '\n"+"' }}"
});
{% endif %}{% endfor %}    

var hierarchy = 
[
{uuid: "7c8d2afe-2293-416f-aaf4-8e53cd722f54",  // javascript all
 children: [
        {uuid: "79eed495-376a-44c4-aee9-7dbe0accf710",  // javascript core
         children: [
                {   uuid: "868ea026-a188-404d-914f-1a86bc090929", // variables
                    children: []  
                }
                 ,
                {   uuid: "33973ff5-be8e-4435-95dc-bd91d423f389", // Syntax
                    children: []  
                }
                 ,
                {   uuid: "cac07393-773d-47e9-b916-461296f8cb66", // Operators and Expressions
                    children: []  
                }

                 ,             
                {   uuid: "3860560a-6429-41fc-b2aa-5e9b78ea1df6", // Flow control
                    children: []  
                }
                 ,
                {   uuid: "b2fde289-5bf0-46be-8438-9b1730299860", // Functions
                    children: []  
                }
                 ,
                {   uuid: "b507e1c8-ba42-4362-bf55-024db76399a0", // Object generic
                    children: []  
                }
                 ,
                {   uuid: "58482ece-2863-4e3c-9e72-4cc963b2858e", // Array
                    children: []  
                }
                 ,
                {   uuid: "cb488993-f167-4065-8816-7a56ec469960", // Booleans
                    children: []  
                }
        //         ,
        //        {   uuid: "", // 
        //            children: []  
        //        }
         ]
        }
        ,
        {uuid: "223a7f26-0a88-496f-bb57-9030f448ea59", // Javascript in Browser 
         children: [
//                {   uuid: "", // 
//                    children: []  
//                }     
         ]
        }
        ,
        {uuid: "8218fb08-a4c0-4511-bf39-470f5b5cde2b", // JavaScript frameworks and libraries 
         children: [
//                {   uuid: "", // 
//                    children: []  
//                }     
         ]
        }
        ,
        {uuid: "ebe0a5d9-37fd-468d-8952-1abed7a7aa82", // Server side Javascript 
         children: [
//                {   uuid: "", // 
//                    children: []  
//                }     
         ]
        }
        ,
        {uuid: "37761fe3-fa8b-4ba0-9a69-7fecc4b65f7f", //  avaScript Related technologies 
         children: [
//                {   uuid: "", // 
//                    children: []  
//                }     
         ]
        }
//        ,
//        {uuid: "", //
//         children: [
//                {   uuid: "", // 
//                    children: []  
//                }     
//         ]
//        }
   ]
}
];
            
            
function buildNavForTopic(vertexUUID) {
    

}

function getChildrens(vertexUUID) {
    var children = _getChildren(hierarchy, vertexUUID);
    if (children == null ) {
        alert("vertex:"+vertexUUID+"  is not part of hierarchy");
        return;
    }
    return children;
}
            
/**
* null - vertex was not found
* [..] - children UUID array
*/ 
function _getChildren(theArray, vertexUUID) {
    if (theArray.length == 0 ) {
        return null;
    }
    for (var i=0; i<theArray.length; i++) {
        if (theArray[i].uuid == vertexUUID ) {
            return theArray[i].children;
        }
        var reccurcionRez=_getChildren(theArray[i].children, vertexUUID);
        if (reccurcionRez != null) {
            return reccurcionRez;
        }
    }
    return null;          
}
            
/**
* calculate vertex hierarhy where the problem belongs by proble "categories" field:
*    Example of categories: (javascript),(868ea026-a188-404d-914f-1a86bc090929)
*    Usage 
*    buildHierarchiesForProblem( ["javascript"], " (javascript),(868ea026-a188-404d-914f-1a86bc090929)")
*    returns String with HTML of vertex hierarchies
*/
function buildHierarchiesForProblem( categoriesToExclude, categoriesString){
    var rezStr="";
    if (! categoriesString) {
         return rezStr;
    }
    
    var catArr =categoriesString.split(",");
    
    // remove categories that going to be removed
    var catArrReal=[];
    for (var i=0; i<catArr.length; i++) {
    lab1:for (var j=0; j<categoriesToExclude.length;j++){
            if (catArr[i] == "("+categoriesToExclude[j]+")"){
                continue lab1;
            }
            catArrReal.push(catArr[i]);
        }
    }
    // convert "(868ea026-a188-404d-914f-1a86bc090929) " into "868ea026-a188-404d-914f-1a86bc090929"
    for (var i=0; i<catArrReal.length; i++) {
        catArrReal[i] = catArrReal[i].replace(")", "");
        catArrReal[i] = catArrReal[i].replace("(", "");
        catArrReal[i] = catArrReal[i].replace(" ", "");
    }
    
    var rez="";
    for (var i=0; i<catArrReal.length; i++) {
           rez  += getHierarchyForVertexString(catArrReal[i], true)+"&nbsp;&nbsp;";
    }
    return rez;        
    
}
            
/**
* calculated hierarhy navigation 
*/ 
function getHierarchyForVertex(vertexUUID) {
    document.getElementById("hierarhy-navigation").innerHTML=getHierarchyForVertexString(vertexUUID);
    return;
}

/**
* calculated hierarhy navigation 
*/ 
function getHierarchyForVertexString(vertexUUID){ 
    getHierarchyForVertexString(vertexUUID, false);
}
    
            
/**
* calculated hierarhy navigation 
*/ 
function getHierarchyForVertexString(vertexUUID, isLastLink) {
var rezArr =[];
var rezArrCalculated =_getHierarchyForVertex(hierarchy, vertexUUID, rezArr);    
if (rezArrCalculated == null){
    alert("vertex:"+vertexUUID+"  is not part of hierarchy");
        return;
    }
    
    // create navigation controls
    var rezInnerHtml="Hierarchy: [";
    for (var i=0; i< rezArrCalculated.length-1; i++){
        rezInnerHtml += '<a href="'+verticesDict[rezArrCalculated[i]].url+'">'+verticesDict[rezArrCalculated[i]].title+' - &nbsp;</a>';
    }
    if (isLastLink== true){
        rezInnerHtml += '<a href="'+verticesDict[rezArrCalculated[rezArrCalculated.length-1]].url+'">'+verticesDict[rezArrCalculated[rezArrCalculated.length-1]].title+']&nbsp;</a>';
    } else {
        rezInnerHtml +=''+verticesDict[rezArrCalculated[rezArrCalculated.length-1]].title+']';
    }
    return rezInnerHtml;
}

function _getHierarchyForVertex(theArray, vertexUUID, rezArr) {
    if (theArray.length == 0 ) {
        return null;
    }
    for (var i=0; i<theArray.length; i++) {
        rezArr.push(theArray[i].uuid);
        if (theArray[i].uuid == vertexUUID ) {
            return rezArr;
        }
        var reccurcionRez=_getHierarchyForVertex(theArray[i].children, vertexUUID, rezArr);
        if ( reccurcionRez != null ){
            return rezArr;
        }
        rezArr.pop();
    }
    return null;          
}            
 

 
function buildDirectChildrenTOC(vertexUUID){
    var children = getChildrens(vertexUUID);
    if (children == null || children.length==0) {
        return;
    }
    
    var rezInnerHtml="";
    // title and toc and link to vertex
    for (var i=0; i<children.length; i++) {
        var child = verticesDict[children[i].uuid];
        rezInnerHtml += '<a href="'+child.url+'">'+child.title+'</a>'
        +"<br/>" + "<pre>"+child.toc+ "</pre>"+"<br/>";
    }
    
    document.getElementById("childern-verties").innerHTML=rezInnerHtml;
}

/****** find the vertex in Hierarchy **********************************************************/            
/**
* returns reference to point in hierarchy for the vertex
*/
function findVertexInHierarchy(vertexUUID){
    var rez= _findVertexInHierarchyFromPoint(vertexUUID, hierarchy);
    if (rez == null){
        alert("vertex:"+vertexUUID+"  is not part of hierarchy");
        return;
    }
    return rez;
}
/** 
* returns hierarchy point for vertexUUID
* null if not the vertexUUID found
*/
function _findVertexInHierarchyFromPoint(vertexUUID, subHierarchy){            
    for (var i=0; i<subHierarchy.length; i++){
        if (subHierarchy[i].uuid == vertexUUID) {
            return subHierarchy[i];
        }
        var rez=_findVertexInHierarchyFromPoint(vertexUUID, subHierarchy[i].children);
        if (rez != null){
            return rez;
        }
    }
    return null;
}

            
/****** get all children for the node **************************************************/
/**
* return [] of uuid all children for the vertex 
*/ 
function getChildrenForVertex(vertexUUID) {
    var theVertex= findVertexInHierarchy(vertexUUID);
    var childern=[];
    _getAllChildren(theVertex, childern);
    return childern;
}
    
/**
* return [] of uuid all children for the vertex and the vertex uuid
*/ 
function getChildrenForVertexIncluded(vertexUUID) {
    var childern= getChildrenForVertex(vertexUUID);
    childern.push(vertexUUID);
    return childern;
}
            
function _getAllChildren(vertexHierarchyPoint, foundArray){
    if (vertexHierarchyPoint == null ) {
        return;
    }
    for (var i=0; i< vertexHierarchyPoint.children.length;i++) {
        foundArray.push(vertexHierarchyPoint.children[i].uuid);
        _getAllChildren(vertexHierarchyPoint.children[i], foundArray);
    }
}
    
            
            
/*
Javascript as a programming language
Syntax
Variables
Operators and Expressions
Flow controls, loops and iterations
Functions
Advanced functions
Objects generic
Number
Boolean
String 
Array
Date
Math
RegExp
Errors Handling, Exceptions, Debugging
Tools, practical skills, Datasources
Best practice, patterns, approaches
*/
     