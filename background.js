var uselessWords = ["is","of","the","on","off","was","i","","has","have","had","will","a","in","that","it","an","its","and","by","be","."," "]


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

        var wordArray=request.words.split(/\r\n|\n|\r/);
        var scoresArray=request.score.split(/\r\n|\n|\r/);
        var htmlWords=($("body").text().split(/\s+/));
        var arrToLow = String.prototype.toLowerCase.apply(htmlWords).split(",");
        var diff = $(arrToLow).not(uselessWords).get();
        var value = 0;
        var count=0;
        var happyCount=0,sadCount=0;
        var k=0;
        for (var i = 0; i < wordArray.length; i++) {
          for (var j =0; j < diff.length-1; j++) {
             if (diff[j]==wordArray[i]) {
              value+=parseInt(scoresArray[i]);
              count=count+1;
              if (parseInt(scoresArray[i])>7) {
                happyCount+=1;
              }
              else if (parseInt(scoresArray[i])<3.5) {
                sadCount+=1;
              }
             }
           }
           k=i; 
        }

        if(k==wordArray.length-1){
          var val1 = value/count;
          console.log(value/count);
          console.log(happyCount+" sad "+sadCount)
          sendResponse({val: val1});
        }
        
});