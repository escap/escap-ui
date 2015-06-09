define([], function() {

    'use strict'

    function D3SConnector( language){
        this.o = {}
        this.o.lang = language;
    }

    D3SConnector.prototype.parseData = function(D3SData) {

        var result  =[];

        for(var i = 0, length = D3SData.length; i<length; i++) {
            var self = this;
            var tmp  = {
                'id': D3SData[i].code,
                'text': D3SData[i].title[this.o.lang],
                'children': self.handleRecursive(D3SData[i], self)
            };
            console.log(tmp);
            result.push(tmp);
        }

        return result;

    }

    D3SConnector.prototype.handleRecursive = function(childObject,  thisContext) {
        if(childObject.leaf === true){
            return false;
        }else{
            return thisContext.parseData(childObject.children);
        }
    }

    return D3SConnector;

})