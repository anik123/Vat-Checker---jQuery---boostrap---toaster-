window.addEventListener("load", function () {
    console.log("Hello World!");
});
$(document).ready(function () {
    $("[rel=tooltip]").tooltip({ placement: 'right' });
    $(".form-control-feedback").hide();

    $("#checkBIN").on("click", function () {
        var num = $("#binText").val();
        if (!num || isNaN(num) || num.length < 11 || num.length > 11) {
            $.toast({
                text: 'BIN must be number with 11 digit',
                position: 'bottom-center',
                showHideTransition: 'slide',
                stack: false,
                icon: 'error'
            });

            $("#holdForm").addClass("has-error");
            $("#holdForm").addClass("has-feedback");
            $(".form-control-feedback").show();

        } else {
            // valid
            $("#holdForm").removeClass("has-error");
            $("#holdForm").removeClass("has-feedback");
            $(".form-control-feedback").hide();

            var formData = new FormData();
            formData.append("txtSearch", num);
            var url = "http://www.nbr.gov.bd/getbinfield.php";
            var xhr = new XMLHttpRequest({ mozSystem: true });
            openModal();
            xhr.open("POST", url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {

                    //$.mobile.loading("hide");
                    closeModal();
                    if (xhr.status == 200) {
                        var p = $(xhr.responseText).find("#btnSubmit").parent().next("p").text();
                        $("#messageModal").modal('show');
                        var nameIndex = p.indexOf("Name");
                        var addressIndex = p.indexOf("Address:");
                        if (nameIndex > -1 || addressIndex > -1) {
                            // found

                            var addess = addressIndex > -1 ? p.substr(addressIndex + 8, p.length - 1).trim() : null;
                            var name = nameIndex > -1 ? p.substr(nameIndex + 5, addressIndex > -1 ? addressIndex - 5 : p.length - 1).trim() : null;
                            //console.log(name);
                            //console.log(addess);
                            if (addess) {
                                $("#messageModal  #address").show();
                                $("#messageModal  #address  p").html(addess);
                            }
                            if (name) {
                                $("#messageModal  #name").show();
                                $("#messageModal  #name  p").html(name);
                            }
                            $("#messageModal  #noData").hide();



                        } else {

                            $("#messageModal  #noData").show();
                            $("#messageModal  #name  p").html("");
                            $("#messageModal #name").hide();
                            $("#messageModal  #address  p").html("");
                            $("#messageModal  #address").hide();


                        }
                        //console.log(p);
                    } else {
                        // console.log("error");
                    }
                }
            }
            xhr.send(formData);
        }
    });
});
function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}