
var OGO={
 line: function(x,y,x2,y2) { this.ctx.beginPath(); this.ctx.moveTo(x,y); this.ctx.lineTo(x2,y2); this.ctx.stroke(); return this;},
 circle: function(x,y,r) { this.ctx.beginPath(); this.ctx.arc(x, y, r, 0, 2 * Math.PI, false); this.ctx.stroke(); return this;},
 lineStyle: function(s) { this.ctx.strokeStyle=s;  return this;},
 fillStyle: function(s) { this.ctx.fillStyle=s;  return this;},
 lineWidth: function(w) { this.ctx.lineWidth=w/100;  return this;},
 text: function(t,x,y,h,fill) { 
   this.ctx.save();
   this.ctx.lineWidth=h/5;
   this.ctx.translate(-x,-y);
   this.ctx.scale(.01*h,.01*h);
   this.ctx.font='10px sans-serif'; 
   if (fill)
	  this.ctx.fillText(t,0,0); 
   else
      this.ctx.strokeText(t,0,0); 
   this.ctx.restore();
   return this;},
 
 
 setBackground: function(elid) {
	var el=document.getElementById(elid); 
	var data=this.canvas.toDataURL();
	el.style.backgroundImage = 'url('+data+')';
	return this;
 },
 setElementBackground: function(el) {
	var data=this.canvas.toDataURL();
	el.style.backgroundImage = 'url('+data+')';
	return this;
 },
 
 echo: function(frames,xs,ys,xe,ye,rots,rote,ss,se,alphas,alphae) {
	var nogo=createOGO(this.res);    
	for (var i=0;i<frames;i+=1) {
	  var re=i/frames;
	  var rs=1-re;
	  nogo.ctx.save();
	  nogo.ctx.rotate((rots*rs+rote*re)*Math.PI/180);
	  nogo.ctx.translate((xs*rs+xe*re),(ys*rs+ye*re));			  
	  nogo.ctx.scale(ss*rs+se*re,ss*rs+se*re);
	  nogo.ctx.globalAlpha=alphas*rs+alphae*re;
	  
	  nogo.ctx.drawImage(this.canvas,-.5,-.5,1,1);
	  nogo.ctx.restore();
	}
	return nogo;
 },
 rotSym:function(num) 
 {
	return this.echo(num,0,0,0,0,0,360,1,1,1,1);
 },
 mirror: function(x,y) {
	var nogo=createOGO(this.res);    
	nogo.ctx.drawImage(this.canvas,-.5,-.5,1,1);			
	nogo.ctx.scale(x?-1:1,y?-1:1);
	nogo.ctx.drawImage(this.canvas,-.5,-.5,1,1);						  
	return nogo;
 },
 addDivSample: function(cls)
 {
	var d=document.createElement('div');
	d.classList.add(cls);
	d.classList.add('ttype');
	this.setElementBackground(d);
	document.body.appendChild(d);
	return this;
 },
 
 makeSprite:function(cls,size,type,hits) {
	this.addDivSample(cls);
	if (!hits) hits=0;
	return {
		size: size,
		coltype: type,
		health: hits,
		displayCls: cls,
		imgData: this.canvas.toDataURL()				
	}
 }
 
 
 
};

function createOGO(res)
{
	var ogo=Object.create(OGO);
	if (!res) res=100;
	ogo.res=res;
	ogo.canvas = document.createElement("canvas");
	ogo.canvas.width=res;
	ogo.canvas.height=res;
	ogo.ctx = ogo.canvas.getContext('2d');
	ogo.ctx.translate(+ogo.canvas.width/2,+ogo.canvas.height/2);
	ogo.ctx.scale(ogo.canvas.width,ogo.canvas.height);      
	ogo.ctx.lineCap='round';
    ogo.ctx.textAlign='center'; 
    ogo.ctx.textBaseline = 'middle';
   
	return ogo;
}

var sprites={};


function prepSprites() {
sprites.avatar=createOGO(200).lineWidth(2)
	  .lineStyle('#FFAA00').line(.2,.35,.25,.5)
	  .lineStyle('#FF0000').line(.1,.4,.2,.5)
	  .echo(5,-.5,0,0,0,0,0,1,1,1,1)
	  .echo(3,0,-.3,0,0,0,0,1,1,0,1)
	  .lineWidth(3).lineStyle('#FFFF99')
	  .line(.4,.4,0,-.4).line(.4,.4,0,.2).circle(0,0,.1)
	  .mirror(true,false)
	  .echo(10,0,0,0,0,0,0,.1,1,0.1,1)
	  .makeSprite('normal',15,1);
sprites.ghost=createOGO(200).lineWidth(2)
	  .lineStyle('#AAAAAA').line(.2,.35,.25,.5)
	  .lineStyle('#CCCCCC').line(.1,.4,.2,.5)
	  .echo(5,-.5,0,0,0,0,0,1,1,1,1)
	  .echo(3,0,-.3,0,0,0,0,1,1,0,1)
	  .lineWidth(3).lineStyle('#AAAAAA')
	  .line(.4,.4,0,-.4).line(.4,.4,0,.2).circle(0,0,.1)
	  .mirror(true,false)
	  .echo(5,0,0,0,0,0,0,.1,1,0.1,.5)
	  .makeSprite('normal',15,1);
sprites.aBullet=createOGO(50)
	   .lineStyle('#ffffff').lineWidth(2).line(0,0,.3,-.3)
	  .lineStyle('#aaaa00').lineWidth(2).line(0,0,0,-.4)
	  .echo(10,0,0,0,0,0,90,1,.6,.3,1)
	  .rotSym(5)
	  .makeSprite('bullet',5,1);
sprites.gBullet=createOGO(50)
	   .lineStyle('#AAAAAA').lineWidth(2).line(0,0,.3,-.3)
	  .lineStyle('#AAAA00').lineWidth(2).line(0,0,0,-.4)
	  .echo(10,0,0,0,0,0,90,1,.6,.3,.8)
	  .rotSym(5)
	  .makeSprite('bullet',5,1);
sprites.grunt1=createOGO(150)
	.lineStyle('#55AA00').lineWidth(2).circle(.1,.1,.1)
	.lineStyle('#00FF00').circle(.3,0,.1)
	.echo(80,0,0,0,0,0,360,1,1,0,.5)
	.rotSym(2)
	.makeSprite('roll',10,2);
sprites.grunt2=createOGO(150)
	.lineStyle('#AAFF00').lineWidth(1).circle(.1,.1,.05)
	.lineStyle('#00FF00').circle(.3,.2,.05)
	.echo(80,0,0,0,0,0,120,1,1,0,.5)
	.rotSym(3)
	.makeSprite('rock',10,2);
sprites.greenBullet=createOGO(50)
	.lineStyle('#00ff00').lineWidth(3).line(0,.4,0,-.4)
	.echo(20,0,0,0.4,0,0,0,1,.1,.8,0)
	.rotSym(2)
	.makeSprite('bullet',4,2);
sprites.bigGreenBullet=createOGO(50)
	.lineStyle('#00AA00').lineWidth(3).line(0,.4,0,-.4).lineStyle('#88AA00').line(.15,.3,.15,-.3).line(.3,.2,.3,-.2)
	.echo(20,0,0,0.4,0,0,0,1,.1,.8,0)
	.rotSym(2)
	.makeSprite('bullet',5,2,1);
sprites.flow1=createOGO(100).lineStyle('#00FF00').lineWidth(2)
	        .circle(.1,0,.2)
	        .echo(10,0,-.1,0,-.15,0,180,.2,1,.5,1)
			.rotSym(3)
			.makeSprite('throb',13,2);
sprites.flow2=createOGO(100)
            .lineStyle('#008800').lineWidth(2).circle(.1,0,.2)
	        .lineStyle('#00FF00').lineWidth(5).circle(.1,0,.1)
	        .echo(10,0,-.1,0,-.15,0,180,.2,1,.5,1)
			.rotSym(2)
			.makeSprite('roll',18,2);
sprites.boss1=createOGO(200).lineStyle('#AAFFAA').lineWidth(3)
	        .circle(.3,.1,.1).lineStyle('#008800').lineWidth(3)
	        .circle(.3,.1,.05).lineStyle('#00FF00').line(0,.1,.3,.2)
	        .rotSym(6)
	        .echo(15,0,0,0,0,45,0,1,1,0,.4)
			.makeSprite('roll',25,2,10);
sprites.logo=createOGO(400).fillStyle('#999900')
	        .text("Complicit",0,0,1.5,true)
	        .echo(20,0,0,0,-.05,0,20,1,.8,.3,0)
			.fillStyle('#FFFF44')
	        .text("Complicit",0,0,1.5,true)
	        .echo(10,0,0,0,.02,-90,-90,1,1,.3,0)
		    .makeSprite('none',25,0);
sprites.zone0=createOGO(200).lineStyle('#00FF00').lineWidth(1)
	        .text("\u237A-Zone",.15,.4,2)
	        .echo(5,.1,.1,0,.5,0,60,1,.1,.7,0)
			.makeSprite('lev',40,0);
sprites.zone1=createOGO(200).fillStyle('#4444FF')
	        .text("\u03B2-Zone",0,.3,2,true)
	        .echo(20,0,0,.1,.1,0,-10,1,1,.4,0)
			.makeSprite('lev',40,0);
sprites.tuttouch=createOGO(200).lineStyle('#AA0').lineWidth(5).circle(0,0,0.45)
	        .echo(40,0,0,0.4,0,0,90,1,.1,.3,0)		
   	        .fillStyle('#FF8')
	        .text("The avatar moves",0,.05,.9,true)
	        .text("with your finger",0,-.05,.9,true)
	        .makeSprite('tutorial',60,3);
	        				
sprites.levcomplete=createOGO(400).lineStyle('#FFAA00').lineWidth(3)
	        .text("Zone Complete",0,0.1,1)
			.lineStyle('#CCAA00').line(0,.03,.4,.03)
	        .echo(40,0,0,0,-.1,0,0,1,.3,.3,0)
			.lineStyle('#FFAA00')
			.text("Zone Complete",0,0.1,1)
			.mirror(true,true)
	  		.makeSprite('tutorial',60,3);
	        					

}

