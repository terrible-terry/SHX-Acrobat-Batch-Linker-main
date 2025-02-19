//Place IN FOLDER C:\Program Files (x86)\Adobe\Acrobat 2017\Acrobat\Javascripts
UVSR_selectiveFlatten = app.trustedFunction(function (oDoc) {
  app.beginPriv(); // Note we use trusted functions to get rid of the pesky "JavaScript Window" warnings.
  var dlgFlattenWhat = {
    result: "cancel",
    showDialog: app.trustPropagatorFunction(function () {
      app.beginPriv();
      this.doc = oDoc;
      var rtn = app.execDialog(this);
      app.endPriv();
      return rtn;
    }),
    initialize: app.trustPropagatorFunction(function (dialog) {
      this.numPages = this.doc.numPages;
      app.beginPriv();
      dialog.load({
        pgSt: "1",
        cbhs: true,
        cbf2: true,
        pgEn: this.numPages.toString(),
      });
      app.endPriv();
    }),
    commit: app.trustPropagatorFunction(function (dialog) {
      var atypes = [
        "Text",
        "Highlight",
        "Stamp",
        "Caret",
        "StrikeOut",
        "Underline",
        "Sound",
        "FileAttachment",
        "FreeText",
        "Line",
        "Circle",
        "Square",
        "Polygon",
        "PolyLine",
        "Ink",
      ];
      var arrC = [
        "cbx0",
        "cbx1",
        "cbx2",
        "cbx3",
        "cbx4",
        "cbx5",
        "cbx6",
        "cbx7",
        "cbx8",
        "cbx9",
        "cbxa",
        "cbxb",
        "cbxc",
        "cbxd",
        "cbxe",
      ];
      this.choices = new Array();
      var oReturn = dialog.store();
      var numTypes = arrC.length;
      for (var itm = 0; itm < numTypes; itm++) {
        this.choices[atypes[itm]] = oReturn[arrC[itm]];
      }
      this.startPage = oReturn["pgSt"] - 1;
      this.endPage = oReturn["pgEn"] - 1;
      this.hideStickies = oReturn["cbhs"];
      this.flatForms = oReturn["cbf1"];
      this.hideButtons = oReturn["cbf2"];
    }),
    pgSt: function (dialog) {
      var oR = dialog.store();
      var pg = oR["pgSt"];
      var pgE = oR["pgEn"];
      if (pg < 1) pg = "1";
      if (pg > this.numPages) pg = this.numPages.toString();
      if (pg > pgE) pgE = pg;
      if (pg != oR["pgSt"] || pgE != oR["pgEn"])
        dialog.load({ pgSt: pg, pgEn: pgE });
    },
    pgEn: function (dialog) {
      var oR = dialog.store();
      var pg = oR["pgSt"];
      var pgE = oR["pgEn"];
      if (pgE < pg) pgE = pg;
      if (pgE > this.numPages) pgE = this.numPages.toString();
      if (pgE != oR["pgEn"]) dialog.load({ pgEn: pgE });
    },
    description: {
      name: "Selective Comment and Form Flattener",
      elements: [
        {
          type: "view",
          elements: [
            {
              type: "view",
              char_height: 20,
              elements: [
                {
                  type: "static_text",
                  item_id: "st01",
                  name: "Select which types of annotation to flatten. Unchecked items are left intact*.",
                  char_width: 40,
                  alignment: "align_left",
                  font: "dialog",
                },
                {
                  type: "cluster",
                  char_height: 6,

                  elements: [
                    {
                      type: "view",
                      align_children: "align_top",
                      elements: [
                        {
                          type: "static_text",
                          item_id: "st02",
                          bold: true,
                          name: "Annotations:",
                          char_width: 14,
                          char_height: 2,
                          alignment: "align_left",
                          font: "dialog",
                        },
                        {
                          type: "gap",
                          height: 10,
                        },
                        {
                          type: "view",
                          char_width: 8,
                          char_height: 2,
                          elements: [
                            {
                              type: "check_box",
                              item_id: "cbx0",
                              name: "Sticky Notes",
                            },
                            {
                              type: "check_box",
                              item_id: "cbx1",
                              name: "Highlights",
                            },
                            {
                              type: "check_box",
                              item_id: "cbx2",
                              name: "Stamps",
                            },
                          ],
                        },
                        {
                          type: "view",
                          char_width: 8,
                          char_height: 2,
                          elements: [
                            {
                              type: "check_box",
                              item_id: "cbx3",
                              name: "Carets (^)",
                            },
                            {
                              type: "check_box",
                              item_id: "cbx4",
                              name: "Strikeouts",
                            },
                            {
                              type: "check_box",
                              item_id: "cbx5",
                              name: "Underlines",
                            },
                          ],
                        },
                        {
                          type: "view",
                          char_width: 8,
                          char_height: 2,
                          elements: [
                            {
                              type: "check_box",
                              item_id: "cbx6",
                              name: "Sound Comments",
                            },
                            {
                              type: "check_box",
                              item_id: "cbx7",
                              name: "File Comments",
                            },
                          ],
                        },
                        {
                          type: "gap",
                          height: 10,
                        },
                      ],
                    },
                    {
                      type: "check_box",
                      item_id: "cbhs",
                      name: "Remove icons when flattening Sticky Notes, Sounds and File Comments",
                    },
                  ],
                },
                {
                  type: "cluster",
                  char_width: 8,
                  char_height: 8,
                  align_children: "align_top",
                  elements: [
                    {
                      type: "static_text",
                      item_id: "st03",
                      name: "Drawing Markups:",
                      bold: true,
                      char_width: 14,
                      char_height: 2,
                      alignment: "align_left",
                      font: "dialog",
                    },
                    {
                      type: "view",
                      char_width: 8,
                      char_height: 3,
                      elements: [
                        {
                          type: "check_box",
                          item_id: "cbx8",
                          name: "Text Boxes / Callouts",
                        },
                        {
                          type: "check_box",
                          item_id: "cbx9",
                          name: "Single Lines / Arrows",
                        },
                        {
                          type: "check_box",
                          item_id: "cbxa",
                          name: "Ovals",
                        },
                      ],
                    },
                    {
                      type: "view",
                      char_width: 8,
                      char_height: 3,
                      elements: [
                        {
                          type: "check_box",
                          item_id: "cbxb",
                          name: "Rectangles",
                        },
                        {
                          type: "check_box",
                          item_id: "cbxc",
                          name: "Polygons / Clouds",
                        },
                      ],
                    },
                    {
                      type: "view",
                      char_width: 8,
                      char_height: 3,
                      elements: [
                        {
                          type: "check_box",
                          item_id: "cbxd",
                          name: "Poly Lines",
                        },
                        {
                          type: "check_box",
                          item_id: "cbxe",
                          name: "Freeform lines",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "cluster",
                  char_width: 8,
                  char_height: 8,
                  align_children: "align_top",
                  elements: [
                    {
                      type: "static_text",
                      item_id: "st03",
                      name: "Form fields:",
                      bold: true,
                      char_width: 14,
                      char_height: 2,
                      alignment: "align_left",
                      font: "dialog",
                    },
                    {
                      type: "view",
                      char_width: 8,
                      char_height: 3,
                      elements: [
                        {
                          type: "check_box",
                          item_id: "cbf1",
                          name: "Flatten all form fields",
                        },
                        {
                          type: "check_box",
                          item_id: "cbf2",
                          name: "Remove buttons when flattening",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "view",
                  align_children: "align_top",
                  elements: [
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
                      SpinEdit: true,
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
                      SpinEdit: true,
                    },
                  ],
                },
                {
                  type: "gap",
                  height: 10,
                },
                {
                  type: "static_text",
                  item_id: "st07",
                  name: "Flattening removes items from the comments list and embeds their visual aspects into the page.",
                  alignment: "align_left",
                  font: "dialog",
                },
                {
                  type: "static_text",
                  item_id: "st08",
                  name: "* Rich Media Annotations (video, Flash, 3D, sound) are ALWAYS flattened by this tool!",
                  alignment: "align_left",
                  font: "dialog",
                },
                {
                  type: "gap",
                  height: 10,
                },
                {
                  type: "static_text",
                  item_id: "st09",
                  bold: true,
                  char_height: 2,
                  name: "Warning: This operation cannot be undone!",
                  alignment: "align_center",
                  font: "dialog",
                },
              ],
            },
            {
              type: "ok_cancel",
              ok_name: "Flatten",
            },
          ],
        },
      ],
    },
  }; // end of the dialog box object

  function getParentAnnot(oDoc, a) {
    // recursive function to find the root of a reply chain
    var pg = a.page;
    var nm = a.inReplyTo;
    if (nm == "") return a;
    var pr = oDoc.getAnnot(pg, nm);
    if (pr.inReplyTo == null) return pr;
    return getParentAnnot(oDoc, pr);
  }

  // this is the point we actually start doing something, by showing the dialog...
  if (dlgFlattenWhat.showDialog(oDoc) == "ok") {
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
    if (oDoc.numFields > 0) {
      for (var i = 0; i < oDoc.numFields; i++) {
        var fName = oDoc.getNthFieldName(i);
        origFields[fName] = oDoc.getField(fName).display;
        if (dlgFlattenWhat.flatForms) {
          oDoc.getField(fName).display =
            dlgFlattenWhat.hideButtons && oDoc.getField(fName).type == "button"
              ? display.hidden
              : display.noPrint;
        } else {
          oDoc.getField(fName).display = display.noPrint;
        }
      }
    }
    // Now a first pass to handle *just* the top-level comments
    var annots = oDoc.getAnnots();
    var antCount = annots == null ? 0 : annots.length;
    for (i = 0; i < antCount; i++) {
      if (annots[i].inReplyTo == "" && annots[i].refType == "R") {
        if ((annots[i].print = ch[annots[i].type] == 1)) flatCount++;
        if (
          (annots[i].type == "Text" ||
            annots[i].type == "Sound" ||
            annots[i].type == "FileAttachment") &&
          annots[i].print
        ) {
          annots[i].hidden = dlgFlattenWhat.hideStickies;
          annots[i].popupOpen = false;
        }
      }
    }
    // now we need to re-loop and handle just the replies and grouped entries (e.g. sticky attached to a highlight)
    // note that replies are always of type "Text" irrespective of the parent.
    for (i = 0; i < antCount; i++) {
      if (annots[i].inReplyTo != "") {
        prnt = getParentAnnot(oDoc, annots[i]); // get the top of the reply chain (recursive function)
        annots[i].print = prnt.print;
        annots[i].hidden = dlgFlattenWhat.hideStickies; // this is special, to deal with grouped sticky note icons
      }
    }

    // finally the print flags are all set and we can run the flatten operation
    try {
      oDoc.flattenPages(stPg, enPg, 1);
    } catch (e) {
      app.alert({
        cMsg: "Security settings or digital signatures in this file prevent flattening",
        nIcon: 1,
        nType: 0,
        cTitle: "Flattening Not Allowed",
      });
    }
    oDoc.syncAnnotScan();

    // reset form fields by name (specific printability is important to restore when forms are concerned)
    if (oDoc.numFields > 0) {
      for (i = 0; i < oDoc.numFields; i++) {
        fName = oDoc.getNthFieldName(i);
        oDoc.getField(fName).display = origFields[fName];
      }
    }

    // now set print=true for all remaining annots (the default condition before we got involved)
    annots = oDoc.getAnnots();
    var antCountx = annots == null ? 0 : annots.length;
    for (i = 0; i < antCountx; i++) {
      annots[i].print = true;
      annots[i].hidden = false;
    }

    // Tell the user what we've done
    var nFDiff = fldCount - oDoc.numFields;
    var cTxt = nFDiff == 0 ? "" : nFDiff + " form fields ";
    var nADiff = antCount - antCountx;
    if (nFDiff != 0 && nADiff != 0) cTxt += "and ";
    cTxt += nADiff == 0 ? "" : nADiff + " comments ";
    cTxt += cTxt == "" ? "Nothing was " : "were ";
    cTxt += "flattened on pages " + ++stPg + " through " + ++enPg;
    if (nFDiff == 0 && nADiff == 0 && !origDirty) oDoc.dirty = false; // prevent a "save changes" message
    app.beginPriv();
    app.alert({
      cMsg: cTxt,
      nIcon: 3,
      nType: 0,
      cTitle: "Flattening Completed",
    });
    app.endPriv();
  }
});

UVSR_flattenAll = app.trustedFunction(function (oDoc) {
  app.beginPriv();
  var isOK = true;
  var origDirty = oDoc.dirty;
  var q = app.alert({
    cMsg:
      "All comments and form fields in the document '" +
      oDoc.documentFileName +
      "' will be flattened. This operation cannot be undone!\n\nAre you sure?",
    nIcon: 1,
    nType: 2,
    cTitle: "Flatten Entire Document",
  });
  app.endPriv();
  if (q == 4) {
    var fldCount = oDoc.numFields;
    var antCount = oDoc.getAnnots() == null ? 0 : oDoc.getAnnots().length;
    try {
      oDoc.flattenPages(0, oDoc.numPages - 1, 1);
    } catch (e) {
      isOK = false;
      oDoc.dirty = origDirty;
      app.alert({
        cMsg: "Security settings or digital signatures in this file prevent flattening",
        nIcon: 1,
        nType: 0,
        cTitle: "Flattening Not Allowed",
      });
    }
    if (isOK) {
      var cTxt = fldCount > 0 ? fldCount + " form fields " : "";
      if (antCount > 0 && fldCount > 0) cTxt += "and ";
      cTxt += antCount > 0 ? antCount + " comments " : "";
      cTxt += cTxt == "" ? "Nothing was " : "was ";
      cTxt += " flattened.";
      app.alert({
        cMsg: cTxt,
        nIcon: 3,
        nType: 0,
        cTitle: "Flattening Completed",
      });
    }
  }
});

// -- create new submenu for our tools -- //

menuParent = "Edit";

app.addSubMenu({
  cName: "UVSR:FlatMenu",
  cUser: "Flatten",
  cParent: menuParent,
  nPos: 7,
});

app.addMenuItem({
  cName: "UVSR:FlatSelect",
  cUser: "Flatten Forms and Comments",
  cParent: "UVSR:FlatMenu",
  cExec: "UVSR_selectiveFlatten(event.target);",
  cEnable:
    "event.rc = (event.target != null && event.target.collection==null);",
  nPos: 0,
});

app.addMenuItem({
  cName: "UVSR:FlatAll",
  cUser: "Flatten Everything",
  cParent: "UVSR:FlatMenu",
  cExec: "UVSR_flattenAll(event.target);",
  cEnable:
    "event.rc = (event.target != null && event.target.collection==null);",
  nPos: 1,
});

app.addMenuItem({
  cName: "UVSR:FlatHelp",
  cUser: "Online Help",
  cParent: "UVSR:FlatMenu",
  cExec: "app.launchURL('www.uvsar.com/projects/acrobat/flattener/');",
  nPos: 2,
});

app.addMenuItem({
  cName: "UVSR:Links",
  cUser: "Create Links",
  cParent: menuParent,
  cExec: "CreateLink(event.target);",
  cEnable:
    "event.rc = (event.target != null && event.target.collection==null);",
  nPos: 8,
});

CreateLink = app.trustedFunction(function (oDoc) {
  oDoc.addScript(
    "MyCode",
    'var pagelocations = this.addField("Page", "text", 0, [0,150,150,0]);pagelocations.display = display.hidden;'
  );
  getRectangleCoordinates(oDoc);
});
var isCancelled = false;
var Gbkmarr = [];
var Gbkmarrp = [];
var Gbkm;
var GParentoDoc;
var GtotalPages;
var Gprogress;
var PageTitleAnnots = [];

var userOptions = {};
function showOptionsDialog() {
  var listpop3 = {
    "Keep Annots": -1,
    "Delete All Annots": -1,
  };
  
  var listpop4 = {
    "blue": -1,
    "red": -1,
    "green": -1,
  };
  
  var optionsDialog = {
    result: "cancel",
    strpop1: "",
    strpop2: "",
  
    DoDialog: function () {
      return app.execDialog(this);
    },
  
    initialize: function (dialog) {
      var dlgInit = {
        pop1: listpop3,
        pop2: listpop4,
      };
      dialog.load(dlgInit);
    },
  
    commit: function (dialog) {
      var oRslt = dialog.store();

 
      for (var key in oRslt.pop2) {
        if (oRslt.pop2[key] === 1) {
          this.strpop2 = key;
          break;
        }
      }
      for (var key in oRslt.pop1) {
        if (oRslt.pop1[key] === 1) {
          this.strpop1 = key;
          break;
        }
      }

      // Setting the result to indicate dialog was submitted
      this.result = "ok";
      
    },
  
    description: {
      name: "Link Options",
      elements: [
        {
          type: "view",
          elements: [
            {
              type: "cluster",
              item_id: "cls1",
              char_width: 8,
              char_height: 8,
              font: "dialog",
              bold: true,
              elements: [
                {
                  type: "static_text",
                  name: "Keep Annots After Linking",
                  alignment: "align_left",
                  width: 200 // Adjust width to provide enough space
                },
                {
                  type: "popup",
                  item_id: "pop1",
                  width: 118,
                  height: 23,
                  char_width: 8,
                  items: Object.keys(listpop3),
                },
                {
                  type: "static_text",
                  name: "Select Color Of Links",
                  alignment: "align_left",
                  width: 200 // Adjust width to provide enough space
                },
                {
                  type: "popup",
                  item_id: "pop2",
                  width: 117,
                  height: 23,
                  char_width: 8,
                  items: Object.keys(listpop4),
                },
                {
                  type: "view",
                  width: 72,
                  height: 27,
                  char_width: 8,
                  char_height: 8,
                  alignment: "align_center",
                  elements: [
                    {
                      type: "ok_cancel",
                      font: "dialog",
                      bold: true,
                      ok_name: "OK",
                      cancel_name: "CANCEL",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  };

  // Display the dialog
  var dialogResult = optionsDialog.DoDialog();


  return [dialogResult === "ok",optionsDialog]; // Return true if the user pressed OK
}


function getRectangleCoordinates(doc) {
  var initialCoordinates = [100, 100, 200, 200]; // Initial position
  var coordinates = [];

  function pollForChanges(doc) {

      destroybookmarks(doc);
      var coordinates = searchAnnotationsAndSaveRect();
      if(Object.keys(coordinates).length ===0){
        UniquePages();
        return;
      }else{
      var BookmarkPage = createbookmarks(doc, coordinates);
  
      if(BookmarkPage != "NOANNOTS"){
      var root = doc.bookmarkRoot.children[0];
      var bookmarkNames = "";
      ////////////////
      var numColumns = 5; // Number of columns in the grid
      var totalBookmarks = root.children.length;
      var columnBookmarks = [];
      var columnWidth = Math.ceil(totalBookmarks / numColumns); // Calculate how many bookmarks to place in each column

      // Create columns
      for (var col = 0; col < numColumns; col++) {
        columnBookmarks[col] = ""; // Initialize each column
        for (
          var i = col * columnWidth;
          i < (col + 1) * columnWidth && i < totalBookmarks;
          i++
        ) {
          columnBookmarks[col] += root.children[i].name + "\n"; // Add bookmark names to each column
        }
      }

      // Combine columns into a grid format
      for (var row = 0; row < columnWidth; row++) {
        for (var col = 0; col < numColumns; col++) {
          var bookmarkInThisColumn = columnBookmarks[col].split("\n")[row];
          if (bookmarkInThisColumn) {
            bookmarkNames += bookmarkInThisColumn + "\t"; // Add tabs for spacing
          }
        }
        bookmarkNames += "\n"; // New row after each set of bookmarks
      }

      // If the rectangle has been adjusted, confirm with the user
      var confirmMsg =
        "You have selected the following area:\n" +
        "Bookmarks Created:\n\n" +
        bookmarkNames +
        "Do you want to proceed?";
      var userResponse = app.alert(confirmMsg, 2, 2); // Yes and No buttons
      if (userResponse == 4) {
        // User clicked Yes

        var dialogConfirmed = showOptionsDialog();
       
        if (dialogConfirmed[0]) {
          
          for (var i = this.numFields - 1; i >= 0; i--) {
            
            var fieldName = this.getNthFieldName(i);
            var field = this.getField(fieldName);
            if (field && field.type === "button") {
                this.removeField(fieldName);
            }
        }
            CheckAnnos(doc,dialogConfirmed[1]);
  
        }else{   return null;}
      } else {
        app.alert("Rectangle selection canceled. Please try again.", 1);
        return null;
      }}
    }
  }
  // Start polling for changes
  pollForChanges(doc);
}
function createbookmarks(oDoc, regions) {
  var root = oDoc.bookmarkRoot.children[0];
  Gbkmarrp = [];

  for (var p = oDoc.numPages - 1; p >= 0; p--) {

    var pageSize = this.getPageBox("Crop", p); // Get the Crop box size
    var pageWidth = pageSize[2] - pageSize[0]; // Calculate width
    var pageHeight = pageSize[1] - pageSize[3]; // Calculate height
    var dimensions = pageWidth + ',' + pageHeight; 

   var region = regions[dimensions][0].rect;

    this.setPageAction({
      nPage: p,
      cTrigger: "Open",
      cScript:
        'this.getField("Page").value = this.getField("Page").value+",' +
        p +
        '";',
    });

    // Adjust for page rotation and define the SearchBox region.
    var rotation = oDoc.getPageRotation(p);
    var q = region;
    var SearchBox;
    var Hiannot;
    var m = new Matrix2D().fromRotated(this, p);

    if (rotation != 0) {
      SearchBox = q; // Use the region as is for rotated pages
    } else {
      var mInv = m.invert();
      SearchBox = mInv.transform(q); // Transform the region according to page rotation
    }

    oDoc.syncAnnotScan(); 

    var annots = oDoc.getAnnots(p);
    if(!annots){app.alert("There are no Annots in the document"); return "NOANNOTS";}
    for (var i = 0; i < annots.length; i++) {
      if (isCancelled) {
        app.alert("Process cancelled.");
        return false;
      }
      var annotRect = annots[i].rect;
  
      // Apply transformation to annotation coordinates
      mInv = m.invert();
      var transformedAnnotBox = mInv.transform(annotRect).toString().split(",");

      // Apply transformation to the SearchBox again (if not done already)
      var transformedSearchBox = mInv
        .transform(SearchBox)
        .toString()
        .split(",");
      var margin = 0; // You can adjust the margin value as needed

      // Expand the SearchBox by adding a margin to each side
      transformedSearchBox[0] = parseFloat(transformedSearchBox[0]) + margin; // Left
      transformedSearchBox[1] = parseFloat(transformedSearchBox[1]) - margin; // Top
      transformedSearchBox[2] = parseFloat(transformedSearchBox[2]) - margin; // Right
      transformedSearchBox[3] = parseFloat(transformedSearchBox[3]) + margin; // Bottom
      // Log the values for debugging
    
      var XlowerBound = Math.min(
        transformedSearchBox[0],
        transformedSearchBox[2]
      );
      var XupperBound = Math.max(
        transformedSearchBox[0],
        transformedSearchBox[2]
      );
      var YlowerBound = Math.min(
        transformedSearchBox[1],
        transformedSearchBox[3]
      );
      var YupperBound = Math.max(
        transformedSearchBox[1],
        transformedSearchBox[3]
      );

      var true1 =
        transformedAnnotBox[0] >= XlowerBound &&
        transformedAnnotBox[0] <= XupperBound;
      var true2 =
        transformedAnnotBox[1] >= YlowerBound &&
        transformedAnnotBox[1] <= YupperBound;
      var true3 =
        transformedAnnotBox[2] >= XlowerBound &&
        transformedAnnotBox[2] <= XupperBound;
      var true4 =
        transformedAnnotBox[3] >= YlowerBound &&
        transformedAnnotBox[3] <= YupperBound;

      // Perform the comparison between transformed boxes
      if (true1 && true2 && true3 && true4) {
    
          Hiannot = annots[i].contents;
        
      }
    }

    try {
      if (Hiannot) {
       
        root.createChild(Hiannot, "this.pageNum=" + p);
        Gbkmarrp[Hiannot] = p;
      }
    } catch (e) {
   
      app.alert("Processing error: " + e);
      return false;
    }
  }
 
  return Gbkmarrp;
}

function destroybookmarks(oDoc) {
  oDoc.bookmarkRoot.remove();
  var pageroot = oDoc.bookmarkRoot.createChild("Root", "this.pageNum=1");
  if (oDoc.bookmarkRoot == null) {
    if (oDoc.bookmarkRoot.children[0] == null) {
      pageroot.createChild("Root1", "this.pageNum=1");
    }
  }
}

function CheckAnnos(oDoc,options) {
  Gbkmarr = [];
  Gbkm = oDoc.bookmarkRoot.children[0].children;
  GtotalPages = oDoc.numPages;
  Gprogress = { currentPage: 0, totalPages: GtotalPages };
  GParentoDoc = oDoc;

  for (var i = 0; i < Gbkm.length; i++) {
    Gbkmarr.push(Gbkm[i].name);
  }
  processPage(options); // Start processing from page 0
}
function processPage(options) {
  try {
    var pageNumber = Gprogress.currentPage;

    if (pageNumber >= GtotalPages) {
      
      for (var i = 0; i < PageTitleAnnots.length; i++) {
        var annot = PageTitleAnnots[i].destroy(); // Access the annotation
      }

      app.alert("Link Maker Completed");
      return;
    }

    GParentoDoc.syncAnnotScan();
    var annots = GParentoDoc.getAnnots(pageNumber);
    makelinks(Gbkmarr, pageNumber, annots, GParentoDoc, Gbkmarrp,options);
  } catch (e) {
    console.println(
      "An error occurred on page " + pageNumber + ": " + e.message
    );
    app.alert("An error occurred on page " + pageNumber + ": " + e.message);
  }
}
function searchAnnotationsAndSaveRect() {
  var annotationsData = {};
  var pageCount = this.numPages; // Get the total number of pages

  // Iterate through each page
  for (var pageIndex = 0; pageIndex < pageCount; pageIndex++) {
      var annotCount = this.getAnnots(pageIndex); // Get annotations on the current page

      // Check if there are annotations on this page
      if (annotCount) {
          // Get the size of the current page
          var pageSize = this.getPageBox("Crop", pageIndex); // Get the Crop box size
          var pageWidth = pageSize[2] - pageSize[0]; // Calculate width
          var pageHeight = pageSize[1] - pageSize[3]; // Calculate height
          var dimensions = pageWidth + ',' + pageHeight; // Create dimension key for the page

          for (var i = 0; i < annotCount.length; i++) {
              var annot = annotCount[i]; // Access the annotation

              // Check if the annotation is authored by "PageTitle"
              if (annot.author == "PageTitle") {
                  var pageNumber = annot.page; // Get the page number
                  var rect = annot.rect; // Get the rectangle coordinates
                  PageTitleAnnots.push(annot);
                  // Store the rect in an associative array, using page dimensions
                  if (!annotationsData[dimensions]) {
                      annotationsData[dimensions] = [];
                  }
                  annotationsData[dimensions].push({
                      page: pageNumber,
                      rect: rect
                  });
              } 
          }
      }
  }

  // Log the associative array to see the saved data
  return annotationsData; // Return the associative array for further use
}
function UniquePages() {
  // Create an array to hold unique page sizes
  var uniquePageSizes = [];
  var pageCount = this.numPages;

  // Iterate through each page to find unique sizes
  for (var i = 0; i < pageCount; i++) {
      var pageSize = this.getPageBox("Crop", i); // Get the Crop box size
      var width = pageSize[2] - pageSize[0]; // Calculate width
      var height = pageSize[1] - pageSize[3]; // Calculate height

      // Validate that width and height are valid numbers
      if (width > 0 && height > 0) {
          var pageDimensions = width + ',' + height; // Width, Height as a string

          // Check if this size is already in the uniquePageSizes array
          if (uniquePageSizes.indexOf(pageDimensions) === -1) {
              uniquePageSizes.push(pageDimensions); // Add to unique sizes
          }
      }
  }

  // If we found unique sizes, create an annotation on each unique page
  if (uniquePageSizes.length > 0) {
      for (var k = 0; k < uniquePageSizes.length; k++) {
          // Find the first page that matches the current unique size
          var matchingPage = -1;
          for (var j = 0; j < pageCount; j++) {
              var currentSize = this.getPageBox("Crop", j);
              var currentWidth = currentSize[2] - currentSize[0];
              var currentHeight = currentSize[1] - currentSize[3];
              var currentDimensions = currentWidth + ',' + currentHeight;

              // Check if current page size matches the current unique size
              if (currentDimensions === uniquePageSizes[k]) {
                  matchingPage = j; // Save the page number
                  break;
              }
          }

          // Define the annotation properties for each unique size
          var annotRect = [100, 200, 400, 300]; // Define the rectangle for the annotation [left, bottom, right, top]

          // Create the annotation for the matched page
          if (matchingPage !== -1) {
              this.addAnnot({
                  type: "Square",
                  page: matchingPage,
                  author: "PageTitle",
                  strokeColor: color.red,
                  fillColor: color.transparent,
                  hidden: false,
                  rect: annotRect
              });

              // Alert the user with the page number where the annotation was created
              app.alert("Annotation created on page " + (matchingPage + 1) + " with unique size: " + uniquePageSizes[k]);
          }
      }
  } else {
      app.alert("No unique page sizes found in the document.");
  }
}
  
function makelinks(bkmarr, p, annots, oDoc, bkmarrp, options) {
  try {
    for (var i = 0; i < annots.length; i++) {
      var ckWord = annots[i].contents;
      if (ckWord.charAt(0) === "X") {
        ckWord = ckWord.slice(1);
        ckWord = ckWord.replace(/[A-Z]+$/, "");
      }
      if (bkmarr.indexOf(ckWord) > -1 && p !== bkmarrp[ckWord]) {
        var q = annots[i].rect;
        var m = new Matrix2D().fromRotated(this, p);
        var mInv = m.invert();
        var r = mInv.transform(q).toString().split(",");
        var action =
          'getField("GoBack' +
          bkmarrp[ckWord] +
          '").setFocus();this.zoomType = zoomtype.fitP';
        var f = oDoc.addField(ckWord + i + p, "button", p, r);
    
        f.fillColor = color.transparent;
        f.lineWidth = 1;
        f.strokeColor = color[options.strpop2];
        f.display = display.noPrint;
        f.setAction("MouseUp", action);
      }
      if(options.strpop1 == "Delete All Annots"){
        annots[i].destroy();
      }
    }

    var t = oDoc.addField("GoBack" + p, "button", p, [0, 18, 75, 0]);
    t.buttonSetCaption("Go Back");
    t.fillColor = color.yellow;
    t.lineWidth = 1;
    t.strokeColor = color.blue;
    t.display = display.noPrint;
    t.setAction(
      "MouseUp",
      'if(getField("Page").value.split(",").length >=3){this.getField("GoBack"+getField("Page").value.split(",")[getField("Page").value.split(",").length -2]).setFocus(); this.zoomType = zoomtype.fitP; getField("Page").value = getField("Page").value.split(",").splice(0,getField("Page").value.split(",").length-2).join(",")} else {app.alert("Cannot Go Further Back")}'
    );

    var k = oDoc.addField("Top" + p, "button", p, [85, 18, 160, 0]);
    k.buttonSetCaption("Top");
    k.fillColor = color.yellow;
    k.lineWidth = 1;
    k.strokeColor = color.blue;
    k.display = display.noPrint;
    k.setAction(
      "MouseUp",
      'getField("GoBack0").setFocus(); this.zoomType = zoomtype.fitP'
    );

    Gprogress.currentPage++;


    processPage(options);
  } catch (e) {
    console.println("An error occurred on page " + p + ": " + e.message);
  }
}
