//Jesus++ init.js
//variable-section:
var YES = true; var NO = false; var DEBUG = YES;
var org_id;
var access_token;
var user_login;
var user_secret;
var clientInfoIsComplete = NO;
var current_context = {};
var onReady = NO;
if(DEBUG) host = "http://iikochecklist.iiko.ru:8096";
else host = self.window.location.hostname;
if (DEBUG) user_login = "demoIikoCheckList@demo.net";
if (DEBUG) user_secret ="demo357123";
var popup ='<div class="Contects-edit section" id="context_edit">	<script type="text/javascript">	function save_context(sender)	{		var name = sender.querySelector("#inputEmail3").value;		var isActive = sender.querySelector("#context_edit_active").value;		var urlContextEdit = host + "/api/0/check_list/change_or_create_context/access_token=" +		access_token + "&org_id=" + org_id;	}</script>>	<h1>Редактирование контекста</h1>	<form action="" method="POST" role="form" class="form-horizontal">		<div class="form-group">			<label for="" class="col-sm-2 control-label">Наименование</label>			<div class="col-sm-10">				<input id="inputEmail3" type="" placeholder="Ресторан" class="form-control">			</div>		</div>	</form>	<div class="line-right">		<div class="checkbox">			<label>				<input type="checkbox" id="context_edit_active" value=""><span>Активны</span>			</label>		</div>	</div>	<div class="line-right">		<button type="button" onclick="hideElement(this.parentElement.parentElement.parentElement)" class="btn btn-default">Отменить </button>		<button type="button" onclick="saveContext(this.parentElement.parentElement);" class="btn btn-default">Сохранить </button>	</div></div>';
var contextTable = '<table class="table table-striped table-bordered" id="contextTable"><thead><tr><th>Наименование</th><th>Активен</th><th>Редактировать</th></tr></thead><tbody></tbody></table>';
var tableElement = '<tr><td>$$$</td><td><input type="checkbox" value=""/></td><td> <a href="" class="admin-link">Редактировать</a></td></tr>';
///define-section:
function NSLog(argument){console.log(argument);}
function dqS(argument){return document.querySelector(argument);}
function dqSA(argument){return document.querySelectorAll(argument);}
HTMLElement.prototype.addElementWithId = function (elementName, Id){var el = document.createElement(elementName); if(Id)el.id = Id; this.appendChild(el); return el;}
HTMLElement.prototype.addElement = function (elementName){return this.addElementWithId(elementName);}
HTMLElement.prototype.qSA = function (argument){return this.querySelectorAll(argument);}
HTMLElement.prototype.qS = function (argument){return this.qSA(argument)[0];}
// HTMLElement.prototype.addElementWithId = function (elementName, Id){var el = document.createElement(elementName); el.id = Id; this.appendChild(el);}

function aggregate(jsonText)
{
	if(DEBUG) console.log("json: " + jsonText);
	var json = JSON.parse(jsonText);
	if(json)
	{
		console.log(json);
		access_token = json.accessToken;
		//orgInfo =json.organizationInfo.id;
		org_id = json.organizationInfo.id;
		clientInfoIsComplete = YES;
		if(access_token && DEBUG)
		{
			user_secret = "";
			user_login = "";
		}
	}
	else
	{
		console.log("ERROR!");
	}
}

function httpGetAsync(theUrl, callback)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function()
	{
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", theUrl, YES); // YES for asynchronous
	xmlHttp.send(null);
}

function httpPostRequest(path, data, dataType)
	{
		$.ajax(
		{
			url: path,
			type: "POST",
			data: data,
			dataType: dataType,
			success: function (result)
			{
				switch (result)
				{
					case YES:
						NSLog(result);
						break;
					default:
						NSLog(result);
				}
			},
			error: function (xhr, ajaxOptions, thrownError)
			{
				NSLog(xhr.status);
				NSLog(thrownError);
			}
		});
	}

function getAccessToken(user_login, user_secret)
{
	var url = host + "/api/0/auth/access_token?user_login=" +
	user_login +
	"&user_secret=" +
	user_secret;
	httpGetAsync(url, aggregate);
}

/// context:
function buildContextTable (contexts)
{

}

function parseContext(jsonText)
{
	//TODO: json
	var json = JSON.parse(jsonText);
	if(DEBUG)
		console.log(json);
	if(json.contexts.length)
	{
		//add table:
		var ctxTable = document.createElement("table");
		dqS("#contextCreate").parentElement.parentElement.insertBefore(ctxTable, dqS("#contextCreate").parentElement.nextElementSibling);
		//ctxTable.innerHTML = contextTable;
		ctxTable.outerHTML = contextTable;
		//add items:
		for (var i = 0; i < json.contexts.length; i++)
		{
			// NSLog("context#" + i);
			// NSLog(json.contexts[i]);
			if(json.contexts[i].name)
			{
				var tableItem = tableElement;
				var t = dqS("#contextTable");
				var tbody = t.getElementsByTagName('tbody')[0];
				// NSLog(t.outerHTML);
				var tr = tbody.insertRow();
				tr.outerHTML = tableItem.replace('$$$', json.contexts[i].name);
			}
		}
	}
	// if(json.taskPatterns.length) {
	// 	var tbody =  dqS('.Cheme-task>table>tbody');
	// 	for(var i = 0; i < json.taskPatterns.length; i++){
	// 		var sanitarDay = 'Открытие смены';
	// 		var openTime = 'Закрытие смены';
	// 		var closeTime = 'Санитарный день';
  //     var tr = addElement('tr');
	// 		var td = addElement('td');
	// 	}
	// }
}

function getContext()
{
	if(!access_token)
	{
		getAccessToken(user_login, user_secret);
		setTimeout(function(){getContext(access_token)}, 1000);
	}
	else
	{
		var url = host + "/api/0/check_list/get_nomenclature?access_token=" + access_token + "&org_id=" + org_id;
		httpGetAsync(url, parseContext);
	}
}

function hideElement (argument)
{
	argument.visible = NO;
	argument.hidden = YES;
}

function createContext(sender)
{
	if(dqS("#context_edit"))
	{
		var cc = dqS("#context_edit");
		//if(cc.visible==NO)
		{
			cc.visible = YES;
			cc.hidden = YES;
			cc.hidden = NO;
		}
		return;
	}
	sender.addElement('DIV').innerHTML = popup;
}

function saveContext(sender)
{
	var url =
	host +
	 "/api/0/check_list/change_or_create_context?access_token=" + access_token
	 + "&org_id=" + org_id;
	var dataType = 'JSON';
	var data = {};
	data.org_id = org_id;
	data.access_token = access_token;
	data.context = {name: sender.qS("#inputEmail3").value, deleted: NO};
	httpPostRequest(url, data.context, dataType);
}
/// ENTRY_POINT:
document.onreadystatechange = function()
{
	if(onReady)
		return;
	onReady = YES;
	getContext(access_token);
	//alert("ONLOAD");
}
