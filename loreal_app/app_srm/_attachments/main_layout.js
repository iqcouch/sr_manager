//main menu with all components
var mainlayout = {
	mytoolbar:
	{
		view:"toolbar",
		id:"myToolbar",
		cols:[
			{ view:"button", id:"agenda", type:"iconButton", icon:"calendar", label:"Agenda", width:120, click:"agendaOnClick();" },
			{ view:"button", id:"users", type:"iconButton", icon:"users", label:"Utilizatori", width:120, click:"usersOnClick();"},
			{ view:"button", id:"outlets" , type:"iconButton", icon:"shopping-cart", label:"Magazine", width:120, click:"outletsOnClick();"},
			{ view:"button", id:"activitymanagement", type:"iconButton", icon:"cogs", label:"Activitati", width:120, click:"activitymanagementOnClick();"},
			{ view:"button", id:"srreport", type:"iconButton", icon:"tasks", label:"Raport SR", width:120, click:"srreportOnClick();" },
			{ view:"button", id:"reports", type:"iconButton", icon:"tachometer", label:"Rapoarte", width:120 },
			{ view:"button", id:"messages", type:"iconButton", icon:"envelope-o", label:"Mesaje", width:120},
			{},
			{ view:"button", id:"logout",type:"iconButton", icon:"sign-out", label:"Logout", width:120, click:"logoutOnClick();"}
		]
	
	},
	
	//main layout	
	getMainLayout: function () {
		return {
			id: "main",
			type: "wide",
			rows:[
			{
				rows:[
				webix.copy(this.mytoolbar)	
				]
			},
			{
				view:"multiview",
				fitBiggest:true,
				//animate:false,
				id:"mainpage",
				cells:[
				//Add planner by default --- dhtmlxScheduler initialization
				webix.copy(agenda.getAgenda())
				]
			}
			]
		};
	},
	
	getToolbar: function () {
		return this.mytoolbar;
	},
	
	setToolbar: function (role) {
		if(role == 'roles_admin'){
			this.mytoolbar = {
				view:"toolbar",
				id:"myToolbar",
				cols:[
					{ view:"button", id:"agenda", type:"iconButton", icon:"calendar", label:"Agenda", width:120, click:"agendaOnClick();" },
					{ view:"button", id:"users", type:"iconButton", icon:"users", label:"Utilizatori", width:120, click:"usersOnClick();"},
					{ view:"button", id:"outlets" , type:"iconButton", icon:"shopping-cart", label:"Magazine", width:120, click:"outletsOnClick();"},
					{ view:"button", id:"activitymanagement", type:"iconButton", icon:"cogs", label:"Activitati", width:120, click:"activitymanagementOnClick();"},
					{ view:"button", id:"srreport", type:"iconButton", icon:"tasks", label:"Raport SR", width:120, click:"srreportOnClick();" },
					{ view:"button", id:"reports", type:"iconButton", icon:"tachometer", label:"Rapoarte", width:120 },
					{ view:"button", id:"messages", type:"iconButton", icon:"envelope-o", label:"Mesaje", width:120},
					{},
					{ view:"button", id:"logout",type:"iconButton", icon:"sign-out", label:"Logout", width:120, click:"logoutOnClick();"}
				]
	
			};
		};
		if(role == 'roles_asm'){
			this.mytoolbar = {
				view:"toolbar",
				id:"myToolbar",
				cols:[
					{ view:"button", id:"agenda", type:"iconButton", icon:"calendar", label:"Agenda", width:120, click:"agendaOnClick();" },
					{ view:"button", id:"users", type:"iconButton", icon:"users", label:"Utilizatori", width:120, click:"usersOnClick();"},
					{ view:"button", id:"reports", type:"iconButton", icon:"tachometer", label:"Rapoarte", width:120 },
					{ view:"button", id:"messages", type:"iconButton", icon:"envelope-o", label:"Mesaje", width:120},
					{},
					{ view:"button", id:"logout",type:"iconButton", icon:"sign-out", label:"Logout", width:120, click:"logoutOnClick();"}
				]
	
			};
		}
		if(role == 'roles_sr'){
			this.mytoolbar = {
				view:"toolbar",
				id:"myToolbar",
				cols:[
					{ view:"button", id:"agenda", type:"iconButton", icon:"calendar", label:"Agenda", width:120, click:"agendaOnClick();" },
					{ view:"button", id:"users", type:"iconButton", icon:"users", label:"Utilizatori", width:120, click:"usersOnClick();"},
					{ view:"button", id:"reports", type:"iconButton", icon:"tachometer", label:"Rapoarte", width:120 },
					{ view:"button", id:"messages", type:"iconButton", icon:"envelope-o", label:"Mesaje", width:120},
					{},
					{ view:"button", id:"logout",type:"iconButton", icon:"sign-out", label:"Logout", width:120, click:"logoutOnClick();"}
				]
	
			};
		}	
	}
};

function usersOnClick () {
	if(webix.isUndefined($$('usersview'))){
		$$('mainpage').addView({id:"usersview", rows:[webix.copy(userstable.getUsersTable()),webix.copy(userstable.getUsersMenu())]});
		$$('mainpage').resize(true);
		$$('userstable').parse(userstable.getUsersData(),"json");
		$$('userstable').attachEvent("onAfterEditStop", function(state, editor, ignoreUpdate){
		    if(state.value != state.old){
		      $$('userstable').addCellCss(editor.row, editor.column, "highlight");
		    }
		}); 
		$$('userstable').refresh();
	}
	$$('usersview').show();		
};
function outletsOnClick (){
	if(webix.isUndefined($$('outletsview'))){
		$$('mainpage').addView({id:"outletsview", rows:[webix.copy(outletstable.getOutletsTable()), webix.copy(outletsmenu)]});
		$$('mainpage').resize(true);
		$$('outletstable').parse(outletstable.getOutletsData(), "json");
		$$('outletstable').refresh();
	};
	$$('outletsview').show();
};
function activitymanagementOnClick () {
	if(webix.isUndefined($$('activityview'))){
		$$('mainpage').addView({id:"activityview", rows:[webix.copy(activitytable.getActivityTable()), webix.copy(activitymenu)]});
		$$('mainpage').resize(true);
		$$('activitytable').parse(activitytable.getFromularRaportSR());
		$$('activitytable').refresh();
	}
	$$('activityview').show();
};
function agendaOnClick () {
	//Planner is loaded by default, do not create a new instance and do not unload/destroy it
	$$('planner').show();
	//$$('planner').resize(true);
};
function srreportOnClick () {
	if(webix.isUndefined($$('reportSR'))) $$('mainpage').addView(displaySRReport());	
	$$('reportSR').show();
};
function logoutOnClick(){
	$.couch.logout({
	    success: function(data) {
	        console.log(data);
			webix.storage.session.remove('USERNAME');
			
			if(!webix.isUndefined($$('loginform'))) $$('loginform').destructor();
			if(!webix.isUndefined($$('loginwindow'))) $$('loginwindow').destructor();
			$$('main').destructor();
			logic.init();
	    }
	});
};
