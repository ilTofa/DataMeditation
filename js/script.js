var APIBaseUrl = "https://he-r.it/dm/fb/API/index.php";
//var APIBaseUrl = "http://localhost:8888/dm/fb/API/index.php";

// inc = incremento tempo

var login = "";
var password = "";
var groupid = "";
var ritualdata = {};

var isritualtime = false;
var isassemblytime = false;
var iscouplesmeettime = false;
var islastday = false;

var user = null;
var group = null;


var dataforritual = null;


$(document).ready(function () {

	$.getJSON("data/ritual.json?v=" + Math.random()*Math.random() ,function(data){

		ritualdata = data;


		//luxon.Settings.defaultZoneName = ritualdata.referencetimezone;

		setupmenuitems();
		setupdatacollectionform();
		start();
	});
	
	
});


var timerrefresh = null;
function setTiming(){
	if(timerrefresh!=null){
		clearInterval(timerrefresh);
	}
	setInterval(refreshInterface,ritualdata.refreshtimems);
}

function refreshInterface(){
	//console.log("[refreshInterface]");
	// set status variables according to cureent time / date
	var cd = luxon.DateTime.local().setZone(ritualdata.referencetimezone);
	
	var currentdate = new Date( cd.toFormat("yyyy-MM-dd HH:mm:ss") );

	//console.log(currentdate);


	if( checkifitstime(currentdate,ritualdata.ritual.starttime,ritualdata.ritual.endtime) ){
		isritualtime = true;
	} else {
		isritualtime = false;
	}

	if( 
		checkifitstime(currentdate,ritualdata.assembly.eachdaystarttime,ritualdata.assembly.eachdayendtime)  ||
		checkifitsdatetime(currentdate,ritualdata.assembly.finaldaystarttime,ritualdata.assembly.finaldayendtime,ritualdata.finalday) 

	){
		isassemblytime = true;
	} else {
		isassemblytime = false;
	}

	var cdonly = new Date();
	var cyyy = cdonly.getYear() + 1900;
	var cmmm = cdonly.getMonth() + 1;
	var cddd = cdonly.getDate();


	var yyy = parseInt( ritualdata.finalday.split("-")[0] );
	var mmm = parseInt( ritualdata.finalday.split("-")[1] );
	var ddd = parseInt( ritualdata.finalday.split("-")[2] );

	//console.log("[a]:" + cyyy + "/" + cmmm + "/" + cddd);
	//console.log("[b]:" + yyy + "/" + mmm + "/" + ddd);

	if(cyyy==yyy && cmmm==mmm && cddd==ddd){
		islastday = true;
	} else {
		islastday = false;
	}
	//console.log(islastday);



	if( 
		checkifitsdatetime(currentdate,ritualdata.couplesmeet.starttime,ritualdata.couplesmeet.endtime,ritualdata.finalday) 

	){
		iscouplesmeettime = true;
	} else {
		iscouplesmeettime = false;
	}


	// console.log("isritualtime:");
	//console.log(isritualtime);

	//console.log("isassemblytime:");
	//console.log(isassemblytime);

	//console.log("iscouplesmeettime:");
	//console.log(iscouplesmeettime);



	// do server side tasks depending on current time / date and status variables
	// TODO


	if(user!=null && group!=null ){
		// console.log("[checkin to group]");
		// sign in to group
		$.getJSON(
			APIBaseUrl + "?cmd=togroup&iduser=" + user.iduser + "&groupid=" + group.group + "&v=" + Math.random()*Math.random(),
			function(data){
				// console.log(data);

				if(data.error){
					alert(data.error);
					user = null;
					group = null;
					toLogin();
				} else {
					group = data;	
				}
				
			}
		);
	}


	
	// update interfaces
	if(isritualtime){
		//console.log("[ritual on]");
		$("#gotoritualwaitroom").css("display","block");
	} else {
		//console.log("[ritual off]");
		$("#gotoritualwaitroom").css("display","none");
	}

	if(isassemblytime){
		//console.log("[assembly on]");
		$("#gotoassembly").css("display","block");
	} else {
		//console.log("[assembly off]");
		$("#gotoassembly").css("display","none");
	}

	if(iscouplesmeettime){
		//console.log("[couples on]");
		$("#gotocouples").css("display","block");
	} else {
		//console.log("[couples off]");
		$("#gotocouples").css("display","none");
	}
	
	// turn on notifications
	// TODO
}

function start(){

	setTiming();

	/*
	if(login=="" || password=="" || groupid=="" ){
		toLogin();
	}
	*/

	$("#submitlogin").click(function(){
		doLogin();
	});
}


function toLogin(){
	$(".panel  , .panelcover").fadeOut().promise().done(function() {
		$(".panel , .panelcover").css("display","none");
		$("#loginpanel").css("display","block");
		$("#loginpanel").fadeIn(function(){
			//
		});
	});
			
}


function toMenu(){
	if(waitingroomInterval!=null){
		clearInterval(waitingroomInterval);
	}
	$(".panel , .panelcover").fadeOut().promise().done(function() {
		$(".panel , .panelcover").css("display","none");
		$("#menupanel").css("display","block");
		$("#menupanel").fadeIn(function(){
			//
		});
	});
			
}

function toDataCollection(){
	$(".panel , .panelcover").fadeOut().promise().done(function() {
		$(".panel , .panelcover").css("display","none");
		$("#datacollectionpanel").css("display","block");
		$("#datacollectionpanel").fadeIn(function(){
			//
			var dd = new Date();
			var dd2 = new Date();
			dd2.setDate(dd2.getDate() - 1);

			$("#timeselector").flatpickr(
					{
					    enableTime: true,
					    dateFormat: "Y-m-d H:i",
					    //dateFormat: "H:i",
					    defaultDate: dd,
					    maxDate: dd,
					    minDate: dd2
					}
				);
		});	
		
	});	
		
}


function toInstructions(){
	$(".panel , .panelcover").fadeOut().promise().done(function() {
		$(".panel , .panelcover").css("display","none");
		$("#instructionspanel").css("display","block");
		$("#instructionspanel").fadeIn(function(){
			
		});	
		
	});	
		
}


function toDataOk(){
	$(".panel , .panelcover").fadeOut().promise().done(function() {
		$(".panel , .panelcover").css("display","none");
		$("#dataokpanel").css("display","block");
		$("#dataokpanel").fadeIn(function(){
			//
		});	
		
	});			
}


function toDataNOk(){
	$(".panel , .panelcover").fadeOut().promise().done(function() {
		$(".panel , .panelcover").css("display","none");
		$("#datanokpanel").css("display","block");
		$("#datanokpanel").fadeIn(function(){
			//
		});	
		
	});			
}


function fromLogintoMenu(){
	$(".panel , .panelcover").fadeOut().promise().done(function() {
		$(".panel , .panelcover").css("display","none");
		$("#menupanel").css("display","block");
		$("#menupanel").fadeIn(function(){
			//
		});	
		
	});	
		
}

function toAssembly(){
	$(".panel , .panelcover").fadeOut().promise().done(function() {
		$(".panel , .panelcover").css("display","none");
		$("#assemblypanel").css("display","block");
		$("#assemblypanel").fadeIn(function(){
			//
		});	
	});	
		
}

function toCouples(){
	$(".panel , .panelcover").fadeOut().promise().done(function() {
		$(".panel , .panelcover").css("display","none");
		$("#couplespanel").css("display","block");
		$("#couplespanel").fadeIn(function(){
			//
		});
	});	
			
}


function toRitualWaitingRoom(){
	
	$("#joinritualbutton").css("display","none");

	$(".panel , .panelcover").fadeOut().promise().done(function() {
		$(".panel , .panelcover").css("display","none");
		$("#ritualwaitroompanel").css("display","block");
		$("#ritualwaitroompanel").fadeIn(function(){
			//
			if(waitingroomInterval!=null){
				clearInterval(waitingroomInterval);
			}
			waitingroomInterval = setInterval(refreshWaitingRoom,ritualdata.refreshtimems);
		});	
	});
		
}

function refreshWaitingRoom(){ 
	//console.log("[in waiting room]");
	// say to API: I logged into the ritual (set timestamp) (cmd=inwaitingroom&userid=x&groupid=y)--> receves array of users in group with 0=absent, 1=present , 2=doing ritual , 3=ended ritual
	// as answer, receive who is in ritual and their status (if status==doing ritual-->show that, if not: if timestamp < ritualdata.ritual.minutestoconsideronline minutes --> show "present" , timestamp > ritualdata.ritual.minutestoconsideronline minutes --> "show "not present"") 
	if(user!=null && group!=null){

		$.getJSON(
			APIBaseUrl + "?cmd=inwaitingroom&userid=" + user.iduser + "&groupid=" + group.groupid + "&recentness=" + ritualdata.ritual.minutestoconsideronline + "&v=" + Math.random()*Math.random(),
			function(data){
				//console.log(data);

				if(data.error){
					alert(data.error);
				} else {

						// continue
						// draw interface, with the button to join ritual switched off 
						// and showing the ritualdata.ritual.waitingforothers message

						var waitingroomcontainer = d3.select("#peopleintheroom");

						var t = d3.transition()
      							.duration(750);

						var usersinritual = waitingroomcontainer.selectAll(".userinwaitingroom")
							.data(data.usersingroup, function(d){ return d; });

							var enter = usersinritual.enter()
										.append('div')
										.attr("class",function(d){
											var c = "userinwaitingroom";
											if(d.status == 0){
												c = c + " userabsent";
											} else if(d.status == 1){
												c = c + " userwaiting";
											} else if(d.status == 2){
												c = c + " usersinritual";
											} else if(d.status == 3){
												c = c + " useroutofritual";
											}
											return c;
										})
										.text(function(d){ return d.login; })
										.merge(usersinritual)
										.transition()
  										.duration(750);

							var exit = usersinritual.exit().remove();


						// if number of users that are here is at least number of participants * ritualdata.ritual.atleastthispartofgrouptostartritual --> turn on "join ritual" button
						var minnumberofusers = Math.floor( data.usersingroup.length*ritualdata.ritual.atleastthispartofgrouptostartritual );
						var userscurrentlyhere = 0;
						for(var i = 0; i<data.usersingroup.length ; i++){
							if(data.usersingroup[i].status>0){
								userscurrentlyhere++;
							}
						}

						if(userscurrentlyhere>=minnumberofusers){ 
							$("#joinritualbutton").css("display","block");
						} else {
							$("#joinritualbutton").css("display","none");
						}

						
						
						// when ritual ends: remember to do *endritual* with API
						// TODO
				}
				
			}
		);

	}
		
}


var waitingroomInterval = null;

function doLogin(){
	if ($("#login").val().trim()=="") {
		alert("Empty login is not allowed")
	} else if ($("#password").val().trim()=="") {
		alert("Empty password is not allowed")
	} else {
		login = $("#login").val().trim().toUpperCase();
		password = $("#password").val().trim().toUpperCase();
		groupid = $("#groupid").val().trim().toUpperCase();
	
		user = null;
	
		$.getJSON(
			APIBaseUrl + "?cmd=login&login=" + login + "&password=" + password + "&groupid=" + groupid + "&v=" + Math.random()*Math.random(),
			function(data){
				// console.log(data);
				if(data.error){
					if(confirm(data.error)){
						$.getJSON(
							APIBaseUrl + "?cmd=register&login=" + login + "&password=" + password + "&groupid=" + groupid + "&v=" + Math.random()*Math.random(),
							function(data){
								if(data.error){
									alert(data.error);
								} else {
									user = data;
								}
							}
						);
					}
				}  else {
					user = data;
				}
	
				if(user!=null){
					// sign in to group
					$.getJSON(
						APIBaseUrl + "?cmd=togroup&iduser=" + user.iduser + "&groupid=" + groupid + "&v=" + Math.random()*Math.random(),
						function(data){
							// console.log(data);
	
							if(data.error){
								alert(data.error);
							} else {
								// if success: show menu
								group = data;
								doCouples();
								fromLogintoMenu();
							}
							
						}
					);
				}
			}
		);	
	}
}

function doCouples(){

	$.getJSON(
			APIBaseUrl,
			{
				"cmd": "getmycouple",
				"userid": user.iduser,
				"groupid": group.groupid,
				"v": Math.random()*Math.random()
			},
			function(data){
				//console.log(data);

				if(data.error){
					alert(data.error);
				} else {
					// if success: show menu
					
					$("#couplespanel").html("");

					for(var i = 0; i<data.couples.length; i++){
						d3.select("#couplespanel")
									.append("a")
									.attr("href", data.couples[i].linktochat )
									.attr("target","_blank")
									.append("div")
									.attr("class","menuitem")
									.text("conosci il TUO ALTRO");
					}

					/*
					d3.select("#couplespanel")
									.append("a")
									.attr("href", ritualdata.assemblyjitsymeet )
									.attr("target","_blank")
									.append("div")
									.attr("class","menuitem")
									.attr("id","gotoassembly2")
									.text("entra nell'assemblea");
					*/

				}
				
			}
	);

}

function doSendData(){
	// collect data from form
	// send it to server
	// provide feedback

	if(typeof ritualdata.datatocollect != 'undefined'){
		var result = new Object();
		for(var i = 0; i<ritualdata.datatocollect.length; i++){
			var name = ritualdata.datatocollect[i].fieldid;
			if(ritualdata.datatocollect[i].type=="switch"){
				var value = $("#datacollectionpanel [name='" + name + "']:checked").val();
				result[name] = value;	
			} else if(ritualdata.datatocollect[i].type=="select"){
				var value = $("#datacollectionpanel #" + ritualdata.datatocollect[i].fieldid ).val();
				result[name] = value;	
			} else if(ritualdata.datatocollect[i].type=="text"){
				var value = $("#datacollectionpanel #" + ritualdata.datatocollect[i].fieldid ).val();
				result[name] = escape(value);	
			} else if(ritualdata.datatocollect[i].type=="range"){
				var value = $("#datacollectionpanel #" + ritualdata.datatocollect[i].fieldid ).val();
				result[name] = value;	
			}
		}

		// console.log(result);

		/*

		ripristinare se si vuole dare la possibilitÃ  di scegliere l'orario

		var cd = new Date( $("#timeselector").val() );

		*/
		var cd = new Date();



		//alert( cd );
		var year = cd.getUTCFullYear();
		var month = cd.getUTCMonth() + 1;
		var day = cd.getUTCDate();
		var hour = cd.getUTCHours();
		var minute = cd.getUTCMinutes();
		var second = cd.getUTCSeconds();

		$.getJSON(
			APIBaseUrl,
			{
				"cmd": "updata",
				"userid": user.iduser,
				"groupid": group.groupid,
				"jsondata": crypt(JSON.stringify(result)),
				"year": year,
				"month": month,
				"day": day,
				"hour": hour,
				"minute": minute,
				"second": second,
				"v": Math.random()*Math.random()
			},
			function(data){
				// console.log(data);

				if(data.error){
					//alert(data.error);
					toDataNOk();
				} else {
					// if success: show menu
					//alert("Data shared!");

					$(".datacollectionform input[type=radio]").prop("checked",false);
					$(".datacollectionform input[type=checkbox]").prop("checked",false);
					$(".datacollectionform select option:selected").prop("selected",false);
					$(".datacollectionform input[type=text]").val("");
					toDataOk();

				}
				
			}
		);
	}


}

function checkifitstime(currentDate,startTime,endTime){

	//console.log("----------------");
	//console.log("[checkifitstime]");

	//console.log("currentDate:");
	//console.log(currentDate);

	//console.log("startTime:");
	//console.log(startTime);

	//console.log("endTime:");
	//console.log(endTime);

	var cd = luxon.DateTime.utc();

	var sd = luxon.DateTime.utc(cd.year,cd.month,cd.day,parseInt(startTime.split(":")[0]) , parseInt(startTime.split(":")[1]) , parseInt(startTime.split(":")[2]) );
	var ed = luxon.DateTime.utc(cd.year,cd.month,cd.day,parseInt(endTime.split(":")[0]) , parseInt(endTime.split(":")[1]) , parseInt(endTime.split(":")[2]) );


	//startDate = new Date(currentDate.getTime());
	//startDate.setHours(startTime.split(":")[0]);
	//startDate.setMinutes(startTime.split(":")[1]);
	//startDate.setSeconds(startTime.split(":")[2]);

	//endDate = new Date(currentDate.getTime());
	//endDate.setHours(endTime.split(":")[0]);
	//endDate.setMinutes(endTime.split(":")[1]);
	//endDate.setSeconds(endTime.split(":")[2]);

	//console.log(cd.toString());
	//console.log(sd.toString());
	//console.log(ed.toString());


	//console.log("startDate:");
	//console.log(startDate);

	//console.log("endDate:");
	////console.log(endDate);


	//console.log("result:");
	//console.log( (cd.diff(sd).valueOf()>0) &&  (cd.diff(ed).valueOf()<0)  );

	valid =  (cd.diff(sd).valueOf()>0) &&  (cd.diff(ed).valueOf()<0);  //startDate < currentDate && endDate > currentDate
	return valid;
}


function checkifitsdatetime(currentDate,startTime,endTime,ofDay){

	//console.log("currentDate:" + currentDate);
	//console.log("startTime:" + startTime);
	//console.log("endTime:" + endTime);
	//console.log("ofDay:" + ofDay);

	// luxon.DateTime.local().setZone(ritualdata.referencetimezone).toJSDate()

	/*
	var sign = "GMT+" + ritualdata.referencetimezone;
	if(ritualdata.referencetimezone<0){
		sign = "GMT" + ritualdata.referencetimezone;
	} else if (ritualdata.referencetimezone==0){
		sign = "GMT";
	}
	*/


	var ccd = luxon.DateTime.utc(parseInt(ofDay.split("-")[0]) , parseInt(ofDay.split("-")[1]) , parseInt(ofDay.split("-")[2]));

	var cd = luxon.DateTime.utc();

	var sd = luxon.DateTime.utc(ccd.year,ccd.month,ccd.day,parseInt(startTime.split(":")[0]) , parseInt(startTime.split(":")[1]) , parseInt(startTime.split(":")[2]) );
	var ed = luxon.DateTime.utc(ccd.year,ccd.month,ccd.day,parseInt(endTime.split(":")[0]) , parseInt(endTime.split(":")[1]) , parseInt(endTime.split(":")[2]) );


	//thatDate = new Date( Date.parse(ofDay + " 00:00:00 " + ritualdata.referencetimezone ) );

	//console.log("......");
	//console.log("thatDate:" + thatDate);

	/*
	startDate = new Date(thatDate.getTime());
	startDate.setHours(startTime.split(":")[0]);
	startDate.setMinutes(startTime.split(":")[1]);
	startDate.setSeconds(startTime.split(":")[2]);

	endDate = new Date(thatDate.getTime());
	endDate.setHours(endTime.split(":")[0]);
	endDate.setMinutes(endTime.split(":")[1]);
	endDate.setSeconds(endTime.split(":")[2]);
	*/

	//console.log("......");
	//console.log("startDate:" + startDate);
	//console.log("endDate:" + endDate);

	/*
	console.log(cd.toString());
	console.log(sd.toString());
	console.log(ed.toString());

	console.log(  ((cd.diff(sd).valueOf()>0) &&  (cd.diff(ed).valueOf()<0))  );
	*/

	valid =  (cd.diff(sd).valueOf()>0) &&  (cd.diff(ed).valueOf()<0);
	return valid;
}


function setupmenuitems(){

	$("#groupid").val(ritualdata.groupid);
	groupid = ritualdata.groupid;

	$("#gotologin").click(function(){
		user = null;
		group = null;
		toLogin();
	});

	$("#toMenu").click(function(){
		toMenu();
	});

	$("#gotodata").click(function(){
		toDataCollection();
	});

	$("#gotoinstructions").click(function(){
		toInstructions();
	});

	$("#backfromdataok").click(function(){
		toMenu();
	});

	$("#backfromdatanok").click(function(){
		toDataCollection();
	});



			d3.select("#watingmessage").text(ritualdata.ritual.waitingforothers);



	d3.select("#assemblypanel")
					.append("a")
					.attr("href", ritualdata.assemblyjitsymeet )
					.attr("target","_blank")
					.append("div")
					.attr("class","menuitem")
					.attr("id","gotoassembly3")
					.text("go to assembly");
					/*
					.on("mouseover",function(){
						//console.log(this);
						d3.select(this)
							.style("position","absolute")
							.style("top",function(d){
								return Math.random()*jQuery("body").height() + "px";
							})
					});
					*/

	$("#gotoassembly").click(function(){
		toAssembly();
	});

	$("#gotocouples").click(function(){
		toCouples();
	});

	$("#gotoritualwaitroom").click(function(){
		toRitualWaitingRoom();
	});



	$("#joinritualbutton").click(function(){
		startRitual();
	});



}

function startRitual(){
	//console.log("[in startRitual]");
	if(user!=null && group!=null){
		// when you press the join ritual button: clearInterval(waitingroomInterval) , 
		if(waitingroomInterval!=null){
			clearInterval(waitingroomInterval);
			waitingroomInterval = null;
		}
		// set the "doing ritual" for me using the API,

		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();

		$.getJSON(
			APIBaseUrl,
			{
				"cmd": "getmycoupledataforritual",
				"userid": user.iduser,
				"groupid": group.groupid,
				"year": year,
				"month": month,
				"day": day,
				"starttime": ritualdata.ritual.starttime,
				"islastday": islastday,
				"howmanydaysdata": ritualdata.howmanydaysdataonlastday,
				"v": Math.random()*Math.random()
			},
			function(data){
				//console.log(data);

				dataforritual = data;

				dataforritual.theData.myData.forEach(function(d){
					d.hour = +d.hour;
					d.minute = +d.minute;
					d.second = +d.second;
					d.jsonstring = decrypt( d.jsonstring);
				});

				dataforritual.theData.theOthersData.forEach(function(d){
					d.hour = +d.hour;
					d.minute = +d.minute;
					d.second = +d.second;
					d.jsonstring = decrypt(d.jsonstring);
				});

				if(data.error){
					alert(data.error);
				} else {
					// if success: show menu
					console.log(dataforritual);
					visualize();
				}
				
			}
		);


		// clear and hide the waitingroom, 
		// show ritual interface and start ritual by getting the date's data	
	}
	
}

function setupdatacollectionform(){
	var formcontainer = d3.select("#datacollectionpanel").append("div").attr("class","datacollectionform");
	if(typeof ritualdata.datatocollect != 'undefined'){

		var fieldcontainerdate = formcontainer.append("div").attr("class","fieldcontainer");
		
		/*

		ripristinare se si vuole dare la possibilitÃ  di scegliere l'orario

		fieldcontainerdate.append("div").attr("class","fieldlables").text("Quando?");
		var fhdate = fieldcontainerdate
						.append("div")
						.attr("class","fieldholder")
						.append("input")
						.attr("id","timeselector");

		var dd = new Date();
		var dd2 = new Date();
		dd2.setDate(dd2.getDate() - 1);

		$("#timeselector").flatpickr(
				{
				    enableTime: true,
				    dateFormat: "Y-m-d H:i",
				    //dateFormat: "H:i",
				    defaultDate: dd,
				    maxDate: dd,
				    minDate: dd2
				}
			);

		*/

		for(var i = 0; i<ritualdata.datatocollect.length; i++){
			// add field
			var fieldcontainer = formcontainer.append("div").attr("class","fieldcontainer");
			fieldcontainer.append("div").attr("class","fieldlables").text(ritualdata.datatocollect[i].label);
			if( ritualdata.datatocollect[i].type=="switch" ){
				
				var fh = fieldcontainer
						.append("div")
						.attr("class","fieldholder");

				for(var j=0; j<ritualdata.datatocollect[i].positions.length; j++){

					var fhh = fh
						.append("div")
						.attr("class","singlefield");

					fhh	
						.append("input")
						.attr("type","radio")
						.attr("name",ritualdata.datatocollect[i].fieldid)	
						.attr("id",ritualdata.datatocollect[i].fieldid + j)
						.attr("value",ritualdata.datatocollect[i].positions[j][0]);

					fhh
						.append("label")
						.attr("for", ritualdata.datatocollect[i].fieldid + j)
						.text(ritualdata.datatocollect[i].positions[j][0]);
				}
				

			} else if( ritualdata.datatocollect[i].type=="select" ){
				
				var fh = fieldcontainer
						.append("div")
						.attr("class","fieldholder")
						.append("select")
						.attr("name",ritualdata.datatocollect[i].fieldid)
						.attr("id",ritualdata.datatocollect[i].fieldid);

				for(var j=0; j<ritualdata.datatocollect[i].positions.length; j++){
					fh	
						.append("option")
						.attr("value",ritualdata.datatocollect[i].positions[j][0])
						.text(ritualdata.datatocollect[i].positions[j][0])
						.property("selected", function(d,i){ return i == 0; });
				}
				

			} else if( ritualdata.datatocollect[i].type=="range" ){

				var val = (ritualdata.datatocollect[i].min+ritualdata.datatocollect[i].max)/2;
				if(  isNaN( parseFloat(ritualdata.datatocollect[i].default) )==false  ){
					val = parseFloat( ritualdata.datatocollect[i].default );
				}

					var fh = fieldcontainer
					.append("div")
					.attr("class", "fieldholder");
			
				fh.append("input")
					.attr("type", "range")
					.attr("name", ritualdata.datatocollect[i].fieldid)
					.attr("id", ritualdata.datatocollect[i].fieldid)
					.attr("min", ritualdata.datatocollect[i].min)
					.attr("max", ritualdata.datatocollect[i].max)
					.attr("step", ritualdata.datatocollect[i].step)
					.attr("value", val);
			
				// Abbiamo aggiunto il div contenente le etichette per gli slider
				// Attualmente ho hardcodato il css prima di vedere se si accavalla in qualche config mobile
				fh.append("div")
					.attr("class", "range-labels")
					.style("width", "100%")
					.style("margin-top", "4px")
					.style("display", "flex")
					.style("justify-content", "space-between")
					.html('<span style="font-size:9px;margin-left: 4px;margin-top: 5px;">Per nulla</span><span style="font-size:9px;margin-right: 4px;margin-top: 5px;">Del tutto</span>');
			} else if( ritualdata.datatocollect[i].type=="text" ){

				var fh = fieldcontainer
						.append("div")
						.attr("class","fieldholder")
						.append("input")
						.attr("type","text")
						.attr("name",ritualdata.datatocollect[i].fieldid)
						.attr("id",ritualdata.datatocollect[i].fieldid);
			}

		}


		formcontainer.append("div")
					.attr("class","menuitem")
					.attr("id","senddata")
					.text("memorizza i dati");

		$('input[type="range"]').rangeslider({
			polyfill: false
		});

		$("#senddata").click(function(){
			doSendData();
		});
	}
}



function visualize(){
	//console.log("[visualize]");
	//do visualization con variabile dataforritual
	$(".panel , .panelcover").fadeOut().promise().done(function() {
		$(".panel , .panelcover").css("display","none");
		$("#ritualinterfacepanel").css("display","block");
		$("#ritualinterfacepanel").fadeIn(function(){
			viz();
		});	
	});
		
}


var p5sketch = null;
function viz(){
	//console.log("[viz]");

	$("#toMenu").css("display","none");

	p5sketch = null;
	p5sketch = new p5(( sketch ) => {

	  let x = 100;
	  let y = 100;
	  var width = $("#vizpanel").width();
	  var height = $("#vizpanel").height();

	  var h = 0;
	  var m = 0;
	  var s = 0;

	  var inc = 288/10;

	  var ph = 0;
	  var pm = 0;
	  var ps = 0;

	  var sounds = new Object();

	  var minutebass = null;
	  var hourbass = null;
	  var atmo = null;


	  var towriteme = null;
	  var towriteother = null;

	  var startdatetime = null;
	  var enddatetime = null;
	  var st = null;
	  var et = null;

	  var loopcomfme = null;
	  var loopdiscomfme = null;

	  var loopcomfother = null;
	  var loopdiscomfother = null;

	  var soundcanstart = false;
	  var loopsstarted = false;
	  var ispreloaddone = 0;

	  var timeelapsed = 0;

	  sketch.preloads = () => {
		  sketch.soundFormats('wav', 'mp3', 'ogg');

		  // mimics the autoplay policy
		  sketch.getAudioContext().suspend();
		  
		  minutebass = sketch.loadSound( ritualdata.ritual.minutebass );
		  hourbass = sketch.loadSound( ritualdata.ritual.hourbass );
		  //atmo = sketch.loadSound( ritualdata.ritual.atmosphere );

		  loopcomfme = sketch.loadSound( ritualdata.ritual.comfortsound );
		  loopdiscomfme = sketch.loadSound( ritualdata.ritual.discomfortsound );

		  loopcomfother = sketch.loadSound( ritualdata.ritual.comfortsound );
		  loopdiscomfother = sketch.loadSound( ritualdata.ritual.discomfortsound );

		  
		  for(var i = 0; i<ritualdata.datatocollect.length; i++){
		  	if(ritualdata.datatocollect[i].positions){
		  		for(var j = 0; j<ritualdata.datatocollect[i].positions.length; j++){
		  			var key = ritualdata.datatocollect[i].positions[j][0];
		  			key = key.replace(/[\W_]+/g,"_");
		  			sounds[  key ] = sketch.loadSound(  ritualdata.datatocollect[i].positions[j][1]  );
		  		}
		  	}	
		  }
		  

		}


		sketch.mousePressed = () => {
			soundcanstart = true;
		  sketch.userStartAudio();
		  sketch.getAudioContext().resume();
		}


		sketch.touchStarted = () => {
			soundcanstart = true;
		  sketch.userStartAudio();
		  sketch.getAudioContext().resume()
		}
	  
	  sketch.setup = () => {

	  	//console.log("[viz.setup]");

	    var ca = sketch.createCanvas(width, height);
	    ca.parent("vizpanel");
	    sketch.frameRate(10);
	    //atmo.loop();
	    sketch.fill(219,236,235);
	    sketch.noStroke();
	    sketch.rect(0,0,width,height);

	    timeelapsed = 0;
	    

	   //startdatetime = luxon.DateTime.fromISO(ritualdata.ritual.starttime).minus({day: 1});
	   //enddatetime = luxon.DateTime.fromISO(ritualdata.ritual.starttime);

	   // if(islastday){
	   //	startdatetime = luxon.DateTime.fromISO(ritualdata.ritual.starttime).minus({day: parseInt( ritualdata.howmanydaysdataonlastday)  });
	   // 	enddatetime = luxon.DateTime.fromISO(ritualdata.ritual.starttime).minus({day: parseInt( ritualdata.howmanydaysdatatoonlastday)  });
	    	//INCREMENTO DURATA MEDITATION
	   //	inc = 120 * (ritualdata.howmanydaysdataonlastday - ritualdata.howmanydaysdatatoonlastday );
	   // }
	    
	   startdatetime = luxon.DateTime.fromISO("2024-10-06T17:30:00");
	   enddatetime = luxon.DateTime.fromISO("2024-10-08T17:30:00");
	    
	   st = startdatetime;

	    

		
	  };

	sketch.draw = () => {



		if(ispreloaddone==0){
			sketch.preloads();
			ispreloaddone = 1;
		}

		var aresoundsloaded = true;

		//console.log("loopcomfme=" + loopcomfme.isLoaded());
		if(!loopcomfme.isLoaded()){
			aresoundsloaded = false;			
		}

		//console.log("loopdiscomfme=" + loopdiscomfme.isLoaded());
		if(!loopdiscomfme.isLoaded()){
			aresoundsloaded = false;			
		}

		//console.log("loopcomfother=" + loopcomfother.isLoaded());
		if(!loopcomfother.isLoaded()){
			aresoundsloaded = false;			
		}

		//console.log("loopdiscomfother=" + loopdiscomfother.isLoaded());
		if(!loopdiscomfother.isLoaded()){
			aresoundsloaded = false;			
		}

		//console.log("minutebass=" + minutebass.isLoaded());
		if(!minutebass.isLoaded()){
			aresoundsloaded = false;			
		} 


		var keys = Object.keys(sounds);
		for(var i=0; i<keys.length&&aresoundsloaded; i++){

			//console.log("sounds[" + keys[i] + "]=" + sounds[keys[i]].isLoaded());
			if(!sounds[keys[i]].isLoaded()){
				aresoundsloaded = false;	
			}
		}
		



		//console.log("aresoundsloaded=" + aresoundsloaded);
		//console.log("soundcanstart=" + soundcanstart);
		//console.log("+++++++++++++");


		if(soundcanstart&&aresoundsloaded){

			if(!loopsstarted){
				loopcomfme.pan(-1);
				loopcomfme.setVolume(0);
				loopcomfme.loop();

				loopdiscomfme.pan(-1);
				loopdiscomfme.setVolume(0);
				loopdiscomfme.loop();

				loopcomfother.pan(1);
				loopcomfother.setVolume(0);
				loopcomfother.loop();

				loopdiscomfother.pan(1);
				loopdiscomfother.setVolume(0);
				loopdiscomfother.loop();

				loopsstarted = true;
			}


			sketch.fill(219,236,235,20);
			sketch.noStroke();
			sketch.rect(0,0,width,height);


			et = st.plus({seconds: inc });


			if(et.diff(enddatetime).valueOf()>0){
				sketch.noLoop();
				// atmo.stop();
				loopcomfme.stop();
				loopdiscomfme.stop();
				loopcomfother.stop();
				loopdiscomfother.stop();
				endRitual();
			}

														    

			var strtime = st.toFormat("yyyy-MM-dd HH:mm:ss");//(h<10?"0":"") + h + ":" + (m<10?"0":"") + m + ":" + (s<10?"0":"") + s;

			// my data

			var towrite = new Array();

														   
			for(var i=0; i<dataforritual.theData.myData.length; i++){
				//console.log(dataforritual.theData.myData[i]);

				// 2020-07-20 15:56:20
				// console.log(dataforritual.theData.myData[i].timestamp);
				var theDate = luxon.DateTime.fromFormat(dataforritual.theData.myData[i].timestamp ,  "yyyy-MM-dd HH:mm:ss");//Date.parse("01/01/2011 " + dataforritual.theData.myData[i].hour  + ":" + dataforritual.theData.myData[i].minute + ":" + dataforritual.theData.myData[i].second);	   	
				// console.log(theDate.toString());

				if( st.diff(theDate).valueOf()<0 && et.diff(theDate).valueOf()>0  ){


					//console.log("FOUND!");
					// play draw
					var jdata = JSON.parse(  dataforritual.theData.myData[i].jsonstring );

					// console.log("jdata:");
					// console.log(jdata);

					var comfortvolume = 0;
					var discomfortvolume = 0;
					var coeff = 1;

					for(var j = 0; j<ritualdata.datatocollect.length; j++){
						var field = ritualdata.datatocollect[j].fieldid;
						var label = ritualdata.datatocollect[j].label;
						// console.log("-> field:");
						// console.log(field);
						if(typeof jdata[field] != 'undefined'){
							var value = jdata[field];
							// console.log(field + "-->" + value);

							if(field=="quanto"){
								coeff = parseFloat(value) / 100;
							}

							if(field=="discomfortcomfort"){
								comfortvolume = (parseFloat(value) + 100)/200;
								discomfortvolume = 1 - comfortvolume;
							}

							if(ritualdata.datatocollect[j].type=="text"){
								value = unescape(value);
							}

							if(value!="no answer"){
								towrite.push(  "<strong>" + label + "</strong>:<br />" + value  );

								var key = value;
								key = key.replace(/[\W_]+/g,"_");

								//console.log("-> key:");
								//console.log(key);

								//console.log(sounds[key]);


								if(sounds[key]){
									sounds[key].pan(-1);
									sounds[key].setVolume(0.5);
									sounds[key].play();
								}	
							}	
						}

					}

					loopcomfme.setVolume( comfortvolume*coeff );
					loopdiscomfme.setVolume( discomfortvolume*coeff );
				}
			}

			if(towrite.length>0){

				towriteme = towrite;

				//sketch.fill(255,255,255);
				//sketch.noStroke();
				//sketch.rect(0,0,width/2,height);

			}

			// end  my data





			// the other's data

			towrite = new Array();

			for(var i=0; i<dataforritual.theData.theOthersData.length; i++){
				//console.log(dataforritual.theData.myData[i]);

				//var thedate = Date.parse("01/01/2011 " + dataforritual.theData.theOthersData[i].hour  + ":" + dataforritual.theData.theOthersData[i].minute + ":" + dataforritual.theData.theOthersData[i].second);	   	
				var theDate = luxon.DateTime.fromFormat(dataforritual.theData.theOthersData[i].timestamp , "yyyy-MM-dd HH:mm:ss");

				if( st.diff(theDate).valueOf()<0 && et.diff(theDate).valueOf()>0  ){


					//console.log("FOUND!");
					// play draw
					var jdata = JSON.parse(  dataforritual.theData.theOthersData[i].jsonstring );

					//console.log("jdata:");
					//console.log(jdata);

					var comfortvolume = 0;
					var discomfortvolume = 0;
					var coeff = 1;



					for(var j = 0; j<ritualdata.datatocollect.length; j++){
						var field = ritualdata.datatocollect[j].fieldid;
						var label = ritualdata.datatocollect[j].label;
						//console.log("-> field:");
						//console.log(field);
						if(typeof jdata[field] != 'undefined'){
							var value = jdata[field];
							//console.log(field + "-->" + value);

							if(field=="quanto"){
								coeff = parseFloat(value) / 100;
							}

							if(field=="discomfortcomfort"){
								comfortvolume = (parseFloat(value) + 100)/200;
								discomfortvolume = 1 - comfortvolume;
							}


							if(ritualdata.datatocollect[j].type=="text"){
								value = unescape(value);
							}

							if(value!="no answer"){
								towrite.push(  "<strong>" + label + "</strong><br />" + value  );

								var key = value;
								key = key.replace(/[\W_]+/g,"_");

								//console.log("-> key:");
								//console.log(key);

								//console.log(sounds[key]);


								if(sounds[key]){
									sounds[key].pan(1);
									sounds[key].setVolume(0.5);
									sounds[key].play();
								}	
							}	
						}

					}


					loopcomfother.setVolume( comfortvolume*coeff );
					loopdiscomfother.setVolume( discomfortvolume*coeff );


				}
			}

			if(towrite.length>0){
				//sketch.fill(255,255,255);
				//sketch.noStroke();
				//sketch.rect(width/2,0,width/2,height);

				towriteother = towrite;

			}

			// end  the other's data



			if(towriteme!=null){

						var tws = "";
						for(var k = 0; k<towriteme.length; k++){
							tws = tws + towriteme[k];
							if(k<(towriteme.length-1)){
								tws = tws + "<br /><br />";
							}
							//sketch.text(towriteme[k], margin, starty + k*(fheight+margin)  );	
						}
						// sketch.text(tws, margin, 30, width/2 - 2*margin , height - 65  );	
						//$("#yourtextpanel").html("");
						$("#yourtextpanel").html(tws);

			}


			if(towriteother!=null){

						var tws = "";
						for(var k = 0; k<towriteother.length; k++){
							tws = tws + towriteother[k];
							if(k<(towriteother.length-1)){
								tws = tws + "<br /><br />";
							}
							//sketch.text(towriteother[k], width-margin, starty + k*(fheight+margin)  );	
						}
						//sketch.text(tws, width/2 + margin, 30 , width/2 - 2*margin , height - 65  );	
						//$("#yourothertextpanel").html("");
						$("#yourothertextpanel").html(tws);

			}



			sketch.fill(255,65,105);
			sketch.textSize(15);
			
			sketch.textFont('Helvetica');
			sketch.textAlign(sketch.LEFT,sketch.BOTTOM);
			sketch.text("TU", 0, height-30 );
			sketch.textAlign(sketch.RIGHT,sketch.BOTTOM);
			sketch.text("L'ALTRO", width, height-30 );	



			timeelapsed = timeelapsed + sketch.deltaTime;

			// ogni minuto : basso
			//console.log(  parseInt(sketch.frameCount/sketch.frameRate())%3 );
			if(  timeelapsed>4000  ){   
					minutebass.play();
					sketch.fill(255,65,105);
					sketch.noStroke();
					var wwww = 30;

					sketch.rect(width/2-wwww/2,0,wwww,height);
					timeelapsed = 0;
			}


			// draw time
			sketch.fill(219,236,235);
			sketch.noStroke();
			sketch.rect(width/2-150,0,300,30);
			sketch.fill(255,65,105);
			sketch.textSize(20);
			sketch.textAlign(sketch.CENTER,sketch.CENTER);
			sketch.textFont('Helvetica');
			sketch.text(strtime + " " + ritualdata.referencetimezone, width/2, 15);

			// at the end
			ph = h;
			pm = m;
			ps = s;

			st = et;




		} // if(soundcanstart){
		else {

			sketch.background(219,236,235);
			//sketch.fill(Math.abs(255*Math.sin(sketch.frameCount/10)),Math.abs(255*Math.cos(sketch.frameCount/15)),Math.abs(255*Math.sin(sketch.frameCount/20)));
			sketch.fill(255,65,105);
			sketch.textSize(50);
			sketch.textAlign(sketch.CENTER,sketch.CENTER);
			sketch.textFont('Helvetica');
			sketch.text("CLICK ME", width/2, 60);

		}
			
	};
	

});

}

var bassplayed=0;

function endRitual(){
	$("#toMenu").css("display","block");
	$("#vizpanel").html("");
	// usare API per settare lo status finito
	$.getJSON(
			APIBaseUrl,
			{
				"cmd": "endritualstatus",
				"userid": user.iduser,
				"groupid": group.groupid,
				"v": Math.random()*Math.random()
			},
			function(data){
				//console.log(data);

				if(data.error){
					alert(data.error);
				} else {
					// if success: show menu
				}
				
			}
		);

	// andare all'assemblea
	//toAssembly();
	toCouples();
	//toMenu();
}

function getAllData(groupid){
	$.getJSON(
		APIBaseUrl,
		{
			"cmd": "getalldata",
			"groupid": groupid,
			"v": Math.random()*Math.random()
		},
		function(data){
			//console.log(data);
			var string = '';
			string+='"timestamp","userid","cosa","discomfortcomfort","dove","messaggio","quanto"\n'
			data.theData.myData.forEach(function(d){
				d.hour = +d.hour;
				d.minute = +d.minute;
				d.second = +d.second;
				d.jsonstring = JSON.parse(decrypt( d.jsonstring));
				string+='"'+d.timestamp+'","'+d.userid+'","'+unescape(d.jsonstring.cosa).replace(/"/g, "'")+'","'+d.jsonstring.discomfortcomfort+'","'+d.jsonstring.dove+'","'+unescape(d.jsonstring.messaggio).replace(/"/g, "'")+'","'+d.jsonstring.quanto+'"\n'
			});
	
			if(data.error){
				alert(data.error);
			} else {
				// if success: show menu
				console.log(string);
			}
			
		}
	);
}



function crypt(data){
	var res = LZString.compressToEncodedURIComponent(data);
	return res;
}

function decrypt(data){
	var res = LZString.decompressFromEncodedURIComponent(data);
	return res;
}


