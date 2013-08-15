
declare var mat4;

module Kiwi.Renderers {

    // Class
    export class GLRenderer implements IRenderer {

        constructor(game: Kiwi.Game) {
            this._game = game;
            
        }

        public boot() {
             
            this._initState();
            
        }


        private _game: Kiwi.Game;
        private _currentCamera: Kiwi.Camera;
        private _stageResolution: Float32Array;

        private _shaders: GLShaders;
        private _vertBuffer: GLArrayBuffer;
        private _indexBuffer: GLElementArrayBuffer;
        private _uvBuffer: GLArrayBuffer;
        private _colorBuffer: GLArrayBuffer;
        
        private _texture: GLTexture;

        private _entityCount: number = 0;
        private _maxItems: number = 1000;

        private _texApplied: bool = false;
        private _firstPass: boolean = true;

        public mvMatrix;
        public mvMatrixStack: Array;

        public mvPush() {
            var copy = mat4.create();
            mat4.set(this.mvMatrix, copy);
            this.mvMatrixStack.push(copy);
        }

        public mvPop() {
            if (this.mvMatrixStack.length == 0) {
                throw "Invalid popMatrix!";
            }
            this.mvMatrix = this.mvMatrixStack.pop();
        }    

        private _initState() {

            var gl: WebGLRenderingContext = this._game.stage.gl;
            this._stageResolution = new Float32Array([this._game.stage.size.width(), this._game.stage.size.height()]);

            this._shaders = new GLShaders(gl);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            this.mvMatrix = mat4.create();
            mat4.identity(this.mvMatrix);

            //create buffers
            //dynamic
            this._vertBuffer = new GLArrayBuffer(gl, 2);
            this._uvBuffer = new GLArrayBuffer(gl, 2, GLArrayBuffer.squareUVs);

            //static
            this._indexBuffer = new GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems));
            this._colorBuffer = new GLArrayBuffer(gl, 1, this._generateColors(this._maxItems));

            //use shaders
            this._shaders.use(gl, this._shaders.shaderProgram);

            var prog = this._shaders.texture2DProg;

            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertBuffer.buffer);
            gl.vertexAttribPointer(prog.vertexPositionAttribute, this._vertBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer.buffer);
            gl.vertexAttribPointer(prog.vertexTexCoordAttribute, this._uvBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer.buffer);
            gl.vertexAttribPointer(prog.vertexColorAttribute, this._colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

            //Uniforms

            gl.uniform1i(prog.samplerUniform, 0);

            gl.uniform2fv(prog.resolutionUniform, this._stageResolution);

            gl.uniformMatrix4fv(prog.mvMatrixUniform, false, this.mvMatrix);


        }

        public render(camera: Kiwi.Camera) {

            this._currentCamera = camera;
            var root: IChild[] = this._game.states.current.members;
            var gl: WebGLRenderingContext = this._game.stage.gl;

            this._entityCount = 0;
            this._vertBuffer.flush();
            this._uvBuffer.flush();
                     
            //clear 
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            //iterate
           
              
            for (var i = 0; i < root.length; i++) {
                this._recurse(gl, root[i]);
            }
           

            this._vertBuffer.refresh(gl, this._vertBuffer.items);
            

            this._uvBuffer.refresh(gl, this._uvBuffer.items);


            //if (this._firstPass) {
                this._draw(gl);
            //}
            this._firstPass = false;
        }

       

        private _recurse(gl:WebGLRenderingContext, child: IChild) {
           // console.log("_recurse" + this._entityCount);
            if (!child.willRender) return;

            if (child.childType() === Kiwi.GROUP) {
                for (var i = 0; i < (<Kiwi.Group>child).members.length; i++) {
                    this._recurse(gl,(<Kiwi.Group>child).members[i]);
                }
            } else {
                this._compileVertices(gl, <Entity>child);
                this._compileUVs(gl, <Entity>child);
                this._entityCount++;
            }
            if (!this._texApplied) {
                console.log("applying texture");
                this._applyTexture(gl, (<Entity>child).atlas.image);
                this._texApplied = true;
            }
          

        }
     

        private _compileVertices(gl: WebGLRenderingContext, entity: Entity) {
           // console.log("_compverts" + this._vertBuffer.items.length);
            var t: Kiwi.Geom.Transform = entity.transform;
            var c = entity.atlas.cells[entity.cellIndex];
          
            
            this._vertBuffer.items.push(t.x, t.y,
                t.x + c.w, t.y,
                t.x + c.w, t.y + c.h,
                t.x, t.y + c.h);


            
        }

        private _compileUVs(gl: WebGLRenderingContext, entity: Entity) {
            var t: Kiwi.Geom.Transform = entity.transform;
            var c = entity.atlas.cells[entity.cellIndex];
           
                this._uvBuffer.items.push(c.x, c.y,
                    c.x + c.w, c.y,
                    c.x + c.w, c.y + c.h,
                    c.x, c.y + c.h);
       
        }


       

        private _applyTexture(gl: WebGLRenderingContext,image:HTMLImageElement) {
            this._texture = new GLTexture(gl, image);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this._texture.texture);
            var prog = this._shaders.texture2DProg;
            gl.uniform2fv(prog.textureSizeUniform, new Float32Array([this._texture.image.width, this._texture.image.height]));
        }


        private _draw(gl: WebGLRenderingContext) {
          
            gl.drawElements(gl.TRIANGLES, this._entityCount*6, gl.UNSIGNED_SHORT, 0);
            
        }
        

        private _generateIndices(numQuads: number): number[]{
       
            var quads: number[] = new Array();
            for (var i = 0; i < numQuads; i++) {
                quads.push(i * 4 + 0, i * 4 + 1, i * 4 + 2, i * 4 + 0, i * 4 + 2, i * 4 + 3);
            }
            return quads;

        }

        private _generateColors(numVerts: number): number[] {
            var cols: number[] = new Array();
            for (var i = 0; i < numVerts; i++) {
                cols.push(1);
            }
            return cols;
        }


    }

}

