/// <reference path="..\..\Kiwi.ts" />

/*
 *	Kiwi - HUD - Bar
 *
 *	@desc		An abstract class that contains all of the fundametals for the control of a bar widget.
 *
 *	@version	1.0 - 26th July 2013
 *				
 *	@author 	Ben Harding
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.HUD.Widget {

    export class Bar extends Kiwi.HUD.HUDWidget {
        
        /**
        *
        * @constructor 
        * @param {number} current - The current value.
        * @param {number} max - The maximum value.
        * @param {number} x 
        * @param {number} y
        **/
        constructor(current: number, max:number, x:number,y:number, width:number=120, height:number=20) {
            super("bar", x, y);

            this._horizontal = true;
            this._bar = document.createElement('div');
            this._bar.className = 'innerBar';

            this.range = this.components.add(new Kiwi.HUD.Components.Range(current, max, 0));//add updated component to range
            this.range.updated.add(this.updateCSS, this);

            this.bar = this._bar;
            this.container.appendChild(this.bar);
            
            this.width = width;
            this.height = height;

            this._bar.style.height = '100%';
            this._bar.style.width = '100%';
            
            this.updateCSS();
        }

        /*
        * The width of the container
        * @property _width
        * @type number
        */
        private _width: number;
        
        /*
        * The width of the container
        * @type number
        */
        public get width(): number {
            return this._width;
        }
        
        /*
        * Set the width of the container
        * @type number
        */
        public set width(value: number) {
            this.container.style.width = value + "px";
            this._width = value;
        }
        
        /*
        * The height of the container
        * @property _height
        * @type number
        */
        private _height: number;
        
        /*
        * The height of the container
        * @type number
        */
        public get height(): number {
            return this._height;
        }
        
        /*
        * Set the height of the container
        * @type number
        */
        public set height(value: number) {
            this.container.style.height = value + "px";
            this._height = value;
        }
        
        /**
        * Knows if this bar is ment to be horizontal or veritical
        * @private 
        **/
        private _horizontal: boolean;
        
        /**
        * The HTMLElement that is currently being used as the 'bar'.
        * @public
        **/
        public bar: HTMLElement;

        /**
        * A reference to the HTMLElement that this class always generates.
        * @private
        **/
        private _bar: HTMLElement;
        
        /**
        * The range component.
        * @public
        **/
        public range: Kiwi.HUD.Components.Range;
        
        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @param {boolean} val
        * @public
        **/
        public get horizontal(): boolean {
            return this._horizontal;
        }
        
        public set horizontal(val: boolean) {
            this._horizontal = val;
            this.updateCSS();
        }

        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @param {boolean} val
        * @public
        **/
        public get vertical(): boolean {
            return !this._horizontal;
        }
        
        public set vertical(val: boolean) {
            this._horizontal = !val;
            this.updateCSS();
        }


        /**
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        * 
        * @method setTemplate
        * @param {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget. 
        * @param {string} innerbar - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        **/
        public setTemplate(main: string, innerbar?: string) {

            super.setTemplate(main, innerbar);

            if (this.tempElement !== undefined) {
                this.bar = this.tempElement;
            }

        }

        /**
        * Used to remove any the template HTML from this HUDWidget.
        * 
        * @method removeTemplate
        **/
        public removeTemplate() {
            super.removeTemplate();

            this.bar = this._bar;
            this.container.appendChild(this.bar);
            this.updateCSS();
        }

        /**
        * Will be called when the range has been updated and thus you will want to preform the render of the bar here.
        * This should be overriden by subclasses so that you have your own custom bars. 
        * @public
        **/
        public updateCSS() {
            
            if (this.horizontal === true) {
                this.bar.style.width = String(this.range.currentPercent()) + '%';
                this.bar.style.height = '100%';
            } else {
                this.bar.style.height = String(this.range.currentPercent()) + '%';
                this.bar.style.width = '100%';
            }
        }

    }


}