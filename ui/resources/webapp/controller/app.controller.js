sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ui.controller.app", {
		onInit : function(){
			var Settings = new sap.ui.model.json.JSONModel();
			Settings.API_RUNTIME = "nodejs"; // xsjs | nodejs

			var port = 51018;
			var hostname = window.location.hostname;

			Settings.API_PATH = "https://"+hostname+":"+port;
			if(Settings.API_RUNTIME === "xsjs"){
				Settings.API_FILE = "/customer/customer.xsjs";
			}else{
				Settings.API_FILE = "";
			}

			Settings.API_PATH_DATA = Settings.API_FILE+"?option=data";
			Settings.API_PATH_RATING = Settings.API_FILE+"?option=api";
			Settings.API_PATH_LIST = Settings.API_FILE+"?option=list";
			
			sap.ui.getCore().setModel(Settings, "Settings");
		}
	});
});