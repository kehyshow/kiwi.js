/**
* 
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

	/**
	* Represents position, scale, rotation and rotationPoint of an Entity.
	* - Values can be transformed with a 3x3 affine transformation matrix, which each transform is assigned.
	* - A tranform can be assigned a parent, which may in turn have it's own parent, thereby creating a tranform inheritence heirarchy
	* - A concatenated transformation matrix, representing the combined matrices of the transform and its ancestors.
	*
	* @class Transform
	* @namespace Kiwi.Geom
	* @constructor
	* @param [x=0] {Number} X position of the transform.
	* @param [y=0] {Number} Y position of the transform.
	* @param [scaleX=1] {Number} X scaling of the transform.
	* @param [scaleY=1] {Number} Y scaling of the transform.
	* @param [rotation=0] {Number} Rotation of the transform in radians.
	* @param [rotX=0] {Number} rotationPoint offset on X axis.
	* @param [rotY=0] {Number} rotationPoint offset on Y axis.
	* @return {Transform} This object.
	*
	*/
	export class Transform {

		constructor(x: number = 0, y: number = 0, scaleX: number = 1, scaleY: number = 1, rotation: number = 0, rotPointX: number = 0, rotPointY: number = 0) {

			this.setTransform(x, y, scaleX, scaleY, rotation, rotPointX, rotPointY);

			this._matrix = new Matrix();
			this._cachedConcatenatedMatrix = new Matrix();

			this._matrix.setFromOffsetTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation, this._rotPointX, this._rotPointY);
		}

		/**
		* The type of this object.
		* @method objType
		* @return {String} "Transform"
		* @public
		*/
		public objType() {
			return "Transform";
		}

		/** 
		* X position of the transform
		* @property _x
		* @type Number
		* @default 0
		* @private
		*/
		private _x: number = 0;

		/** 
		* Return the X value of the transform.
		* @property x
		* @type Number
		* @public
		*/
		public set x(value: number) {
			this._x = value;
			this._dirty = true;

		}
		public get x():number {
			return this._x;
		}

		/** 
		* Y position of the transform
		* @property _y
		* @type Number
		* @default 0
		* @private
		*/
		private _y: number = 0;

		/** 
		* Return the Y value of the transform.
		* @property y
		* @type Number
		* @public
		*/
		public set y(value: number) {
			this._y = value;
			this._dirty = true;
		}
		public get y(): number {
			return this._y;
		}


		/** 
		* X scaleof the transform
		* @property _scaleX
		* @type Number
		* @default 1
		* @private
		*/
		private _scaleX: number = 1;

		/** 
		* Return the X scale value of the transform.
		* @property scaleX
		* @type Number
		* @public
		*/
		public set scaleX(value: number) {
			this._scaleX = value;
			this._dirty = true;
		}

		public get scaleX(): number {
			return this._scaleX;
		}

		/** 
		* Y scale of the transform
		* @property _scaleY
		* @type Number
		* @default 1
		* @private
		*/
		private _scaleY: number = 1;

		/** 
		* Return the Y scale value of the transform.
		* @property scaleY
		* @type Number
		* @public
		*/
		public set scaleY(value: number) {
			this._scaleY = value;
			this._dirty = true;
		}
		public get scaleY():number {
			return this._scaleY;
		}

		/** 
		* Rotation of the transform in radians.
		* @property _rotation
		* @type Number
		* @default 0
		* @private
		*/
		private _rotation: number = 0;

		/** 
		* Return the rotation value of the transform in radians.
		* @property rotation
		* @type Number
		* @public
		*/
		public set rotation(value: number) {
			this._rotation = value;
			this._dirty = true;
		}

		public get rotation():number {
			return this._rotation;
		}

		/** 
		* Rotation offset on X axis.
		* @property _rotPointX
		* @type Number
		* @default 0
		* @private
		*/
		private _rotPointX: number = 0;

		/** 
		* Return the rotation offset from the x axis.
		* @property rotPointX
		* @type Number
		* @default 0
		* @public
		*/
		public set rotPointX(value: number) {
			this._rotPointX = value;
			this._dirty = true;
		}

		public get rotPointX(): number {
			return this._rotPointX;
		}

		/** 
		* Rotation offset on Y axis.
		* @property _rotPointY
		* @type Number
		* @default 0
		* @private
		*/
		private _rotPointY: number = 0;

		/** 
		* Return the rotation offset from the y axis.
		* @property rotPointY
		* @type Number
		* @public
		*/
		public set rotPointY(value: number) {
			this._rotPointY = value;
			this._dirty = true;
		}

		public get rotPointY(): number {
			return this._rotPointY;
		}

		/**
		* Return the anchor point value from the X axis. (Aliases to rotPointX.)
		* @property anchorPointX
		* @type Number
		* @public
		* @since 1.1.0
		*/
		public set anchorPointX(value: number) {
			this.rotPointX = value;
		}
		public get anchorPointX(): number {
			return( this.rotPointX );
		}

		/**
		* Return the anchor point value from the Y axis. (Aliases to rotPointY.)
		* @property anchorPointY
		* @type Number
		* @public
		* @since 1.1.0
		*/
		public set anchorPointY(value: number) {
			this.rotPointY = value;
		}
		public get anchorPointY(): number {
			return( this.rotPointY );
		}

		/** 
		* A 3x3 transformation matrix object that can be use this tranform to manipulate points or the context transformation.
		* @property _matrix
		* @type Kiwi.Geom.Matrix
		* @private
		*/
		private _matrix: Matrix;

		/** 
		* Return the Matrix being used by this Transform
		* @property matrix
		* @type Kiwi.Geom.Matrix
		* @readOnly
		* @public
		*/
		public get matrix(): Matrix {

			return this._matrix;

		}

		/** 
		* The most recently calculated matrix from getConcatenatedMatrix.
		*
		* @property _cachedConcatenatedMatrix
		* @type Kiwi.Geom.Matrix
		* @private
		*/
		private _cachedConcatenatedMatrix: Matrix;

		/** 
		* Return the x of this transform translated to world space.
		* @property worldX
		* @type Number
		* @readOnly
		* @public
		*/
		public get worldX(): number {

			return this.getConcatenatedMatrix().tx - this._rotPointX;

		}

		/** 
		* Return the y of this transform translated to world space.
		* @property worldY
		* @type Number
		* @readOnly
		* @public
		*/
		public get worldY(): number {

			return this.getConcatenatedMatrix().ty - this._rotPointY;

		}


		/** 
		* The parent transform. If set to null there is no parent. Otherwise this is used by getConcatenatedMatrix to offset the current transforms by the another matrix
		* @property _parent
		* @type Kiwi.Geom.Transform
		* @default null
		* @private
		*/
		private _parent: Transform = null;

		/** 
		* Return the parent Transform. If the transform does not have a parent this null is returned.
		* @property parent
		* @type Kiwi.Geom.Transform
		* @default null
		* @public
		*/
		public set parent(value: Transform) {
			if(!this.checkAncestor(value)) {
				this._parent = value;
				this._dirty = true;
			}
		}

		public get parent(): Transform {
			return this._parent;
		}


		/**
		* Private copy.
		* Whether the Transform is locked. In locked mode, the Transform
		* will not update its matrix, saving on computation.
		* However, it will still follow its parent.
		* @property _locked
		* @type boolean
		* @default false
		* @private
		* @since 1.2.0
		*/
		private _locked: boolean = false;

		/**
		* Whether the Transform is locked. In locked mode, the Transform
		* will not update its matrix, saving on computation.
		* However, it will still follow its parent.
		* When locked is set to true, it will set the matrix according to
		* current transform values.
		* @property locked
		* @type boolean
		* @default false
		* @public
		* @since 1.2.0
		*/
		public set locked( value: boolean ) {
			this._locked = value;
			if ( this._locked ) {
				this._matrix.setFromOffsetTransform(
					this.x, this.y,
					this.scaleX, this.scaleY,
					this.rotation,
					this.anchorPointX, this.anchorPointY );
			}
		}
		public get locked(): boolean {
			return this._locked;
		}


		/**
		* Private copy.
		* Whether to ignore its parent when concatenating matrices.
		* If true, it won't compute parent matrices.
		* This can save computation, but prevents it from following
		* its parent's transforms.
		* Use this to save some processor cycles if the transform isn't
		* following a parent and the state does not transform.
		* @property _ignoreParent
		* @type boolean
		* @default false
		* @private
		* @since 1.2.0
		*/
		private _ignoreParent: boolean = false;

		/**
		* Whether to ignore its parent when concatenating matrices.
		* If true, it won't compute parent matrices.
		* This can save computation, but prevents it from following
		* its parent's transforms.
		*
		* Use this to save some processor cycles if the transform isn't
		* following a parent and the state does not transform.
		* @property ignoreParent
		* @type boolean
		* @default false
		* @public
		* @since 1.2.0
		*/
		public set ignoreParent( value: boolean ) {
			this._ignoreParent = value;
		}

		public get ignoreParent(): boolean {
			return this._ignoreParent;
		}


		/**
		* Private copy.
		* Whether to prevent children from acquiring this as a parent
		* when concatenating matrices. This can save computation,
		* but prevents it from passing any transform data to children.
		*
		* Use this to save some processor cycles if this is a Group
		* that does not control its children, and the state does not
		* transform.
		*
		* @property _ignoreChild
		* @type boolean
		* @default false
		* @private
		* @since 1.3.1
		*/
		private _ignoreChild: boolean = false;

		/**
		* Whether to prevent children from acquiring this as a parent
		* when concatenating matrices. This can save computation,
		* but prevents it from passing any transform data to children.
		*
		* Use this to save some processor cycles if this is a Group
		* that does not control its children, and the state does not
		* transform.
		*
		* @property ignoreChild
		* @type boolean
		* @default false
		* @public
		* @since 1.3.1
		*/
		public get ignoreChild(): boolean {
			return this._ignoreChild;
		}
		public set ignoreChild( value: boolean ) {
			this._ignoreChild = value;
		}

		/**
		* Whether the transform has been altered since the last time
		* it was used to create a matrix. Used to determine whether to rebuild
		* the matrix or not.
		*
		* @property _dirty
		* @type boolean
		* @default true
		* @private
		* @since 1.3.1
		*/
		private _dirty: boolean = true;


		/** 
		* Set the X and Y values of the transform.
		* @method setPosition
		* @param x {Number} 
		* @param y {Number} 
		* @return {Kiwi.Geom.Transform} This object.
		* @public
		*/
		public setPosition(x: number, y: number): Transform {

			this._x = x;
			this._y = y;
			this._dirty = true;

			return this;
		}

		/** 
		* Set the X and Y values of the transform from a point.
		* @method setPositionPoint
		* @param point {Kiwi.Geom.Point} point.
		* @return {Kiwi.Geom.Transform} This object.
		* @public
		*/
		public setPositionFromPoint(point: Point): Transform {

			this._x = point.x;
			this._y = point.y;
			this._dirty = true;

			return this;

		}

		/** 
		* Translate the X and Y value of the transform by point components.
		* @method translatePositionFromPoint
		* @param point {Kiwi.Geom.Point} point.
		* @return {Kiwi.Geom.Transform} This object.
		* @public
		*/
		public translatePositionFromPoint(point: Point): Transform {

			this._x += point.x;
			this._y += point.y;
			this._dirty = true;

			return this;

		}

		/** 
		* Return a Point representing the X and Y values of the transform.
		* If no point is given a new Point objected will be created.
		*
		* @method getPositionPoint
		* @param [output] {Kiwi.Geom.Point} The Point to output the coordinates into. Creates a new Point if none given.
		* @return {Kiwi.Geom.Point} A point representing the X and Y values of the transform.
		* @public
		*/
		public getPositionPoint(output: Point = new Kiwi.Geom.Point): Point {

			return output.setTo(this._x, this._y);

		}

		/** 
		* Set the X and Y scale value of the transform.
		* This property is set only. 
		* In the future this will be looked into and updated as needed.
		* 
		* @property scale
		* @type Number
		* @public
		*/
		public set scale(value:number) {

			this._scaleX = value;
			this._scaleY = value;
			this._dirty = true;

		}

		/** 
		* Set the core properties of the transform.
		*
		* @method setTransform
		* @param [x=0] {Number} X position of the transform.
		* @param [y=0] {Number} Y position of the transform.
		* @param [scaleX=1] {Number} X scaling of the transform.
		* @param [scaleY=1] {Number} Y scaling of the transform.
		* @param [rotation=0] {Number} Rotation of the transform in radians.
		* @param [rotX=0] {Number} rotationPoint offset on X axis.
		* @param [rotY=0] {Number} rotationPoint offset on Y axis.
		* @return {Kiwi.Geom.Transform} This object.
		* @public
		*/
		public setTransform(x: number = 0, y: number = 0, scaleX: number = 1, scaleY: number = 1, rotation: number = 0, rotPointX: number = 0, rotPointY: number = 0): Transform {

			this._x = x;
			this._y = y;
			this._scaleX = scaleX;
			this._scaleY = scaleY;
			this._rotation = rotation;
			this._rotPointX = rotPointX;
			this._rotPointY = rotPointY;
			this._dirty = true;

			return this;

		}

		/** 
		* Return the parent matrix of the transform.
		* If there is no parent then null is returned.
		* @method getParentMatrix
		* @return {Kiwi.Geom.Matrix} Parent transform matrix
		* @public
		*/
		public getParentMatrix(): Matrix {

			if (this._parent) {
				return this._parent.getConcatenatedMatrix();
			}

			return null;
		}

		/** 
		* Return the transformation matrix that concatenates this transform
		* with all ancestor transforms. If there is no parent then this will
		* return a matrix the same as this transform's matrix.
		* @method getConcatenatedMatrix
		* @return {Kiwi.Geom.Matrix} The concatenated matrix.
		* @public
		*/
		public getConcatenatedMatrix(): Matrix {

			/*

			Matrix caching

			Potential cases:
			- This dirty, parent dirty	:	Update matrix, build concat
			- This dirty, parent clean	:	Update matrix, build concat
			- This dirty, no parent		:	Update matrix
			- This clean, parent dirty	:	Build concat
			- This clean, parent clean	:	Use cachedConcatenated
			- This clean, no parent		:	Use cachedConcatenated

			Simplifies to four cases:
			- This dirty, has parent	:	Update matrix, build concat
			- This dirty, no parent		:	Update matrix
			- This clean, parent dirty	:	Build concat
			- Otherwise					:	Use cachedConcatenated

			This has been further simplified because of some issues.
			Now, the matrix is updated if it's dirty;
			and the parent is applied if it exists.
			Parent dirtiness is not considered, as this appeared to be
			causing issues.

			*/

			// Set correct local matrix
			if ( this._dirty && !this.locked ) {
				this._matrix.setFromOffsetTransform(
					this.x, this.y,
					this.scaleX, this.scaleY,
					this.rotation,
					this.anchorPointX, this.anchorPointY) ;
			}

			// Get local matrix
			this._cachedConcatenatedMatrix.copyFrom( this._matrix );

			// Apply parent transform
			if ( this._parent &&
					!this._parent.ignoreChild &&
					!this.ignoreParent ) {
				this._cachedConcatenatedMatrix.tx -= this._parent.anchorPointX;
				this._cachedConcatenatedMatrix.ty -= this._parent.anchorPointY;
				this._cachedConcatenatedMatrix.prependMatrix(
					this.getParentMatrix() );
			}

			this._dirty = false;

			return this._cachedConcatenatedMatrix;
		}


		/** 
		* Apply this matrix to a an object with x and y properties representing a point and return the transformed point.
		* @method transformPoint
		* @param point {Kiwi.Geom.Point} 
		* @return {Kiwi.Geom.Point}
		* @public
		*/
		public transformPoint(point: Point): Point {

			var mat = this.getConcatenatedMatrix();

			return mat.transformPoint(point);

		}

		/** 
		* Copy another transforms data to this transform. A clone of the source matrix is created for the matrix property.
		* @method copyFrom
		* @param transform {Kiwi.Geom.Transform} transform. The tranform to be copied from.
		* @return {Kiwi.Geom.Transform} This object.
		* @public
		*/
		public copyFrom(source: Transform): Transform {

			this.setTransform(source.x, source.y, source.scaleX, source.scaleY, source.rotation, source.rotPointX, source.rotPointY);

			this.parent = source.parent;

			this._matrix = source.matrix.clone();

			return this;

		}

		/** 
		* Copy this transforms data to the destination Transform. 
		* A clone of this transforms matrix is created in the destination Transform Matrix.
		*
		* @method copyTo
		* @param destination {Kiwi.Geom.Transform} The tranform to copy to.
		* @return {Kiwi.Geom.Transform} This object.
		* @public
		*/
		public copyTo(destination: Transform): Transform {

			destination.copyFrom(this);

			return this;

		}

		/** 
		* Return a clone of this transform.
		*
		* @method clone
		* @param [output] {Kiwi.Geom.Transform} A Transform to copy the clone in to. If none is given a new Transform object will be made.
		* @return {Kiwi.Geom.Transform} A clone of this object.
		* @public
		*/
		public clone(output: Transform = new Transform()): Transform {

			output.copyFrom(this);

			return output;

		}

		/** 
		* Recursively check that a transform does not appear as its own ancestor
		* @method checkAncestor
		* @param transform {Kiwi.Geom.Transform} The Transform to check.
		* @return {boolean} Returns true if the given transform is the same as this or an ancestor, otherwise false.
		* @public
		*/
		public checkAncestor(transform: Transform): boolean {
			
			/*if (transform === this)
			{
				return true
			}

			if (transform.parent !== null)
			{
				return (this.checkAncestor(transform._parent))
			}*/

			return false;

		}

		/** 
		* Return a string represention of this object.
		* @method toString
		* @return {String} A string represention of this object.
		* @public
		*/
		public get toString(): string {

			return "[{Transform (x=" + this._x + " y=" + this._y + " scaleX=" + this._scaleX + " scaleY=" + this._scaleY + " rotation=" + this._rotation + " regX=" + this._rotPointX + " regY=" + this.rotPointY + " matrix=" + this._matrix + ")}]";

		}

	}

}
