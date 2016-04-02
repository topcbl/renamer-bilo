'use strict'
var fs = require('fs')
var xml2js = require('xml2js')
var parser = new xml2js.Parser();
var subjects = [
		{
		    "folder": "1-Most Popular Nouns/Animal",
		    "xmlfile": "297_English (US)_2.xml"
		},
		{
		    "folder": "1-Most Popular Nouns/Arts",
		    "xmlfile": "297_English (US)_3.xml"
		},
		{
		    "folder": "1-Most Popular Nouns/Fruits",
		    "xmlfile": "297_English (US)_1.xml"
		},
		{
		    "folder": "2-Most Popular Verbs/Agree",
		    "xmlfile": "297_English (US)_100.xml"
		},
		{
		    "folder": "2-Most Popular Verbs/Argue",
		    "xmlfile": "297_English (US)_102.xml"
		},
		{
		    "folder": "2-Most Popular Verbs/Sorry",
		    "xmlfile": "297_English (US)_101.xml"
		},
		{
		    "folder": "3-Most Popular Sentence Structures/I agree with you",
		    "xmlfile": "297_English (US)_200.xml"
		},
		{
		    "folder": "3-Most Popular Sentence Structures/I apologize to her",
		    "xmlfile": "297_English (US)_201.xml"
		},
		{
		    "folder": "3-Most Popular Sentence Structures/I argue with him",
		    "xmlfile": "297_English (US)_202.xml"
		},
		{
		    "folder": "4-Popular Statements by Contexts/Airport",
		    "xmlfile": "297_English (US)_294.xml"
		},
		{
		    "folder": "4-Popular Statements by Contexts/Greeting",
		    "xmlfile": "297_English (US)_293.xml"
		},
		{
		    "folder": "4-Popular Statements by Contexts/Time",
		    "xmlfile": "297_English (US)_295.xml"
		},
		{
		    "folder": "5-Dialogs/Airport",
		    "xmlfile": "297_English (US)_346.xml"
		},
		{
		    "folder": "5-Dialogs/Booking",
		    "xmlfile": "297_English (US)_347.xml"
		},
		{
		    "folder": "5-Dialogs/Greeting",
		    "xmlfile": "297_English (US)_345.xml"
		}
	]

subjects.forEach(function(subject, index) {
    fs.readFile(getXmlPath(subject), function(err, data) {
        parser.parseString(data, function(err, result) {
            result.Page.Card.forEach(function(element, index) {
                renameComponent(subject.folder, element.$.id, element.$.native_word)
            });
        });
    });
});

function renameComponent(folder, id, word) {
    fs.rename(getMp3Path(folder, id), getMp3Path(folder, word), renameCallback);
    fs.rename(getJpgPath(folder, id), getJpgPath(folder, word), renameCallback);
}

function renameCallback(err, files) {
    if (err) {
        return console.error(err);
    } else {
        return console.log("Change file name successfully!")
    }
}


function getMp3Path(folder, name) {
    return "data/" + folder + "/" + name + ".mp3"
}

function getJpgPath(folder, name) {
    return "data/" + folder + "/" + name + ".jpg"
}

function getXmlPath(subject) {
    return "data/" + subject.folder + "/" + subject.xmlfile
}