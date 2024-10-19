
if (! db.tableExists("kedb")) {
    db.createTable("kedb", ["name"])
    db.commit()
}

var table_kedb = new DataTable('#table-kedb', {
    dom: 'Bfrtip',
    buttons: [
        {
            text: 'New',
            className: 'btn-info',
            action: function ( e, dt, node, config ) {
                const modalElement = bootstrap.Modal.getOrCreateInstance('#PopUpAddKedb');
                modalElement.show();
        }},
        {
            text: 'Clear all',
            className: 'btn-danger',
            action: function ( e, dt, node, config ) {
                clickClearKedb()
                alert( 'All data cleared!' );
        }},
        'copy', 'csv'],
    columns: [{ title: 'No', data: 'ID'}, { title: 'KEDB', data: 'name'}],
    data: db.queryAll('kedb'),
})

function loadKedbTable(clear = false) {
    var data = db.queryAll("kedb")

    if (clear == true) {
        table_kedb.clear()
    }

    for (let i in data) {
        table_kedb.row.add([data[i]["ID"], data[i]["name"]])
    }

    table_kedb.draw()
}

function clickAddKedb() {
    let myModalEl = document.getElementById('PopUpAddKedb')
    let modal = bootstrap.Modal.getInstance(myModalEl)
    var kedb = document.getElementById("area-kedb-add").value;
    var data = kedb.split("\n")
  
    for (let i in data) {
      //console.log(i)
      db.insert("kedb", {"name": data[i]})
    }
  
    //dba.insert()
    //console.log(kedb)
    //console.log(data)
    db.commit()
    //console.log(db.queryAll("kedb"))
    modal.hide()
}

function clickClearKedb() {
    db.truncate("kedb")
    db.commit()
    table_kedb.clear().rows.add(db.queryAll('kedb')).draw()
}


// Start load Kedb from database
//loadKedbTable()

// Event listener
document.getElementById("btn-add-click-kedb").addEventListener("click", function () {
    clickAddKedb()
    table_kedb.clear().rows.add(db.queryAll('kedb')).draw()
    //loadKedbTable(true)
});

//document.getElementById("btn-clear-kedb").addEventListener("click", function () {
//    clickClearKedb()
    //table_kedb.clear().rows.add(db.queryAll('kedb')).draw()
    //loadKedbTable(true)
//});