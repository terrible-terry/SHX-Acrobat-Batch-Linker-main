

UVSR_selectiveFlatten = app.trustedFunction(function(oDoc) {
  app.beginPriv(); // Note we use trusted functions to get rid of the pesky "JavaScript Window" warnings.
  var dlgFlattenWhat = {
    result:"cancel",
    showDialog: app.trustPropagatorFunction( function(){ 
		app.beginPriv();
		this.doc = oDoc; 
		var rtn = app.execDialog(this);
		app.endPriv();
		return rtn;}),
    initialize: app.trustPropagatorFunction( function(dialog) { 
	  this.numPages = this.doc.numPages;
	  app.beginPriv();
	  dialog.load( {"pgSt":"1",cbhs:true,cbf2:true,"pgEn":this.numPages.toString()} ); 
	  app.endPriv();
	}),
    commit: app.trustPropagatorFunction( function(dialog){
		var atypes = ["Text","Highlight","Stamp","Caret","StrikeOut","Underline","Sound","FileAttachment",
					  "FreeText","Line","Circle","Square","Polygon","PolyLine","Ink"];
	    var arrC = ["cbx0","cbx1","cbx2","cbx3","cbx4","cbx5","cbx6","cbx7","cbx8","cbx9","cbxa","cbxb","cbxc","cbxd","cbxe"];
		this.choices = new Array();
        var oReturn = dialog.store();
		var numTypes = arrC.length;
		for (var itm=0;itm<numTypes;itm++) {
		  this.choices[atypes[itm]] = oReturn[arrC[itm]];
		}
		this.startPage = oReturn["pgSt"] - 1;
		this.endPage = oReturn["pgEn"] - 1;
		this.hideStickies = oReturn["cbhs"];
		this.flatForms = oReturn["cbf1"];
		this.hideButtons = oReturn["cbf2"];
    }),
	pgSt: function(dialog){
	    var oR = dialog.store();
		var pg = oR["pgSt"];
		var pgE = oR["pgEn"];
	    if (pg<1) pg="1";
		if (pg>this.numPages) pg=this.numPages.toString();
		if (pg>pgE) pgE=pg;
		if (pg!=oR["pgSt"] || pgE!=oR["pgEn"]) dialog.load({ "pgSt":pg, "pgEn":pgE });
	},
	pgEn: function(dialog){
	    var oR = dialog.store();
		var pg = oR["pgSt"];
		var pgE = oR["pgEn"];
		if (pgE<pg) pgE=pg;
		if (pgE>this.numPages) pgE=this.numPages.toString();
		if (pgE!=oR["pgEn"]) dialog.load({ "pgEn":pgE });
	},
    description:{
        name: "Selective Comment and Form Flattener",
        elements:
        [
            {
                type: "view",
                elements:
                [
                    {
                        type: "view",
                        char_height: 20,
                        elements:
                        [
							{
                                type: "static_text",
                                item_id: "st01",
                                name: "Select which types of annotation to flatten. Unchecked items are left intact*.",
                                char_width: 40,
                                alignment: "align_left",
                                font: "dialog"
                            },
                            {
                                type: "cluster",
                                char_height: 6,
                               
                                elements:
                                [
								  {
                                    type: "view",
									align_children: "align_top",
                                    elements:
                                    [
									 {
										type: "static_text",
										item_id: "st02",
										bold: true,
										name: "Annotations:",
										char_width: 14,
										char_height:2,
										alignment: "align_left",
										font: "dialog"
									},
									{
										type: "gap",
										height: 10
									},
                                    {
                                        type: "view",
                                        char_width: 8,
                                        char_height: 2,
                                        elements:
                                        [
                                            {
                                                type: "check_box",
                                                item_id: "cbx0",
                                                name: "Sticky Notes"
                                            },
                                            {
                                                type: "check_box",
                                                item_id: "cbx1",
                                                name: "Highlights"
                                            },
											{
                                                type: "check_box",
                                                item_id: "cbx2",
                                                name: "Stamps"
                                            },
										]
                                    },
                                    {
                                        type: "view",
                                        char_width: 8,
                                        char_height: 2,
                                        elements:
                                        [
                                            {
                                                type: "check_box",
                                                item_id: "cbx3",
                                                name: "Carets (^)"
                                            },
											{
                                                type: "check_box",
                                                item_id: "cbx4",
                                                name: "Strikeouts"
                                            },
                                            {
                                                type: "check_box",
                                                item_id: "cbx5",
                                                name: "Underlines"
                                            }
                                        ]
                                    },
									{
                                        type: "view",
                                        char_width: 8,
                                        char_height: 2,
                                        elements:
                                        [
                                            {
                                                type: "check_box",
                                                item_id: "cbx6",
                                                name: "Sound Comments"
                                            },
                                            {
                                                type: "check_box",
                                                item_id: "cbx7",
                                                name: "File Comments"
                                            }
                                        ]
                                    },
									{
										type: "gap",
										height: 10
									}
								]},
								 {
									type: "check_box",
									item_id: "cbhs",
									name: "Remove icons when flattening Sticky Notes, Sounds and File Comments"
								 }
                                ]
                            },
					        {
                                type: "cluster",
                                char_width: 8,
                                char_height: 8,
                                align_children: "align_top",
                                elements:
                                [
									{
										type: "static_text",
										item_id: "st03",
										name: "Drawing Markups:",
										bold: true,
										char_width: 14,
										char_height: 2,
										alignment: "align_left",
										font: "dialog"
									},
                                    {
                                        type: "view",
                                        char_width: 8,
                                        char_height: 3,
                                        elements:
                                        [
                                            {
                                                type: "check_box",
                                                item_id: "cbx8",
                                                name: "Text Boxes / Callouts"
                                            },
                                            {
                                                type: "check_box",
                                                item_id: "cbx9",
                                                name: "Single Lines / Arrows"
                                            },
											{
                                                type: "check_box",
                                                item_id: "cbxa",
                                                name: "Ovals"
                                            },
										]
                                    },
                                    {
                                        type: "view",
                                        char_width: 8,
                                        char_height: 3,
                                        elements:
                                        [
                                            {
                                                type: "check_box",
                                                item_id: "cbxb",
                                                name: "Rectangles"
                                            },
											{
                                                type: "check_box",
                                                item_id: "cbxc",
                                                name: "Polygons / Clouds"
                                            }
                                        ]
                                    },
                                    {
                                        type: "view",
                                        char_width: 8,
                                        char_height: 3,
                                        elements:
                                        [
                                            {
                                                type: "check_box",
                                                item_id: "cbxd",
                                                name: "Poly Lines"
                                            },
                                            {
                                                type: "check_box",
                                                item_id: "cbxe",
                                                name: "Freeform lines"
                                            }

                                        ]
                                    }
                                ]
                            },
							{
                                type: "cluster",
                                char_width: 8,
                                char_height: 8,
                                align_children: "align_top",
                                elements:
                                [
									{
										type: "static_text",
										item_id: "st03",
										name: "Form fields:",
										bold: true,
										char_width: 14,
										char_height: 2,
										alignment: "align_left",
										font: "dialog"
									},
                                    {
                                        type: "view",
                                        char_width: 8,
                                        char_height: 3,
                                        elements:
                                        [
                                            {
                                                type: "check_box",
                                                item_id: "cbf1",
                                                name: "Flatten all form fields"
                                            },
                                            {
                                                type: "check_box",
                                                item_id: "cbf2",
                                                name: "Remove buttons when flattening"
                                            }
										]
                                    }
                                ]
                            },
							{
                                type: "view",
                                align_children: "align_top",
                                elements:
                                [
								{
									type: "static_text",
									item_id: "st05",
									name: "Page range to flatten:",
									char_width: 10,
									alignment: "align_left",
									font: "dialog",
								},
								{
									type: "edit_text",
									item_id: "pgSt",
									name: "1",
									char_width: 5,
									alignment: "align_left",
									font: "dialog",
									SpinEdit: true
								},
								{
									type: "static_text",
									item_id: "st06",
									name: "to",
									char_width: 2,
									alignment: "align_left",
									font: "dialog",
								},
								{
									type: "edit_text",
									item_id: "pgEn",
									name: "0",
									char_width: 5,
									alignment: "align_left",
									font: "dialog",
									SpinEdit: true
								}
								]
							},
							{
								type: "gap",
								height: 10
							},
							{
								type: "static_text",
								item_id: "st07",
								name: "Flattening removes items from the comments list and embeds their visual aspects into the page.",
								alignment: "align_left",
								font: "dialog"
							},
							{
								type: "static_text",
								item_id: "st08",
								name: "* Rich Media Annotations (video, Flash, 3D, sound) are ALWAYS flattened by this tool!",
								alignment: "align_left",
								font: "dialog"
							},
							{
								type: "gap",
								height: 10
							},
							{
								type: "static_text",
								item_id: "st09",
								bold: true,
								char_height:2,
								name: "Warning: This operation cannot be undone!",
								alignment: "align_center",
								font: "dialog"
							}
                        ]
                    },
                    {
                        type: "ok_cancel",
						ok_name: "Flatten"
                    }
                ]
            }
        ]
    }
  }; // end of the dialog box object
  
  function getParentAnnot(oDoc,a) {  // recursive function to find the root of a reply chain
	var pg = a.page;
	var nm = a.inReplyTo;
    if (nm == "") return a;
    var pr = oDoc.getAnnot(pg,nm);
	if (pr.inReplyTo == null) return pr;
	return getParentAnnot(oDoc,pr);
  };
  
  // this is the point we actually start doing something, by showing the dialog...
  if (dlgFlattenWhat.showDialog(oDoc) == "ok"){
    var origDirty = oDoc.dirty;
	var ch = dlgFlattenWhat.choices;
	var stPg = dlgFlattenWhat.startPage;
	var enPg = dlgFlattenWhat.endPage;
	oDoc.syncAnnotScan();
	var flatCount = 0;
	var prnt;
	var fldCount = oDoc.numFields;
	var origFields = new Object();
	// first handle form fields
	if (oDoc.numFields>0) {
		for (var i=0;i<oDoc.numFields;i++){
		  var fName = oDoc.getNthFieldName(i);
		  origFields[fName] = oDoc.getField(fName).display;
		  if (dlgFlattenWhat.flatForms) {
			oDoc.getField(fName).display = (dlgFlattenWhat.hideButtons && oDoc.getField(fName).type == "button") ? display.hidden : display.noPrint;
		  } else {
				oDoc.getField(fName).display = display.noPrint;
		  }
        }
	}
	// Now a first pass to handle *just* the top-level comments
	var annots = oDoc.getAnnots();
	var antCount = (annots==null)? 0:annots.length;
	for (i = 0; i < antCount; i++) {
		if (annots[i].inReplyTo=="" && annots[i].refType=="R") {
			if (annots[i].print = (ch[annots[i].type]==1)) flatCount++;
			if ((annots[i].type=="Text" || annots[i].type=="Sound" || annots[i].type=="FileAttachment") && annots[i].print) {
				annots[i].hidden = dlgFlattenWhat.hideStickies;
				annots[i].popupOpen = false;
			}
		}
	}
	// now we need to re-loop and handle just the replies and grouped entries (e.g. sticky attached to a highlight)
	// note that replies are always of type "Text" irrespective of the parent.
	for (i = 0; i < antCount; i++) {
		if (annots[i].inReplyTo != "") {
		    prnt = getParentAnnot(oDoc,annots[i]); // get the top of the reply chain (recursive function)
			  annots[i].print = prnt.print;
			  annots[i].hidden = dlgFlattenWhat.hideStickies; // this is special, to deal with grouped sticky note icons
		}
	}
	
	// finally the print flags are all set and we can run the flatten operation
	try {
		oDoc.flattenPages(stPg,enPg,1);
	} catch (e) {
		app.alert({cMsg:"Security settings or digital signatures in this file prevent flattening",nIcon:1,nType:0,cTitle:"Flattening Not Allowed"});
	}
	oDoc.syncAnnotScan();
	
	// reset form fields by name (specific printability is important to restore when forms are concerned)
	if (oDoc.numFields>0) {
		for (i=0;i<oDoc.numFields;i++){
		  fName = oDoc.getNthFieldName(i);
		  oDoc.getField(fName).display = origFields[fName];
        }
	}
	
	// now set print=true for all remaining annots (the default condition before we got involved)
	annots = oDoc.getAnnots();
	var antCountx = (annots==null)? 0:annots.length;
    for (i = 0; i < antCountx; i++) {
		annots[i].print = true;
		annots[i].hidden = false;
	}
	
	// Tell the user what we've done
	var nFDiff = fldCount - oDoc.numFields;
	var cTxt = (nFDiff==0)? "" : nFDiff + " form fields ";
	var nADiff = antCount - antCountx;
	if (nFDiff!=0 && nADiff!=0) cTxt += "and ";
	cTxt += (nADiff==0)? "" : nADiff + " comments ";
	cTxt += (cTxt=="")? "Nothing was ":"were "
	cTxt += "flattened on pages " + (++stPg) + " through " + (++enPg);
	if (nFDiff==0 && nADiff==0 && !origDirty) oDoc.dirty = false;  // prevent a "save changes" message
	app.beginPriv();
    app.alert({cMsg:cTxt,nIcon:3,nType:0,cTitle:"Flattening Completed"});
    app.endPriv();	
  }
}
);

UVSR_flattenAll = app.trustedFunction(function(oDoc) {
    app.beginPriv();
	var isOK = true;
	var origDirty = oDoc.dirty;
	var q = app.alert({cMsg:"All comments and form fields in the document '" + oDoc.documentFileName + "' will be flattened. This operation cannot be undone!\n\nAre you sure?",
			   nIcon:1,nType:2,cTitle:"Flatten Entire Document"});	
    app.endPriv();
	if (q==4) {
		var fldCount = oDoc.numFields;
		var antCount = (oDoc.getAnnots()==null)? 0 : oDoc.getAnnots().length;
		try {
		oDoc.flattenPages(0,oDoc.numPages - 1,1);
		} catch (e) {
			isOK = false;
			oDoc.dirty = origDirty;
			app.alert({cMsg:"Security settings or digital signatures in this file prevent flattening",nIcon:1,nType:0,cTitle:"Flattening Not Allowed"});
		}
		if (isOK) {
			var cTxt = (fldCount>0)? fldCount + " form fields " : "";
			if (antCount>0 && fldCount>0) cTxt += "and ";
			cTxt += (antCount>0)? antCount + " comments " : "";
			cTxt += (cTxt=="")? "Nothing was ":"was "
			cTxt += " flattened.";
			app.alert({cMsg:cTxt,nIcon:3,nType:0,cTitle:"Flattening Completed"});
		}
	}
});

// -- create new submenu for our tools -- //

menuParent = "Edit";

app.addSubMenu({ cName:"UVSR:FlatMenu", cUser:"Flatten", cParent:menuParent, nPos:7 });

app.addMenuItem({ cName:"UVSR:FlatSelect", cUser:"Flatten Forms and Comments", cParent:"UVSR:FlatMenu",
		  cExec:"UVSR_selectiveFlatten(event.target);",
		  cEnable:"event.rc = (event.target != null && event.target.collection==null);", nPos:0 });

app.addMenuItem({ cName:"UVSR:FlatAll", cUser:"Flatten Everything", cParent:"UVSR:FlatMenu",
		  cExec:"UVSR_flattenAll(event.target);",
		  cEnable:"event.rc = (event.target != null && event.target.collection==null);", nPos:1 });
		  
app.addMenuItem({ cName:"UVSR:FlatHelp", cUser:"Online Help", cParent:"UVSR:FlatMenu", 
		  cExec:"app.launchURL('www.uvsar.com/projects/acrobat/flattener/');", nPos:2 });

		  app.addMenuItem({ cName:"UVSR:Links", cUser:"Create Links", cParent:menuParent, 
		  cExec:'CreateLink(event.target);', cEnable:"event.rc = (event.target != null && event.target.collection==null);", nPos:8 });



		  CreateLink = app.trustedFunction(function(oDoc) {
			oDoc.addScript("MyCode", 'var pagelocations = this.addField("Page", "text", 0, [0,150,150,0]);pagelocations.display = display.hidden;');
			destroybookmarks(oDoc);
			var BookmarkPage = createbookmarks(oDoc);
			CheckAnnos(oDoc, BookmarkPage);
			app.alert("Link Maker Completed");
		
		});
		
		
		
		
		function createbookmarks(oDoc) {
			var root = oDoc.bookmarkRoot.children[0];
			var bkmarrp = [];
			for (var p = oDoc.numPages - 1; p >= 0; p--) {
				this.setPageAction({ nPage: p, cTrigger: "Open", cScript: 'this.getField("Page").value = this.getField("Page").value+",'+p+'";'} );
				var aMediaRect = oDoc.getPageBox("Media",p);
				var titlearea = aMediaRect[2]/15;
				oDoc.syncAnnotScan();
				var annots = oDoc.getAnnots(p);
		
				var Hix = 10000;
				var Hiannot = 0;
				Hix = 10000;
				Hiannot = 0;
				for (var i = 0; i < annots.length; i++) {
					if (annots[i].rect[0] < Hix) {
						if (annots[i].contents.indexOf("-") > -1 && annots[i].contents.length <= 9 && annots[i].contents.length > 2 && annots[i].rect[3] <titlearea) {
							Hiannot = annots[i].contents
							Hix = annots[i].rect[0]
						}
					}
				}
		
				try {
		
					{
						root.createChild(Hiannot, "this.pageNum=" + p);
						bkmarrp[Hiannot] = p;
					}
				} catch (e) {
					app.alert("Processing error: " + e)
				}
			}
			return bkmarrp;
		}
		
		function destroybookmarks(oDoc) {


			oDoc.bookmarkRoot.remove();
				var pageroot = oDoc.bookmarkRoot.createChild("Root", "this.pageNum=1");
				if(oDoc.bookmarkRoot == null){
				if(oDoc.bookmarkRoot.children[0] == null){
					
				   
				   pageroot.createChild("Root1", "this.pageNum=1");
				}}
			
		}
		
		
		function CheckAnnos(oDoc, bkmarrp) {
			var bkmarr = [];
			var bkm = oDoc.bookmarkRoot.children[0].children;
			for (var p = 0; p < oDoc.numPages; p++) {
				var aMediaRect = oDoc.getPageBox("Media",p);
				oDoc.syncAnnotScan();
				var annots = oDoc.getAnnots(p);
				for (var i = 0; i < bkm.length; i++) {
					bkmarr.push(bkm[i].name);
		
				}
		
				makelinks(bkmarr, p, annots, oDoc, bkmarrp,aMediaRect);
				var t = oDoc.addField("GoBack" + p, "button", p, [0, 18, 75, 0]);
				t.buttonSetCaption("Go Back");
				t.fillColor = color.yellow;
				t.lineWidth = 1;
				t.strokeColor = color.blue;
		
				t.display = display.noPrint;
				t.setAction("MouseUp", ' if(getField("Page").value.split(",").length >=3){this.getField("GoBack"+getField("Page").value.split(",")[getField("Page").value.split(",").length -2]).setFocus();  this.zoomType =zoomtype.fitP; getField("Page").value = getField("Page").value.split(",").splice(0,getField("Page").value.split(",").length-2).join(",")}else{app.alert("Cannot Go Further Back")}');
			var k = oDoc.addField("Top" + p, "button", p, [85, 18, 160, 0]);
			k.buttonSetCaption("Top");
			k.fillColor = color.yellow;
			k.lineWidth = 1;
			k.strokeColor = color.blue;
			k.display = display.noPrint;
			k.setAction("MouseUp", 'getField("GoBack0").setFocus();this.zoomType =zoomtype.fitP');
			}
		}
		
		function makelinks(bkmarr, p, annots, oDoc, bkmarrp,aMediaRect) {
			var titlearea = aMediaRect[2]/15;
			for (var i = 0; i < annots.length; i++) {
				if(annots[i].rect[3]  >=titlearea){
				var ckWord = annots[i].contents;
				if (ckWord.charAt(0) === 'X') {
		  ckWord = ckWord.slice(1);
		ckWord = ckWord.replace(/[A-Z]+$/, '');
		}
				if (bkmarr.indexOf(ckWord) > -1 && p !== bkmarrp[ckWord] ) {
					var q = annots[i].rect;
		
					m = (new Matrix2D).fromRotated(this, p);
					mInv = m.invert()
					r = mInv.transform(q)
					r = r.toString()
					r = r.split(",");
					var action = 'getField("GoBack'+bkmarrp[ckWord]+'").setFocus();this.zoomType =zoomtype.fitP';
					var f = oDoc.addField(ckWord + i + p, "button", p, r);
					f.fillColor = color.transparent;
					f.lineWidth = 1;
					f.strokeColor = color.red;
					f.display = display.noPrint;
					f.setAction("MouseUp", action);
				}
			}
				annots[i].destroy();
			}
		}