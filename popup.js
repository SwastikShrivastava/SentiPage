function sendClicks() {
 $.ajax({
         type: "GET",
         url: "./source/scores.csv",
         dataType: "text",
         success: function(scores) {    
            $.ajax({
                 type: "GET",
                 url: "./source/words.csv",
                 dataType: "text",
                 success: function(data) {
                      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                      chrome.tabs.sendMessage(tabs[0].id, {words: data,score:scores}, function(response) {
                          console.log(response.val);
                          if (response.val>4.92 && response.val< 4.99) {
                            $("#fill").html('<img class="circle responsive-img hoverable" src="./extension_content/avg.png">');
                            $("#text").html('<h6>Average Article! Readable.</h6>');
                            chrome.browserAction.setIcon({path: "./extension_content/avg.png"});
                          }
                          else if(response.val>4.99 && response.val< 5.45)
                          {
                            $("#fill").html('<img class="circle responsive-img hoverable" src="./extension_content/happy.png">');
                            $("#text").html('<h6>Yay! This is the happy one.</h6>');
                            chrome.browserAction.setIcon({path: "./extension_content/happy.png"});
                          }
                          else if(response.val>5.45)
                          {
                            $("#fill").html('<img class="circle responsive-img hoverable" src="./extension_content/kiss.png">');
                            $("#text").html('<h6>Wow! This page is so filled with LOVE.</h6>');
                             chrome.browserAction.setIcon({path: "./extension_content/kiss.png"});
                          }
                          else if(response.val>4.3 && response.val< 4.92)
                          {
                            $("#fill").html('<img class="circle responsive-img hoverable" src="./extension_content/sad.png">');
                            $("#text").html('<h6>This page Sad! Filled with sad Words.</h6>');
                             chrome.browserAction.setIcon({path: "./extension_content/sad.png"});
                          }
                          else if(response.val<4.3)
                          {
                            $("#fill").html('<img class="circle responsive-img hoverable" src="./extension_content/devil.png">');
                            $("#text").html('<h6>Trust me, do not read this!</h6>');
                             chrome.browserAction.setIcon({path: "./extension_content/devil.png"});
                          }
                      });
                  });
                 }
            });    
         }
    });
    
}

$(function() {
    sendClicks();
    $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
    
});
