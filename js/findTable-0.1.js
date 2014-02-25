/*
 * @Copyright (c) 2014 Samuel Santos (samukaelsantos@gmail.com)
 * @Page http://samucasantos.com.br/findTable
 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * @Version: 0.1
 * @Release: 2014-02-24
 */

$.fn.findTable = function(settings) {
    /*
     * 
     * Settings default
     * 
     */
    
    var defaults = {
        classInputFind: "find",//input class 
        areaClassFind: "findTable",// main element with table and input to search
        startFind: 3, //number of characters to start find
        elementFind: null //tbody or table with rows
    }; 
    
    //load settings
    settings = $.extend(defaults, settings);
    
    return this.each(function() {
        
        //return all rows
        function getRows(){
            var locateBodys = settings.elementFind;
            return $(locateBodys).find("tr");
        }
        
        //search the value in table
        function findValue(valFind){
            
            var cells = null;
            rowsCells = getRows();
            //hide all rows
            $(rowsCells).hide();
            
            //split
            $.each(rowsCells, function(index, row){
                cells = $(row).find("td");
                if(cells != null){
                    $.each(cells, function(idx, cell){
                        if($(cell).text().toLowerCase().search(valFind) != -1){
                            $(row).show();
                        }
                    })
                }
            })            
        }
        
        function keyDownEvent() {
            var valFind = $(this).val().toLowerCase();
            var element_verify = $(this);
            
            //search main element with input and table 
            while ($(element_verify).hasClass(settings.areaClassFind) != true) {
                element_verify = $(element_verify).parent();
            }
            //get tbody or table
            settings.elementFind = ($(element_verify).find("table tbody") == null) ? $(element_verify).find("table") : $(element_verify).find("table tbody");
            
            //if number digited >= the startFind, call find
            if(valFind.length >= settings.startFind){
                findValue(valFind);
            }else{
            //else show all rows
                rowsCells = getRows();
                $(rowsCells).show();
            }
        }
        
        
        //bind to keyup to input search
        $("."+ settings.areaClassFind + " #" + settings.classInputFind).bind("keyup", keyDownEvent);
        
    });
}

