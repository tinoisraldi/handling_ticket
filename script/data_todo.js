//
// Author : Maulana Mahmud <maulanamhd182@gmail.com>
// Date : 15 Desember 2023
//

// Object that will contain the local state
let todo = {};
// Create or update the todo localStorage entry
if (localStorage.getItem('todo')) {
    todo = JSON.parse(localStorage.getItem('todo'));
}

// Set up the editor
const editor = new DataTable.Editor({
    table: '#table-todo',
    fields: [
        {
            label: 'Start date:',
            name: 'start',
            type: 'datetime'
        },
        {
            label: 'Subject:',
            name: 'subject'
        },
        {
            label: 'Group:',
            name: 'group',
            type: 'radio',
            def: 'WAG',
            options: ['WAG', 'Email', 'Japri WA']
        },
        {
            label: 'Requestor:',
            name: 'requestor'
        },
        {
            label: 'Description:',
            name: 'desc'
        },
        {
            label: 'Status:',
            name: 'status',
            type: 'radio',
            def: 'Inprogress',
            options: ['Inprogress', 'Done']
        }
    ],
    ajax: function (method, url, d, successCallback, errorCallback) {
        let output = { data: [] };
 
        if (d.action === 'create') {
            // Create new row(s), using the current time and loop index as
            // the row id
            let dateKey = +new Date();
 
            for (const [key, value] of Object.entries(d.data)) {
                let id = dateKey + '' + key;
 
                value.DT_RowId = id;
                todo[id] = value;
                output.data.push(value);
            }
        }
        else if (d.action === 'edit') {
            // Update each edited item with the data submitted
            for (const [id, value] of Object.entries(d.data)) {
                value.DT_RowId = id;
                Object.assign(todo[id], value);
                output.data.push(todo[id]);
            }
        }
        else if (d.action === 'remove') {
            // Remove items from the object
            for (const id of Object.keys(d.data)) {
                delete todo[id];
            }
        }
 
        // Store the latest `todo` object for next reload
        localStorage.setItem('todo', JSON.stringify(todo));
 
        // Show Editor what has changed
        successCallback(output);
    }
});
 
// Initialise the DataTable
new DataTable('#table-todo', {
    buttons: [
        { extend: 'create', editor },
        { extend: 'edit', editor },
        { extend: 'remove', editor }
    ],
    columns: [{ data: 'start' }, { data: 'subject' }, { data: 'group' }, { data: 'requestor'}, { data: 'desc' }, { data: 'status'}],
    data: Object.values(todo),
    dom: 'Bfrtip',
    select: true
});