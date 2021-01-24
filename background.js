chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({text: 'RUNS', color:[0,60,255,1]}, function() {
    chrome.browserAction.setBadgeText({text:"RUNS"}, function (){})
    chrome.browserAction.setBadgeBackgroundColor({color:[0,60,255,1]}, function(){})
  });
});
chrome.history.onVisited.addListener(function(HistoryItem){
    chrome.storage.sync.get(['text', 'datetime'], function(data) {
        if(data.text == "HOLD"){
            chrome.history.deleteRange({startTime:data.datetime, endTime:new Date().getTime()+100}, function(){})
        }
    });
})
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.sync.get('text', function(data) {
        if(data.text=="RUNS"){ //Если записывает
           chrome.storage.sync.set({text: 'HOLD', color:[255,0,0,1], button: "START RECORD", datetime: new Date().getTime()}, function() {
               chrome.browserAction.setBadgeText({text:"HOLD"}, function (){})
               chrome.browserAction.setBadgeBackgroundColor({color:[255,0,0,1]}, function(){})
           });
        }else{
           chrome.storage.sync.set({text: 'RUNS', color:[255,0,0,1], button: "STOP RECORD"}, function() {
               chrome.browserAction.setBadgeText({text:"RUNS"}, function (){})
               chrome.browserAction.setBadgeBackgroundColor({color:[0,60,255,1]}, function(){})
           });
        }
   });
});