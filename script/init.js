
var db = new localStorageDB("localDatabase", localStorage);

const prin = data => {
    console.log(data)
}

function createNewTable(dba, data, del = false) {
    if (db.tableExists(dba) && del == true) {
        db.dropTable(dba)
    }

    if (! db.tableExists(dba)) {
        db.createTableWithData(dba, data)
        db.commit()
    }
}

function clearChildren(parent_id) {
    var parent = document.getElementById(parent_id);
    var childArray = parent.children;
    var cL = childArray.length;
    while(cL > 0) {
        cL--;
        parent.removeChild(childArray[cL]);
    }
}

function createOptionDB(id, colname) {
    data = db.queryAll(colname)

    for (let key in data) {
        let option = document.createElement("option");
      
        option.setAttribute('value', data[key]["name"]);
        //console.log(data[key]["name"])
  
        let optionText = document.createTextNode(data[key]["name"]);
        option.appendChild(optionText);
        //
        var el = document.getElementById(id);
        el.appendChild(option);
    }
}

function addColumnsTable(id, cols) {
    var el = document.getElementById(id)
    var thead = document.createElement("thead");

    // Create table row tr element of a table
    var tr = thead.insertRow(-1);

    for (var i = 0; i < cols.length; i++) {   
        // Create the table header th element

        var th = document.createElement("th");
        var te = cols[i]
        //thead.scope = "col"
        th.innerHTML = te;

      // Append columnName to the table row
        tr.appendChild(th);
    }
     
    // Add the newly created table containing json data
    el.innerHTML = ""
    el.appendChild(thead)
}

createNewTable("appname", [
    {name: "IT-HO-Ops-B2BMyEnterprise"},
	{name: "IT-HO-Ops-99%Usahaku"},
	{name: "IT-HO-Ops-AntreAja"},
	{name: "IT-HO-Ops-CPQ"},
	{name: "IT-HO-Ops-CUGCorporate"},
	{name: "IT-HO-Ops-MyEnterpriseUnified"},
	{name: "IT-HO-Ops-DigiposMobile"},
	{name: "IT-HO-Ops-DSC"},
	{name: "IT-HO-Ops-MEPRO"},
	{name: "IT-HO-Ops-MyEnterpriseAccess"},
	{name: "IT-HO-Ops-TopUpCorporate"},
	{name: "IT-HO-Ops-iKnow"},
	{name: "IT-HO-Ops-VENA"}
], true)

createNewTable("assigned", [
    {name: "Assign Surrounding"},
    {name: "Escalate L2"},
    {name: "Resolved"}
], true)

createNewTable("picname", [
    {name:"Syahrul Darmawan"},
	{name:"M Agus Kholilur Rahman"},
	{name:"Muhamad Fikri Ramadhan"},
	{name:"Teguh Sadewo Pangestu"},
	{name:"Michael Yunior"},
	{name:"Ramadhani Eko Prasetyo"},
	{name:"Ryan Kelana"},
	{name:"Mirgi Hafidz"},
	{name:"Moh.Thoriq Afif"},
	{name:"Dian Muhammad Nurcahya"},
	{name:"Teguh Firmansyah"},
	{name:"Abdullah Aman"},
	{name:"Anggit Wahyu Romadhon"},
	{name:"Fajar Listiyanto"},
    {name:"Tino Israldi"},
	{name:"Fery Bayu Aji"}
], true)

const setThemeMode = theme => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    localStorage.setItem('theme', theme)
}

createOptionDB("in-apps", "appname")
createOptionDB("in-assigned", "assigned")
createOptionDB("in-pic", "picname")

addColumnsTable("table-record", ["", "No", "Start", "End", "Ticket", "Apps", "Case Name", "Action", "Next / Resolution", "Evidence Log", "KEDB", "Assigned", "PIC"])
//addColumnsTable("table-kedb", ["No", "KEDB"])
//addColumnsTable("table-todo", ["Start date", "Subject", "Requestor", "Group", "Description", "Status"])

document.getElementById("lightSwitch").addEventListener("change", function () {
    let th = document.documentElement.getAttribute('data-bs-theme')
    if (th == 'light') {
        theme = 'dark'
    } else {
        theme = 'light'
    }

    setThemeMode(theme)
})