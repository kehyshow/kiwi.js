/**
* A widget for the management / displaying of a time in the HUD.
*
* @module HUD
* @submodule Widget
*
*  @todo       Replace with the time / clock manager
*/

module Kiwi.HUD.Widget {
    
    /**
    * @class Time
    * @extends TextField
    * @constructor
    * @param format {string} The format that you want the time to be in.
    * @param x {number} x
    * @param y {number} y
    */
    export class Time extends Kiwi.HUD.Widget.TextField {
        
        constructor(format:string,x:number,y:number) {
            super('time', x, y);

            this.time = this.components.add(new Kiwi.HUD.Components.Time(0));
            this.time.updated.add(this.updateTime, this);

            this.format(format);
            this.updateTime();
        }
        
        /*
        * The format that they want the time to be displayed.
        * @property _format
        * @type string
        * @private
        */
        private _format: string;

        /*
        * Holds the time component.
        * @property time
        * @type Time
        * @public
        */
        public time: Kiwi.HUD.Components.Time;

        /*
        * Allows you to set the time based on the parameter's passed.
        *
        * @method setTime
        * @param milliseconds {number} milliseconds
        * @param seconds {number} seconds
        * @param minutes {number} minutes
        * @param hours {number} hours
        * @return {number} 
        * @public
        */
        public setTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number) {
            this.time.setTime(milliseconds, seconds, minutes, hours);

            this.updateTime();
            return this.time.milliseconds;
        }

        /*
        * The format that you want the text to be in.
        * @method format
        * @param val {string} val
        * @return {string}
        * @public
        */
        public format(val?: string):string {
            if (val !== undefined) {
                this._format = val;
            }
            return this._format;
        }

        /*
        * Updates the time that is being displayed in the text field.
        *
        * To Do: remove the use of regexp. RegExp are slow.
        *
        * @method updateTime
        * @public
        */
        public updateTime() {
            var ms = String(this.time.milliseconds);
            var s = String(this.time.seconds);
            var m = String(this.time.minutes);
            var h = String(this.time.hours);

            if (s.length < 2) var ss = '0' + s; else var ss = s;
            if (m.length < 2) var mm = '0' + m; else var mm = m;
            if (h.length < 2) var hh = '0' + h; else var hh = h;

            var time = this._format;    //none regexp functions would be better 
            time = time.replace('ms', ms);  //milliseconds

            time = time.replace('ss', ss);  //leading zeros
            time = time.replace('mm', mm);
            time = time.replace('hh', hh);
            time = time.replace('s', s);    //without leading zeros
            time = time.replace('m', m);
            time = time.replace('h', h);

            this.text(time);
        }

    }

}