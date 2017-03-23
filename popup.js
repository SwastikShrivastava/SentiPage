

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

                          if(typeof(response)!="undefined")
                          { 

                              console.log(response.val);


                            if (response.val>4.92 && response.val< 4.99) {
                              $("#fill").html('<img class="circle responsive-img hoverable" src="./extension_content/avg.png">');
                              $("#text").html('<h6 style="font-family: regular_varela;font-size: 15px;" > Average Article! Readable. </h6>');
                              chrome.browserAction.setIcon({path: "./extension_content/avg.png"});
                            }
                            else if(response.val>4.99 && response.val< 5.45)
                            {
                              $("#fill").html('<img class="circle responsive-img hoverable" src="./extension_content/happy.png">');
                              $("#text").html('<h6 style="font-family: regular_varela ;font-size: 15px;" >Yay! This is the happy one. </h6>');
                              chrome.browserAction.setIcon({path: "./extension_content/happy.png"});
                            }
                            else if(response.val>5.45)
                            {
                              $("#fill").html('<img class="circle responsive-img hoverable" src="./extension_content/kiss.png">');
                              $("#text").html('<br> <h6 style="font-family: regular_varela;font-size: 15px;" > Wow! This page is so filled with LOVE.</h6>');
                               chrome.browserAction.setIcon({path: "./extension_content/kiss.png"});
                            }
                            else if(response.val>4.3 && response.val< 4.92)
                            {
                              $("#fill").html('<img class="circle responsive-img hoverable" src="./extension_content/sad.png">');
                              $("#text").html('<br> <h6 style="font-family: regular_varela;font-size: 15px;" > This page Sad! Filled with sad Words.</h6>');
                               chrome.browserAction.setIcon({path: "./extension_content/sad.png"});
                            }
                            else if(response.val<4.3 && response.val>0)
                            {
                              $("#fill").html('<img class="circle responsive-img hoverable" src="./extension_content/devil.png">');
                              $("#text").html('<br><h6 style="font-family: regular_varela;font-size: 15px;" > Trust me, do not read this!</h6>');
                               chrome.browserAction.setIcon({path: "./extension_content/devil.png"});
                            }
                            else if(response.val==-1)
                            {
                              $("#fill").html('<img class="circle responsive-img hoverable" src="./extension_content/avg.png">');
                              $("#text").html('<br> <h6 style="font-family: regular_varela;font-size: 15px;"><b>This page holds no sentiments</b> </h6>');
                             chrome.browserAction.setIcon({path: "./extension_content/avg.png"});

                            }
                          
                          }
                          else
                          {
                            $("#fill").html('<img class="circle responsive-img hoverable" src="./extension_content/avg.png">');
                            $("#text").html('<br> <h6 style="font-family: regular_varela;font-size: 15px;">Cant figure it out. Try after reloading the page</h6>');
                             chrome.browserAction.setIcon({path: "./extension_content/avg.png"});
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


   
     