
function getTgl() {
  var date = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  var date = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  //  add 0 if value < 10
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var result =
    year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds;
  return result;
}

function loadKedbList() {
  clearChildren("list-kedb");

  var app = document.getElementById("in-apps").value;
  var list_kedb = document.getElementById("list-kedb");
  data = [];
  var dataKedb = db.queryAll("kedb");

  if (dataKedb.length == 0) {
    return;
  }

  for (let key in dataKedb) {
    //console.log(key)
    if (app.includes("NGRS") && dataKedb[key]["name"].includes("NGRS[]")) {
      data.push(dataKedb[key]["name"]);
    } else if (
      app.includes("DigiposMobile") &&
      dataKedb[key]["name"].includes("DIGIPOS[]")
    ) {
      data.push(dataKedb[key]["name"]);
    } else if (
      app.includes("B2BMyEnterprise") &&
      dataKedb[key]["name"].includes("B2BMYENTERPRISE[]")
    ) {
      data.push(dataKedb[key]["name"]);
    } else if (
      app.includes("99%Usahaku") &&
      dataKedb[key]["name"].includes("99%USAHAKU[]")
    ) {
      data.push(dataKedb[key]["name"]);
    } else if (
      app.includes("AntreAja") &&
      dataKedb[key]["name"].includes("AntreAja[]")
    ) {
      data.push(dataKedb[key]["name"]);
    } else if (app.includes("CPQ") && dataKedb[key]["name"].includes("CPQ[]")) {
      data.push(dataKedb[key]["name"]);
    } else if (
      app.includes("CUGCorporate") &&
      dataKedb[key]["name"].includes("CUG[]")
    ) {
      data.push(dataKedb[key]["name"]);
    } else if (
      app.includes("MyEnterpriseUnified") &&
      dataKedb[key]["name"].includes("Unified[]")
    ) {
      data.push(dataKedb[key]["name"]);
    } else if (app.includes("DSC") && dataKedb[key]["name"].includes("DSC[]")) {
      data.push(dataKedb[key]["name"]);
    } else if (app.includes("DSC") && dataKedb[key]["name"].includes("KIP_")) {
      data.push(dataKedb[key]["name"]);
    } else if (
      app.includes("MEPRO") &&
      dataKedb[key]["name"].includes("MEPRO[]")
    ) {
      data.push(dataKedb[key]["name"]);
    } else if (
      app.includes("MyEnterpriseAccess") &&
      dataKedb[key]["name"].includes("MEA[]")
    ) {
      data.push(dataKedb[key]["name"]);
    } else if (
      app.includes("TopUpCorporate") &&
      dataKedb[key]["name"].includes("TOPUPCORPORATE[]")
    ) {
      data.push(dataKedb[key]["name"]);
    } else if (
      app.includes("iKnow") &&
      dataKedb[key]["name"].includes("IKNOW[]")
    ) {
      data.push(dataKedb[key]["name"]);
    } else if (
      app.includes("VENA") &&
      dataKedb[key]["name"].includes("VENA[]")
    ) {
      data.push(dataKedb[key]["name"]);
    } else if (app.includes("URP") && dataKedb[key]["name"].includes("URP[]")) {
      data.push(dataKedb[key]["name"]);
    }
  }

  // Add to list
  for (let key in data) {
    let option = document.createElement("option");

    let cleanData = data[key].split(",")[0];

    option.setAttribute("value", cleanData);

    let optionText = document.createTextNode(data[key]);
    option.appendChild(optionText);

    list_kedb.appendChild(option);

    // console.log(dot[key]);
  }
}

function clickBtnSubmit() {
  // Input
  in_start = document.getElementById("in-start").value;
  in_ticket = document.getElementById("in-ticket").value;
  in_apps = document.getElementById("in-apps").value;
  in_kedb = document.getElementById("in-kedb").value;
  in_assigned = document.getElementById("in-assigned").value;
  in_pic = document.getElementById("in-pic").value;
  in_case = document.getElementById("in-case").value;
  in_action = document.getElementById("in-action").value;
  in_nextresolution = document.getElementById("in-nextresolution").value;
  in_evidence = document.getElementById("in-evidence").value;
  end_date = getTgl();

  // Output
  const out_notes = document.getElementById("out-notes");
  const out_parameter = document.getElementById("out-parameter");
  const out_g5 = document.getElementById("out-g5");

  if (
    in_start == "" ||
    in_ticket == "" ||
    in_apps == "" ||
    in_kedb == "" ||
    in_pic == "" ||
    in_case == "" ||
    in_action == "" ||
    in_nextresolution == ""
  ) {
    return;
  }

  if (
    in_kedb.includes("[]L2")
      ? (new_kedb = in_kedb.replace("[]L2", ""))
      : (new_kedb = in_kedb)
  )
    if (
      in_case.includes("\n")
        ? (new_case = in_case.replace(/\n/g, " "))
        : (new_case = in_case)
    )
      if (
        in_action.includes("\n")
          ? (new_action = in_action.replace(/\n/g, " "))
          : (new_action = in_action)
      )
        if (
          in_nextresolution.includes("\n")
            ? (new_nextresolution = in_nextresolution.replace(/\n/g, " "))
            : (new_nextresolution = in_nextresolution)
        )
          if (in_evidence == "") {
            new_evidence = "\n";
          } else {
            new_evidence = "\nEvidence Log : \n\n" + in_evidence + "\n";
          }

  if (in_assigned == "Assign Surrounding") {
    res_notes =
      "Case Name : " +
      new_case +
      "\nAction : " +
      new_action +
      "\nNext Action / Request Action : " +
      new_nextresolution +
      new_evidence +
      "\nTerima kasih";
    res_parameter =
      "~" +
      in_ticket +
      "~" +
      in_apps +
      "~" +
      in_start +
      "_" +
      end_date +
      "~" +
      "Case Name : " +
      new_case +
      "~" +
      "Action : " +
      new_action +
      "~" +
      "Next Action / Request Action : " +
      new_nextresolution +
      "~" +
      "KEDB : " +
      new_kedb;
  } else if (in_assigned == "Escalate L2") {
    new_kedb = new_kedb + "[]L2";
    res_notes =
      "Dear rekan L2\n\nCase Name : " +
      new_case +
      "\nAction : " +
      new_action +
      "\nNext Action / Request Action : " +
      new_nextresolution +
      new_evidence +
      "\nTerima kasih";
    res_parameter =
      "~" +
      in_ticket +
      "~" +
      in_apps +
      "~" +
      in_start +
      "_" +
      end_date +
      "~" +
      "Case Name : " +
      new_case +
      "~" +
      "Action : " +
      new_action +
      "~" +
      "Next Action / Request Action : " +
      new_nextresolution +
      "~" +
      "KEDB : " +
      new_kedb;
  } else if (in_assigned == "Resolved") {
    res_notes =
      "Dear rekan\n\nCase Name : " +
      new_case +
      "\nAction : " +
      new_action +
      "\nResolution : " +
      new_nextresolution +
      new_evidence +
      "\nTerima kasih";
    res_parameter =
      "~" +
      in_ticket +
      "~" +
      in_apps +
      "~" +
      in_start +
      "_" +
      end_date +
      "~" +
      "Case Name : " +
      new_case +
      "~" +
      "Action : " +
      new_action +
      "~" +
      "Resolution : " +
      new_nextresolution +
      "~" +
      "KEDB : " +
      new_kedb;
  }

  if (
    res_notes.includes('"')
      ? (res_notes = res_notes.replace(/\"/g, "'"))
      : (res_notes = res_notes)
  )
    res_g5 =
      in_ticket +
      "\t" +
      new_kedb +
      "\t" +
      in_assigned +
      "\t" +
      in_pic +
      "\t" +
      '"' +
      res_notes +
      '"';

  out_notes.value = res_notes;
  out_parameter.value = res_parameter;
  out_g5.value = res_g5;

  addRecordData(
    in_start,
    end_date,
    in_ticket,
    in_apps,
    new_case,
    new_action,
    new_nextresolution,
    in_evidence,
    new_kedb,
    in_assigned,
    in_pic
  );
}

function clickBtnClear() {
  id = [
    "in-start",
    "in-ticket",
    "in-apps",
    "in-kedb",
    "in-assigned",
    "in-case",
    "in-action",
    "in-nextresolution",
    "in-evidence",
    "out-notes",
    "out-parameter",
    "out-g5",
  ];

  for (let i in id) {
    document.getElementById(id[i]).value = "";
  }

  // lastdata = 0

  clearChildren("in-kedb");
}

// Event Listener
document.getElementById("btn-submit").addEventListener("click", function () {
  let validasi = document.querySelector(".needs-validation");
  validasi.classList.add("was-validated");
  setTimeout(function () {
    validasi.classList.remove("was-validated");
  }, 4000);
  // lastdata = 0
  clickBtnSubmit();
});

document.getElementById("btn-start").addEventListener("click", function () {
  var start = document.getElementById("in-start");
  start.value = getTgl();
});

document.getElementById("btn-clear-all").addEventListener("click", function () {
  clickBtnClear();
});

document.getElementById("in-apps").addEventListener("change", function () {
  loadKedbList();
});

let copyNotes = document.querySelector(".copy-notes");
copyNotes.addEventListener("click", function () {
  let textarea = document.querySelector("#out-notes");
  let tex = document.getElementById("btn-copy-notes");
  tex.textContent = "Copied";
  textarea.select();
  document.execCommand("copy");
  copyNotes.classList.add("active");
  window.getSelection().removeAllRanges();
  setTimeout(function () {
    copyNotes.classList.remove("active");
    tex.textContent = "Copy";
  }, 2500);
});

let copyParameter = document.querySelector(".copy-parameter");
copyParameter.addEventListener("click", function () {
  let textarea = document.querySelector("#out-parameter");
  let tex = document.getElementById("btn-copy-parameter");
  tex.textContent = "Copied";
  textarea.select();
  document.execCommand("copy");
  copyParameter.classList.add("active");
  window.getSelection().removeAllRanges();
  setTimeout(function () {
    copyParameter.classList.remove("active");
    tex.textContent = "Copy";
  }, 2500);
});

let copyG5 = document.querySelector(".copy-g5");
copyG5.addEventListener("click", function () {
  let textarea = document.querySelector("#out-g5");
  let tex = document.getElementById("btn-copy-g5");
  tex.textContent = "Copied";
  textarea.select();
  document.execCommand("copy");
  copyG5.classList.add("active");
  window.getSelection().removeAllRanges();
  setTimeout(function () {
    copyG5.classList.remove("active");
    tex.textContent = "Copy";
  }, 2500);
});
