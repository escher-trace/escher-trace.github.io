d3.contextMenu = function (menu, openCallback) {
//d3.contextMenu = function (menu) {

   /* console.log(menu)
    console.log(data)
    console.log(index)*/
	// create the div element that will hold the context menu
	d3.selectAll('.d3-context-menu').data([1])
		.enter()
		.append('div')
		.attr('class', 'd3-context-menu');

	// close menu
	/*d3.select('body').on('click.d3-context-menu', function() {
        //alert('context menu display none')
		d3.select('.d3-context-menu').style('display', 'none');
	});*/
    
	d3.select('body').on('click', function() {
        if(d3.event.target.id != "context_button"){
            d3.select('.d3-context-menu').style('display', 'none');
            deactivate_context_button()
        }
	}); 
    
    d3.select('body').on('touchstart', function() {
		//d3.select('.d3-context-menu').style('display', 'none');
        if(d3.event.target.id != "context_button"){
            d3.select('.d3-context-menu').style('display', 'none');
            deactivate_context_button()
        }    
	}); 


	// this gets executed when a contextmenu event occurs
	return function(data, index) {	
		var elm = this;

		d3.selectAll('.d3-context-menu').html('');
		var list = d3.selectAll('.d3-context-menu').append('ul');
        
	    list.selectAll('li')
            .data(menu)
            .enter()
			.append('li')
			.html(function(d) {
				return d.title;
			})
			.on('click', function(d, i) {
                
               if(this.classList.value == 'active_context_1st'){
                    d3.select(this).selectAll("ul").style('display', 'none');
                    d3.select(this).selectAll("ul").remove();
                    //d3.select(this).remove(); 
               }else{
                   
                    d.onMouseClick(elm, data, index);
                   //close all other currently active tabs
                    if(typeof d3.select(this.parentElement).selectAll(".active_context_1st")._groups[0][0] != "undefined"){
                        d3.select(this.parentElement).selectAll(".active_context_1st").selectAll("ul").style('display', 'none');
                        d3.select(this.parentElement).selectAll(".active_context_1st").selectAll("ul").remove();
                        d3.select(this.parentElement).selectAll(".active_context_1st")._groups[0][0].classList.toggle('active_context_1st')
                    }
                   
                    if(d.chidernItems.length>0){
                        d3.select(this).selectAll("ul").remove(); 
                        d3.select(this)
                            .append("ul")
                            .selectAll("li")
                            .data(d.chidernItems)
                            .enter()
                            .append("li")
                            .text(function(d) {return d.title; })
                            .on("mouseenter", function(d,i){
                                    d.onMouseOver(elm,data,index);
                                })
                            .on('click',  function(d, i) {
                                    //d.onMouseClick(elm, data, index);

                                   if(this.classList.value == 'active_context_2nd'){
                                        d3.select(this).selectAll("ul").style('display', 'none');
                                        d3.select(this).selectAll("ul").remove();
                                        //d3.select(this).remove(); 
                                   }else{

                                        d.onMouseClick(elm, data, index);
                                       //close all other currently active tabs
                                       if(typeof d3.select(this.parentElement).selectAll(".active_context_2nd")._groups[0][0] != "undefined"){
                                            d3.select(this.parentElement).selectAll(".active_context_2nd").selectAll("ul").style('display', 'none');
                                            d3.select(this.parentElement).selectAll(".active_context_2nd").selectAll("ul").remove();
                                            d3.select(this.parentElement).selectAll(".active_context_2nd")._groups[0][0].classList.toggle('active_context_2nd')
                                       }

                                       if(d.chidernItems.length>0 ){
                                              d3.select(this).selectAll("ul").remove(); 
                                              d3.select(this)
                                                .append("ul")
                                                    .selectAll("li")
                                                    .data(d.chidernItems)
                                                    .enter()
                                                    .append("li")
                                                        .text(function(d) {return d.title; })
                                                        .on('click', function(d, i) {
                                                            d.onMouseClick(elm, data, index);
                                                            if(d.chidernItems.length==0 ){
                                                                d3.select('.d3-context-menu').style('display', 'none');
                                                                deactivate_context_button()
                                                            }else{
                                                               // this.classList.toggle('active_context_2nd')
                                                            }

                                                        })
                                                        .on('mouseenter',function(d,i){
                                                            d.onMouseOver(elm,data,index);
                                                            if(d.chidernItems.length>0 ){
                                                                  d3.select(this).selectAll("ul").remove(); 
                                                                  d3.select(this)
                                                                    .append("ul")
                                                                    .selectAll("li")
                                                                       .data(d.chidernItems)
                                                                        .enter().append("li")
                                                                          .text(function(d) { return d.title; })
                                                                     .on("mouseenter", function(d,i){
                                                                            d.onMouseOver(elm,data,index);
                                                                        })
                                                                     .on('click',  function(d, i) {
                                                                            d.onMouseClick(elm, data, index);
                                                                            d3.select('.d3-context-menu').style('display', 'none');
                                                                            deactivate_context_button()  

                                                                        })
                                                            }else{
                                                                 return false;}

                                                        })
                                                        .on('mouseleave',function(d,i){
                                                            if(d.chidernItems.length!=0){
                                                                d3.select(this).selectAll("ul").style('display', 'none');
                                                                d3.select(this).selectAll("ul").remove(); 
                                                            }

                                                        })
                                             
                                        }else{
                                             d3.select('.d3-context-menu').style('display', 'none');
                                             deactivate_context_button()
                                             return false; 
                                       }

                                   }

                                this.classList.toggle('active_context_2nd')                              
                                d3.event.stopPropagation()
                          })
                            .append('a')
                                .attr('class',function(d,i){
                                    if(d.chidernItems.length>0){
                                        return 'fa fa-caret-square-o-right'
                                    }else{
                                        return ''
                                    }
                                })
                                .style('color', '#e0865b');
                    }else{
                         d3.select('.d3-context-menu').style('display', 'none');
                        deactivate_context_button()
                         return false; 
                     }
               }
            
            this.classList.toggle('active_context_1st')
            d3.event.stopPropagation()
                
			})
            .on('mouseenter',function(d,i){
                d.onMouseOver(elm,data,index);
            })
            .append('a')
                .attr('class',function(d,i){
                    if(d.chidernItems.length>0){
                        return 'fa fa-caret-right'
                    }else{
                        return ''
                    }
                })
			    .style('color', '#e0865b');

		// the openCallback allows an action to fire before the menu is displayed
		// an example usage would be closing a tooltip
		if (openCallback) openCallback(data, index);

		// display context menu
		d3.select('.d3-context-menu')
			.style('left', (d3.event.pageX - 2) + 'px')
			.style('top', (d3.event.pageY - 2) + 'px')
			.style('display', 'block');
        


        
        if(d3.event.type=="contextmenu"){
            console.log(d3.event.type)
		      d3.event.preventDefault();
        }
        
        if(d3.event.type=="click" || d3.event.type=="touchstart"){

            if(this.classList.contains("active_context_button")){
                d3.select('.d3-context-menu').style('display', 'none');
               // deactivate_context_button()
                
            }
                      
            this.classList.toggle("active_context_button")
            
        }        

	};
    
    
    function deactivate_context_button(){
            all_active_context_buttons=d3.selectAll('.active_context_button')._groups[0]
            for(j_cm=0;j_cm<all_active_context_buttons.length;j_cm++){
                all_active_context_buttons[j_cm].classList.toggle('active_context_button')
            }
    }
};