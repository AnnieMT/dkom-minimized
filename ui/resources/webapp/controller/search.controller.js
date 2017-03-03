sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("ui.controller.search", {
		_controller : [],
		_name : "",
		
		onInit: function(){
			// Load settings
			this.oSettings = sap.ui.getCore().getModel("Settings");
			if(typeof(this.oSettings) !== "undefined"){
				// Setting the path to the api
				//this.API_PATH = this.oSettings.API_PATH+this.oSettings.API_PATH_CUSTOMER_LIST;
				this.API_PATH = this.oSettings.API_PATH+this.oSettings.API_PATH_LIST;
				
				this.oModel = new sap.ui.model.json.JSONModel();
				this.getView().setModel(this.oModel,"CustomerList");
				this.setData();
			}
			var oView = this.getView();
			this.oSF = oView.byId("search");
		},

		setData : function(){
			var c = this;
			$.ajax({
				dataType: "json",
				url: this.API_PATH,
				async: false,
				success: function(customer){
					var oModel = c.getView().getModel("CustomerList");
					oModel.setData(customer);
					oModel.refresh();
				},
				error: function(xhr, status, error){
					MessageToast.show("Backend not available. Please check the port for your backend system.",{animationDuration: 50000});     
				 	console.log("search Controller: "+error);
				}
			});
		},
		
		onSearch: function(oEvent){
			var customer = oEvent.getParameter("suggestionItem");
			if(customer ){
				this._customerID = customer.getKey();
			
				// REROUTE
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("customer", {customerID:this._customerID});
			}
		},
		
		registerController : function(pName, pController){
			this._controller[pName] = pController;
			//console.log("registered: "+pName);
		},
		
		loadData: function(){
			// Update
			for(var name in this._controller){
				if(typeof(this._controller[name]._update) === "function"){
					this._controller[name]._update(this._name);
				}
			}
		},

		onSuggest: function (event) {
			var value = event.getParameter("suggestValue");
			var filters = [];
			if (value) {
			filters = [new sap.ui.model.Filter([
               new sap.ui.model.Filter("id", function(sText) {
                	return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
                   }),
               new sap.ui.model.Filter("name", function(sDes) {
                    return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
                   })
               ], false)];
			}
 
			this.oSF.getBinding("suggestionItems").filter(filters);
			this.oSF.suggest();
		}		
	});
});