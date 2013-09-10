/**
* Kiwi - System
* @module Kiwi
* @submodule System
* @main System
*/

module Kiwi.System {

    /**
    * DOM Boot and Ready functions (based on those used by jQuery)
    * 
    * @class Bootstrap
    *
    */
    export class Bootstrap {

        /**
        *
        * @property _callback
        * @type Any
        * @private
        */
        private _callback;

        /**
        *
        * @property _domParent
        * @type String
        * @private
        */
        private _domParent: string;

        /**
        *
        * @property _createContainer
        * @type Boolean
        * @private
        */
        private _createContainer: boolean;

        /**
        *
        * @property isReady
        * @type Boolean
        */
        public isReady: boolean = false;
        
        /**
        * The parent div in which the layers and input live
        * @property container
        * @type HTMLDivElement
        */
        public container:HTMLDivElement = null;

    

       

        /**
        * This div sits on-top of all layers and captures user input
        * @property input
        * @type HTMLDivElement
        */

        public input: HTMLDivElement = null;

        public objType() {
            return "Bootstrap";
        }

        /**
        * Called at the start of the game to check to see if the DOM is ready before we do anything requiring it
        * @method boot
        * @param {String} domParent 
        * @param {Any} [callback]
        * @param {Boolean} [createContainer]
        */
        public boot(domParent: string, callback: any = null, createContainer: boolean = true) {

            this._callback = callback;
            this._domParent = domParent;
            // if this is true a div will be created in browser
            this._createContainer = createContainer;

            // wait until DOM is loaded and call ready
            if (document.readyState === 'complete' || document.readyState === 'interactive')
            {
                this.ready();
            }
            else
            {
                document.addEventListener('DOMContentLoaded', () => this.ready(), false);
                window.addEventListener('load', () => this.ready(), false);
            }

        }

        /**
        *  If the DOM is ready it fires our callback, otherwise sets a short timeout to try again
        * @method ready
        */
        public ready() {

            if (this.isReady === true)
            {
                return;
            }

            if (!document.body)
            {
                window.setTimeout(() => this.ready(), 13);
            }
            else
            {
                //document.removeEventListener('DOMContentLoaded', () => this.ready(), false);

                this.isReady = true;

                if (this._createContainer === true)
                {
                    //  No domParent was given so we create our own container for the game with a unique ID
                    if (this._domParent === '')
                    {
                        this.container = <HTMLDivElement> document.createElement('div');
                        this._setupContainer('KiwiGame' + Date.now().toString());
                        document.body.appendChild(this.container);
                    }
                    else
                    {
                        //  Does the container exist?
                        if (document.getElementById(this._domParent))
                        {
                            this.container = <HTMLDivElement> document.getElementById(this._domParent);
                            this._setupContainer();
                        }
                        else
                        {
                            this.container = <HTMLDivElement> document.createElement('div');
                            this._setupContainer(this._domParent);
                            document.body.appendChild(this.container);
                        }

                    }
                }


              
                
               

                if (this._callback !== null)
                {
                    this._callback();
                }
            }

        }

        /**
        * 
        * @method _setupContainer
        * @param {String} id
        * @private
        **/
        private _setupContainer(id: string = '') {

            if (id)
            {
                this.container.id = id;
            }

            this.container.style.width = '800px';
            this.container.style.height = '600px';
            this.container.style.position = 'relative';
            this.container.style.overflow = 'hidden';

        }

    }

}