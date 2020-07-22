// $(function () {
//     getPollingRole();
// })

function getPollingRole() {
    var role= sessionStorage.roleId;

    if(role==2){
        document.getElementById('create').style.display='block';
        document.getElementById('work').style.display='block';
        document.getElementById('pollingCreate').style.display='none';
        document.getElementById('pollingWork').style.display='none';
    }else{
        document.getElementById('create').style.display='none';
        document.getElementById('work').style.display='block';
        document.getElementById('pollingCreate').style.display='none';
        document.getElementById('pollingWork').style.display='none';
    }
}

function pollingCreate() {
    document.getElementById('create').style.display='none';
    document.getElementById('work').style.display='none';
    document.getElementById('pollingCreate').style.display='';
    document.getElementById('pollingWork').style.display='none';
    document.getElementById('returnPButton').style.display='';

}
function pollingWork() {
    document.getElementById('create').style.display='none';
    document.getElementById('work').style.display='none';
    document.getElementById('pollingCreate').style.display='none';
    document.getElementById('pollingWork').style.display='';
    document.getElementById('returnPButton').style.display='';

}