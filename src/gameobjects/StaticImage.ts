/// <reference path="../core/Game.ts" />
/// <reference path="../core/Entity.ts" />
/// <reference path="../core/State.ts" />
/// <reference path="../components/Position.ts" />

/*
 *	Kiwi - GameObjects - StaticImage
 *				
 *	@desc		An extremely light-weight entity consisting of just a single image with position
 *
 *	@version	1.1 - 5th March 2013
 *
 *	@author 	Richard Davey
 *
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.GameObjects {

    export class StaticImage extends Kiwi.Entity {

        /**
        * 
        * @constructor
        * @param {String} cacheID
        * @param {Kiwi.Cache} cache
        * @param {Number} x
        * @param {Number} y
        * @return {StaticImage}
        */
        constructor(atlas: Kiwi.Textures.TextureAtlas, x: number = 0, y: number = 0) {

            super();
            
            this.atlas = atlas;
            this.transform.x = x;
            this.transform.y = y;
            this.width = atlas.cells[0].w;
            this.height = atlas.cells[0].h;
            
            this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, this.width, this.height));

            //  Signals

            this.onAddedToLayer.add(this._onAddedToLayer, this);

            

            klog.info('Created StaticImage Game Object');

        }

        public objType() {
            return "StaticImage";
        }

        /** 
	     * The Boounds component that controls the bounding box around this Game Object
	     * @property bounds
	     * @type Kiwi.Components.Bounds
	     **/
        public bounds: Kiwi.Components.Bounds;

        

       

	    /**
	     * Called when this Game Object is added to a Layer, usually as a result of an addChild() call or being in a Group that was added.
	     * @method _addedToLayer
	     * @param {Kiwi.Layer} layer - The Layer onto which this Game Object was added
	     * @return {Boolean} true if the Game Object was successfully added, otherwise false
	     * @private
	     **/
        private _onAddedToLayer(layer: Kiwi.Layer): bool {

            klog.info('StaticImage added to Layer: ' + layer.name);

            return true;

        }

        /**
	     * Called by the Layer to which this Game Object is attached
	     * @method render
	     **/
        public render(camera: Kiwi.Camera) {
            
            if (this.visiblity && this.alpha > 0) {
                var ctx: CanvasRenderingContext2D = this.game.stage.ctx;
                ctx.save();

                if (this.alpha > 0 && this.alpha <= 1) {
                    ctx.globalAlpha = this.alpha;
                }

                var m: Kiwi.Geom.Matrix = this.transform.getConcatenatedMatrix();
                ctx.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                var cell = this.atlas.cells[this.atlas.cellIndex];
                ctx.drawImage(this.atlas.image, cell.x, cell.y, cell.w, cell.h, 0, 0, cell.w, cell.h);
              
                ctx.restore();
            }
        }


    }

}