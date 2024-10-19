let columns_record = ["start_time", "end_time", "ticket", "application", "case_name", "action", "next_resolution", "evidence_log", "kedb", "assigned", "pic"];

if (!db.tableExists("records")) {
    db.createTable("records", columns_record);
    db.commit();
}

function formatExtendRow(d) {
    return (
        '<dl>' +
            '<dt>Next Action / Resolution:</dt>' +
                '<dd class="td-wrap">' + d.next_resolution + '</dd>' +
            '<dt>Evidence Log:</dt>' +
                '<dd class="td-wrap">' + d.evidence_log + '</dd>' +
        '</dl>'
    );
}

// Check user role from sessionStorage
var userRole = sessionStorage.getItem("userRole");

var table_record = new DataTable('#table-record', {
    dom: 'Bfrtip',
    select: true,
    buttons: [
        'copy', 'csv', {
            text: 'Clear all',
            className: 'btn-danger',
            action: function (e, dt, node, config) {
                clickClearRecord();
                alert('All data cleared!');
            }
        }
    ],
    columns: [
        {
            className: 'dt-control',
            orderable: false,
            data: null,
            defaultContent: ''
        },
        { data: 'ID' }, 
        { data: 'start_time' }, 
        { data: 'end_time' }, 
        { data: 'ticket' }, 
        { data: 'application' }, 
        { data: 'case_name' },
        { data: 'action' },
        { data: 'next_resolution' },
        { data: 'evidence_log' },
        { data: 'kedb' }, 
        { data: 'assigned' }, 
        { data: 'pic' }
    ],
    data: db.queryAll('records'),
    columnDefs: [
        { target: [8, 9], visible: false },
        {
            render: function (data, type, full, meta) {
                let len = 25;
                let instaText = (data != null && data.length > len) ? data.substr(0, len) + '...' : data == null ? "" : data;
                return '<div title=' + '"' + data + '"' + '>' + instaText + '</div>';
            },
            targets: [6, 10]
        },
        {
            render: function (data, type, full, meta) {
                let instaText = data.replace("IT-HO-Ops-", "");
                return '<div title=' + '"' + data + '"' + '>' + instaText + '</div>';
            },
            targets: [5]
        }
    ],
    responsive: true,
    order: [1, 'desc'],
});

// Function to hide the "Clear All" button for Normal users
function checkUserRole() {
    if (userRole === "Normal") {
        var clearAllButton = document.querySelector("btn-danger"); // Assuming this is the class used for the button
        if (clearAllButton) {
            clearAllButton.style.display = "none"; // Hide the button
        }
    }
}

// Call the function to check the user role
checkUserRole();

function loadRecordTable(clear = false) {
    var data = db.queryAll("records");

    if (clear == true) {
        table_record.clear();
    }

    for (let i in data) {
        table_record.row.add([
            data[i]["ID"], 
            data[i]["start_time"], 
            data[i]["end_time"], 
            data[i]["ticket"], 
            data[i]["application"], 
            data[i]["case_name"],
            data[i]["action"],
            data[i]["next_resolution"],
            data[i]["kedb"], 
            data[i]["assigned"], 
            data[i]["pic"]
        ]);
    }

    table_record.draw();
}

function addRecordData(start, end, ticket, apps, cases, action, next, evidence, kedb, assign, pic) {
    db.insert("records", {
        "start_time": start, 
        "end_time": end, 
        "ticket": ticket, 
        "application": apps,
        "case_name": cases,
        "action": action,
        "next_resolution": next,
        "evidence_log": evidence,
        "kedb": kedb,
        "assigned": assign,
        "pic": pic
    });
    
    db.commit();

    table_record.clear().rows.add(db.queryAll('records')).draw();
}

function clickClearRecord() {
    db.truncate("records");
    db.commit();
    table_record.clear().rows.add(db.queryAll('records')).draw();
}

// Event Listener
//document.querySelector('tbody').setAttribute('class', 'table-group-divider');

// Add event listener for opening and closing details
table_record.on('click', 'td.dt-control', function (e) {
    let tr = e.target.closest('tr');
    let row = table_record.row(tr);
 
    if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
    }
    else {
        // Open this row
        row.child(formatExtendRow(row.data())).show();
    }
});

//loadRecordTable();