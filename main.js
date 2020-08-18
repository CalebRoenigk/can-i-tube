var riverInfo = [
      {
        "river": "Cape Fear River",
        "siteID": "02102500",
        "state": "North Carolina",
        "safe_range": {
          "min": 400,
          "max": 1000
        }
      },
      {
        "river": "Catawba River",
        "siteID": "02145000",
        "state": "North Carolina",
        "safe_range": {
          "min": 2500,
          "max": 3600
        }
      },
      {
        "river": "Congaree River",
        "siteID": "02169500",
        "state": "South Carolina",
        "safe_range": {
          "min": 1000,
          "max": 4000
        }
      },
      {
        "river": "Dan River",
        "siteID": "02071000",
        "state": "North Carolina",
        "safe_range": {
          "min": 250,
          "max": 800
        }
      },
      {
        "river": "French Broad River",
        "siteID": "03451500",
        "state": "North Carolina",
        "safe_range": {
          "min": 500,
          "max": 2900
        }
      },
      {
        "river": "New River",
        "siteID": "03161000",
        "state": "North Carolina",
        "safe_range": {
          "min": 400,
          "max": 1000
        }
      },
      {
        "river": "Saluda River",
        "siteID": "02167000",
        "state": "South Carolina",
        "safe_range": {
          "min": 600,
          "max": 1100
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
          for(i = 0; i < states.length; i++){
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
      var selectionIDText = "'" + riverInfo[i].river.toLowerCase().split(" ").join("-") + "-selection'";
      var currentItem = '<div id="' + riverInfo[i].river.toLowerCase().split(" ").join("-") + '-selection" class="item" data-index="' + i + '" onClick="selectItem(' + selectionIDText + ')">' + riverInfo[i].river + '</div>';
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
    if ($(e.target).closest("#dropdown-wrapper").length === 0) {
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
    selectedRiver = riverInfo[selectedRiverIndex].river;
    // Name of the real-time cookie for the current site
    var currentSiteCookieName = "canitube_" + selectedRiver + "_currentData";

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

    // Finish the load-bar
    $('#fill-title').removeClass('load-bar').addClass('load-bar-finish');

    // Begin styling and transitioning the page
    var currentSafeRange = riverInfo[selectedRiverIndex].safe_range;

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
        formatPage("yes", realTimeFlowValue, currentSafeRange);
      } else {
        // Today is maybe safe
        console.log("Today is maybe safe?");
        formatPage("maybe", realTimeFlowValue, currentSafeRange);
      }
    } else {
      // Today is not safe
      console.log("Today is not safe!");
      formatPage("no", realTimeFlowValue, currentSafeRange);
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

    // This function returns a random integer between a min and max value
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

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
            console.log("Data Retreived!");
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

  // This function transitions from the set-up selection stage to the loading stage
  function loadingStage() {
    gsap.timeline()
      .set('#title-wrapper', {opacity: 1})
      .set('#stroke-title', {opacity: 1})
      .to('.central-content', {duration: .01, delay: .375, display: 'none'})
      .call(removeElement, [".central-content"])
      .call(removeElement, [".cta-wrapper"])
      .to('.border-content', {duration: .6, ease: 'power2.inOut', width: $(window).width()-125, opacity: 1})
      .to('#left-subtitle', {duration: .6, ease: 'power2.inOut', left: subtitleSidePosition($('#left-subtitle').width(), $('#fill-title').width(), .625, 2.25, 20), scale: .625, x: '-50%'}, '-=.6')
      .to('#right-subtitle', {duration: .6, ease: 'power2.inOut', right: subtitleSidePosition($('#right-subtitle').width(), $('#fill-title').width(), .625, 2.25, 20), scale: .625, x: '50%'}, '-=.6')
      .to('#fill-title', {duration: .6, ease: 'power2.inOut', top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 2.25, textStroke: '0px rgba(29,29,29,1)', letterSpacing: 2, color: 'rgba(29, 29, 29, 0)'}, '-=.6')
      .to('#stroke-title', {duration: .6, ease: 'power2.inOut', top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 2.25, color: 'rgba(29, 29, 29, 0)'}, '-=.6')
      .set('.main-title', {fontFamily: 'Kayak Sans Bold'})
      .call(elementAddClass, ['load-bar', '#fill-title'])
  }

  // This function formats the page based on the determined safety
  function formatPage(state, currentFlowValue, safeRange) {
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

    // Begin the transition to the final state
    gsap.timeline()
      .delay(.25)
      .to('body', {duration: 1, background: formatChoices[state].background_color})
      .to('.border-content', {duration: .75, ease: 'power2.inOut', height: $(window).height()-125, opacity: 1}, '-=.25')
      .to('#fill-title', {duration: .75, ease: 'power2.inOut', top: 75, x: '-50%', y: '-38%', color: formatChoices[state].text_color}, '-=.75')
      .to('#stroke-title', {duration: .75, ease: 'power2.inOut', top: 75, x: '-50%', y: '-38%', textStrokeColor: formatChoices[state].stroke_color}, '-=.75')
      .to('.subtitle', {duration: .75, ease: 'power2.inOut', top: (75 - (($('#fill-title').height()*2.25)*.25)), color: formatChoices[state].text_color}, '-=.75')
      .to('.border-content', {duration: .75, borderColor: formatChoices[state].stroke_color}, '-=.75')
      .call(createAnswer, [state, currentFlowValue])
      .set('#answer > .container', {y: '150%', color: formatChoices[state].text_color})
      .set('#current-flow > .container', {y: '150%', color: formatChoices[state].text_color})
      .to('#answer > .container', {duration: .75, ease: 'power2.inOut', y: '0%'})
      .to('#current-flow > .container', {duration: .5, ease: 'power2.inOut', y: '0%'}, '-=.375')
  }

  // This function populates the answer and flow values
  function createAnswer(state, currentFlow) {
    var flowText = 'Current Flow: ' + currentFlow + 'FT<span class="superscript">3</span>/S';
    $('#current-flow > .container').append(flowText).css('font-size', '18px').css('letter-spacing', '2px');
    $('#answer > .container').text(state.toUpperCase());
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
