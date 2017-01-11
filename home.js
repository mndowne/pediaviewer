$(document).ready(function(){

        function submitPressed(){
                $(".info").remove();
                $(".wrong").remove();
                var bla = $('#inputBox').val();
                var blaArray = bla.split("");
                for(y=0; y<blaArray.length; y++)
                {
                if (blaArray[y] == " ")
                {
                blaArray.splice(y,1,"_");
                }
                }
                bla = blaArray.join("");
                var urls = "https://en.wikipedia.org//w/api.php?action=query&format=json&titles="+bla+"&prop=revisions&rvprop=content&callback=?";

                $.getJSON(urls,function(json){
                        var data = json;
                        //console.log(data);
                        var keys = Object.keys(data.query.pages);
                        var keys2 = Object.keys(data.query.pages[keys[0]]);
                        var keys3 = Object.keys(data.query.pages[keys[0]].revisions)
                        var jsonString = JSON.stringify(data.query.pages[keys[0]].revisions);
                        var searchArray = jsonString.split("\\n");   
                        //console.log(jsonString);
                        for (i=0; i<searchArray.length; i++){
                        //console.log(searchArray[i]);
                        }
                        var newArray = [];
                        for (i=0; i<searchArray.length; i++){
                        if (searchArray[i].indexOf('[')!= -1){
                        newArray.push(searchArray[i]);
                        } 
                        }
                        //console.log(newArray);

                        for (j=1; j<newArray.length;j++){
                            var tempArr = newArray[j].split("");
                            //console.log(newArray[j]);
                            //console.log(tempArr);
                            var titleArr = [];

                            for (k=0 ; k<tempArr.length ; k++)
                            {
                                if (tempArr[k] == '[' && tempArr[k+1]== '[')
                                {
                                    titleArr = tempArr.slice(k+2,tempArr.indexOf(']'));
                                    //console.log(titleArr);
                                }

                                if (tempArr[k] == "[" || tempArr[k] == "]" || tempArr[k] == "*")
                                {
                                    tempArr.splice(k,1);
                                    k--;
                                }

                            }//end of k loop  
                            var title = titleArr.join("");
                            for (t=0; t <titleArr.length; t++)
                            {
                                if (titleArr[t] == " ")
                                {
                                    titleArr.splice(t,1,"_");
                                }

                                if (titleArr[t] == "|"){
                                    titleArr.splice(t);
                                }
                            }
                            newArray[j] = tempArr.join("");
                            //console.log(title + "titel:and the : " + newArray[j]);
                            var titleLink = titleArr.join("");
                            $('body').append("<a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/"+ titleLink +"\"><div class='info'><h3>"+title+"</h3><p>"+newArray[j]+"</p></div></a>");

                        }//end of j loop
                });//getJSON
                setTimeout( function(){
                        $('body').append("<h3 class=\"wrong\"style=\"text-align: center\">Not the results you were looking for? Try another search!</h3>")},
                        5000);

        }//button clicked

        
        $("#inputSubmit").click(function(){
            submitPressed();
        });

        $(document).keypress(function(key){
                if (key.keyCode == 13 || key.keycharCode){
                        submitPressed();
                }
        });
});
