﻿Type.registerNamespace("Sys.Extended.UI");Sys.Extended.UI.HoverBehavior=function(n){Sys.Extended.UI.HoverBehavior.initializeBase(this,[n]);this._elementHandlers=null;this._hoverElementHandlers=null;this._hoverElement=null;this._hoverCount=0;this._unhoverDelay=0;this._hoverDelay=0;this._hoverScript=null;this._unhoverScript=null;this._hoverFired=!1};Sys.Extended.UI.HoverBehavior.prototype={_setupHandlersArray:function(){var n=[];return n[0]=Function.createDelegate(this,this._onHover),n[1]=Function.createDelegate(this,this._onUnhover),n},get_elementHandlers:function(){return this._elementHandlers||(this._elementHandlers=this._setupHandlersArray()),this._elementHandlers},get_hoverElementHandlers:function(){return this._hoverElementHandlers||(this._hoverElementHandlers=this._setupHandlersArray()),this._hoverElementHandlers},get_hoverElement:function(){return this._hoverElement},set_hoverElement:function(n){n!=this._hoverElement&&(this._hoverElement&&this._setupHandlers(this._hoverElement,this.get_hoverElementHandlers(),!1),this._hoverElement=n,this._hoverElement&&this._setupHandlers(this._hoverElement,this.get_hoverElementHandlers(),!0))},get_hoverDelay:function(){return this._hoverDelay},set_hoverDelay:function(n){this._hoverDelay=n;this.raisePropertyChanged("hoverDelay")},get_hoverScript:function(){return this._hoverScript},set_hoverScript:function(n){this._hoverScript=n},get_unhoverDelay:function(){return this._unhoverDelay},set_unhoverDelay:function(n){this._unhoverDelay=n;this.raisePropertyChanged("unhoverDelay")},get_unhoverScript:function(){return this._unhoverScript},set_unhoverScript:function(n){this._unhoverScript=n},dispose:function(){var t=this.get_element(),n;this._elementHandlers&&(n=this.get_elementHandlers(),this._setupHandlers(t,n,!1),this._elementHandlers=null);this._hoverElement&&(n=this.get_hoverElementHandlers(),this._setupHandlers(this._hoverElement,n,!1),this._hoverElement=null);Sys.Extended.UI.HoverBehavior.callBaseMethod(this,"dispose")},initialize:function(){Sys.Extended.UI.HoverBehavior.callBaseMethod(this,"initialize");var n=this.get_elementHandlers();this._setupHandlers(this.get_element(),n,!0);this._hoverElement&&(n=this.get_hoverElementHandlers(),this._setupHandlers(this._hoverElement,n,!0))},add_hover:function(n){this.get_events().addHandler("hover",n)},remove_hover:function(n){this.get_events().removeHandler("hover",n)},_fireHover:function(){if(this._hoverCount&&!this._hoverFired){var handler=this.get_events().getHandler("hover");handler&&handler(this,Sys.EventArgs.Empty);this._hoverScript&&eval(this._hoverScript);this._hoverFired=!0}},_onHover:function(){this._hoverCount++;this._hoverDelay?window.setTimeout(Function.createDelegate(this,this._fireHover),this._hoverDelay):this._fireHover()},add_unhover:function(n){this.get_events().addHandler("unhover",n)},remove_unhover:function(n){this.get_events().removeHandler("unhover",n)},_fireUnhover:function(){if(this._hoverFired&&!this._hoverCount){this._hoverFired=!1;var handler=this.get_events().getHandler("unhover");handler&&handler(this,Sys.EventArgs.Empty);this._unhoverScript&&eval(this._unhoverScript)}},_onUnhover:function(){this._hoverCount--;this._hoverCount<=0&&(this._hoverCount=0,this._unhoverDelay?window.setTimeout(Function.createDelegate(this,this._fireUnhover),this._unhoverDelay):this._fireUnhover())},_setupHandlers:function(n,t,i){this.get_isInitialized()&&n&&(i?($addHandler(n,"mouseover",t[0]),$addHandler(n,"focus",t[0]),$addHandler(n,"mouseout",t[1]),$addHandler(n,"blur",t[1])):($removeHandler(n,"mouseover",t[0]),$removeHandler(n,"focus",t[0]),$removeHandler(n,"mouseout",t[1]),$removeHandler(n,"blur",t[1])))}};Sys.Extended.UI.HoverBehavior.descriptor={properties:[{name:"hoverElement",isDomElement:!0},{name:"unhoverDelay",type:Number}],events:[{name:"hover"},{name:"unhover"}]};Sys.Extended.UI.HoverBehavior.registerClass("Sys.Extended.UI.HoverBehavior",Sys.Extended.UI.BehaviorBase);