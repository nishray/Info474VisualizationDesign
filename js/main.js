//Nishant Velagapudi
//Info 474
//Visualization Design

//Wait for document to load
$(document).ready(function() {
 
 //First ajax call to load raw csv data
 $.ajax({
    type: "GET",
    url: "antibiotics_data.csv",
    dataType: "text",
    success: function(data) { 
      console.log("Data Retrieved.");
        AntibioticsData = $.csv.toArrays(data);

        console.log(AntibioticsData)

        var BacteriaNames = {}
        var PenicillinData = {};
        var StreptomycinData = {};
        var NeomycinData = {};
        var GramStainingData = {};

        //load csv data into various arrays

        for (i = 0; i < AntibioticsData.length; i++) {
          BacteriaNames[i] = (AntibioticsData[i][0])
          PenicillinData[i] = (AntibioticsData[i][1])
          StreptomycinData[i] = (AntibioticsData[i][2])
          NeomycinData[i] = (AntibioticsData[i][3])
          GramStainingData[i] = (AntibioticsData[i][4])
        };


        //clean csv data into arrays that plotly can use
        keys = Object.keys(BacteriaNames)
        BacteriaNames = cleanArray(BacteriaNames, keys)
        PenicillinData = cleanArray(PenicillinData, keys)
        StreptomycinData = cleanArray(StreptomycinData, keys)
        NeomycinData = cleanArray(NeomycinData, keys)
        GramStainingData = cleanArray(GramStainingData, keys)

        //build first visualization using Streptomycin data, Neomycin data, Gram Staining results
        buildGraph1(StreptomycinData, NeomycinData, GramStainingData)

        //preparing data for third plotly visualization
        BacteriaNames = []
        AvgMIC = []
        var average = 0
        //Take average of three MIC values for each bacteria
        for (i = 1; i< AntibioticsData.length; i++){
          BacteriaNames.push(AntibioticsData[i][0])
          AvgMIC.push((parseFloat(AntibioticsData[i][1])+parseFloat(AntibioticsData[i][2])+parseFloat(AntibioticsData[i][3]))/3)

        }

        //build third plotly visualization
        buildGraph3(BacteriaNames,AvgMIC,GramStainingData)

        },
    error: function(data) {
      console.log("error")
      
    }
});

//Make second ajax call to retrieve the antibiotics data preprocessed into histogram format
$.ajax({
    type: "GET",
    url: "HistoData.csv",
    dataType: "text",
    success: function(data) { 
      HistoData = $.csv.toArrays(data)
      console.log(HistoData)

        //prepare container variables
        var bin = {}
        var PenicillinData = {};
        var StreptomycinData = {};
        var NeomycinData = {};

        //load data into various key/value pairs
      for (i = 0; i < HistoData.length; i++) {
          bin[i] = String(HistoData[i][0])
          PenicillinData[i] = (HistoData[i][1])
          StreptomycinData[i] = (HistoData[i][2])
          NeomycinData[i] = (HistoData[i][3])
      };

        //clean key value pairs into arrays usable by plotly.js
      keys = Object.keys(bin)
      bin = cleanArray(bin, keys)
      PenicillinData= cleanArray(PenicillinData, keys)
      StreptomycinData= cleanArray(StreptomycinData, keys)
      NeomycinData= cleanArray(NeomycinData, keys)

        //build second plotly visualization
      buildGraph2(bin, PenicillinData, StreptomycinData, NeomycinData)
    }

})

});

//take key value container variable and the keys of the object
//return array of values in appropriate order
function cleanArray(data, keys) {
  //first value is column header
  var toReturn = keys.map(function(l) {
    return data[l];
  })
  return toReturn.slice(1, data.length)
}

//build the first graph in plotly
function buildGraph1(dataStrept, dataNeo, dataGram){

  //need to separate positive gram stain data from negative gram stain data
  //for coloring purposes - create variables for this purpose
  posStrept = []
  negStrept = []
  PosNeo = []
  NegNeo = []

  //separating data
  for(i = 0; i < dataGram.length; i++){
    if(dataGram[i] == 'positive'){
      PosNeo.push(dataNeo[i])
      posStrept.push(dataStrept[i])
    } else {
      NegNeo.push(dataNeo[i])
      negStrept.push(dataStrept[i])
    }
  }

  //set up positive trace
  var trace2 = {
    x:PosNeo,
    y:posStrept,
    mode:'markers',
    name:'Positive Gram Stain',
    type: 'scatter',
    marker: {
      color: 'red'
    }
  }

  //set up negative trace
  var trace3 = {
    x:NegNeo,
    y:negStrept,
    mode:'markers',
    name:'Negative Gram Stain',
    type:'scatter',
    marker: {
      color: 'blue'
    }
  }

  //concatenate the two together into our plotly data variable
  var data = [trace2, trace3]

//set layout options
//want log axes
var layout = {
  title: 'MIC of Neomycin versus MIC of Streptomycin',
  xaxis: {
    title: 'MIC of Neomycin (Concentration)',
    type: 'log',
    autorange: true
  },
  yaxis: {
    title: 'MIC of Streptomycin (Concentration)',
    type: 'log',
    autorange: true
  }
};

  //build plot
  Plotly.newPlot('PlotlyDiv1',data,layout,{staticPlot: true})
}

//build second plot - histogram comparing counts of bacteria at certain bins of MIC
function buildGraph2(bins, dataPen, dataStrept, dataNeo){

  //create xlabels
  bins = [String('Under 0.05'), String('0.05 To .1'), String('.1 To .5'), String('.5 To 1'), String('1 To 2'), String('2 To 5'), String('5 To 10'), 'Over 10'];
  
  //need three traces for the three antibiotics
  //all three traces have the same xlabels
  //first trace is penicillin
  var trace1 = {
    x: bins,
    y: dataPen,
    name: 'Penicillin',
    type: 'bar'
  }

  //second trace is streptomycin
  var trace2 = {
    x: bins,
    y: dataStrept,
    name: 'Streptomycin',
    type: 'bar'
  }

  //third trace is Neomycin
  var trace3 = {
    x: bins,
    y: dataNeo,
    name: 'Neomycin',
    type: 'bar'
  }

  //put together plotly data from traces
  var data = [trace1, trace2, trace3]
  
  //layout
  var layout = {
    title: 'Counts of Bacteria At Each MIC Level Over 3 Antibiotics',
    barmode: 'group',
    xaxis: {
      title: 'MIC Buckets (Concentration)',
      autorange: true
    },
    yaxis: {
      title: 'Unique Species of Bacteria',
      autorange: true
  }
  };

  Plotly.newPlot('PlotlyDiv2',data,layout,{staticPlot: true})

}

//build third graph - average MIC values by 
function buildGraph3(names,avgMICvalues,stains){
  PosNames = []
  NegNames = []
  PosMICs = []
  NegMICs = []

//separate data by gram stain result
  for(i = 0; i < stains.length; i++){
    if(stains[i] == 'positive'){
      PosNames.push(names[i])
      PosMICs.push(avgMICvalues[i])
    } else {
      NegNames.push(names[i])
      NegMICs.push(avgMICvalues[i])
    }
//two separate traces - positive trace
    var trace1 = {
      x:PosNames,
      y:PosMICs,
      name: 'Positive Gram Stain Results',
      type: 'bar',
      marker: {
        color: 'red'
      }
    }

//negative Gram stain trace
    var trace2 = {
      x:NegNames,
      y:NegMICs,
      name:'Negative Gram Stain Results',
      type: 'bar',
      marker: {
        color: 'blue'
      }
    }

    var layout = {
      title: 'Average MIC of Indivial Bacteria and Resulting Gram Stain Results',
      xaxis: {
        title: 'Bacteria Names',
       
      },
    yaxis: {
      title: 'Average MIC values',
      type: 'log',
      autorange: true
      }
    };

    data = [trace1, trace2]

    Plotly.newPlot('PlotlyDiv3',data,layout,{staticPlot: true})
  }
}