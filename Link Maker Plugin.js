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
var Gbkm ;
var GParentoDoc;
var GtotalPages;
var Gprogress ;
var progressDialog ={

  initialize: function (dialog) {
      // Create a static text containing the current date.
      var todayDate = dialog.store()["date"];
      todayDate = "Date: " + util.printd("mmmm dd, yyyy", new Date());
      dialog.load({ "date": todayDate });
  },
  commit:function (dialog) { // called when OK pressed
      var results = dialog.store();
      // Now do something with the data collected, for example,
      console.println("Your name is " + results["fnam"]
          + " " + results["lnam"] );
  },
  description:
  {
      name: "Personal Data",    // Dialog box title
      align_children: "align_left",
      width: 350,
      height: 200,
      elements:
      [
          {
              type: "cluster",
              name: "Your Name",
              align_children: "align_left",
              elements:
              [
                  {
                      type: "view",
                      align_children: "align_row",
                      elements:
                      [
                          {
                              type: "static_text",
                              name: "First Name: "
                          },
                          {
                              item_id: "fnam",
                              type: "edit_text",
                              alignment: "align_fill",
                              width: 300,
                              height: 20
                          }
                      ]
                  },
                  {
                      type: "view",
                      align_children: "align_row",
                      elements:
                      [
                          {
                              type: "static_text",
                              name: "Last Name: "
                          },
                          {
                              item_id: "lnam",
                              type: "edit_text",
                              alignment: "align_fill",
                              width: 300,
                              height: 20
                          }
                      ]
                  },
                  {
                      type: "static_text",
                      name: "Date: ",
                      char_width: 25,
                      item_id: "date"
                  },
              ]
          },
          {
              alignment: "align_right",
              type: "ok_cancel",
              ok_name: "Ok",
              cancel_name: "Cancel"
          }
      ]
  }
};

function getRectangleCoordinates(doc) {
  var initialCoordinates = [100, 100, 200, 200]; // Initial position
  var coordinates = [];

  function pollForChanges(doc) {
    if (typeof doc.selectedAnnots != "undefined") {
      var rectAnnot = doc.selectedAnnots[0];

      if (doc.selectedAnnots.length > 0) {
        coordinates = rectAnnot.rect;
      } else {
        return false;
      }

      //return coordinates;
      destroybookmarks(doc);
      var BookmarkPage = createbookmarks(doc, coordinates, rectAnnot);
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
    for (var i = col * columnWidth; i < (col + 1) * columnWidth && i < totalBookmarks; i++) {
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
        rectAnnot.destroy();
   
          CheckAnnos(doc);
 
       
        
      } else {
        app.alert("Rectangle selection canceled. Please try again.", 1);
        return null;
      }
    } else {
      var rectAnnot = doc.selectedAnnots;

      rectAnnot = this.addAnnot({
        type: "Square",
        rect: initialCoordinates,
        page: this.pageNum,
        strokeColor: color.red,
        fillColor: color.transparent,
        author: "User",
      });

      rectAnnot.setProps({
        readOnly: false,
        hidden: false,
      });
      app.alert(
        "No annotations selected! Place Rectangle over page name area, Rectanlge must be selected prior to running Create Links again"
      );
      return false;
    }
  }
  // Start polling for changes
  pollForChanges(doc);
}
function createbookmarks(oDoc, region, rectAnnot) {
  var root = oDoc.bookmarkRoot.children[0];
  Gbkmarrp = [];

  for (var p = oDoc.numPages - 1; p >= 0; p--) {
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
    for (var i = 0; i < annots.length; i++) {
      if (isCancelled) {
        app.alert("Process cancelled.");
        break;
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
        if (rectAnnot != annots[i]) {
          Hiannot = annots[i].contents;
        }
      }
    }

    try {
      if (Hiannot) {
        root.createChild(Hiannot, "this.pageNum=" + p);
        Gbkmarrp[Hiannot] = p;
      }
    } catch (e) {
      app.alert("Processing error: " + e);
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


function CheckAnnos(oDoc) {
  Gbkmarr = [];
  Gbkm = oDoc.bookmarkRoot.children[0].children;
  GtotalPages = oDoc.numPages;
  Gprogress = { currentPage: 0, totalPages: GtotalPages };
  GParentoDoc = oDoc;
  // Use a string to call processPage to ensure it's accessible
  ///app.setTimeOut("processPage();", 50);
  for (var i = 0; i < Gbkm.length; i++) {
    Gbkmarr.push(Gbkm[i].name);
}
  processPage(); // Start processing from page 0
}
function processPage() {
  try {
  var pageNumber =Gprogress.currentPage;

  
    if (pageNumber >= GtotalPages) {
        ///dialog.destroy();
        app.alert("Link Maker Completed");
        return;
    }

    var aMediaRect = GParentoDoc.getPageBox("Media", pageNumber);
    GParentoDoc.syncAnnotScan();
    var annots = GParentoDoc.getAnnots(pageNumber);
    makelinks(Gbkmarr, pageNumber, annots, GParentoDoc, Gbkmarrp, aMediaRect);


  }catch (e) {
    console.println("An error occurred on page " + pageNumber + ": " + e.message);
      app.alert("An error occurred on page " + pageNumber + ": " + e.message);
  }
}

function makelinks(bkmarr, p, annots, oDoc, bkmarrp, aMediaRect) {
  try{
    console.println(p+" of "+Gprogress.totalPages);
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
          var action = 'getField("GoBack' + bkmarrp[ckWord] + '").setFocus();this.zoomType = zoomtype.fitP';
          var f = oDoc.addField(ckWord + i + p, "button", p, r);
          f.fillColor = color.transparent;
          f.lineWidth = 1;
          f.strokeColor = color.red;
          f.display = display.noPrint;
          f.setAction("MouseUp", action);
      }
      annots[i].destroy();
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
  k.setAction("MouseUp", 'getField("GoBack0").setFocus(); this.zoomType = zoomtype.fitP');

  Gprogress.currentPage++;


  // Schedule the next page processing
  //app.setTimeOut("processPage()", 5);

  processPage();

}catch (e) {
  console.println("An error occurred on page " + p + ": " + e.message);
}
}