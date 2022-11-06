var data_V1 = [{
    "Program": "JavaScript",
    "Percentage": 30,
    "Description": "JavaScript is play big role in our platform because of, all system operations work with script language. For sending big info and fix some algorithms."
  }, {
    "Program": "HTML5/CSS3",
    "Percentage": 25,
    "Description": "For beautiful and effective interface our programmers use web languages (HTML/CSS), with this components thay create cool function with their effective design. Nowadays coders will start use PHP and Sass/Scss for web components.",
    "viewBox": "#888"
  }, {
    "Program": "Python",
    "Percentage": 15,
    "Description": "Python using for computer programming language often create algorithms  and software, automate tasks, and conduct data analysis."
  }, {
    "Program": "MySQL",
    "Percentage": 10,
    "Description":"SQL (Structured Query Language) is a standardized that's used to manage relational databases and perform various operations on the data in our platform."
  }, {
    "Program": "Java",
    "Percentage": 7,
    "Description": "This language used for hard algorithmically operations, for creating mobile apps. And this language save our platform security "
  }, {
    "Program": "Typescript",
    "Percentage": 5,
    "Description": "Very prominent script language which is more hardest to write code , our programmers use this language for fast working and testing."
  }, {
    "Program": "Database",
    "Percentage": 8,
    "Description": "Save all info and necessary files in one big root , and this is Database which is helps to save all algorithms and informations."
  } ];
  
  var width = parseInt(d3.select('#pieChart').style('width'), 10);
  var height = width;
  var radius = (Math.min(width, height) - 15) / 2;
  
  var type = function getObject(obj) {
    types = [];
    for (var i = 0; i < obj.length; i++) {
      types.push(obj[i].Program);
    }
    return types
  };
  var arcOver = d3.svg.arc()
    .outerRadius(radius + 0)
    .innerRadius(60);
  
  var color = d3.scale.ordinal()
    .domain(type(data_V1))
    .range(["#ffd30f", "#850fff", "#3bc0f2", "#888", "#f25b3b", "#145ba0", "#d7d7d7"]);
  
  /*var color = d3.scale.category20();
  color.domain(type(data))*/
  
  var arc = d3.svg.arc()
    .outerRadius(radius - 125)
    .innerRadius(160);
  
  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
      return +d.Percentage;
    });
  
  change = function(d, i) {
    var angle = 90 - ((d.startAngle * (180 / Math.PI)) + ((d.endAngle - d.startAngle) * (180 / Math.PI) / 2))
    svg.transition()
      .duration(1000)
      .attr("transform", "translate(" + radius + "," + height / 2 + ") rotate(" + angle + ")")
    d3.selectAll("path")
      .transition()
      .attr("d", arc)
    d3.select(i)
      .transition()
      .duration(1000)
      .attr("d", arcOver)
  };
  
  var svg = d3.select("#pieChart").append("svg")
    .attr("width", '50%')
    .attr("height", '50%')
    .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
    .attr('preserveAspectRatio', 'xMinYMin')
    .append("g")
    .attr("transform", "translate(" + radius + "," + height / 2 + ")");
  
  var g = svg.selectAll("path")
    .data(pie(data_V1))
    .enter().append("path")
    .style("fill", function(d) {
      return color(d.data.Program);
    })
    .attr("d", arc)
    .style("fill", function(d) {
      return color(d.data.Program);
    })
    .on("click", function(d) {
      change(d, this);
      $('.text-container').hide();
      $('#segmentTitle').replaceWith('<h1 id="segmentTitle">' + d.data.Program + ": " + d.data.Percentage + '%</h1>');
      $('#')
      $('#segmentText').replaceWith('<p id="segmentText">' + d.data.Description + '</p>');
      $('.text-container').fadeIn(400);
    });
  
  document.querySelector('style').textContent += '@media(max-width:570px) {#pieChart { transform: rotate(90deg); transform-origin: 50% 50%; transition: 1s; max-width: 50%; } .text-container { width: 100%; max-height: 70px; }} @media(min-width:550px) {#pieChart { transition: 1s;}}'
