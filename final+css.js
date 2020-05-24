
const dataEl=document.getElementById("data");

const selectEl = document.getElementById("factor-selector");

const buttons = [document.getElementById("tool-1"), document.getElementById("tool-2"),document.getElementById("tool-3"),document.getElementById("tool-4"),document.getElementById("tool-5")];

const save=document.getElementById("saveImage");

const trans=document.getElementById("switch");

const clean=document.getElementById("clean");

var d3 = Plotly.d3;

var img_jpg = d3.select('#jpg-export');

const allFactors = ["GDP","Life expectancy","Freedom","Generosity","Perceptions of corruption"];

//values of current state
var buttonState=0;
var currentYear = "2019";
var currentSelector = "GDP";


Plotly.d3.csv("all_clean.csv", readData);


function uniqueValuesInArray(array) {
	return Array.from(new Set(array));
}

function getColumnNames(csvJsonData) {
	return Object.keys(csvJsonData[0]);
}

function maxNumberInArray(array) {
	return Math.max(...array);
}


function minNumberInArray(array) {
	return Math.min(...array);
}

//return maxmum in a array, not zero
function maxNumberInArray2(filename,year) {
    var array= notZero(filename
        .filter((row) => filterByYear(row,year))
        .map((row) => +row['Happiness Score']));
	return Math.max(...array);
}

//return minmun in a array, not zero
function minNumberInArray2(filename,year) {
    var array= notZero(filename
        .filter((row) => filterByYear(row,year))
        .map((row) => +row['Happiness Score']));
	return Math.min(...array);
}


//clean zero value in a array
function notZero(array){
    var result=[];
    for(i=0;i<array.length;i++){
        if(array[i]!=0){
            result.push(array[i]);
            
        }
    }
    return result;
}



function filterByNameAndYear(row, name, year) {
	return row.Country === name && row.Year === year;
}



// to change the value
function exaggerateValue (array, value){

    var  max_of_array = Math.max.apply(Math, array);
  
    return Math.pow(value/max_of_array,2)*100;  

}

// to change the value
function exaggerateValue2 (array){

    var  max_of_array = Math.max.apply(Math, array);
    var newArray=[];
    
    for(i=0;i<array.length;i++){
        newArray[i]= Math.pow(array[i]/max_of_array,2)*1000;       
    }  
    return newArray;  
}

//find the the frame that match users choice
function findFrame(year,select,array){

    for(i=0;i<array.length;i++){
        var currentstate=year+select;
        if(array[i].name==currentstate){
            index=i;
            break;
        }

    }
    return index;
}

//avrage of an array
function averageArray(array){
    var total = 0;
    for(var i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total / array.length;
}

//filter by year
function filterByYear(row, year) {
	return row.Year === year;
}

//filter by region
function filterByRegion(row, region) {
	return row.Region === region;
}



//return highest/lowest index
function highlowIndexInFrame(array,num) {
    index=-1;
    for(i=0;i<array.length;i++){
        if(array[i].y[0]==num){
            index=i;
            break;
        }      
    }
	return index;
}

//clean all selected annotation tag
function cleanTags(array){  
    for(i=array.length-1;i>=3;i--){
        array.pop();
    }

    return;
}

//match buttons with years
function buttonYear(id){
    if(id=="tool-1"){
        return "2019";
    }
    else if (id=="tool-2"){
        return "2018";
    }
    else if (id=="tool-3"){
        return "2017";
    }
    else if (id=="tool-4"){
        return "2016";
    }
    else{
        return "2015";
    }
}


//different factors have different, return the color palette of selected factor 
function selectColorPalette(factor){
    var colorPalette=[];
    if(factor==allFactors[0]){

        colorPalette=['#9644C7','#8D46B5','#8547A9','#8C5E9A','#812CA8','#793198','#703789','#683E7A','#5F446B','#584C5D'];

    }
    else if(factor==allFactors[1]){

        colorPalette=['#E41028','#D4142A','#C61A2E','#B62032','#A82635','#992D39','#8A353E','#7A3D44','#6B4449','#5C4B4D'];

    }
    else if(factor==allFactors[2]){
        colorPalette=['#53AB32','#4F9C31','#4D9430','#4C8933','#4B8434','#369933','#3B8A39','#417A3F','#486947','#4E5A4D'];

    }
    else if(factor==allFactors[3]){
        colorPalette=['#EE8725','#DD8025','#CB7A26','#BB752A','#AD702E','#9E6B33','#8D6639','#7B5F3E','#6C5A46','#5C554C'];

    }
    else{
        colorPalette=['#1048E2','#1548D2','#1A49C3','#214AB5','#274BA6','#2E4C99','#364D88','#3E4E77','#434E6B','#4B505C'];

    }

    return colorPalette;
}


//match the color palette for scatter plot
function colorMatchPlot(trace, colorPalette){
    if ( trace.x=="Australia and New Zealand"){
        trace.marker.color=colorPalette[0]; 
    } 

    else if ( trace.x =="Central and Eastern Europe"){
        trace.marker.color= colorPalette[5];
    }

    else if ( trace.x=="Eastern Asia"){
        trace.marker.color=colorPalette[4];
    }

    else if ( trace.x=="Latin America and Caribbean"){
        trace.marker.color=colorPalette[3];
    }

    else if ( trace.x=="Middle East and Northern Africa"){
        trace.marker.color= colorPalette[7];
    }
       
    else if ( trace.x=="North America"){
        trace.marker.color=colorPalette[1];       
    }
        
    else if ( trace.x=="Southeastern Asia"){
        trace.marker.color= colorPalette[6];
    }

    else if ( trace.x=="Southern Asia"){
        trace.marker.color=colorPalette[8];       
    }

    else if ( trace.x=="Sub-Saharan Africa"){
        trace.marker.color=colorPalette[9];
    }  

    else if ( trace.x=="Western Europe"){
        trace.marker.color=colorPalette[2];            
    }

    return trace.marker.color;
}

//match the color palette for map
function colorMatchMap(factor){

    var colorPalette=[];
 
    if(factor==allFactors[0]){

        colorPalette.push(['0', '#584C5D']);          
        colorPalette.push(['1.0', '#9644C7']);

    }
    else if(factor==allFactors[1]){

        colorPalette.push(['0', '#5C4B4D']);          
        colorPalette.push(['1.0', '#E41028']);

    }
    else if(factor==allFactors[2]){
        colorPalette.push(['0', '#4E5A4D']);          
        colorPalette.push(['1.0', '#53AB32']);

    }
    else if(factor==allFactors[3]){
        colorPalette.push(['0', '#5C554C']);          
        colorPalette.push(['1.0', '#EE8725']);

    }
    else{
        colorPalette.push(['0', '#4B505C']);          
        colorPalette.push(['1.0', '#2F69F5']);

    }

    return colorPalette;
}

//check whether is map version or scatter version
trans.addEventListener ("click", function() {

    if (buttonState==0){
        buttonState=1;
    }else{
        buttonState=0;
    }

    Plotly.d3.csv("all_clean.csv", readData);
  
});

// Create <option>elements inside <select>.
allFactors.forEach((factor) => { 
    const option = document.createElement("option");
    option.textContent = factor;

    selectEl.appendChild(option);
});


function readData(filename) {
    

//when slector is changed, check whether is map version or scatter version, and draw corresponding verion
    selectEl.addEventListener("change", function (e) {
        
        currentSelector=e.target.value;
        
        if (buttonState==1){
            
            setMap(currentSelector, filename,currentYear);
        }
        //clean clickable annotation
        newAnnotation={}; 
    });

//initialize the first plot
    if (buttonState==0){   
        setPlot(currentSelector, filename,true);

    }else{
        setMap(currentSelector, filename,currentYear);
    }
    
    
//when one for the year buttons is clicked, check whether is map version or scatter version, and draw corresponding verion
    buttons.forEach((button) => {
       
            button.addEventListener("click", function (e) {
                 if(buttonState==1){

                currentYear=buttonYear(button.id);
                
                setMap(currentSelector, filename,currentYear);
               
                 }
            
            });       

    });

}




//create a scatter plot
function setPlot(chosenFactor, filename, initial) {
    const years = uniqueValuesInArray(filename.map((row) => row["Year"]));
    const names = uniqueValuesInArray(filename.map((row) => row["Country"]));
    const regions = uniqueValuesInArray(filename.map((row) => row["Region"]));

    //find the extremums of chosen factor
    var highest=maxNumberInArray2(filename,currentYear);
    var lowest=minNumberInArray2(filename,currentYear);

     //find the extremums's indexs
    var highestIndex=filename
    .filter((row) => filterByYear(row,currentYear))
    .map((row) => +row['Happiness Score'])
    .indexOf(highest);
    
    var lowestIndex=filename
    .filter((row) => filterByYear(row,currentYear))
    .map((row) => +row['Happiness Score'])
    .indexOf(lowest);

    //find the average of each region, and show them as a line 
    var chosenFactorArray = filename.map((row)=>row[chosenFactor]);
    var regionAver=[];
    regions.forEach((region) => {

        regionAver.push(averageArray(filename
            .filter((row) => filterByYear(row, currentYear))
            .filter((row) => filterByRegion(row, region))
            .map((row) => +row['Happiness Score']))) ;

    });
    var averTrace={
        x: uniqueValuesInArray(filename.map((row) => row["Region"])),
        y: regionAver,
        text: [],
        mode:"lines+makers",
        opacity: 0.8,

        line:{
            color: 'rgb(163, 163, 163)',
            dash:'dot'
        }
    };

    // create initial dataset with current year, current factor
    const data = [];
    names.forEach((uniqueName) => {
        const trace = {
            x: [],
            y: [],
            text: [],
            name: uniqueName,
            mode: "markers",
            marker: {
                size: [],
                sizemode: "area",
                opacity: [],
                color: [],
            },
        };

        trace.x = filename
        .filter((row) => filterByNameAndYear(row, uniqueName, years[0]))
        .map((row) => row.Region);

        trace.y = filename
            .filter((row) => filterByNameAndYear(row, uniqueName, years[0]))
            .map((row) => +row['Happiness Score']);
            
        trace.text = filename
            .filter((row) => filterByNameAndYear(row, uniqueName, years[0]))
            .map((row) => `Score: ${row['Happiness Score']} <br>${chosenFactor}: ${row[chosenFactor]}`);

        trace.marker.size = exaggerateValue(chosenFactorArray,filename
        .filter((row) => filterByNameAndYear(row, uniqueName,years[0]))
        .map((row) => +row[chosenFactor]));

        trace.marker.opacity=0.3;

        colorMatchPlot(trace,selectColorPalette(chosenFactor));

        data.push(trace);

        });
        data.push(averTrace);


        //highest annotation
        var high_annotations = [
            {
                text: 'Happiest<br>' + highest.toFixed(3),
                x: data[highestIndex].x[0],
                y: highest,
                yref: 'y', xref: 'x',
                ay: -40, ax: 0
            },
        ]

         //lowest annotation
        var low_annotations = [
            {
                text: 'Unhappiest<br>' + lowest.toFixed(3),
                x: data[lowestIndex].x[0],
                y: lowest,
                yref: 'y', xref: 'x',
                ay: 30, ax: 20
            }
        ]

        //avrage annotation
        var aver_annotations = [
            {
                text: 'Avrage<br>' + averageArray(regionAver).toFixed(3),
                x: 0.04,
                y: averageArray(regionAver),
                yref: 'y', xref: 'x',
                ay: 40, ax: 0,
                arrowwidth: 1,       
                arrowhead: 7
            }
        ]
       
         const plotConfig = {
             // Self-explanatory, it sets zooming to be done by scroll!
             scrollZoom: true,
         };

         //create layout
         const layout = {
                       
             showlegend: false,
             title:`Happiness Score VS <b>${chosenFactor}</b>`,
            
             xaxis: {
                 range: [0, maxNumberInArray(filename.map((row) => row.Region))],
                 showgrid: false,
                 zeroline: false,
                 tickfont: {
                    size: 9,
                  }
             },

             yaxis: {
                 range: [2.1, maxNumberInArray(filename.map((row) => +row['Happiness Score']))+0.3],
                 showgrid: false,
                 zeroline: false,
                 showline: false,
                 autotick: true,
                ticks: '',
                showticklabels: false
             },
             
             height: 600,
             plot_bgcolor: '#edeae5',
             paper_bgcolor:'#edeae5',

             hovermode: "closest",

             annotations: [...aver_annotations,...low_annotations, ...high_annotations],

             shapes: [
                {
                    type: 'line',
                    text:"11",
                    xref: 'paper',
                    x0: 0.03,
                    y0: averageArray(regionAver),
                    x1: 0.97,
                    y1: averageArray(regionAver),
                    line:{
                        color: 'rgb(163, 163, 163)',
                        width: 1.5,
                        
                    }
                }
            ]            
         };   

     if(initial){           
         Plotly.newPlot(dataEl,data,layout,plotConfig);  
     } 

     //create all the frames of each factor and each year, 25 all together
    const animationFrames = [];

    // We are going to create an object for each year! 
    years.forEach((year) => {

        allFactors.forEach((factor) => {
               // Creating a trace for each year to animate!
               var chosenFactorArray = filename.map((row)=>row[factor]);
               const obj = {
                   name: year+factor,

                   // This is an array of trace objects!
                   // However we don't need to include the styling or apperance
                   // Excluding the .mode, .marker.sizemode
                   data: [],
                   layout: {},
                   
               };

               names.forEach((uniqueName) => {
                   const dataObj = {
                        text:  filename
                        .filter((row) => filterByNameAndYear(row, uniqueName, year))
                        .map((row) => `Score: ${row['Happiness Score']} <br>${factor}: ${row[factor]}`),

                       x: filename
                           .filter((row) => filterByNameAndYear(row, uniqueName, year))
                           .map((row) => row.Region),
                       y: filename
                           .filter((row) => filterByNameAndYear(row, uniqueName, year))
                           .map((row) => +row['Happiness Score']),
                       marker: {
                           size: exaggerateValue(chosenFactorArray,filename
                               .filter((row) => filterByNameAndYear(row, uniqueName, year))
                               .map((row) => +row[factor])),                         
                       },                    
                   };
                
                   colorMatchPlot(dataObj,selectColorPalette(factor));

                   obj.data.push(dataObj);                  
           });

            var regionAver=[];
            regions.forEach((region) => {
        
            regionAver.push(averageArray(filename
                    .filter((row) => filterByYear(row, year))
                    .filter((row) => filterByRegion(row, region))
                    .map((row) => +row['Happiness Score']))) ;
        
            });

            var averTrace={
                x: uniqueValuesInArray(filename.map((row) => row["Region"])),
                y: regionAver,
                mode:"lines+makers",
        
            };

            obj.data.push(averTrace);

            //find the extremums in this year and this factor            
            highest=maxNumberInArray2(filename,year);
            lowest=minNumberInArray2(filename,year);
            //find the extremums' indexs
            highestIndex=highlowIndexInFrame(obj.data,highest);
            lowestIndex=highlowIndexInFrame(obj.data,lowest);

            //Annotations of extremuns and average
            high_annotations = [
                {
                    text: 'Happiest:<br>' + highest.toFixed(3),
                    x: obj.data[highestIndex].x[0],
                    y: highest,
                },
            ]   
            low_annotations = [
                {
                    text: 'Unhappiest:<br>' + lowest.toFixed(3),
                    x: obj.data[lowestIndex].x[0],
                    y: lowest,
                }
            ]
            aver_annotations = [
                {
                    text: 'Avrage<br>' + averageArray(regionAver).toFixed(3),
                   
                    y: averageArray(regionAver),
                   
                }
            ]
            
            obj.layout= {     

                title:`Happiness Score VS <b>${factor}</b>`,       
                annotations: [...aver_annotations,...low_annotations, ...high_annotations],
            };
      
           animationFrames.push(obj);
          
       });
       
   });

 //if clicks year buttons    
    buttons.forEach((button) => {
        button.addEventListener("click", function (e) {

            //change the currentYear
            currentYear=buttonYear(button.id);
            var index=findFrame(currentYear,currentSelector,animationFrames);

            //Animation durtion
            const animationOptions = {
                transition: {
                    easing: "cubic-in-out",
                    duration: 1500,
                },
                
                frame: {
                    duration: 500,
                    redraw: false,
                }
            };
            // clean the clickable tags
            cleanTags(animationFrames[index].layout.annotations);
            
            var animateLayout={
                layout:{
                    annotation: animationFrames[index].layout.annotations,
                },
                traces: [0]
            }
            //animate the layout
            Plotly.animate(dataEl,animateLayout,animationOptions);
            //animate data
            setTimeout(() => Plotly.animate(dataEl, animationFrames[index],animationOptions), 550);
           
        });

    });
  
    selectEl.addEventListener("change", function (e) {
        // e.target.value is a quick way of getting the selected option.      
        
        select=e.target.value;

        var index=findFrame(currentYear,select,animationFrames);
        
        Plotly.animate(dataEl, animationFrames[index])

        cleanTags(dataEl.layout.annotations);
        Plotly.relayout('data', '', 'remove');   
    });

    //click "clean options", clean all the clickable tags on the canvas
    clean.addEventListener ("click", function() {

        cleanTags(dataEl.layout.annotations);
        Plotly.relayout('data', '', 'remove');
          
    });

    //save image function
    save.addEventListener("click", function (e) {

        Plotly.plot(
            'data',
            data,
            layout
          ).then(function(gd){
            Plotly.toImage(gd,{height:600,width:800})
              
              .then(function(url){
                img_jpg.attr("src",url);
                return Plotly.toImage(gd,{format:'jpeg',height:600,width:800});
              })
              
          });       
       
     });


//if the object in canvas is clicked
dataEl.on('plotly_click',
    function(data){
      var point = data.points[0];

      // create new clickable tag
        var newAnnotation={};  
        newAnnotation = {
        x: point.xaxis.d2l(point.x),
        y: point.yaxis.d2l(point.y),
        arrowhead: 6,
        ax: 0,
        ay: -80,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        arrowcolor: point.fullData.marker.color,
        font: {size:12},
        bordercolor: point.fullData.marker.color,
        borderwidth: 3,
        borderpad: 4,
        text:  (point.data.name) + '<br>' +(point.data.text) ,
              
    };

    var divid = document.getElementById('data');
    var newIndex = (divid.layout.annotations || []).length;
	
     // delete instead if clicked twice
    if(newIndex) {
        var foundCopy = false;
        divid.layout.annotations.forEach(function(ann, sameIndex) {
          if(ann.text === newAnnotation.text ) {
            Plotly.relayout('data', 'annotations[' + sameIndex + ']', 'remove');
            foundCopy = true;
          }
        });
        if(foundCopy) return;
    }

    Plotly.relayout('data', 'annotations[' + newIndex + ']', newAnnotation);
  });


// hover the object on the canvas
    dataEl.on("plotly_hover", function (data) {   
        var point = data.points[0];

        var divid = document.getElementById('data');
        var hoverIndex =point.curveNumber ;
       
        newMarker={
            'marker.opacity': 0.95,
            'marker.line.color':  'rgb(155, 155, 155)',
                'marker.line.width': 2
        };

        Plotly.restyle('data',newMarker ,hoverIndex);
    });

// unhovor change back
    dataEl.on('plotly_unhover', function(data){

        var point = data.points[0];

        var divid = document.getElementById('data');
        var hoverIndex =point.curveNumber ;

        newMarker={
            'marker.opacity': 0.3,
            'marker.line.color':  'rgb(231, 99, 250)',
            'marker.line.width': 0
        };
        
        Plotly.restyle('data',newMarker ,hoverIndex);        
    });
	
}



// create a bubble map
function setMap(chosenFactor, filename,year) {
    
    const names = uniqueValuesInArray(filename.map((row) => row["Country"]));
    const regions = uniqueValuesInArray(filename.map((row) => row["Region"]));
 
        const data2 = [];

            const trace = {
                locations: [],
                locationmode:"ISO-3",
                type:"scattergeo",
                text: [],
                name: [],
                
                mode: "markers",
                marker: {
                    size: [],
                    sizemode: "area",
                    opacity: [],
                    color: [],
                    colorscale:[],

                    colorbar:{
                        title: "Happiness Score",
                    },
                    line:{
                        color:[],
                        width:[],
                    }
                },
            };
            
            trace.locations = filename
            .filter((row) => filterByYear(row,  year))
            .map((row) => row['Code']);

            trace.marker.color = filename
                .filter((row) => filterByYear(row, year))
                .map((row) => +row['Happiness Score']);
            
            trace.name = filename
                .filter((row) => filterByYear(row, year))
                .map((row) => row['Country']);
                
            
            trace.text = filename
                .filter((row) => filterByYear(row, year))
                .map((row) => `${row['Country']}<br>Score: ${row['Happiness Score']} <br>${chosenFactor}: ${row[chosenFactor]}`);
            
            trace.marker.size = exaggerateValue2(filename
            .filter((row) => filterByYear(row,year))
            .map((row) => +row[chosenFactor]));

            
            trace.marker.colorscale = colorMatchMap(chosenFactor);

            for(i=0;i<trace.name.length;i++){
                trace.marker.line.color.push('rgb(255,255,255)');
                trace.marker.line.width.push(0.6);
                trace.marker.opacity.push(0.8);

            }    

            // put in to array
            data2.push(trace);

     
         const plotConfig = {
             // Self-explanatory, it sets zooming to be done by scroll!
             scrollZoom: true,
         };
      
         // set layout
         const layout2 = {
             
             title:`Happiness Score VS <b>${chosenFactor}</b>`, 
             
             geo: {
                showframe: false,

                coastlinecolor: 'rgb(163,163,163)',
       
                projection: {
                    type: "robinson",
                },
            },      
             hovermode: "closest",
             height: 600,

            plot_bgcolor: '#edeae5',
            paper_bgcolor:'#edeae5',
         };        
         Plotly.newPlot(dataEl,data2,layout2,plotConfig);  

         

// if click on the object, create an annotation
  dataEl.on('plotly_click',
  function(data){
    var point = data.points[0];

    //click tag
    var newAnnotation={};  

     newAnnotation = {
        x: 0.05,
        y:0.83,
  
      bgcolor: 'rgba(255, 255, 255, 0.95)',
      arrowcolor:'rgb(163,163,163)',
      font: {size:12},
      bordercolor: 'rgb(163,163,163)',
      borderwidth: 3,
      borderpad: 4,
      text:  (point.data.text[point.pointIndex]) ,
            
  };

  var divid = document.getElementById('data');
  var newIndex = (divid.layout.annotations || []).length;
  
   // delete instead if clicked twice
   if(newIndex) {
      var foundCopy = false;
      divid.layout.annotations.forEach(function(ann, sameIndex) {
        if(ann.text === newAnnotation.text ) {
          Plotly.relayout('data', 'annotations[' + sameIndex + ']', 'remove');
          foundCopy = true;
        }
      });
      if(foundCopy) return;
    }  
  
  Plotly.relayout('data', 'annotations[' + newIndex + ']', newAnnotation);
});


    //click on clean button,delete all annotation
    clean.addEventListener ("click", function() {

        layout2.annotations=[];    
        Plotly.relayout('data', layout2); 
    
    });
	
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
save.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

