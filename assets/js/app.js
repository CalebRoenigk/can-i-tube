import $ from 'jquery';
import moment from 'moment';
import convert from 'convert-units';

var appVersion = "3.03";

var riverInfo = [
  {
    "river": "Cape Fear River",
    "siteID": "02102500",
    "state": "North Carolina",
    "safe_range": {
      "min": 500,
      "max": 1250
    },
    "flow_range_source": {
      "link": "https://capefearadventures.com/cape-fear-river-info/water-levels",
      "name": "Cape Fear Adventures"
    },
    "height_range": {
      "min": 2,
      "max": 7
    },
    "site_parameters": {
      "discharge": "00060",
      "gage_height": "00065"
    },
    "geo_location": {
      "lat": "35.4061111",
      "long": "-78.8133333"
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
    "flow_range_source": {
      "link": "https://rockinriveradventures.com/river-levels/",
      "name": "Rockin River Adventures"
    },
    "height_range": {
      "min": 2,
      "max": 8
    },
    "site_parameters": {
      "discharge": "00060",
      "gage_height": "00065"
    },
    "geo_location": {
      "lat": "35.28527778",
      "long": "-81.1011111"
    }
  },
  {
    "river": "Clinch River",
    "siteID": "03527220",
    "state": "Virginia",
    "safe_range": {
      "min": 100,
      "max": 900
    },
    "flow_range_source": {
      "link": "https://waterdata.usgs.gov/nwis/uv?site_no=03524000",
      "name": "Estimation based on averages from USGS"
    },
    "height_range": {
      "min": 1,
      "max": 6
    },
    "site_parameters": {
      "discharge": "00060",
      "gage_height": "00065",
      "water_temperature": "00010"
    },
    "geo_location": {
      "lat": "36.57280708",
      "long": "-82.938754"
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
    "flow_range_source": {
      "link": "https://palmettooutdoor.com/faq-page",
      "name": "Palmettoo Outdoor"
    },
    "height_range": {
      "min": 2.5,
      "max": 7
    },
    "site_parameters": {
      "discharge": "00060",
      "gage_height": "00065"
    },
    "geo_location": {
      "lat": "33.99320985",
      "long": "-81.049815"
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
    "flow_range_source": {
      "link": "https://waterdata.usgs.gov/usa/nwis/uv?site_no=02071000",
      "name": "Estimation based on averages from USGS"
    },
    "height_range": {
      "min": 1,
      "max": 10
    },
    "site_parameters": {
      "discharge": "00060",
      "gage_height": "00065"
    },
    "geo_location": {
      "lat": "36.4125",
      "long": "-79.8261111"
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
    "flow_range_source": {
      "link": "https://www.frenchbroadoutfitters.com/river-flow-charts/",
      "name": "French Broad Outfitters"
    },
    "height_range": {
      "min": 1.5,
      "max": 4
    },
    "site_parameters": {
      "discharge": "00060",
      "gage_height": "00065",
      "water_temperature": "00010"
    },
    "geo_location": {
      "lat": "35.60888889",
      "long": "-82.5780556"
    }
  },
  {
    "river": "Holston North Fork",
    "siteID": "03490000",
    "state": "Virginia",
    "safe_range": {
      "min": 75,
      "max": 500
    },
    "flow_range_source": {
      "link": "https://waterdata.usgs.gov/nwis/uv?03488000",
      "name": "Estimation based on averages from USGS"
    },
    "height_range": {
      "min": .5,
      "max": 4
    },
    "site_parameters": {
      "discharge": "00060",
      "gage_height": "00065",
      "water_temperature": "00010"
    },
    "geo_location": {
      "lat": "36.60871119",
      "long": "-82.567931"
    }
  },
  {
    "river": "James River",
    "siteID": "02019500",
    "state": "Virginia",
    "safe_range": {
      "min": 300,
      "max": 900
    },
    "flow_range_source": {
      "link": "http://jamesriver.com/river-conditions/",
      "name": "James River Runners"
    },
    "height_range": {
      "min": 1,
      "max": 3
    },
    "site_parameters": {
      "discharge": "00060",
      "gage_height": "00065"
    },
    "geo_location": {
      "lat": "37.53068995",
      "long": "-79.6789281"
    }
  },
  {
    "river": "Maury River",
    "siteID": "02024000",
    "state": "Virginia",
    "safe_range": {
      "min": 100,
      "max": 600
    },
    "flow_range_source": {
      "link": "https://www.wildernesscanoecompany.com/river-gauge.html",
      "name": "Wilderness Canoe Company"
    },
    "height_range": {
      "min": 2,
      "max": 3.75
    },
    "site_parameters": {
      "discharge": "00060",
      "gage_height": "00065"
    },
    "geo_location": {
      "lat": "37.76263275",
      "long": "-79.3914251"
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
    "flow_range_source": {
      "link": "https://www.ncparks.gov/new-river-state-park/home",
      "name": "New River State Park"
    },
    "height_range": {
      "min": 1,
      "max": 4.5
    },
    "site_parameters": {
      "discharge": "00060",
      "gage_height": "00065"
    },
    "geo_location": {
      "lat": "36.3933333",
      "long": "-81.4069444"
    }
  },
  {
    "river": "Saluda River",
    "siteID": "02167000",
    "state": "South Carolina",
    "safe_range": {
      "min": 600,
      "max": 1300
    },
    "flow_range_source": {
      "link": "https://www.dominionenergy.com/lakes-and-recreation/lower-saluda-river-sc",
      "name": "Dominion Energy"
    },
    "height_range": {
      "min": 2,
      "max": 6
    },
    "site_parameters": {
      "discharge": "00060",
      "gage_height": "00065"
    },
    "geo_location": {
      "lat": "34.17457619",
      "long": "-81.864002"
    }
  },
  {
    "river": "South Fork Shenandoah",
    "siteID": "01629500",
    "state": "Virginia",
    "safe_range": {
      "min": 300,
      "max": 1200
    },
    "flow_range_source": {
      "link": "https://shenandoah-river.com/canoe-kayak-tube-raft-rentals/river-levels-new/",
      "name": "Shenandoah River Outfitters"
    },
    "height_range": {
      "min": 2,
      "max": 5.5
    },
    "site_parameters": {
      "discharge": "00060",
      "gage_height": "00065"
    },
    "geo_location": {
      "lat": "38.6462305",
      "long": "-78.5347329"
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

  // Iterate over each selection group, placing the group in the item-list
  for(var i=0; i < selectionGroups.length; i++) {
    var currentGroup = '<div id="' + abbrState(selectionGroups[i], 'abbr') + '-group" class="item-group" data-state="' + selectionGroups[i] + '"></div>';
    $('.item-list').append(currentGroup);
  }

  // Iterate over each item in the river info list, placing each one in its appropriate dropdown group
  riverInfo.forEach((riverData, i) => {
    var selectionIDText = riverData.river.toLowerCase().split(" ").join("-") + "-selection";
    var currentItem = document.createElement('div');
    currentItem.id = riverData.river.toLowerCase().split(" ").join("-") + '-selection';
    currentItem.classList.add('item');
    currentItem.dataset.index = i;
    currentItem.addEventListener('click', () => selectItem(selectionIDText));
    currentItem.innerHTML = riverData.river;
    var itemGroup = '#' + abbrState(riverData.state, 'abbr') + '-group';
    $(itemGroup).append(currentItem);
  })
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
  // Test if the Cookie Policy has been accepted, if so, remove the cookie banner
  if(getCookie('canitube_User_Cookie Policy') == 'accepted') {
    $('#cookie-policy-banner').remove();
  } else {
    writeCookie('canitube_User_Cookie Policy', 'unaccepted', 10000000);
    // Add event listener to cookie-policy close button
    document.getElementById('cookie-policy-close-button').addEventListener("click", function() {
      writeCookie('canitube_User_Cookie Policy', 'accepted', 10000000);
      gsap.to('#cookie-policy-banner', {duration: .375, ease: 'power2.inOut', y: '-150%'})
      $('#cookie-policy-banner').remove();
    })
  }
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
var currentSiteCookieName = "canitube_" + selectedRiver + "_currentdata";
// Name of the real-time height cookie
var currentSiteHeightCookieName = "canitube_" + selectedRiver + "_currentheight";

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

// Fill in today's date
$('.date-mask > .container').text(moment().format("MMM Do"));

// Fill in the range tooltip text
var rangeTooltip = 'This range should only be used as a rough estimate. Always check\nwith local outfitters or state/national parks before visiting.\n';
$('#range-tooltip > .container > .tooltip-item').text(rangeTooltip).append('<span class="tooltip-subtext">This data was sourced from: <a href="' + riverInfo[selectedRiverIndex].flow_range_source.link + '" target="_blank">' + riverInfo[selectedRiverIndex].flow_range_source.name + '</a></span>');

// Start the call to the USGS after animating to the loading phase
loadingStage();
var realTimeFlowValue = await fetchRealTimeData(siteCode, currentSiteCookieName);

// Grab the real-time height data
var realTimeHeightValue = await fetchHeightData(siteCode, currentSiteHeightCookieName);

// Finish the load-bar
$('#fill-title').removeClass('load-bar').addClass('load-bar-finish');

// Finish the load-bar
$('.text-load').addClass('text-load-finish').removeClass('text-load');
gsap.to('#loader-text', {duration: .375, opacity: 0});

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
var textFinishLoadClass = '.text-load-finish::after {\n\tposition: relative;\n\tdisplay: block;\n\twidth: 100%;\n\theight: 100%;\n\tcontent: "Loading 100%";\n\twhite-space: nowrap;\n\tfont-family: "Kayak Sans Regular", arial, sans-serif;\n\tletter-spacing: 1px;\n\tfont-size: 16px;\n\tcolor: #1D1D1D;\n\ttext-align: center;\n\ttext-transform: uppercase;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\ttransition: .25s .125s ease;\n}';

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
        // Write the cookie with the app-ready data
        writeCookie(cookieName, appReadyData, 1);

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
        // Write the cookie with the app-ready data
        writeCookie(cookieName, appReadyData, 1);

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
  .call(elementAddClass, ['text-load', '#loader-text'])
  .from('#loader-text', {duration: .25, y: '-150%'})
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

// Swap favicons
swapFavicon(state);

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
gsap.to('#background-wave', {duration: 2.5, delay: 1.25, ease: 'power2.inOut', attr:{'data-height': indicatorHeightLeft}})

// Set the display option to default
$('#icon-translation').css('transform', 'translate(3.2779px, 0px)');
$('#icon-sun').css('opacity', '0');
$('#icon-i').css('opacity', '0');

// Set the wave mask to the correct size
$('#background-wave > mask').attr('width', $(window).width()).attr('height', $(window).height());
$('#background-wave > mask > g > rect').attr('width', $(window).width()).attr('height', $(window).height());

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
  .set('.date-content', {skewX: 0, skewY: 0, rotation: '-90', scaleX: 0, scaleY: 1})
  .set('.date-mask > .container', {color: formatChoices[state].text_color})
  .set('.date-mask', {background: formatChoices[state].background_color})
  .set('.settings-text', {color: formatChoices[state].text_color})
  .set('svg > .svg-stroke-style', {stroke: formatChoices[state].stroke_color})
  .set('svg .svg-fill-style', {fill: formatChoices[state].stroke_color})
  .set('.point-indicator > svg > path', {fill: formatChoices[state].stroke_color})
  .set('.tooltip-item', {color: formatChoices[state].background_color, background: formatChoices[state].text_color})
  .to('body', {duration: 1, background: formatChoices[state].background_color})
  .to('.border-content', {duration: .75, ease: 'power2.inOut', height: $(window).height()-150, opacity: 1}, '-=.25')
  .to('#background-wave > path', {duration: .75, ease: 'power2.inOut', fill: formatChoices[state].text_color}, '-=.75')
  .to('.footer-text', {duration: .75, ease: 'power2.inOut', color: formatChoices[state].text_color}, '-=.75')
  .to('#fill-title', {duration: .75, ease: 'power2.inOut', top: 75, x: '-50%', y: '-25%', color: formatChoices[state].text_color}, '-=.75')
  .to('#stroke-title', {duration: .75, ease: 'power2.inOut', top: 75, x: '-50%', y: '-25%', textStrokeColor: formatChoices[state].stroke_color}, '-=.75')
  .to('.subtitle', {duration: .75, ease: 'power2.inOut', top: (75 - (($('#fill-title').height()*2.25)*.25)/2), color: formatChoices[state].text_color}, '-=.75')
  .to('.border-content', {duration: .75, borderColor: formatChoices[state].stroke_color}, '-=.75')
  .to('#answer > .container', {duration: .75, ease: 'power2.inOut', y: '0%'}, '-=.75')
  .to('#current-flow > .container', {duration: .5, ease: 'power2.inOut', y: '0%'}, '-=.375')
  .to('.date-content', {duration: .5, ease: 'power2.inOut', scaleX: 1, scaleY: 1, rotation: '-90', skewX: 0, skewY: 0}, '-=.375')
  .to('.date-mask > .container', {duration: .5, ease: 'power2.inOut', x: '0%'}, '-=.375')
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
  .set('#range-tooltip', {pointerEvents: 'all'})

}

// This function hot-swaps the favicon based on the page formatting
function swapFavicon(state) {
  // Grab the various favicons to update
  // <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png" id="favicon32">
  // <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png" id="favicon16">
  // <link rel="mask-icon" href="assets/favicon/safari-pinned-tab.svg" color="#1d1d1d" id="safari-icon"> ONLY UPDATE COLOR
  // <link rel="shortcut icon" href="assets/favicon/favicon.ico" id="faviconICO">
  // <meta name="theme-color" content="#e6e6e6" id="themeColor">
  var themeSettings = {
    'default': {
      favicon: {
        favicon32: 'assets/favicon/favicon-32x32.png',
        favicon16: 'assets/favicon/favicon-16x16.png',
        faviconICO: 'assets/favicon/favicon.ico'
      },
      theme_color: {
        safari_color: '#1d1d1d',
        theme_color: '#e6e6e6'
      }
    },
    'no': {
      favicon: {
        favicon32: 'assets/favicon/no/favicon-32x32.png',
        favicon16: 'assets/favicon/no/favicon-16x16.png',
        faviconICO: 'assets/favicon/no/favicon.ico'
      },
      theme_color: {
        safari_color: '#c41e3d',
        theme_color: '#c41e3d'
      }
    },
    'maybe': {
      favicon: {
        favicon32: 'assets/favicon/maybe/favicon-32x32.png',
        favicon16: 'assets/favicon/maybe/favicon-16x16.png',
        faviconICO: 'assets/favicon/maybe/favicon.ico'
      },
      theme_color: {
        safari_color: '#ff7f11',
        theme_color: '#ff7f11'
      }
    },
    'yes': {
      favicon: {
        favicon32: 'assets/favicon/yes/favicon-32x32.png',
        favicon16: 'assets/favicon/yes/favicon-16x16.png',
        faviconICO: 'assets/favicon/yes/favicon.ico'
      },
      theme_color: {
        safari_color: '#2e933c',
        theme_color: '#2e933c'
      }
    }
  }

  // Change colors
  $('#themeColor').attr('content', themeSettings[state].theme_color.theme_color);
  $('#safari-icon').attr('color', themeSettings[state].theme_color.safari_color);

  // Change icon
  $('#faviconICO').attr('href', themeSettings[state].favicon.faviconICO);
  $('#favicon16').attr('href', themeSettings[state].favicon.favicon16);
  $('#favicon32').attr('href', themeSettings[state].favicon.favicon32);
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

// This function writes a cookie with a name, data, and a number of hours before expiring
function writeCookie(name, data, hoursTilExpire) {
  var date = new Date();
  var exp = date.setTime(+ date + (hoursTilExpire * 3600000));
  document.cookie = name + "=" + data + ";" + "expires=" + date.toGMTString() + ";";
}

// This function writes a cookie with a name, data, and a unix expire timestamp
function writeCookieUnix(name, data, unixExpire) {
  document.cookie = name + "=" + data + ";" + "expires=" + unixExpire.toGMTString() + ";";
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
function drawRiverFlow(speed, height) {
  // Time value
  var t = 0;
  // SVG animation function
  function animateWater() {
    // Set the animation resoultion
    var resolution = parseInt($('#performance-svg').attr('data-resolution'));
    // Set the animation height
    // First get the percentage of height
    var height = parseFloat($('#background-wave').attr('data-height'));
    // Invert the height
    height = remapNumber(height, 0, 100, 100, 0);
    // Convert the percentage to a window height value
    // 0% = (($(window).height()/2)+($('.height-wrapper').width()/2)) This value represents the bottom of the height range wrapper as a pixel value from the top of the window
    // 100% = (($(window).height()/2)-($('.height-wrapper').width()/2)) This value represents the top of the height range wrapper as a pixel value from the top of the window
    var heightWrapperHeight = (($(window).height()-150)*.9)*.75;
    var topOfHeightRange = (($(window).height()-150)*.9)*.125;
    height = topOfHeightRange + (heightWrapperHeight*(height/100));



    var xAxis = [];
    // Create a number of X points
    for(var i=0; i < ($(window).width()/resolution)+2; i++) {
      xAxis.push(i*resolution);
    }

    // This value controls the speed of the river
    var masterPhase = t*(-8*speed);

    var points = xAxis.map(x => {
      var sinA = 8 * Math.sin((x+masterPhase) / 209);
      var sinB = 4 * Math.sin((x+(masterPhase*3.218)) / 272);
      var sinC = 1 * Math.sin((x+(masterPhase*2.1047)) / 729);
      var y = (sinA*sinB*sinC)+height;
      return [x,y]
    })

    // Create the SVG path
    var path = "M0,2000 " + points.map(p => {
      return p[0] + "," + p[1];
    }).join(" L");
    $('#background-wave > path').attr('d', path + " L" + $(window).width()+25 + ",2000");

    // Add 1 to time
    t += 1;
    requestAnimationFrame(animateWater);
  }

  animateWater();
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
    .set('#range-tooltip', {pointerEvents: 'none'})
    .to('#settings-cog', {duration: .375, ease: 'power2.inOut', rotation: '120deg'})
    .to('#settings-performance > .container', {duration: .375, ease: 'power2.inOut', x: '0%', opacity: 1}, '-=.25')
    .to('#settings-display > .container', {duration: .375, ease: 'power2.inOut', x: '0%', opacity: 1}, '-=.25');

  // The animation timeline
  var settingsAnimationClose = gsap.timeline({paused: true})
    .set('#range-tooltip', {pointerEvents: 'all'})
    .to('#settings-cog', {duration: .375, ease: 'power2.inOut', rotation: '0deg'})
    .to('#settings-performance > .container', {duration: .375, ease: 'power2.inOut', x: '-25%', opacity: 0}, '-=.25')
    .to('#settings-display > .container', {duration: .375, ease: 'power2.inOut', x: '-25%', opacity: 0}, '-=.25');

  // If the settings are open, reverse the timeline, else play the timeline
  if($('.settings').attr('data-expanded') == 'true') {
    // When the settings close, save the current state of the options
    // Performance
    writeCookie('canitube_Settings_Performance', $('#performance-svg').attr('data-performance'), 10000000);
    // Display
    writeCookie('canitube_Settings_Display', $('#display-svg').attr('data-display'), 10000000);

    $('.settings').attr('data-expanded', 'false');
    settingsAnimationClose.play();
  } else {
    $('.settings').attr('data-expanded', 'true');
    settingsAnimationOpen.play();
  }
}

// This function toggles the performance settings
function togglePerformance() {
  // Read the current state
  var currentState = $('#performance-svg').attr('data-performance');
  // Show the next state and store the state
  if(currentState == 'smooth') {
    // Rough
    $('#performance-svg').attr('data-performance', 'rough');
    $('#performance-svg > polyline').attr('points', '6.9,22.8 6.9,19.6 10.1,19.6 10.1,16.4 13.3,16.4 13.3,13.2 16.5,13.2 16.5,10 19.7,10 19.7,6.8 22.9,6.8');
    gsap.to('#performance-svg', {duration: .1, ease: SteppedEase.config(1), attr:{'data-resolution':250}})
  } else if(currentState == 'rough') {
    // None
    $('#performance-svg').attr('data-performance', 'none');
    $('#performance-svg > polyline').attr('points', '6,14 7.6,14 9.2,14 10.8,14 12.4,14 14,14 15.6,14 17.2,14 18.8,14 20.4,14 22,14');
    gsap.to('#performance-svg', {duration: .1, ease: SteppedEase.config(1), attr:{'data-resolution':1000}});
    gsap.to('#background-wave', {duration: .5, ease: 'power2.inOut', opacity: 0})
  } else {
    // Smooth
    $('#performance-svg').attr('data-performance', 'smooth');
    $('#performance-svg > polyline').attr('points', '6,22 7.6,20.4 9.2,18.8 10.8,17.2 12.4,15.6 14,14 15.6,12.4 17.2,10.8 18.8,9.2 20.4,7.6 22,6');
    gsap.to('#performance-svg', {duration: .1, ease: SteppedEase.config(1), attr:{'data-resolution':100}})
    gsap.to('#background-wave', {duration: .5, ease: 'power2.inOut', opacity: 1})
  }
}

// When the document is ready, aka startup function
$(document).ready(function() {
  var settingsPerformanceCookiePresent = checkCookie('canitube_Settings_Performance');
  var settingsDisplayCookiePresent = checkCookie('canitube_Settings_Display');
  // If there are no settings cookies, create cookies for the default settings
  if(settingsPerformanceCookiePresent == false && settingsDisplayCookiePresent == false) {
    // Performance
    writeCookie('canitube_Settings_Performance', 'smooth', 10000000);
    // Display
    writeCookie('canitube_Settings_Display', 'none', 10000000);
  } else {
    // If these cookies are present, read their data and set their states
    // Performance
    var performanceSetting = getCookie('canitube_Settings_Performance');
    if(performanceSetting == 'none') {
      // None
      $('#performance-svg').attr('data-performance', 'none');
      $('#performance-svg > polyline').attr('points', '6,14 7.6,14 9.2,14 10.8,14 12.4,14 14,14 15.6,14 17.2,14 18.8,14 20.4,14 22,14');
      gsap.to('#performance-svg', {duration: .1, ease: SteppedEase.config(1), attr:{'data-resolution':1000}});
      gsap.to('#background-wave', {duration: .5, ease: 'power2.inOut', opacity: 0})
    } else if(performanceSetting == 'rough') {
      // Rough
      $('#performance-svg').attr('data-performance', 'rough');
      $('#performance-svg > polyline').attr('points', '6.9,22.8 6.9,19.6 10.1,19.6 10.1,16.4 13.3,16.4 13.3,13.2 16.5,13.2 16.5,10 19.7,10 19.7,6.8 22.9,6.8');
      gsap.to('#performance-svg', {duration: .1, ease: SteppedEase.config(1), attr:{'data-resolution':250}})
    } else {
      // Smooth
      $('#performance-svg').attr('data-performance', 'smooth');
      $('#performance-svg > polyline').attr('points', '6,22 7.6,20.4 9.2,18.8 10.8,17.2 12.4,15.6 14,14 15.6,12.4 17.2,10.8 18.8,9.2 20.4,7.6 22,6');
      gsap.to('#performance-svg', {duration: .1, ease: SteppedEase.config(1), attr:{'data-resolution':100}})
      gsap.to('#background-wave', {duration: .5, ease: 'power2.inOut', opacity: 1})
    }
    console.log('finish display code here!')
  }


  // Begin the water animation
  drawRiverFlow(1, 1);
});

// Look for the key combo that triggers the dev console (SHIFT + ~)
document.addEventListener ("keydown", function (zEvent) {
    if (zEvent.shiftKey && zEvent.key === "~") {  // case sensitive
        // If the dev console doesn't already exist create it, else destory it
        if($('#dev-console-area').length) {
          // Destory the dev console and return to the site
          devConsoleDestory();
        } else {
          // Initalize the dev console
          devConsoleInt();
        }
    }
} );

// This function creates the dev console
function devConsoleInt() {
  // Add  the console area to the front of the body
  let consoleArea = '<div id="dev-console-area"></div>';
  $('body').prepend(consoleArea);

  // Add the base console elements
  $('#dev-console-area').append('<div class="container"></div>');
  let devConsoleContentArea = $('#dev-console-area > .container');
  let devConsoleTitle = '<div class="dev-console-info" id="dev-console-title"><div class="container">Dev Console</div></div>';
  let devConsoleInstruction = '<div class="dev-console-info" id="dev-console-instruction"><div class="container">Press SHIFT + TILDA to close the console</div></div>';
  let devConsoleTime = '<div class="dev-console-info" id="dev-console-time"><div class="container"></div></div>';
  let devConsoleVersion = '<div class="dev-console-info" id="dev-console-version"><div class="container">Can I Tube <span class="lower-case">v</span>' + appVersion + '</div></div>';
  devConsoleContentArea.append(devConsoleTitle).append(devConsoleInstruction).append(devConsoleTime).append(devConsoleVersion);

  // Add the Cookie wrapper and actions wrapper
  let devConsoleItemsWrapper = '<div id="dev-console-items"><div class="container"></div></div>';
  devConsoleContentArea.append(devConsoleItemsWrapper);
  let cookieWrapper = '<div id="dev-console-cookies"></div>';
  let actionsWrapper = '<div id="dev-console-actions"></div>';
  $('#dev-console-items > .container').append(cookieWrapper).append(actionsWrapper);

  // Add actions to the actions wrapper
  $('#dev-console-actions').append('<div id="actions-title">ACTIONS\n<span class="dev-console-subtitle">Warning: these actions cannot be undone.</span></div>').append('<div class="actions-item" id="clear-settings">Clear Settings</div>').append('<div class="actions-item" id="clear-all-rivers">Clear All River Data</div>').append('<div class="actions-item" id="factory-reset">Factory Reset & Reload</div>');

  // Add event listeners to each action
  document.getElementById('clear-settings').addEventListener("click", function() {
    clearSettings();
  });
  document.getElementById('clear-all-rivers').addEventListener("click", function() {
    clearAllRiverData();
  });
  document.getElementById('factory-reset').addEventListener("click", function() {
    factoryReset();
  });

  // Populate the cookies wrapper with each major cookie and its checkbox
  // MOVING THIS TO A FUNCTION
  generateCookies();

  // Start running the time function for the console
  updateTime();

  // Animate in the console
  gsap.timeline()
    .to('#dev-console-area', {duration: .5, ease: 'power2.inOut', background: 'rgba(29, 29, 29, .38)'})
    .to('.central-content', {duration: .5, ease: 'power2.inOut', filter: 'blur(24px)'}, '-.5')
    .to('#title-wrapper', {duration: .5, ease: 'power2.inOut', filter: 'blur(24px)'}, '-.5')
    .to('.cta-wrapper', {duration: .5, ease: 'power2.inOut', filter: 'blur(24px)'}, '-.5')
    .to('.border-content', {duration: .5, ease: 'power2.inOut', filter: 'blur(24px)'}, '-.5')
    .to('#stroke-title', {duration: .5, ease: 'power2.inOut', filter: 'blur(24px)'}, '-.5')
    .to('.footer', {duration: .5, ease: 'power2.inOut', filter: 'blur(24px)'}, '-.5')
}

// This function removes the dev console
function devConsoleDestory() {
  gsap.timeline()
    .to('#dev-console-area', {duration: .375, ease: 'power2.inOut', background: 'rgba(29, 29, 29, 0)'})
    .to('.central-content', {duration: .375, ease: 'power2.inOut', filter: 'blur(0px)'}, '-.375')
    .to('#title-wrapper', {duration: .375, ease: 'power2.inOut', filter: 'blur(0px)'}, '-.375')
    .to('.cta-wrapper', {duration: .375, ease: 'power2.inOut', filter: 'blur(0px)'}, '-.375')
    .to('.border-content', {duration: .375, ease: 'power2.inOut', filter: 'blur(0px)'}, '-.375')
    .to('#stroke-title', {duration: .375, ease: 'power2.inOut', filter: 'blur(0px)'}, '-.375')
    .to('.footer', {duration: .375, ease: 'power2.inOut', filter: 'blur(0px)'}, '-.375')
    .call(removeElement, ["#dev-console-area"])
}

// This function updates the console time every second
function updateTime() {
    let currentTime = moment().format('MMM DD, YYYY　　hh:mm:ss A');

    // Only if the dev console time div exists should this function loop
    if($('#dev-console-time').length) {
      // set the content of the element with the ID time to the formatted string
      $('#dev-console-time').text(currentTime);
      // call this function again in 1000ms
      setTimeout(updateTime, 1000);
    }
}

// This function acts as a filter method for arrays that returns only unique values
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// This function resets the settings to the default values
function clearSettings() {
  writeCookie('canitube_Settings_Performance', 'smooth', 1000000);
  writeCookie('canitube_Settings_Display', 'simple', 1000000);
}

// This function clears all river data
function clearAllRiverData() {
  let cookieArray = document.cookie.split("; ");
  for(var i=0; i < cookieArray.length; i++) {
    // If the cookie isn't a settings cookie
    if(cookieArray[i].split("_")[1] !== 'Settings') {
      writeCookie('canitube_' + cookieArray[i].split("_")[1] + '_' + cookieArray[i].split("_")[2].split("=")[0], 'null', -1000);
    }
  }
}

// This function resets all cookies and reloads the page
function factoryReset() {
  let cookieArray = document.cookie.split("; ");
  for(var i=0; i < cookieArray.length; i++) {
    // Delete every cookie
    writeCookie('canitube_' + cookieArray[i].split("_")[1] + '_' + cookieArray[i].split("_")[2].split("=")[0], 'null', -100);
  }

  // Reload the page
  location.reload();
}

// This function clears all selected cookies in the dev console
function clearSelectedCookies() {
  $('input[name="cookie-selection"]:checkbox:checked').each(function() {
    const toTitleCase = (phrase) => {
      return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
    // Get the current cookie name
    let currentCookieName = toTitleCase($(this).attr('id').replace(/-/g, ' ')).split(" ");
    currentCookieName = currentCookieName.splice(0, currentCookieName.length-2).join(" ");

    // Write a cookie for each data point in this group that expires in the past so the cookie is deleted
    let cookieDataListParentID = currentCookieName.toLowerCase().replace(/\s/g, '-') + '-cookies';
    $('#' + cookieDataListParentID + ' .cookie-data-point').each(function() {
      writeCookie('canitube_' + currentCookieName + '_' + $(this).attr('id').split("-")[2], 'null', -1000);
    })
  })
}

// When any cookie is selected turn up opacity on clear selected cookie
function cookieGroupClick() {
  let checkedAmount = $('input[name="cookie-selection"]:checkbox:checked').length;
  if(checkedAmount > 0) {
    // If there are some boxes checked
    $('#cookie-clear-selected').css('opacity', '1');
  } else {
    // If there aren't any boxes checked
    $('#cookie-clear-selected').css('opacity', '');
  }
}

// This function refreshes and generates cookies into the dev console
function generateCookies() {
  // Check if the number of groups in the cookie pannel is the same as the number of cookies in the document currently, if they are the same number, do nothing but update the refresh counter
  if($('.cookie-data-point').length !== document.cookie.split("; ")) {
    // If they are not equal then add all the cookies
    $('#dev-console-cookies').empty();

    let uniqueValueCookies = document.cookie.split("; ").map(i => i.split("_")[1]).filter(onlyUnique);
    for(var i=0; i < uniqueValueCookies.length; i++) {
      // If the current cookie group is not weather
      let currentCookieGroup = '<div class="cookie-group" id="' + uniqueValueCookies[i].toLowerCase().replace(/\s/g, '-') + '-cookies"></div>';
      $('#dev-console-cookies').append(currentCookieGroup);

      // Create the checkbox and label
      let currentCookieLabel = '<label for="' + uniqueValueCookies[i].toLowerCase().replace(/\s/g, '-') + '-cookie-data"><input type="checkbox" id="' + uniqueValueCookies[i].toLowerCase().replace(/\s/g, '-') + '-cookie-data" name="cookie-selection" value="' + uniqueValueCookies[i] + '"><div class="cookie-label">' + uniqueValueCookies[i] + '</div></label>';
      $('#' + uniqueValueCookies[i].toLowerCase().replace(/\s/g, '-') + '-cookies').append(currentCookieLabel);
    }

    // Iterate over each cookie
    let allCookies = document.cookie.split("; ");
    for(var i=0; i < allCookies.length; i++) {
      // For each cookie determine which group it belongs in
      let cookieName = allCookies[i].split("_")[1];
      let cookieDataType = allCookies[i].split("_")[2].split("=")[0];
      if(cookieDataType == 'Weather') {
        cookieDataType = '[W] ' + allCookies[i].split("_")[3].split("=")[0];
        var cookieDataName = allCookies[i].split("_")[3].split("=")[0];
        if(cookieDataName.split(" ")[0] !== 'Current') {
          // If the weather cookie is not current then its data should be replaced with an Object notation
          var cookieData = '{Object}';
        } else {
          var cookieData = allCookies[i].split("_")[3].split("=")[1];
        }
      } else {
        cookieDataType = cookieDataType.split("=")[0];
        var cookieDataName = cookieDataType;
        var cookieData = allCookies[i].split("_")[2].split("=")[1];
      }

      // Determine the unit of measure
      if(cookieDataName == 'currentdata') {
        var cookieUnit = 'CUFT3/S';
      } else if(cookieDataName == 'currentheight') {
        var cookieUnit = 'FT';
      } else if(cookieDataName == 'Current Temperature') {
        var cookieUnit = 'K';
      } else if(cookieDataName == 'Current Wind Speed') {
        var cookieUnit = 'M/S';
      } else if(cookieDataName == 'Current Cloud Cover') {
        var cookieUnit = '%';
      } else {
        var cookieUnit = '';
      }

      // Craft the current cookie data entry
      let currentCookie = '<div class="cookie-data-point" id="cookie-' + cookieName.toLowerCase() + '-' + cookieDataName.toLowerCase().replace(/\s/g, '-') + '" data-value="' + cookieData + '" data-unit="' + cookieUnit + '">' + cookieDataType + '</div>';

      // Append the current data entry into the cookie group
      $('#' + cookieName.toLowerCase().replace(/\s/g, '-') + '-cookies').append(currentCookie);

    }

    // Add event listeners to each cookie group
    document.querySelectorAll('.cookie-group').forEach(element => {
      element.addEventListener("click", function() {
        cookieGroupClick();
      })
    });

    // Add the clear selected cookies action
    let selectedCookieClearAction = '<div id="cookie-clear-selected">Clear Selected</div>';
    $('#dev-console-cookies').append(selectedCookieClearAction);
    document.getElementById('cookie-clear-selected').addEventListener("click", function() {
      clearSelectedCookies();
    });

    // Add the refresh button
    let refreshAction = '<div id="cookie-refresh"><div id="refresh-cookie-countdown"></div></div>';
    $('#dev-console-cookies').append(refreshAction);

    // Restart the refresh timer
    refreshTimer();
  } else {
    // Restart the refresh timer
    refreshTimer();
  }
}

// This function creates a refresh timer in the dev console
function refreshTimer() {
  // Empty the refresh timer text
  $('#refresh-cookie-countdown').empty();

  // Start the countdown
  let timeLeft = 30;
  var refreshInterval = setInterval(function(){
    if(timeLeft <= 0){
      clearInterval(refreshInterval);
      generateCookies();
    }

    // Set some refresh text
    let refreshText = 'Refreshing in ' + timeLeft + ' seconds';
    if(timeLeft == 1) {
      refreshText = 'Refreshing in ' + timeLeft + ' second';
    }

    $('#refresh-cookie-countdown').empty().text(refreshText);
    timeLeft -= 1;
  }, 1000);
}
