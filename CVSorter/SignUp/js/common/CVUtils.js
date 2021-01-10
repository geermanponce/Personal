function CVUtils()/*{{{*/
{
   this.inter=0;
}
/*}}}*/

CVUtils.prototype.getCookie =function (cname)/*{{{*/
{
    return localStorage.getItem(cname);
}
/*}}}*/

CVUtils.prototype.setCookie= function(cname, cvalue, exdays)/*{{{*/
{
    localStorage.setItem(cname, cvalue);
}
/*}}}*/

CVUtils.prototype.isalphanumeric = function(inputtxt)
{
   var letterNumber = /^[0-9a-zA-Z ]+$/;
   if(inputtxt.match(letterNumber)) 
      return true;

   return false; 
}

CVUtils.prototype.containsString = function(fullString, shortString)/*{{{*/
{
   if(fullString.indexOf(shortString)<0)
      return false;
   return true;
}
/*}}}*/

CVUtils.prototype.acceptJustNumbers = function(inputName)/*{{{*/
{
   $("#"+ inputName).val ( $("#"+ inputName).val().replace(/\D/g, '') );
}
/*}}}*/

CVUtils.prototype.getPropertyFromHtmlObject = function(htmlObject, property)/*{{{*/
{
   if($("#"+htmlObject).is('input'))
   {
      return $("#"+htmlObject).val()
   }
   else if($("#"+htmlObject).is('select'))
   {
      if(property.indexOf("value")>=0)
         return $("#"+htmlObject).val();
      else
         return $("#"+htmlObject+" option:selected").text();
   }
   else if($("#"+htmlObject).is('textarea'))
   {
      return $("#"+htmlObject).val();
   }
   else
      return "";
}
/*}}}*/

CVUtils.prototype.getCheckedChecks = function()/*{{{*/
{
   dataProducts     = JSON.parse(localStorage.dataProducts || "{}");
   dataChecks     = localStorage.dataChecks.split(',') ;
   var listOfIds = []
   for (data in dataChecks){
      if(dataChecks[data]=="true")
        listOfIds.push(dataProducts[data].PI)
   }
   return listOfIds
}
/*}}}*/


var cvUtils= new CVUtils();
