import{V as u,a as f,K as d,T as m,S as p,M as g,b as h,c as y,C as w,F as b,d as v}from"./vendor.98a01579.js";const F=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}};F();const c={},L=function(o){const e=10;let n=c[e];return n||(n=new y({image:new w({radius:e,fill:new b({color:"rgba(255, 153, 0, 0.4)"}),stroke:new v({color:"rgba(255, 204, 0, 0.2)",width:1})})}),c[e]=n),n},S=new u({source:new f({url:"data/kml/export.kml",format:new d({extractStyles:!1})}),style:L}),k=new m({source:new p({layer:"toner"})}),i=new g({layers:[k,S],target:"map",view:new h({center:[0,0],zoom:2})}),a=$("#info");a.tooltip({animation:!1,trigger:"manual"});const x=function(o){a.css({left:o[0]+"px",top:o[1]-15+"px"});const e=i.forEachFeatureAtPixel(o,function(n){return n});e?a.attr("data-original-title",e.get("name")).tooltip("show"):a.tooltip("hide")},E=function(o){a.css({left:o[0]+"px",top:o[1]-15+"px"});const e=i.forEachFeatureAtPixel(o,function(n){return n});e?(a.tooltip("hide"),$("#header").html(e.get("name")),$("#body").html("<p>Address: "+e.get("addr:street")+" "+(e.get("addr:housenumber")?e.get("addr:housenumber"):"")+(e.get("website")?'<br>Website: <a href="'+e.get("website")+'"  target="_blank">'+e.get("website")+"</a>":"")+(e.get("phone")?'<br>Phone: <a href="tel:'+e.get("phone").replace(" ","")+'">'+e.get("phone")+"</a>":"")+(e.get("email")?'<br>Email: <a href="mailto:'+e.get("email").replace(" ","")+'">'+e.get("email")+"</a>":"")+"</p>"),$("#myModal").modal()):a.tooltip("hide")};i.on("pointermove",function(o){if(o.dragging){a.tooltip("hide");return}x(i.getEventPixel(o.originalEvent))});i.on("click",function(o){E(o.pixel)});
//# sourceMappingURL=index.40418201.js.map