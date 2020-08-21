import $ from 'jquery';
import moment from 'moment';

var riverInfo = [
  {
    "river": "Cape Fear River",
    "siteID": "02102500",
    "state": "North Carolina",
    "safe_range": {
      "min": 500,
      "max": 1250
    },
    "height_range": {
      "min": 2,
      "max": 7
    }
  },
  {
    "river": "Catawba River",
    "siteID": "02145000",
    "state": "North Carolina",
    "safe_range": {
      "min": 2500,
      "max": 3600
    },
    "height_range": {
      "min": 2,
      "max": 8
    }
  },
  {
    "river": "Congaree River",
    "siteID": "02169500",
    "state": "South Carolina",
    "safe_range": {
      "min": 1000,
      "max": 4000
    },
    "height_range": {
      "min": 2.5,
      "max": 7
    }
  },
  {
    "river": "Dan River",
    "siteID": "02071000",
    "state": "North Carolina",
    "safe_range": {
      "min": 250,
      "max": 800
    },
    "height_range": {
      "min": 1,
      "max": 10
    }
  },
  {
    "river": "French Broad River",
    "siteID": "03451500",
    "state": "North Carolina",
    "safe_range": {
      "min": 500,
      "max": 2900
    },
    "height_range": {
      "min": 1.5,
      "max": 4
    }
  },
  {
    "river": "New River",
    "siteID": "03161000",
    "state": "North Carolina",
    "safe_range": {
      "min": 400,
      "max": 1000
    },
    "height_range": {
      "min": 1,
      "max": 4.5
    }
  },
  {
    "river": "Saluda River",
    "siteID": "02167000",
    "state": "South Carolina",
    "safe_range": {
      "min": 600,
      "max": 1100
    },
    "height_range": {
      "min": 2,
      "max": 6
    }
  }
];

// This function returns a state abbrivation
function abbrState(input, to){

  var states = [
      ['Arizona', 'AZ'],
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
  ];

  if (to == 'abbr'){
      input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      for(var i = 0; i < states.length; i++){
          if(states[i][0] == input){
              return(states[i][1]);
          }
      }
  } else if (to == 'name'){
      input = input.toUpperCase();
      for(i = 0; i < states.length; i++){
          if(states[i][1] == input){
              return(states[i][0]);
          }
      }
  }
}

// This function genrates the selection menu
function generateSelectionMenu() {
  // Iterate through the river info to determine the dropdow groupings
  var selectionGroups = [];
  for(var i=0; i < riverInfo.length; i++) {
    if(i == 0) {
      selectionGroups.push(riverInfo[i].state);
    } else {
      if(selectionGroups.includes(riverInfo[i].state) == false) {
        selectionGroups.push(riverInfo[i].state);
      }
    }
  }
  console.log(selectionGroups);

  // Iterate over each selection group, placing the group in the item-list
  for(var i=0; i < selectionGroups.length; i++) {
    var currentGroup = '<div id="' + abbrState(selectionGroups[i], 'abbr') + '-group" class="item-group" data-state="' + selectionGroups[i] + '"></div>';
    $('.item-list').append(currentGroup);
  }

  // Iterate over each item in the river info list, placing each one in its appropriate dropdown group
  for(var i=0; i < riverInfo.length; i++) {
    var selectionIDText = riverInfo[i].river.toLowerCase().split(" ").join("-") + "-selection";
    var currentItem = document.createElement('div');
    currentItem.id = riverInfo[i].river.toLowerCase().split(" ").join("-") + '-selection';
    currentItem.classList.add('item');
    currentItem.dataset.index = i;
    currentItem.addEventListener('click', () => selectItem(selectionIDText));
    currentItem.innerHTML = riverInfo[i].river;
    var itemGroup = '#' + abbrState(riverInfo[i].state, 'abbr') + '-group';
    $(itemGroup).append(currentItem);
  }
}

// This function expands and collapses the dropdown menu when it is clicked on
$('.selected-river').click(function() {
  if($('#dropdown-wrapper').attr('data-open') == 'false') {
    // Open the menu
    var dropdownWidth = $('#dropdown-wrapper').width();
    $('#dropdown-wrapper').attr('data-open', 'true');
    $('#dropdown-wrapper').css('height', '').css('width', '20ch');
    $('body').css('background-color', '#C4C4C4');
    $('.selected-river').css('background-color', '').css('width', '20ch');
  } else {
    // Close the menu
    $('#dropdown-wrapper').attr('data-open', 'false');
    $('#dropdown-wrapper').height($('.selected-river').height()+16).width((($('.selected-river').text().length)+3) + 'ch');
    $('body').css('background-color', '');
    $('.selected-river').width((($('.selected-river').text().length)+3) + 'ch').css('background-color', 'rgba(29, 29, 29, 0)');
  }
})

// This function closes the menu if the user clicks anywhere outside of the menu
$(document).click(function (e) {
  if ($(e.target).closest("#dropdown-wrapper").length === 0 && $('#answer > .container').text().trim().length < 1) {
    $('#dropdown-wrapper').attr('data-open', 'false');
    $('#dropdown-wrapper').height($('.selected-river').height()+16).width((($('.selected-river').text().length)+3) + 'ch');
    $('body').css('background-color', '');
    $('.selected-river').width((($('.selected-river').text().length)+3) + 'ch').css('background-color', 'rgba(29, 29, 29, 0)');
  }
});

// This function sets the selected item when an item in the dropdown menu is clicked
function selectItem(itemID) {
  $('.item').css('background-color', '');
  $('#' + itemID).css('background-color', 'rgba(29, 29, 29, .1)');
  $('.selected-river').empty().text($('#' + itemID).text()).attr('data-index', $('#' + itemID).attr('data-index'));
  // Close the menu
  $('#dropdown-wrapper').attr('data-open', 'false');
  $('#dropdown-wrapper').height($('.selected-river').height()+16).width((($('.selected-river').text().length)+3) + 'ch');
  $('body').css('background-color', '');
  $('.selected-river').width((($('.selected-river').text().length)+3) + 'ch').css('background-color', 'rgba(29, 29, 29, 0)');
  // Darken the content-question text
  $('.content-question').css('opacity', '1');
  // Drop down the CTA
  $('.cta-mask > .container').css('transform', 'translateY(0%)');
}

// When the document is ready
$(document).ready(function() {
generateSelectionMenu();

// Set the central content transform to half the width and height of its loaded width and height
var contentWidth = $('.central-content').width();
var contentHeight = $('.central-content').height();
$('.central-content').css('transform', 'translate(' + (-contentWidth/2) + 'px, ' + (-contentHeight/2) + 'px)');

// Store the width and height values on the object
$('.central-content').attr('data-w', contentWidth).attr('data-h', contentHeight);
});

// Dectect when the user clicks Check Now and run the transition sequence
$('.cta-wrapper').click(async function() {
// First prepare the scene to transition
// Grab the site data
var selectedRiverIndex = parseInt($('.selected-river').attr('data-index'));
var siteCode = riverInfo[selectedRiverIndex].siteID;
var selectedRiver = riverInfo[selectedRiverIndex].river;
// Name of the real-time cookie for the current site
var currentSiteCookieName = "canitube_" + selectedRiver + "_currentData";
// Name of the real-time height cookie
var currentSiteHeightCookieName = "canitube_" + selectedRiver + "_currentHeight";

// Delete the item list
$('.item-list').remove();

// Create the fake loading bar keyframes
var loadTime = 4000;
generateLoadFrames(loadTime);

// Position the Subtitles
$('#left-subtitle').css('top', $('#left-content-question').offset().top).css('left', $('#left-content-question').offset().left).css('transform', 'translate(0%, 0%)');
$('#right-subtitle').css('top', $('#right-content-question').offset().top).css('left', $('#right-content-question').offset().left).css('transform', 'translate(0%, 0%)');
// Position the Title
$('#fill-title').text($('.selected-river').text()).css('top', $('.selected-river').offset().top).css('left', $('.selected-river').offset().left).css('transform', 'translate(0%, 0%)').attr('data-text', $('.selected-river').text());
$('#stroke-title').text($('.selected-river').text()).css('top', $('.selected-river').offset().top).css('left', $('.selected-river').offset().left).css('transform', 'translate(0%, 0%)');

// Begin the transition to load state
// Animate out the dropdown arrow and CTA
$('.cta-mask > .container').css('transform', 'translateY(125%)');
$('#dropdown-wrapper').attr('data-open', '').attr('data-animating', 'true');
// Start the call to the USGS after animating to the loading phase
loadingStage();
var realTimeFlowValue = await fetchRealTimeData(siteCode, currentSiteCookieName);

// Grab the real-time height data
var realTimeHeightValue = await fetchHeightData(siteCode, currentSiteHeightCookieName);

// Finish the load-bar
$('#fill-title').removeClass('load-bar').addClass('load-bar-finish');

// Begin styling and transitioning the page
var currentSafeRange = riverInfo[selectedRiverIndex].safe_range;

// Calculate the look of the height range
var currentHeightRange = riverInfo[selectedRiverIndex].height_range;

// Test if the current flow value is within the safe range
if(realTimeFlowValue > (currentSafeRange.min - 1) && realTimeFlowValue < (currentSafeRange.max + 1)) {
  // Test if the average value is within a percentage of the safe range
  var rangeVariance = .25;
  var rangeSize = currentSafeRange.max - currentSafeRange.min;
  var superSafeRange = {
    "min": currentSafeRange.min + (rangeSize*(rangeVariance/2)),
    "max": currentSafeRange.max - (rangeSize*rangeVariance)
  };
  if(realTimeFlowValue > (superSafeRange.min - 1) && realTimeFlowValue < (superSafeRange.max + 1)) {
    // Today is safe
    console.log("Today is safe!");
    formatPage("yes", realTimeFlowValue, realTimeHeightValue, currentSafeRange, currentHeightRange);
  } else {
    // Today is maybe safe
    console.log("Today is maybe safe?");
    formatPage("maybe", realTimeFlowValue, realTimeHeightValue, currentSafeRange, currentHeightRange);
  }
} else {
  // Today is not safe
  console.log("Today is not safe!");
  formatPage("no", realTimeFlowValue, realTimeHeightValue, currentSafeRange, currentHeightRange);
}
});

// This function removes elements based on a passed selector
function removeElement(selector) {
$(selector).remove();
}

// This function adds a class to elements based on a passed selector
function elementAddClass(className, selector) {
$(selector).addClass(className);
}

// This function determines the position away from the side that a subtitle would need to be
function subtitleSidePosition(subWidth, titleWidth, subScale, titleScale, marginBetween) {
var subHalfWidth = (subWidth*subScale)/2;
var titleHalfWidth = (titleWidth*titleScale)/2;
// Calculate how far from the center this title needs to be
var centerOffset = subHalfWidth + titleHalfWidth + marginBetween;
var offset = ($(window).width()/2) - centerOffset;

return offset;
}

// This function places the @keyframes animation for the loader bar and loader text in a style element within the head of the page
function generateLoadFrames(time) {
var percentDone = 0;
var timeLeft = time;
var timeRange = {
  "max": 500,
  "min": 38
};
var ary = [];
do {
  if(percentDone < 90) {
    var percentLeft = 100 - percentDone;
    var percentRandom = getRandomInt(percentLeft*.1, percentLeft/2);
    percentDone = percentDone + percentRandom;
    var transition = getRandomInt(timeRange.min, timeRange.max);
    timeLeft = timeLeft - transition;
    var delay = getRandomInt(timeLeft*.1, timeLeft/2);
    timeLeft = timeLeft - delay;

    ary.push(percentDone);
    ary.push(transition);
    ary.push(Math.abs(delay));
  } else {
    var transition = getRandomInt(timeRange.min, timeRange.max);
    var delay = timeLeft-transition;

    ary.push(100);
    ary.push(transition);
    ary.push(Math.abs(delay));
    percentDone = 100;
    timeLeft = 0;
  }
} while (percentDone < 100);

// This function generates a keyframe line based on input values
function progressScale(scalePercent, previousScale, startTime, endTime, totalTime) {
  var easeChoice = getRandomInt(0,3);

  if(easeChoice == 0) {
    easeChoice = 'linear';
  }
  if(easeChoice == 1) {
    easeChoice = 'ease-in';
  }
  if(easeChoice == 2) {
    easeChoice = 'ease-out';
  }
  if(easeChoice == 3) {
    easeChoice = 'ease';
  }
  var stepStartPercent = Math.round((startTime/totalTime)*1000)/10;
  var stepEndPercent = Math.round((endTime/totalTime)*1000)/10;

  // If the scale percent is more than 96, change it to be only a few more than previous percent, this allows us to have an 'unfinished load bar'
  if(previousScale > 0) {
    previousScale = previousScale - 4;
  }
  if(scalePercent > 0) {
    if(scalePercent >= 97) {
      scalePercent = previousScale + 4;
    } else {
      scalePercent = scalePercent - 4;
    }
  }

  var stepStart = '\t' + stepStartPercent + '%    {clip-path: polygon(0% 0%, ' + previousScale + '% 0%, ' + previousScale + '% 100%, 0% 100%); animation-timing-function: ' + easeChoice + ';}';
  var stepEnd = '\t' + stepEndPercent + '%    {clip-path: polygon(0% 0%, ' + scalePercent + '% 0%, ' + scalePercent + '% 100%, 0% 100%); animation-timing-function: linear;}';
  var stepAll = [stepStart, stepEnd];
  return stepAll.join("\n");
}

// This function generates a keyframe line for text based on input values
function progressText(scalePercent, previousScale, startTime, endTime, totalTime) {
  var easeChoice = getRandomInt(0,3);

  var stepStartPercent = Math.round((startTime/totalTime)*1000)/10;
  var stepEndPercent = Math.round((endTime/totalTime)*1000)/10;

  // If the scale percent is more than 96, change it to be only a few more than previous percent, this allows us to have an 'unfinished load bar'
  if(previousScale > 0) {
    previousScale = previousScale - 4;
  }
  if(scalePercent > 0) {
    if(scalePercent >= 97) {
      scalePercent = previousScale + 4;
    } else {
      scalePercent = scalePercent - 4;
    }
  }

  var stepStart = '\t' + stepStartPercent + '%    {content:"Loading ' + previousScale + '%";}';
  var stepEnd = '\t' + stepEndPercent + '%    {content:"Loading ' + scalePercent + '%";}';
  var stepAll = [stepStart, stepEnd];
  return stepAll.join("\n");
}

// Create the keyframes
var openKeyframe = '@keyframes loadIn {\n\t0%    {clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%); animation-timing-function: linear;}';
var closeKeyframe = '}';
var keyframes = [openKeyframe];

var openTextKeyframe = '@keyframes loadTextIn {';
var closeTextKeyframe = '}';
var textKeyframes = [openTextKeyframe];

var elapsedTime = 0;
var allTime = 0;

// Add up the total amount of time
for(var i=0; i < ary.length;) {
  allTime = allTime + ary[i+1] + ary[i+2];
  i = i+3;
}

for(var j=0; j < ary.length;) {
  if(j > 2) {
    var previousScale = ary[j-3];
  } else {
    var previousScale = 0;
  }
  var timeToStart = elapsedTime + ary[j+2];
  elapsedTime = elapsedTime + ary[j+1] + ary[j+2];
  var currentKeyframe = progressScale(ary[j], previousScale, timeToStart, elapsedTime, allTime);
  keyframes.push(currentKeyframe);

  var currentTextKeyframe = progressText(ary[j], previousScale, timeToStart, elapsedTime, allTime);
  textKeyframes.push(currentTextKeyframe);

  j = j+3;
}

keyframes.push(closeKeyframe);
textKeyframes.push(closeTextKeyframe);

// Create the bar class
var barLoadClass = '.load-bar::after {\n\tanimation: loadIn ' + time/1000 + 's linear both;\n\tclip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);\n\tcolor: #1D1D1D;\n\tcontent: attr(data-text);\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 0;\n\twidth: 100%;\n\ttransform: translate(0%, -50%);\n\tz-index: -1;\n}';
var barFinishLoadClass = '.load-bar-finish::after {\n\tclip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);\n\tcolor: #1D1D1D;\n\tcontent: attr(data-text);\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 0;\n\twidth: 100%;\n\ttransform: translate(0%, -50%);\n\tz-index: -1;\n}';

// Create the loader text class
var textLoadClass = '.text-load::after {\n\tposition: relative;\n\tdisplay: block;\n\twidth: 100%;\n\theight: 100%;\n\tcontent: "Loading 0%";\n\twhite-space: nowrap;\n\tfont-family: "Kayak Sans Regular", arial, sans-serif;\n\tletter-spacing: 1px;\n\tfont-size: 16px;\n\tcolor: #1D1D1D;\n\ttext-align: center;\n\ttext-transform: uppercase;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tanimation: loadTextIn ' + time/1000 + 's linear both;\n}';
var textFinishLoadClass = '.text-load-finish::after {\n\tposition: relative;\n\tdisplay: block;\n\twidth: 100%;\n\theight: 100%;\n\tcontent: "Loading 100%";\n\twhite-space: nowrap;\n\tfont-family: "Kayak Sans Regular", arial, sans-serif;\n\tletter-spacing: 1px;\n\tfont-size: 16px;\n\tcolor: #1D1D1D;\n\ttext-align: center;\n\ttext-transform: uppercase;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n}';

$('head').append('<style type="text/css">\n' + keyframes.join('\n') + '\n' + textKeyframes.join('\n') + '\n' + barLoadClass + '\n' + barFinishLoadClass + '\n' + textLoadClass + '\n' + textFinishLoadClass + '\n</style>');
}

// This function returns a random integer between a min and max value
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// This function fetches the current data
function fetchRealTimeData(site, cookieName) {
var dataCookiePresent = checkCookie(cookieName);

if(dataCookiePresent == false) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + site + "&parameterCd=00060&siteStatus=active",
      dataType: 'JSON',
      data: '',
      success: function(json){
        console.log("Real-Time Data Retreived!");
        // Here, convert the data to the app-ready format
        var appReadyData = parseRealTimeJSON(json);
        // Store the app-ready data in a cookie that expires in 1 hour
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        var expDate = now.setTime(time);
        // Write the cookie with the app-ready data
        writeCookie(cookieName, appReadyData, expDate);

        // Return the app-ready data
        resolve(parseInt(appReadyData));
       },
      error : function(XMLHttpRequest, textStatus, errorThrown) {
         console.log("Error: AJAX request failed...");
         console.log(textStatus);
         console.log(errorThrown);
      }
    });
  })
} else {
  // Note the non-expired data
  console.log("Data Already Present!");
  // Here, convert the data to the app-ready format
  var appReadyData = getCookie(cookieName);

  // Return the app-ready data
  return parseInt(appReadyData);
}
}

// This function parses the real-time data json and returns app-ready data
function parseRealTimeJSON(data) {
var dataFlow = data.value.timeSeries[0].values[0].value[0].value;
//var dataDataTime = data.value.timeSeries[0].values[0].value[0].dateTime;
return dataFlow;
}

// This function fetches the current data
function fetchHeightData(site, cookieName) {
var dataCookiePresent = checkCookie(cookieName);

if(dataCookiePresent == false) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + site + "&parameterCd=00065&siteStatus=active",
      dataType: 'JSON',
      data: '',
      success: function(json){
        console.log("Height Data Retreived!");
        // Here, convert the data to the app-ready format
        var appReadyData = parseRealTimeJSON(json);
        // Store the app-ready data in a cookie that expires in 1 hour
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        var expDate = now.setTime(time);
        // Write the cookie with the app-ready data
        writeCookie(cookieName, appReadyData, expDate);

        // Return the app-ready data
        resolve(parseInt(appReadyData));
       },
      error : function(XMLHttpRequest, textStatus, errorThrown) {
         console.log("Error: AJAX request failed...");
         console.log(textStatus);
         console.log(errorThrown);
      }
    });
  })
} else {
  // Note the non-expired data
  console.log("Data Already Present!");
  // Here, convert the data to the app-ready format
  var appReadyData = getCookie(cookieName);

  // Return the app-ready data
  return parseInt(appReadyData);
}
}

// This function transitions from the set-up selection stage to the loading stage
function loadingStage() {
gsap.timeline()
  .set('#title-wrapper', {opacity: 1})
  .set('#stroke-title', {opacity: 1})
  .to('.central-content', {duration: .01, delay: .375, display: 'none'})
  .call(removeElement, [".central-content"])
  .call(removeElement, [".cta-wrapper"])
  .to('.border-content', {duration: .6, ease: 'power2.inOut', width: $(window).width()-150, opacity: 1})
  .to('#left-subtitle', {duration: .6, ease: 'power2.inOut', left: subtitleSidePosition($('#left-subtitle').width(), $('#fill-title').width(), .625, 2.25, 20), scale: .625, x: '-50%'}, '-=.6')
  .to('#right-subtitle', {duration: .6, ease: 'power2.inOut', right: subtitleSidePosition($('#right-subtitle').width(), $('#fill-title').width(), .625, 2.25, 20), scale: .625, x: '50%'}, '-=.6')
  .to('#fill-title', {duration: .6, ease: 'power2.inOut', top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 2.25, textStroke: '0px rgba(29,29,29,1)', letterSpacing: 2, color: 'rgba(29, 29, 29, 0)'}, '-=.6')
  .to('#stroke-title', {duration: .6, ease: 'power2.inOut', top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 2.25, color: 'rgba(29, 29, 29, 0)'}, '-=.6')
  .set('.main-title', {fontFamily: 'Kayak Sans Bold'})
  .call(elementAddClass, ['load-bar', '#fill-title'])
}

// This function formats the page based on the determined safety
function formatPage(state, currentFlowValue, heightValue, safeRange, heightRange) {
// This object contains the information to determine the formatting of each global style
var formatChoices = {
  'yes': {
    background_color: '#2E933C',
    text_color: '#261C15',
    stroke_color: '#261C15'
  },
  'maybe': {
    background_color: '#FF7F11',
    text_color: '#E4E6C3',
    stroke_color: '#E4E6C3'
  },
  'no': {
    background_color: '#C41E3D',
    text_color: '#EAC435',
    stroke_color: '#EAC435'
  }
}

// Fill in the border edge content
$('#low-range').text(safeRange.min);
$('#high-range').text(safeRange.max);
// Set the range scale and position the low, high, and indicator
if(currentFlowValue > safeRange.max) {
  var maxScale = currentFlowValue*1.25;
} else {
  var maxScale = safeRange.max*1.25;
}
var lowLeft = (safeRange.min*100)/maxScale;
var highLeft = (safeRange.max*100)/maxScale;
var indicatorLeft = (currentFlowValue*100)/maxScale;
$('#low-range').css('left', lowLeft + '%');
$('#high-range').css('left', highLeft + '%');
$('#range-indicator').css('left', indicatorLeft + '%');

// Height content
$('#low-height').text(heightRange.min);
$('#high-height').text(heightRange.max);

// Set the height scale and position the low, high, and indicator
var heightRangeSize = heightRange.max - heightRange.min;
if(heightValue > heightRange.max) {
  var maxHeightScale = heightValue + (heightRangeSize*.25);
  var minHeightScale = 0;
} else {
  var maxHeightScale = heightRange.max + (heightRangeSize*.25);
  var minHeightScale = 0;
}
var lowHeightLeft = remapNumber(heightRange.min, minHeightScale, maxHeightScale, 0, 100);
var highHeightLeft = remapNumber(heightRange.max, minHeightScale, maxHeightScale, 0, 100);
var indicatorHeightLeft = remapNumber(heightValue, minHeightScale, maxHeightScale, 0, 100);
$('#low-height').css('left', lowHeightLeft + '%');
$('#high-height').css('left', highHeightLeft + '%');
$('#height-indicator').css('left', indicatorHeightLeft + '%');

// Set all point-indicators to the correct color svg
$('.point-indicator').css('background-image', 'url(assets/img/indicator-arrow-' + state + '.svg)');

// Set the display option to default
$('#icon-translation').css('transform', 'translate(3.2779px, 0px)');
$('#icon-sun').css('opacity', '0');
$('#icon-i').css('opacity', '0');

// Begin the transition to the final state
gsap.timeline()
  .delay(.25)
  .call(createAnswer, [state, currentFlowValue])
  .set('.border-content', {zIndex: 100})
  .set('#answer > .container', {y: '150%', color: formatChoices[state].text_color})
  .set('#current-flow > .container', {y: '150%', color: formatChoices[state].text_color})
  .set('.measurement-number', {color: formatChoices[state].text_color})
  .set('.border-text > .container', {color: formatChoices[state].text_color})
  .set('.border-text', {background: formatChoices[state].background_color})
  .set('.settings-text', {color: formatChoices[state].text_color})
  .set('svg > .svg-stroke-style', {stroke: formatChoices[state].stroke_color})
  .set('svg .svg-fill-style', {fill: formatChoices[state].stroke_color})
  .to('body', {duration: 1, background: formatChoices[state].background_color})
  .to('.border-content', {duration: .75, ease: 'power2.inOut', height: $(window).height()-150, opacity: 1}, '-=.25')
  .to('.footer-text', {duration: .75, ease: 'power2.inOut', color: formatChoices[state].text_color}, '-=.75')
  .to('#fill-title', {duration: .75, ease: 'power2.inOut', top: 75, x: '-50%', y: '-25%', color: formatChoices[state].text_color}, '-=.75')
  .to('#stroke-title', {duration: .75, ease: 'power2.inOut', top: 75, x: '-50%', y: '-25%', textStrokeColor: formatChoices[state].stroke_color}, '-=.75')
  .to('.subtitle', {duration: .75, ease: 'power2.inOut', top: (75 - (($('#fill-title').height()*2.25)*.25)/2), color: formatChoices[state].text_color}, '-=.75')
  .to('.border-content', {duration: .75, borderColor: formatChoices[state].stroke_color}, '-=.75')
  .to('#answer > .container', {duration: .75, ease: 'power2.inOut', y: '0%'}, '-=.75')
  .to('#current-flow > .container', {duration: .5, ease: 'power2.inOut', y: '0%'}, '-=.375')
  .to('.range-content > .container > .border-text', {duration: .375, ease: 'power2.inOut', scaleX: 1}, '-=.25')
  .to('#range-label > .container', {duration: .375, ease: 'power2.inOut', y: '0%'}, '-=.25')
  .to('.range-wrapper > .container > .measurement-number', {duration: .375, ease: 'power2.inOut', y: '0%'}, '-=.25')
  .to('#range-indicator', {duration: .375, ease: 'power2.inOut', y: '0%'}, "-=.25")
  .to('#range-unit > .container', {duration: .375, ease: 'power2.inOut', y: '0%'}, "-=.25")
  .set('.height-content', {width: (($(window).height()-150)*.9)})
  .to('.height-content > .container > .border-text', {duration: .375, ease: 'power2.inOut', scaleX: 1}, "-=.25")
  .to('#height-label > .container', {duration: .375, ease: 'power2.inOut', y: '0%'}, '-=.25')
  .to('.height-wrapper > .container > .measurement-number', {duration: .375, ease: 'power2.inOut', y: '0%'}, '-=.25')
  .to('#height-indicator', {duration: .375, ease: 'power2.inOut', y: '0%'}, "-=.25")
  .to('#height-unit > .container', {duration: .375, ease: 'power2.inOut', y: '0%'}, "-=.25")
  .from('#settings-cog', {duration: 1.25, ease: 'power2.inOut', rotation: -720},  "-=.375")
  .to('#settings-cog', {duration: .375, ease: 'linear', opacity: 1},  "-=1")

}

// This function populates the answer and flow values
function createAnswer(state, currentFlow) {
var flowText = 'Current Flow: ' + currentFlow + 'FT<span class="superscript">3</span>/S';
$('#current-flow > .container').append(flowText).css('font-size', '18px').css('letter-spacing', '2px');
$('#answer > .container').text(state.toUpperCase());
}

// This function returns a remapped a number from an old value range to a new value range
function remapNumber(input, low1, high1, low2, high2) {
return (low2 + (input - low1) * (high2 - low2) / (high1 - low1))
}

// This function writes a cookie ith a name, data, and a number of days before expiring
function writeCookie(name, data, expire) {
var now = new Date();
now.setDate(now.getDate() + expire);
var exp = now;
document.cookie = name + "=" + data + ";" + "expires=" + exp.toUTCString() + ";";
}

// This function returns the data in a cookie of a specified name
function getCookie(cname) {
var name = cname + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
for(var i = 0; i <ca.length; i++) {
  var c = ca[i];
  while (c.charAt(0) == ' ') {
    c = c.substring(1);
  }
  if (c.indexOf(name) == 0) {
    return c.substring(name.length, c.length);
  }
}
return "";
}

// This function checks for a cookie to see if it is present
function checkCookie(name) {
var cookieCheck = getCookie(name);
if (cookieCheck == "") {
 return false;
} else {
  if (cookieCheck !== "" && cookieCheck !== null) {
    return true;
  }
}
}

// This function draws the animated river
function drawRiverFlow(speed, height, turbulance, resolution) {
  var xAxis = [];
  // Create a number of X points
  for(var i=0; i < ($(window).width()/resolution)+2; i++) {
    xAxis.push(i*resolution);
  }

  // SVG animation function
  function animateWater(iterations) {
    var masterPhase = new Date().getTime()/400;
    var waveHeight = [4/30, 3/30, 3/30];
    var waveWidth = [2, 50, 200];
    var waveSpeed = [.25, .738, .61];
    var wavePhase = [2, 1.375, 2.829];
    var waveShift = 400;
    var clamper = 50;

    // Waves
    var points = xAxis.map(x => {
      var y = (Math.round((((Math.sin(x+(wavePhase[0]*waveSpeed[0]*masterPhase))*waveWidth[0])*waveHeight[0])+waveShift))/clamper)*(Math.round((((Math.sin(x+(wavePhase[1]*waveSpeed[1]*masterPhase))*waveWidth[1])*waveHeight[1])+waveShift))/clamper)*(Math.round((((Math.sin(x+(wavePhase[2]*waveSpeed[2]*masterPhase))*waveWidth[2])*waveHeight[2])+waveShift))/clamper);
      return [x,y]
    })

    // Create the SVG path
    var path = "M0,2000 " + points.map(p => {
      return p[0] + "," + p[1];
    }).join(" L");

    $('svg > path').attr('d', path + " L" + $(window).width()+25 + ",2000");
    requestAnimationFrame(animateWater);
  }

  animateWater(turbulance);
}

// Add click event to Settings Icon
document.getElementById("settings-cog").addEventListener("click", function(){
  toggleSettings();
});

// Add click event to each settings-item that prevents them from triggering the parent click event
document.querySelectorAll(".settings-item > .container").forEach(item => {
  item.addEventListener("click", function(e){
    e.stopPropagation();
    e.preventDefault();
  });
})

// Add click event that changes the performance settings
document.getElementById("settings-performance").addEventListener("click", function(){
  togglePerformance();
});

// This function toggles the settings open and closed
function toggleSettings() {
  // The animation timeline
  var settingsAnimationOpen = gsap.timeline({paused: true})
    .to('#settings-cog', {duration: .375, ease: 'power2.inOut', rotation: '120deg'})
    .to('#settings-performance > .container', {duration: .375, ease: 'power2.inOut', x: '0%', opacity: 1}, '-=.25')
    .to('#settings-display > .container', {duration: .375, ease: 'power2.inOut', x: '0%', opacity: 1}, '-=.25');

  // The animation timeline
  var settingsAnimationClose = gsap.timeline({paused: true})
    .to('#settings-cog', {duration: .375, ease: 'power2.inOut', rotation: '0deg'})
    .to('#settings-performance > .container', {duration: .375, ease: 'power2.inOut', x: '-25%', opacity: 0}, '-=.25')
    .to('#settings-display > .container', {duration: .375, ease: 'power2.inOut', x: '-25%', opacity: 0}, '-=.25');

  // If the settings are open, reverse the timeline, else play the timeline
  if($('.settings').attr('data-expanded') == 'true') {
    $('.settings').attr('data-expanded', 'false');
    settingsAnimationClose.play();
  } else {
    $('.settings').attr('data-expanded', 'true');
    settingsAnimationOpen.play();
  }
}

// This function toggles the performance settings
function togglePerformance() {
  var t1 = gsap.set('#performance-svg > path', {points: "6.9 22.8 6.9 19.6 10.1 19.6 10.1 16.4 13.3 16.4 13.3 13.2 16.5 13.2 16.5 10 19.7 10 19.7 6.8 22.9 6.8"});
  t1.play();
  // // The animation timelines for each toggle state
  // // Smooth > Rough
  // var performanceIconToRough = gsap.timeline({paused: true})
  //   .to('#performance-svg > polyline', {duration: .25, ease: 'power3.inOut', points: '6.9 22.8 6.9 19.6 10.1 19.6 10.1 16.4 13.3 16.4 13.3 13.2 16.5 13.2 16.5 10 19.7 10 19.7 6.8 22.9 6.8'});
  //
  // // Rough > None
  // var performanceIconToNone = gsap.timeline({paused: true})
  //   .to('#performance-svg > polyline', {duration: .25, ease: 'power3.inOut', points: '6 14 7.6 14 9.2 14 10.8 14 12.4 14 14 14 15.6 14 17.2 14 18.8 14 20.4 14 22 14'});
  //
  // // Rough > None
  // var performanceIconToSmooth = gsap.timeline({paused: true})
  //   .to('#performance-svg > polyline', {duration: .25, ease: 'power3.inOut', points: '6 22 7.6 20.4 9.2 18.8 10.8 17.2 12.4 15.6 14 14 15.6 12.4 17.2 10.8 18.8 9.2 20.4 7.6 22 6'});
  //
  // // Toggle to ...
  // if($('#performance-svg').attr('data-performance') == 'smooth') {
  //   // Rough
  //   console.log('To Rough')
  //   $('#performance-svg').attr('data-performance', 'rough');
  //   performanceIconToRough.play();
  // } else if($('#performance-svg').attr('data-performance') == 'rough') {
  //   // None
  //   console.log('To None')
  //   $('#performance-svg').attr('data-performance', 'none');
  //   performanceIconToNone.play();
  // } else {
  //   // Smooth
  //   console.log('To Smooth')
  //   $('#performance-svg').attr('data-performance', 'smooth');
  //   performanceIconToSmooth.play();
  // }
}

// $(document).ready(function() {
//   drawRiverFlow(1, 1, 3, 250);
// });
