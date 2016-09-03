function weaveBlock(sprite,rows,cols,xstart,xthrow,ystart,ythrow,fireCycle,time)
{
	for (var i=0;i<rows;i+=1)
	  for (var j=0;j<cols;j+=1)
	      addOb(sprite,weaveAction(i*100,xstart+sprite.size*j,-ystart-sprite.size*i,xthrow,ythrow,time),regularFireAction(i+j,fireCycle,sprites.greenBullet,50));		
}

function wiggleBlock(sprite,rows,cols,xstart,xthrow,ystart,ythrow,fireCycle,time)
{
	for (var i=0;i<rows;i+=1)
	  for (var j=0;j<cols;j+=1)
	      addOb(sprite,wiggleAction(i*100,xstart+sprite.size*j,-ystart-sprite.size*i,xthrow,ythrow,time),regularFireAction(i+j,fireCycle,sprites.greenBullet,70));		
}

function weaveTrail(sprite,length,xstart,xthrow,ystart,ythrow,fireCycle,timedrop,time)
{
	for (var i=0;i<length;i+=1)
	  addOb(sprite,weaveAction(i*timedrop,xstart,-ystart,xthrow,ythrow,time),regularFireAction(i,fireCycle,sprites.greenBullet,50));
		
}

function wiggleTrail(sprite,length,xstart,xthrow,ystart,ythrow,fireCycle,timedrop,time)
{
	for (var i=0;i<length;i+=1)
	  addOb(sprite,wiggleAction(i*timedrop,xstart,-ystart,xthrow,ythrow,time),regularFireAction(i,fireCycle,sprites.greenBullet,70));		
}

function finalSection(sprite)
{
	for (i=0;i<10;i+=1)
	  addOb(sprite,bulletAction(30+Math.random()*40,-Math.random()*40,3.14/2,20+Math.random()*40));
    addOb(sprites.levcomplete,bulletAction(50,-50,3.14/2,30));
}

var zoneA=[
 function() { addOb(sprites.tuttouch,bulletAction(50,0,3.14/2,20)); },//tutorial text		

 function() { weaveBlock(sprites.grunt1,4,4,10,30,0,15,70,1000);},//intro mini block of slow invaders
 
 function() { weaveTrail(sprites.grunt2,15,5,90,0,10,40,150,2000);   //two slow windoing snakes behind each other in time -easy
	          weaveTrail(sprites.grunt2,15,95,-90,40,10,40,150,2000); },
 
 function() { weaveBlock(sprites.grunt1,4,8,1,30,0,10,50,1500); },//wide and quiet slow invaders
 
 function() {  //throbbers - x-motion rows - easy
      wiggleBlock(sprites.flow1,1,5,40,-30,0,30,40,2000);
      wiggleBlock(sprites.flow1,1,5,10,+30,15,30,40,2000);
	  wiggleBlock(sprites.flow1,1,5,40,-30,30,30,40,2000);              
	  wiggleBlock(sprites.flow1,1,5,10,+30,45,30,40,2000);			  
 },

 function() { weaveTrail(sprites.grunt2,20,20,20,0,10,60,250,800);   //medium - two snakes
	          weaveTrail(sprites.grunt2,20,60,20,20,10,60,250,800);},
 

 function() {  //sexy twirl curves - easy
      wiggleTrail(sprites.flow2,20,10,80,0,30,50,400,2000);              			  
 },
 
 function() { weaveTrail(sprites.grunt2,20,5,55,10,30,50,300,3000); weaveTrail(sprites.grunt2,20,95,-55,20,30,50,300,3000);},//medium cross over flowers
 
 function() { weaveTrail(sprites.grunt2,10,5,40,10,20,60,250,2000); //lots of action flowy, hard - two beats
	          weaveTrail(sprites.grunt2,10,95,-40,30,20,60,250,2000);
 -             weaveTrail(sprites.grunt2,30,10,80,60,20,60,250,1800);},

 function() { wiggleBlock(sprites.flow1,8,1,10,50,0,30,100,800); //slow flowing mutli-beat - medium
              wiggleBlock(sprites.flow1,8,1,70,-50,50,30,100,1500);
			  wiggleBlock(sprites.flow1,8,2,20,60,100,30,100,1000);              
 },
 function() { //shorter snake - medium
      wiggleTrail(sprites.flow2,20,10,80,0,30,60,100,2000);              			  
 },
 
 function() { //double flows three beats - hard
              wiggleBlock(sprites.flow1,5,2,10,50,0,40,100,1000);
              wiggleBlock(sprites.flow1,5,2,60,-50,0,40,100,1000);
			  wiggleBlock(sprites.flow1,5,2,30,60,50,45,100,1000);
			  
 },

  function() { //2 x 2 sync'ed formation of grunt1's - hard
   for (var i=0;i<6;i+=1)
	  weaveBlock(sprites.grunt1,2,2,(i%3)*25+5,30,i*20,20,50,1000);
  },
 function() { //crossing twils - medium
      wiggleTrail(sprites.flow2,20,90,-80,0,30,50,400,2000);              			  
	  wiggleTrail(sprites.flow2,20,10,80,0,30,50,400,2000);              			  
 },
 function() { //long snake - hard
      wiggleTrail(sprites.flow2,50,10,80,0,30,60,100,2000);              			  
 },
  
 function() { //tight crossing twilrs - very dangerous Hard
      wiggleTrail(sprites.flow2,20,90,-80,0,30,30,200,2000);              			  
	  wiggleTrail(sprites.flow2,20,10,80,0,30,30,200,2000);              			  
 },
 function() { //green boss
 	  addOb(sprites.boss1,wiggleAction(0,10,10,80,10,3000),xZoneFireAction(20,0,1,sprites.bigGreenBullet,40));		
	  wiggleTrail(sprites.flow2,20,10,30,100,30,100,200,2000);     
      weaveBlock(sprites.grunt1,3,3,45,30,50,20,50,1000);	  
	  
 },
 function() { finalSection(sprites.zone0); }//victory
  
];

var zones=[zoneA];