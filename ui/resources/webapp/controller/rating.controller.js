sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
	//"../model/formatter"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("ui.controller.rating", {
		/** @member {string} _API_PATH */
		_API_PATH : "",
		
		/** @member {string} _API_PATH */
		_API_PATH_DATA : "",
		
		/** @member {JSONModel} _ModelWeight */
		_ModelWeight: new sap.ui.model.json.JSONModel({
			network:50, 
			external:50
		}), 
		
		/** @member {JSONModel} _ModelRating */
		_ModelRating: new sap.ui.model.json.JSONModel({
			V_RATING:4,
			V_MESSAGE:{
				externalRating:5,
				networkRating:3,
				externalRatingWeight:12,
				networkRatingWeight:12,
				color:"#61a656"
			}
		}),
		
		/** @member {JSONModel} _ModelClient */
		_ModelClient: new sap.ui.model.json.JSONModel({
			Data: {
				id: -1,
				type: "",
				name: "",
				rating: 0,
				age: 0,
				schufa: 0,
				loans: 0,
				transactions: [{}]
			}
		}),
		
		/** @member {int} _clientID */
		_clientID : 0,
		
		/**
		 * onInit is called whenever the class is created
		 * {constructor}
		 */
		onInit : function(){
			var Settings = sap.ui.getCore().getModel("Settings");
			if(typeof (Settings) !== "undefined"){
				this._API_PATH = Settings.API_PATH + Settings.API_PATH_RATING;
				this._API_PATH_DATA = Settings.API_PATH + Settings.API_PATH_DATA;
				
				this.getView().setModel(this._ModelWeight,"Weight");
				this.getView().setModel(this._ModelRating,"Rating");
				this.getView().setModel(this._ModelClient,"ClientData");
				
				sap.ui.controller("ui.controller.search").registerController("rating", this);
			}
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("customer").attachPatternMatched(this._onObjectMatched, this);// we register an internal callback will be executed when the route is hit!
		},
		
		/**
		 * Called when the visitor reloads the page
		 */
		_onObjectMatched: function (oEvent) {
			this._clientID =  oEvent.getParameter("arguments").customerID;
			this._loadClientData(this._clientID);
			
			var external = this._ModelWeight.getProperty("/").external;
			var network = this._ModelWeight.getProperty("/").network;
			
			this._updateRating(this._clientID, external, network);
		},
		
		/**
		 * Used to format the number within the donut from 1-5 to 0-100%
		 */
		_formatDonutNumberToPercent : function(){
			var id = this.createId("rating");
			var element = this.getView().byId(id).getFraction();
			this.getView().byId(id).addDelegate({
				onAfterRendering:function(){
					$("#"+id+" .sapSuiteRMCFont").html(element);
				}
			});
		},
		
		/**
		 * UpdateRating is called whenever you want to recalculate the Rating and displaying it
		 * @param {int} pClientID 
		 * @param {int} pExternalRating (0-100)
		 * @param {int} pNetworkRating (0-100)
		 */
		_updateRating : function(pClientID, pExternalRating, pNetworkRating){
			
			var ModelRating = this.getView().getModel("Rating");
			
			$.ajax({
				dataType: "json",
				url: this._API_PATH+"&id="+pClientID+"&externalRating="+pExternalRating+"&networkRating="+pNetworkRating, //+"&id=" + pName,
				async: false,
				success: function(rating){
					if(typeof(rating) !== "object" || typeof(rating.V_RATING) === "undefined"){
						MessageToast.show("API not available. Please try again later.", {animationDuration:10000});
						ModelRating.setData({"V_RATING": 0});
						ModelRating.refresh();
					}else{	
						ModelRating.setData(rating);
						ModelRating.refresh();
					}
				},
				error: function(xhr, status, error){
					MessageToast.show("Rating Controller: "+error, {animationDuration:10000});
				}
			});
			
			this._formatDonutNumberToPercent();
		},
		
		/**
		 * Formats a number to it short version. For example, 1.000.000 will be displayed as 1M, 100.000 will be displayed as 100K and so on.
		 * @param {string} pNumber
		 * @returns {JSON} an json Object with the simplified value and the type of the value (K or M)
		 */
		_formatNumber : function(pNumber){
			if(pNumber >= 1000000){
				return {value: (pNumber / 1000000), type: "M"};
			}
			if(pNumber >= 1000){
				return {value: (pNumber / 1000), type: "K"};
			}
			return {value: pNumber, type: ""};
		},
		
		/**
		 * Connects to the backend to load all Data for the client with the determined id.
		 * @param {int} pID
		 */
		_loadClientData : function(pID){
			var c = this;
			var ModelClient = this.getView().getModel("ClientData");
			
			// Data
			$.ajax({
				dataType: "json",
				url: this._API_PATH_DATA+"&id="+pID,
				async: false,
				success: function(customer){
					var loan = c._formatNumber(customer.loans);
					var ownCapital = c._formatNumber(customer.ownCapital);
					
					customer.schufa = parseFloat(customer.schufa);
					customer.ownCapitalTileNumber = ownCapital.value;
					customer.ownCapitalTileType = ownCapital.type;
					customer.loanTileNumber = loan.value;
					customer.loanTileType = loan.type;
					
					ModelClient.setData(customer);
					ModelClient.refresh();
				},
				error: function(xhr, status, error){
					console.log("Rating Controller: "+error);

					throw (error);
				}
			});
		},
		
		/**
		 * Called when the visitor wants to go back in the navigation
		 */
		onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("overview", true);
		},
		
		/**
		 * Called whenever the Sliders are changed
		 * @params {object} pEvent
		 */
		onChangeRating : function(pEvent){
			var model = this._ModelWeight;
			switch(pEvent.getSource().data("rating")) {
				case "external":
					model.setData({ network: 100 - model.getData().external }, true);
					break;
				case "network":
					model.setData({ external: 100 - model.getData().network }, true);
					break;
			}
		},
		
		/**
		 * Called whenever the button for the recalculation is pressed in the ui
		 */
		onRecalculateTrustworthiness: function(){
			this._updateRating(this._clientID, this._ModelWeight.getProperty("/").external, this._ModelWeight.getProperty("/").network);
		},
		
		/**
		 * Defines the color by the given rating Value. Called by the UI
		 * @param {int} pRatingValue
		 * @returns {string} Hex-Value for the color
		 */
		setRatingLegendColor: function (pRatingValue){
			var color = "#000000";
			switch (pRatingValue) {
				case 1:
					color = "#FF0000"; 
					break;
				case 2:
					color = "#FF8000"; 
					break;
				case 3:
					color = "#EE0"; 
					break;
				case 4:
					color = "#61a656"; 
					break;
				case 5:
					color = "#0080FF"; 
					break;
				default:
			}
			return color;
		}
		
	});
});


