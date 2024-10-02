# SHX-Acrobat-Batch-Linker
Acrobat Plugin that will batch link Drawings output with only .shx text and where the are annots in place of readable text


The general purpose of this plugin is to allow the same fuctionality as Bluebeams Batch Linker function for drawing sets that exclusivly use a .shx type font. 
Autocad should have its "PDFSHX" varible set to 1 before publishing drawing set.
PDF output from other programs may also work as long as there are annot objects in the locations of the desired links. 

Currently there are restrictions on the Page naming (it must contain the character "-", be fewer than 9 total characters long and more than 2 characters long). 
This will go away with the implimentation of user selected area for page names. It currently searches the bottom right corner of the page (the farthest 1/15th of the page and the lower 1/15th of the page) for page names that match the critiea, problems arise if other text in this area matches. 
A Go-Back button and a Top button are created for convienance. Bookmarks are created that match the found page name. 

Be aware all annots will be deleted after Linker has ran.